# Slithereen - A Trivia App

This app is a multiplayer trivia game that provides players with trivia prompts which they can then answer. Every question has a different point value. There will be lots of customizable features, like the speed at which the question is read, avatars, or perhaps the ability for users to submit their own trivia questions. I plan to use React to make the frontend and Express for the backend. I'm going to use websockets to connect the users to the page.

## Models

I will probably use an API, but if I don't, here is the TriviaQuestion model.

id: int
answer: string
question: string
pointValue: int
createdAt: date
category: string

## MVP


- question displays at middle of the screen
- question runs out over time
- score

### Bronze
- users can add questions
- users can log in and log out
- 

### Silver
- multiple users connect at once and play against each other
- 

### Gold

## TODO

- on submit guess, match with answer in QuestionObject. If right, emit "user guessed X. He was correct, so he scored Y points! or "user guessed X. He was wrong. Who else wants to guess?"
### Known Bugs

- Timer beginning before question is revealed

## Quiz Structure / User Experience
- you see page, no question loaded yet.
- anyone can press "Get a brand new question"
- When question pops up, timer appears and starts counting down from 20. Anyone can guess.
"Brand New Question" button disappears / becomes unclickable.

- If guess is correct, announcer says stuff and button reappears.
- If guess is incorrect, announcer says stuff.
- If timer runs out, announcer says stuff and button reappears. "Submit" field gets hidden.


SOCKET.IO PATH

FRONTEND socket.emit = > BACKEND socket.on => BACKEND io.emit => FRONTEND socket.on

EXPRESS

io.on connection = > set up event listener for connection. put all your functions in here
socket.on => set up event listener for custom events. nested inside is 
    io.emit, which sends a message to all connected sockets

REACT
socket.on => set up event listener for 

