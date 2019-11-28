const getSnake = (state, snakeId)  => {
  if (!snakeId) snakeId = state.you.id;
  for (let snake of state.board.snakes) {
    console.log(snake);
    if (snake.id == snakeId) return snake;
  }
}

exports.getSnake = getSnake;

