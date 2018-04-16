import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001')

class QuestionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            triviaQuestionObject: '',
            triviaQuestionGuess: ''
        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.guessQuestion = this.guessQuestion.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
    }

componentDidMount() {
    socket.on('new question', (question) => {
        console.log("frontend has received the question")
    });
}

nextQuestion() {
    var randomQuestion = "http://jservice.io/api/random"
    axios.get(randomQuestion).then((response)=> {
        this.setState ( {
            triviaQuestionObject: response.data[0]
        })
    }).catch(function (error) {
        console.log(error);
    });
}
guessQuestion() {
    console.log(this.state.triviaQuestionObject)
    if (this.state.triviaQuestionGuess === this.state.triviaQuestionObject.answer) {
        console.log('correct!')
    } else {
        console.log('wrong!')
    }
}
handleGuess(e) {
    this.setState({
        triviaQuestionGuess: e.target.value
    })
}

getNewQuestion(e) {
    e.preventDefault()
    const question = e.target.value
    socket.emit('new question', question)
    console.log('getting closer man')
}
    render() {
        return (
            <div>
                <input onClick={this.nextQuestion} type="submit" value="Next Question" />
                <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                <input onChange={this.handleGuess} type="text" />
                <input onClick ={this.guessQuestion} type="submit" value="Submit Your Guess" />

                <form onSubmit={this.getNewQuestion} action="">
                    <input id="m" autoComplete="off" /><button>Get A Brand New Question</button>
                </form>
            </div>
        );
    }
}

export default QuestionContainer;