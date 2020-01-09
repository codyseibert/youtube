export default ({ state }) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  state.screen.width = ctx.canvas.width;
  state.screen.height = ctx.canvas.height;

  function loop(timestamp) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(state.images.tank, 50, 50);
    ctx.drawImage(state.images.turret, 200, 50);

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
  let lastRender = 0;
  window.requestAnimationFrame(loop);
}