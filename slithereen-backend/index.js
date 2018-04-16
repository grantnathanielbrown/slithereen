var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
  socket.on('new question', function(question) {
    io.emit('new question', question)
    console.log("server has received new question")
  })
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

http.listen(3001, function () {
  console.log('listening on localhost:3001')
})
