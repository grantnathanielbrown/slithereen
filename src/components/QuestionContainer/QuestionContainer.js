import React, { Component } from 'react';
import axios from 'axios';
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

    render() {
        return (
            <div>
                <input onClick={this.nextQuestion} type="submit" value="Next Question" />
                <h1 className="individual-question">{this.state.triviaQuestionObject.question}</h1>
                <input onChange={this.handleGuess} type="text" />
                <input onClick ={this.guessQuestion} type="submit" value="Submit Your Guess" />
            </div>
        );
    }
}

export default QuestionContainer;