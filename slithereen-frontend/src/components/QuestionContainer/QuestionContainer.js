import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001/')

class QuestionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            triviaQuestionObject: '',
            triviaQuestionGuess: '',
            timer: 20,
            revealSubmit: true,
            userIdentification: undefined,
        }
        this.interval = null
        this.guessTimer = null
        this.getNewQuestion = this.getNewQuestion.bind(this)
        this.guessQuestion = this.guessQuestion.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
    }
// 4
componentDidMount() {
    socket.on('user list', (data) => {
    function combine (item, index) {
        var combinedNameAndScore = [item.id,item.score].join(": ")
        return combinedNameAndScore
        }  
        var meme = data.map(combine)
        this.setState({
            userIdentification: meme
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
    socket.on('update scores', (data) => {
        clearInterval(this.interval)
        this.setState({
            revealSubmit: false,
            currentScores: this.state.currentScores + data
        })
        console.log('Scores have been updated senpai')
        console.log(data)

    })
    socket.on('incorrect', (incorrectGuess) => {
        console.log('He got a question wrong!')
    })
}

guessQuestion() {
    if (this.state.triviaQuestionGuess.toUpperCase() === this.state.triviaQuestionObject.answer.toUpperCase()) {
        const correctGuess = true
        socket.emit('correct', this.state.triviaQuestionObject.value)
    } else {
        this.setState({
            revealSubmit: false,
        }) 
        const incorrectGuess = true
        socket.emit('incorrect', incorrectGuess)
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
    }, 19999  
)
    this.interval = setInterval(() => {
      this.setState({timer: this.state.timer - 1})
    }, 1000)
  }

joinGame(e) {
    e.preventDefault()
    var newUserObject = {id: socket.id, score: 0}
    socket.emit('user join game', newUserObject)
}

    render() {
        const revealSubmit = this.state.revealSubmit
        const submit = revealSubmit ?  (
            <div>
                <input className="guess-field" onChange={this.handleGuess} type="text" />
                <input className="buzzer" onClick ={this.guessQuestion} type="submit" value="Submit Guess" />
            </div>
        ) : (
            <h1>Please wait for the next question to guess.</h1>
        )

            return (
                <div className="question-container">
                    <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                    {submit}
                    <form onSubmit={this.getNewQuestion} action="">
                        <button>New Question</button>
                    </form>
                    <div className="question-timer">
                        <h3>Time Remaining: {this.state.timer} seconds!</h3>
                    </div>
                    <div className="player-list">
                        {this.state.userIdentification}
                    </div>
                    <form onSubmit={this.joinGame} action="">
                        <button>Join Game</button>
                    </form>
                </div>
            )
    }
}

export default QuestionContainer;