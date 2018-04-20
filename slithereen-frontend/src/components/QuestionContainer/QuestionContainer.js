import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('https://slithereen-backend.herokuapp.com/')

class QuestionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            triviaQuestionObject: 'a',
            triviaQuestionGuess: 'a',
            timer: 20,
            revealSubmit: true,
            revealJoin: true,
            userIdentification: [],
        }
        this.interval = null
        this.guessTimer = null
        this.getNewQuestion = this.getNewQuestion.bind(this)
        this.guessQuestion = this.guessQuestion.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
        this.joinGame = this.joinGame.bind(this)
    }
// 4
componentDidMount() {
    socket.on('user list', (data) => {
    function combine (item, index) {
        var combinedNameAndScore = ["Player " + (index + 1),item.score].join(": ")
        return combinedNameAndScore
        }  
        var scoreboard = data.map(combine)
        this.setState({
            userIdentification: scoreboard
        })
        console.log(this.state.userIdentification)
    })
    // socket.on('user id', (data) => {
    //     this.setState({
    //         userIdentification: data
    //     })
    // console.log(this.state.userIdentification)

    // })
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

    })
    socket.on('incorrect', (incorrectGuess) => {
        console.log('He got a question wrong!')
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
                if (guessSegment === answerSegment && !(guessSegment.includes('THE', 'A', 'AN', 'AND', 'ON', 'OF', '&')) )  {
                    isGuessCorrect = true
                }
            }
        }
        if (isGuessCorrect === true) {
            console.log('isGuessCorrect: ' + isGuessCorrect)
            socket.emit('correct', this.state.triviaQuestionObject.value)
        } else {
            this.setState({
                revealSubmit: false,
            }) 
            socket.emit('incorrect')
        }
    }
}
handleGuess(e) {
    
    this.setState({
        triviaQuestionGuess: e.target.value
    })
}
// 1
getNewQuestion(e) {
    e.preventDefault()
    const question = true
    console.log(question)
    socket.emit('new question', question)
    console.log('server has received new question request')
}

timerStart() {
    clearTimeout(this.guessTimer)
    this.guessTimer = setTimeout(() => {
        this.setState({
            revealSubmit: false,
        })
        clearInterval(this.interval)
    }, 20999 
)
    this.interval = setInterval(() => {
      this.setState({timer: this.state.timer - 1})
    }, 1000)
  }

joinGame(e) {
    e.preventDefault()
    this.setState({
        revealJoin: false,
    })
    var newUserObject = {id: socket.id, score: 0}
    socket.emit('user join game', newUserObject)
}

    render() {
        let players = this.state.userIdentification.map((player, index) => {
            return <li key={index}>{player}</li>
        })
        const revealSubmit = this.state.revealSubmit
        const revealJoin = this.state.revealJoin
        const reveal = revealJoin ? (
                <input className="join-button" onClick={this.joinGame} type="submit" value="Join Game" />  
        ) : (
            <h1>You have joined the game. TEST</h1>
        )
        const submit = revealSubmit ?  (
            <form onSubmit={this.guessQuestion} action="">
                <input className="guess-field" onChange={this.handleGuess} type="text" />
                <input className="buzzer" onClick ={this.guessQuestion} type="submit" value="Submit Guess" />
            </form>
        ) : (
            <h3>Please wait for the next question to guess.</h3>
        )

            return (
                <div className="question-container">
                    {reveal}
                    <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                    <div className="question-timer">
                        <h3>Time Remaining: {this.state.timer} seconds!</h3>
                    </div>
                    {submit}
                    <input className="new-question-button" onClick={this.getNewQuestion} type="submit" value="New Question" />
                    <ul>
                        {players}
                    </ul>
                </div>
            )
    }
}

export default QuestionContainer;