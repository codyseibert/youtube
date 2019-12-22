
import Tank from './tank';
import Bullet from './bullet';
import physicsHandler from './physicsHandler';

const entityTypes = {
  tank: Tank,
  bullet: Bullet,
}

const updateEntities = ({ progress, state }) => {
  for (const entity of state.entities) {
    entityTypes[entity.type].update({ entity, progress, state });
    physicsHandler({ entity, progress, state });
  }
}

const drawEntities = ({ ctx, state }) => {
  for (const entity of state.entities) {
    entityTypes[entity.type].draw({ ctx, entity, state });
  }
}

export default ({ state }) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  state.screen.width = ctx.canvas.width;
  state.screen.height = ctx.canvas.height;

  function loop(timestamp) {
    const progress = timestamp - lastRender;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    updateEntities({ progress, state });
    drawEntities({ ctx, state });

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
  let lastRender = 0;
  window.requestAnimationFrame(loop);
}