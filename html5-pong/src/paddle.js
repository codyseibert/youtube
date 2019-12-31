export default {
  create() {
    return {
      x: 0,
      y: 0,
      width: 20,
      height: 100,
      vx: 0,
      vy: 0
    };
  },
  draw({ ctx, paddle }) {
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(
      paddle.x,
      paddle.y,
      paddle.width,
      paddle.height
    );
  },
  update({ paddle }) {
    paddle.y += paddle.vy;
  }
};
