console.log('hello world');

import Ball from './ball';
import Paddle from './paddle';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

ctx.canvas.width = width;
ctx.canvas.height = height;

ctx.fillStyle = '#000000';

let leftPaddle;

let rightPaddle;
let ball;

const createInitialGameState = () => {
  leftPaddle = Paddle.create();
  leftPaddle.x = 0;
  leftPaddle.y = height / 2;

  rightPaddle = Paddle.create();
  rightPaddle.x = width - rightPaddle.width;
  rightPaddle.y = height / 2;

  ball = Ball.create({
    x: width / 2,
    y: height / 2
  });
};
createInitialGameState();

const PADDLE_MOVE_SPEED = 3;

window.addEventListener('keydown', ({ key }) => {
  if (key === 'w') {
    leftPaddle.vy = -PADDLE_MOVE_SPEED;
  } else if (key === 's') {
    leftPaddle.vy = PADDLE_MOVE_SPEED;
  }

  if (key === 'ArrowUp') {
    rightPaddle.vy = -PADDLE_MOVE_SPEED;
  } else if (key === 'ArrowDown') {
    rightPaddle.vy = PADDLE_MOVE_SPEED;
  }
});

window.addEventListener('keyup', ({ key }) => {
  if (key === 'w') {
    leftPaddle.vy = 0;
  } else if (key === 's') {
    leftPaddle.vy = 0;
  }

  if (key === 'ArrowUp') {
    rightPaddle.vy = 0;
  } else if (key === 'ArrowDown') {
    rightPaddle.vy = 0;
  }
});

setInterval(() => {
  ctx.clearRect(0, 0, width, height);

  Ball.update({
    ctx,
    ball,
    paddles: [leftPaddle, rightPaddle],
    onBallOutOfBounds: () => {
      alert('game over man');
      createInitialGameState();
    }
  });
  Ball.draw({ ctx, ball });

  Paddle.draw({
    ctx,
    paddle: leftPaddle
  });
  Paddle.draw({
    ctx,
    paddle: rightPaddle
  });

  Paddle.update({
    paddle: leftPaddle
  });

  Paddle.update({
    paddle: rightPaddle
  });
}, 10);
