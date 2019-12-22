export default {
  update: ({ entity: bullet, state }) => {
  },
  draw: ({ ctx, entity: bullet, state }) => {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(bullet.x, bullet.y, 5, 5);
  },
  create: ({ position, angle }) => {
    const speed = 30;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    return {
      ...position,
      type: 'bullet',
      vx,
      vy,
    }
  }
}