# Slithereen

Slithereen is a multiplayer trivia app. It's perfect for playing at a party, or just for some friends to play together over the internet. Slithereen is convenient because it allows many players to compete against each other while sharing the same interface and data on separate screens.

## Example

https://i.imgur.com/qf3m4Ej.png

This project uses Websockets (socket.io is the preferred choice for node.js) to connect multiple players together, and serve them all the same information in real-time. Here is a snippet from my code on the backend.

```
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var axios = require('axios')

var userArray = []

io.on('connection', function (socket) {

  socket.on('user join game', (data) => {
    userArray.push(data)
    io.emit('user list', userArray)
    console.log("ARRAY OF USERS: " + userArray)
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
  socket.on('new question', function(question) {

    var randomQuestion = "http://jservice.io/api/random"
    axios.get(randomQuestion).then((response) => {
      question = response.data[0]
      io.emit('new question', question)
      console.log("server has received new question")
      console.log(question)
    }).catch(function (error) {
        console.log(error);
    });
  })
  ...
  ```

  I require all of my node packages, and create event listeners for specific events coming from my individual sockets (clients). These events could be 'chat message', or 'new question', or 'user join game', or whatever. When those backend event listeners are triggered, they simultaneously send data and trigger event listeners on the frontend, which update each client's view with new information, or other things.

## Quiz Structure / User Experience
- you see page, no question loaded yet.
- anyone can press "Get a brand new question"
- When question pops up, timer appears and starts counting down from 20. Anyone can guess.

- If guess is correct, announcer says stuff and button reappears.
- If guess is incorrect, announcer says stuff.
- If timer runs out, announcer says stuff and button reappears. "Submit" field gets hidden.

## MVP

- question displays at middle of the screen.
- users can actually play the game, answering questions and having them be right or wrong
- question runs out over time
- multiple users connect at once and play against each other
- chat functionality

### Bronze 
- score is unique to users

### Silver
- users can log in and log out

### Gold
- user profile with wins, stored score, whatever
- I make my own API and users get full CRUD on it

## Technologies

- Frontend is made with React (which means HTML, CSS, and Javascript / JSX), backend uses Express.js, Socket.io and Axios

## Installation

### Backend
 Clone (fork it first, if you so desire) down this repository.
 Navigate into the directory
 nodemon index.js

### Frontend
 Clone (fork it first, if you so desire) down this repository.
 Navigate into the nested subfolder.
 npm install
 npm start