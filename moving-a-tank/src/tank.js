export default {
  update: ({ progress, state }) => {
    const speed = state.tank.speed;

    if (state.input.up) {
      state.tank.y -= speed;
    } else if (state.input.down) {
      state.tank.y += speed;
    }

    if (state.input.left) {
      state.tank.x -= speed;
    } else if (state.input.right) {
      state.tank.x += speed;
    }
  },
  draw: ({ ctx, state }) => {
    ctx.drawImage(
      state.images.tank,
      state.tank.x,
      state.tank.y
    );
  }
}