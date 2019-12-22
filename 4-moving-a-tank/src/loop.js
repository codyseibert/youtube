import Tank from './tank';

export default ({ state }) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  state.screen.width = ctx.canvas.width;
  state.screen.height = ctx.canvas.height;

  function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    Tank.update({ state });
    Tank.draw({ ctx, state });

    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}