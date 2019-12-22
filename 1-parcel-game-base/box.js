export default {
  update: ({ progress, state }) => {
    state.box.x++;
  },
  draw: ({ ctx, state }) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(state.box.x, 0, 100, 100);
  }
}