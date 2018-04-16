import React, { Component } from 'react';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001')
class SocketTest extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    socket.on('chat message', (message) => {
      this.setState({
        messages: this.state.messages.concat(message)
      })
    });
  }
  submitMessage(e) {
    e.preventDefault();
    const msg = e.target.children[0].value;
    socket.emit('chat message', msg);
    e.target.reset();
  }
  render() {
    let messages = this.state.messages.map((msg, i) => {
      return <li key={i}>{msg}</li>
    })
    return (
      <div className="App">
        <ul id="messages">{messages}</ul>
        <form onSubmit={this.submitMessage} action="">
          <input id="m" autoComplete="off" /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default SocketTest;
