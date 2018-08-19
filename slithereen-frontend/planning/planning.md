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


### Known Bugs

- Long load time on questions

## Things that are shared by users

- questionObject
- timer
- ability to submit
- ability to view scores, and the scores themselves
- 

## TODO


* set value of field to "input your name here.."
- on submit guess, match with answer in QuestionObject. If right, emit "user guessed X. He was correct, so he scored Y points! or "user guessed X. He was wrong. Who else wants to guess?"
- add that bar that runs down with countdown


### CSS Ideas

- bar that runs down with countdown
- Static placement of elements, try to make them not move around so much
- 
- reverse order on any announcer / chat that comes up
- 

color scheme: https://coolors.co/faa916-e7dfe8-6d676e-1b1b1e-96031a

### potential trick words