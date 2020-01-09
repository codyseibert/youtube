export default {
  update: ({ entity: bullet, state }) => {
  },
  draw: ({ draw, entity: bullet, state }) => {
    draw.square({ x: bullet.x, y: bullet.y, size: 5 });
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