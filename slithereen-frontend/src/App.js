import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// components
import Header from './components/Header/Header';
import QuestionContainer from './components/QuestionContainer/QuestionContainer';
import SocketTest from './components/SocketTest/SocketTest';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <QuestionContainer />
        <SocketTest />
      </div>
    );
  }
}

export default App;
