let PF = require('pathfinding');
let floodFill = require('n-dimensional-flood-fill');

const getSnake = (state, snakeId)  => {
  if (!snakeId) snakeId = state.you.id;
  for (let snake of state.board.snakes) {
    if (snake.id == snakeId) return snake;
  }
}

const generateMove = (state) => {
  let generatedMove = undefined;
  let possibleMoves = ['up', 'down', 'left', 'right'];
  let dangerousFlag = false;
  let cornerMove = checkCorners(state);

  if (cornerMove) {
    return cornerMove;
  }else {
    possibleMoves = checkWalls(state, possibleMoves);
  }

  possibleMoves = checkCollision(state, possibleMoves);
  return possibleMoves;
}

function checkCollision(state, possibleMoves) {
  let head = state.you.body[0];
  let body = state.you.body;
  let nextMove = head;
  for (let move of possibleMoves) {
    switch(move) {
      case 'up':
        nextMove.y++;
        break;
      case 'down':
        nextMove.y--;
        break;
      case 'left':
        nextMove.x--;
        break;
      case 'right':
        nextMove.x++;
        break;
      default:
        console.log("I broke!");
    }
    if (body.indexOf(nextMove) >= 0) {
      console.log("COLLISION!!!");
      possibleMoves.splice(possibleMoves.indexOf(move), 1);
    }
  }
  return possibleMoves;
}

function checkWalls(state, possibleMoves) {
    var bodyData = state.you.body;
    if (bodyData[0].x === 0) {
        if (bodyData[1].x === 1) {
            return ['up', 'down'];
        } else if (bodyData[1].y === bodyData[0].y - 1) {
            return ['right', 'down'];
        } else if (bodyData[1].y === bodyData[0].y + 1) {
            return ['right', 'up'];
        } else {
            return ['right', 'up', 'down'];
        }
    } else if (bodyData[0].x === state.board.width - 1) {
        if (bodyData[1].x === bodyData[0].x - 1) {
            return ['up', 'down'];
        } else if (bodyData[1].y === bodyData[0].y - 1) {
            return ['left', 'down'];
        } else if (bodyData[1].y === bodyData[0].y + 1) {
            return ['left', 'up'];
        } else {
            return ['up', 'down', 'left'];
        }
    } else if (bodyData[0].y === 0) {
        if (bodyData[1].y === bodyData[0].y + 1) {
            return ['left', 'right'];
        } else if (bodyData[1].x === bodyData[0].x - 1) {
            return ['down', 'right'];
        } else if (bodyData[1].x === bodyData[0].x + 1) {
            return ['down', 'left'];
        } else {
            return ['left', 'right', 'down'];
        }
    } else if (bodyData[0].y === state.board.height - 1) {
        if (bodyData[1].y === bodyData[0].y - 1) {
            return ['left', 'right'];
        } else if (bodyData[1].x === bodyData[0].x - 1) {
            return ['up', 'right'];
        } else if (bodyData[1].x === bodyData[0].x + 1) {
            return ['up', 'left'];
        } else {
            return ['up', 'left', 'right'];
        }
    } else {
        return possibleMoves;
    }
}

function checkCorners(state) {
    var bodyData = state.you.body;
    if (bodyData[0].x === 0 && bodyData[0].y === 0) {
        if (bodyData[1].y === 1) {
            return ['right'];
        } else if (bodyData[1].x === 1) {
            return ['down'];
        }
    } else if (bodyData[0].x === state.board.width - 1 && bodyData[0].y === 0) {
        if (bodyData[1].x === state.board.width - 2) {
            return ['down'];
        } else if (bodyData[1].y === 1) {
            return ['left'];
        }
    } else if (bodyData[0].x === 0 && bodyData[0].y === state.board.height - 1) {
        if (bodyData[1].y === state.board.height - 2) {
            return ['right'];
        } else if (bodyData[1].x === 1) {
            return ['up'];
        }
    } else if (bodyData[0].x === state.board.width - 1 && bodyData[0].y === state.board.height - 1) {
        if (bodyData[1].y === state.board.height - 2) {
            return ['left'];
        } else if (bodyData[1].x === state.board.width - 2) {
            return ['up'];
        }
    } else {
        return false;
    }
}

exports.getSnake = getSnake;
exports.generateMove = generateMove;

