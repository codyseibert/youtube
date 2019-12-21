export default {
  update: ({ progress, state }) => {
    state.turret.rotation = Math.atan2(
      state.mouse.x - state.screen.width / 2,
      -(state.mouse.y - state.screen.height / 2),
    );
  },
  draw: ({ ctx, state }) => {
    ctx.save();
    ctx.translate(
      state.screen.width / 2,
      state.screen.height / 2,
    );
    ctx.rotate(state.turret.rotation);
    ctx.drawImage(
      state.images.turret,
      -state.images.turret.width / 2,
      -state.images.turret.height / 2,
    )
    ctx.restore();
  },
  create: ({ state }) => {
    return {
      rotation: 0,
      x: 0,
      y: 0,
    }
  }
}