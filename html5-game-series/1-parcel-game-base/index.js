const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const state = {
  box: {
    x: 0,
    y: 0,
  }
};

import Box from './box';

function loop(timestamp) {
  const progress = timestamp - lastRender;

  Box.update({ progress, state })

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  Box.draw({ ctx, state });

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);