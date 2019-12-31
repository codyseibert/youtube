import update from './update';
import draw from './draw';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let interval;

export default ({ neat, state }) => {
  return new Promise((resolve, reject) => {
    state.players = [];
    state.blocks = [];
    state.spawns = 0;

    const gridSize = Math.sqrt(neat.population.length);
    const gridWidth = ctx.canvas.width / gridSize;
    const gridHeight = ctx.canvas.height / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const genome = neat.population[i * gridSize + j];
        genome.score = 0;
        state.players.push({
          brain: genome,
          x: j * gridWidth + gridWidth / 2,
          y: i * gridHeight + gridHeight / 2,
          width: 20,
          height: 20
        });
      }
    }

    interval = setInterval(() => {
      const timestamp = new Date().getTime();
      const progress = timestamp - lastRender;
      ctx.clearRect(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );

      const isRunning = update({
        progress,
        state
      });
      draw({ ctx, neat, state });

      lastRender = timestamp;
      if (!isRunning) {
        clearInterval(interval);
        reject();
      }
    }, 10);
    let lastRender = 0;
  });
};
