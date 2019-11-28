const getSnake = (state, snakeId)  => {
  if (!snakeId) snakeId = state.you.id;
  for (let snake of state.snakes.data) {
    if (snake.id == snakeId) return snake;
  }
}

exports.getSnake = getSnake;

