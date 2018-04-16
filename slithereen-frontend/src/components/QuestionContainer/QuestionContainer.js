import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001')

class QuestionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            triviaQuestionObject: '',
            triviaQuestionGuess: '',
            timer: 10,
        }
        this.interval = null
        this.getNewQuestion = this.getNewQuestion.bind(this)
        this.guessQuestion = this.guessQuestion.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
    }
// 4
componentDidMount() {
    socket.on('new question', (question) => {
        this.setState({
            triviaQuestionObject: question
        })
        console.log(this.state.triviaQuestionObject)
    });
    socket.on('correct', (correctGuess) => {
        console.log('He got a question right!')
    })
    socket.on('incorrect', (incorrectGuess) => {
        console.log('He got a question wrong!')
    })
}

guessQuestion() {
    console.log(this.state.triviaQuestionObject)
    if (this.state.triviaQuestionGuess === this.state.triviaQuestionObject.answer) {
        const correctGuess = true
        socket.emit('correct', correctGuess)
    } else {
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
    const question = e.target.value
    socket.emit('new question', question)
    console.log('server has received new question request')
    clearInterval(this.interval)
    this.setState({
        timer: 10
    })
    this.timerStart()
}
timerStart() {
    this.interval = setInterval(() => {
      this.setState({timer: this.state.timer - 1})
    }, 1000)
  }

    render() {
        return (
            <div>
                <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                <input onChange={this.handleGuess} type="text" />
                <input onClick ={this.guessQuestion} type="submit" value="Submit Your Guess" />

                <form onSubmit={this.getNewQuestion} action="">
                    <input id="m" autoComplete="off" /><button>Get A Brand New Question</button>
                </form>
                <div className="question-timer">
                    <h3>Time Remaining: {this.state.timer} seconds!</h3>
                </div>
            </div>
        );
    }
}

export default QuestionContainer;