import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// components
import Header from './components/Header/Header';
import QuestionContainer from './components/QuestionContainer/QuestionContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <QuestionContainer />
      </div>
    );
  }
}

export default App;
