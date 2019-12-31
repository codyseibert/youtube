const START_SPEED = 3;
const SCREEN_OFFSET = 5;

const isColliding = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

export default {
  create: ({ x, y }) => ({
    x,
    y,
    START_SPEED: START_SPEED,
    width: 5,
    height: 5,
    speed: START_SPEED,
    vx: START_SPEED,
    vy: START_SPEED,
    radius: 10
  }),
  update({ ctx, ball, paddles, onBallOutOfBounds }) {
    ball.x += (ball.vx / Math.abs(ball.vx)) * ball.speed;
    ball.y += (ball.vy / Math.abs(ball.vy)) * ball.speed;

    if (
      ball.y <= SCREEN_OFFSET ||
      ball.y >= ctx.canvas.height - SCREEN_OFFSET
    ) {
      ball.vy *= -1;
    }

    if (
      ball.x <= SCREEN_OFFSET ||
      ball.x >= ctx.canvas.width - SCREEN_OFFSET
    ) {
      ball.vx *= -1;
    }

    for (const paddle of paddles) {
      if (isColliding(paddle, ball)) {
        ball.vx *= -1;
        ball.speed += 1;
      }
    }

    if (
      ball.x < SCREEN_OFFSET + 1 ||
      ball.x > ctx.canvas.width - SCREEN_OFFSET - 1
    ) {
      onBallOutOfBounds();
    }
  },
  draw({ ctx, ball }) {
    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
};
