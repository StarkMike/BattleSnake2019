const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')
const getSnake = require('./snake_helper');

let state = {};

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  state = request.body;
  // Response data
  const data = {
    color: '#222c75',
    name: 'STARK',
    headType: 'fang',
    tailType: 'freckled'
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  state = request.body;
  console.log(state);
  let mySnake = getSnake(state);
  console.log(mySnake);
  let directions = [];
  const head = mySnake.body[0];

  console.log(head);
  if (head.x > 0) {
    directions.push('left');
  }
  if (head.y > 0) {
    directions.push('up');
  }
  if (head.x < gameData.board.width){
    directions.push('right');
  }
  if (head.y < gameData.board.height){
    directions.push('left');
  }
  // Response data
  const nextMove = directions[Math.floor(Math.random()*directions.length)];

  console.log("Next move is " + nextMove);
  const data = {
    move: nextMove,
  }

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
