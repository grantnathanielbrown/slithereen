var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var axios = require('axios')
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
  // 2
  socket.on('new question', function(question) {

    var randomQuestion = "http://jservice.io/api/random"
    axios.get(randomQuestion).then((response)=> {
      question = response.data[0]
      // 3
      io.emit('new question', question)
      console.log("server has received new question")
      console.log(question)
    }).catch(function (error) {
        console.log(error);
    });
  })
  socket.on('correct', function(correctGuess) {
    io.emit('correct', correctGuess)
  })
  socket.on('incorrect', function(incorrectGuess) {
    io.emit('incorrect', incorrectGuess)
  })
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

http.listen(3001, function () {
  console.log('listening on localhost:3001')
})
