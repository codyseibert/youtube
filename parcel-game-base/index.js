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

const draw = ({ ctx }) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(state.box.x, 0, 100, 100);
}

const update = ({ progress }) => {
  state.box.x++;
}

function loop(timestamp) {
  const progress = timestamp - lastRender;

  update({ progress })
  draw({ ctx });

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);