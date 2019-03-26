import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
var socket = openSocket('https://slithereen-backend.herokuapp.com/', {transports: ['websocket', 'polling', 'flashsocket']});
// const socket = openSocket('https://slithereen-backend.herokuapp.com/')
// http://localhost:3001/
// https://slithereen-backend.herokuapp.com/


class QuestionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            triviaQuestionObject: 'a',
            triviaQuestionGuess: 'a',
            timer: 20,
            revealSubmit: true,
            revealJoin: true,
            revealChat: false,
            userIdentification: [],
            messages: [],
            // nickname
        }
        this.interval = null
        this.guessTimer = null
        this.getNewQuestion = this.getNewQuestion.bind(this)
        this.guessQuestion = this.guessQuestion.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
        this.handleNameInput = this.handleNameInput.bind(this)
        this.joinGame = this.joinGame.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
    }
// 4

componentDidMount() {
    socket.on('user list', (data) => {
        function combine (item, index) {
            var combinedNameAndScore = [item.nickname,item.score].join(": ")
            return combinedNameAndScore
        }  
        var scoreboard = data.map(combine)
        this.setState({
            userIdentification: scoreboard
        })
        console.log(this.state.userIdentification)
    })
    socket.on('message list', (data) => {
        function combine (item, index) {
            if (item.nickname) {
                var combinedNameAndMessage = [item.nickname,item.message].join(": ")
                return combinedNameAndMessage
            } else {
                return item
            }
        }
        var messageList = data.map(combine)
        this.setState({
            messages: messageList
        })
    })
    socket.on('new question', (question) => {
        
        this.setState({
            triviaQuestionObject: question,
            revealSubmit: true,
            timer: 20,
        })
        clearInterval(this.interval)
        // clear timer
        this.timerStart()

        console.log(this.state.triviaQuestionObject)
    });
    socket.on('end round', (data) => {
        clearInterval(this.interval)
        this.setState({
            revealSubmit: false,
        })
        let pausedBar = document.getElementsByClassName('progress')[0];
        console.log(pausedBar);
        pausedBar.classList.add('paused');

    })
}

guessQuestion(e) {
    // a lot of logic in here makes the guessing process more lenient; for example, users do not have to worry about being case sensitive,
    // and also do not have to worry about forgetting to write "the" or "a" in a guess, for example
    e.preventDefault()
    if (this.state.triviaQuestionObject.answer) {
        var guessHelper = this.state.triviaQuestionGuess.toUpperCase().split(" ")
        console.log(guessHelper)
        var answerHelper = this.state.triviaQuestionObject.answer.toUpperCase().split(" ")
        console.log(answerHelper)
        var isGuessCorrect = false
        for (let guessSegment of guessHelper) {
            for (let answerSegment of answerHelper) {
                // Right-hand side only resolving to true on 'THE', all other items in the array resolve to false. Fix that
                if (guessSegment === answerSegment && !(guessSegment.includes('THE', 'A', 'AN', 'AND', 'ON', 'OF', '&')) )  {
                    isGuessCorrect = true
                }
            }
        }
        if (isGuessCorrect === true) {
            console.log('isGuessCorrect: ' + isGuessCorrect)
            var announcerCorrect = this.state.nickname + " guessed the question correctly for " + this.state.triviaQuestionObject.value + " points!"
            var correctObject = {announcer: announcerCorrect, value: this.state.triviaQuestionObject.value}
            socket.emit('correct guess', correctObject)
        } else {
            this.setState({
                revealSubmit: false,
            })
            var announcerIncorrect = this.state.nickname + " guessed incorrectly. Better luck next time!" 
            socket.emit('incorrect guess', announcerIncorrect)
            console.log('incorrect guess has been submitted to the backend')
        }
    }
}
handleGuess(e) {
    this.setState({
        triviaQuestionGuess: e.target.value
    })
}
handleNameInput(e) {
    e.preventDefault()
    this.setState({
        nickname: e.target.value
    })
}
getNewQuestion(e) {
    e.preventDefault()
    const question = true
    console.log(question)
    socket.emit('new question', question)
    console.log('server has received new question request')
}

timerStart() {
    clearTimeout(this.guessTimer)
    this.startLoadingBar()
    this.guessTimer = setTimeout(() => {
        this.setState({
            revealSubmit: false,
        })
        clearInterval(this.interval)
    }, 20999 
)
    this.interval = setInterval(() => {
      this.setState({timer: (this.state.timer - 1)})
    }, 1000)
  }

startLoadingBar() {
    // deletes the bar if it already exists, then creates a 'progress bar' inside of bar div, add the animation to it
    
    let parent = document.getElementById('bar');
    let old = document.getElementsByClassName('progress')[0]
    parent.removeChild(old);
    console.log('march')
    
    console.log('animation started');
    let progress = document.createElement('div');
    progress.classList.add('progress');
    parent.appendChild(progress);
    progress.classList.add('decrease');
  }

joinGame(e) {
    e.preventDefault()
    this.setState({
        revealJoin: false,
        revealChat: true,
    })
    var newUserObject = {id: socket.id, nickname: this.state.nickname, score: 0}
    socket.emit('user join game', newUserObject)
}
submitMessage(e) {
    e.preventDefault()
    var messageObject = {message: e.target.children[0].value, nickname: this.state.nickname}
    socket.emit('submit message', messageObject);
    e.target.reset()
  }

    render() {
        let players = this.state.userIdentification.map((player, index) => {
            return <li key={index}>{player}</li>
        })
        let messages = this.state.messages.map((msg, i) => {
            return <li key={i}>{msg}</li>
          })
        const revealSubmit = this.state.revealSubmit
        const revealJoin = this.state.revealJoin
        const revealChat = this.state.revealChat
        const reveal = revealJoin ? (
            <form onSubmit={this.joinGame} action="">
                <input className="name-field" onChange={this.handleNameInput} type="text" />
                <input className="join-button" type="submit" value="Join Game" />
            </form> 
        ) : (
            <h1>You have joined the game as {this.state.nickname}.</h1>
        )
        const submit = revealSubmit ?  (
            <form onSubmit={this.guessQuestion} action="">
                <input className="guess-field" onChange={this.handleGuess} type="text" />
                <input className="buzzer" onClick ={this.guessQuestion} type="submit" value="Submit Guess" />
            </form>
        ) : (
            <h3>Please wait for the next question to guess.</h3>
        )
        const chat = revealChat ? (
            <form onSubmit={this.submitMessage} action="">
                <input id="m" autoComplete="off" /><button>Send</button>
            </form>
        ) : (
            <h3>Please join the game in order to chat.</h3>
        )

            return (
                <div className="question-container">
                    {reveal}
                    <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                    <div className="timer-and-guess">
                        {submit}
                        <div className="question-timer">
                            <h4>You have{this.state.timer} seconds!</h4>
                            <div id="bar">
                                <div className="progress"></div>
                            </div>
                        </div>
                    </div>
                    <input className="new-question-button" onClick={this.getNewQuestion} type="submit" value="New Question" />
                    <div className="chat-container">
                        <ul id="messages">{messages}</ul>
                            {chat}
                    </div>
                    <ul className="player-list">
                        {players}
                    </ul>
                </div>
            )
    }
}

export default QuestionContainer;