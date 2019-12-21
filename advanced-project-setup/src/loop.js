import Turret from './turret';

export default ({ state }) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  state.screen.width = ctx.canvas.width;
  state.screen.height = ctx.canvas.height;

  state.turret = Turret.create({ state });

  function loop(timestamp) {
    const progress = timestamp - lastRender;

    Turret.update({ progress, state })

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    Turret.draw({ ctx, state });

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
  let lastRender = 0;
  window.requestAnimationFrame(loop);
}