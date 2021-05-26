# Schmiede.ONE Bugchat challenge!

Welcome!

This challenge is about an app that replicates one of the most sophisticated debugging methods: [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).

The app is a chatbot which responds to your messages but lets just say that the bot's level of intelligence isn't really production ready. Your job is to make the bot smarter.

We **DO NOT** expect you to do all the tasks listed here. Just focus on the ones that support your application (as a frontend or backend developer).
Focus on [task 2.1](#Tasks) if you're applying for a front-end position. Focus on [task 2.2](#Tasks) for backend positions.

# Task

## Constraints

less or equal 2 hours working time 

## Prioritisation

- understand frontend, refactor code, add functionalities if missing
- integrate StackExchange API
- add "intelligent" word filtering

## Idea

- use Stackexchange API instead of making an own backend due to time limitations

## Things I would've liked to do but couldn't due to time restrictions

- better answering using api
- better styling
- implement an actual backend
- more code cleanup
- multiple chat windows/histories

## Things that are working

- Chat functionalities are working
- fetches answers from API
- displays that Ducky is typing
- can't send empty message, i.e. button disabled or send not possible

# Get Started

## install dependencies

  ```sh
  npm i
  ```

## start react app

  ```sh
  npm start
  ```

## try different inputs

e.g.

- " " -> empty message
- message containing a popular technology you know, e.g. Java, C#, Python, ...
- more messages without any technology in it
