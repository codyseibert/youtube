// the winner node in the youtube video....
const AWESOME_NODE = [
  { bias: 0, type: 'input', squash: 'LOGISTIC', mask: 1 },
  { bias: 0.30706141774709034, type: 'output', squash: 'LOGISTIC', mask: 1 }
];

import 'regenerator-runtime/runtime';

import neataptic from 'neataptic';
import ground from './assets/ground.png';
import block from './assets/block.png';
import player from './assets/player.png';

let images = 3;
const groundImage = new Image();
groundImage.onload = () => {
  images--;
};
groundImage.src = ground;

const blockImage = new Image();
blockImage.onload = () => {
  images--;
};
blockImage.src = block;

const playerImage = new Image();
playerImage.onload = () => {
  images--;
};
playerImage.src = player;

const Methods = neataptic.methods;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const POP_SIZE = 100;
const neat = new neataptic.Neat(1, 1, null, {
  mutation: [
    Methods.mutation.ADD_NODE,
    Methods.mutation.SUB_NODE,
    Methods.mutation.ADD_CONN,
    Methods.mutation.SUB_CONN,
    Methods.mutation.MOD_WEIGHT,
    Methods.mutation.MOD_BIAS,
    Methods.mutation.MOD_ACTIVATION,
    Methods.mutation.ADD_GATE,
    Methods.mutation.SUB_GATE,
    Methods.mutation.ADD_SELF_CONN,
    Methods.mutation.SUB_SELF_CONN,
    Methods.mutation.ADD_BACK_CONN,
    Methods.mutation.SUB_BACK_CONN
  ],
  popsize: POP_SIZE,
  mutationRate: 0.3,
  elitism: Math.round(0.3 * POP_SIZE)
});

neat.mutate();

let players = [];
let blocks = [];

const getNextBlock = ({ player }) => {
  for (const block of blocks) {
    if (block.x < player.x) continue;
    return block;
  }
};

function startEvaluation() {
  players = [];
  blocks = [];
  for (let i = 0; i < 100; i++) {
    const x = ctx.canvas.width + 100 + parseInt(Math.random() * 200) + i * 300;
    blocks.push({
      x,
      y: ctx.canvas.height / 2 - 50,
      height: 70,
      width: 20
    });
  }

  for (const genome of neat.population) {
    genome.score = 0;
    players.push({
      brain: genome,
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
      vy: 0,
      canJump: true,
      width: 20,
      height: 20,
      isDead: false
    });
  }
}

const background = {
  x: 0,
  y: -groundImage.height / 2 + ctx.canvas.height / 2 + 15
};

function endEvaluation() {
  //  // he added this to reduce the network size?
  //  for (const genome in neat.population) {
  //    genome = neat.population[genome];
  //    // genome.score = (genome.nodes.length * SCORE_RADIUS) / 10;
  //  }

  neat.sort();

  const newPopulation = [];

  for (let i = 0; i < neat.elitism; i++) {
    newPopulation.push(neat.population[i]);
  }

  for (let i = 0; i < neat.popsize - neat.elitism; i++) {
    newPopulation.push(neat.getOffspring());
  }

  neat.population = newPopulation;
  neat.mutate();

  neat.generation++;
  startEvaluation();
}

const isColliding = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

function updatePlayer({ player, block }) {
  if (player.isDead) {
    player.x -= 5;
    return;
  }

  const dist = Math.min(100, Math.abs(player.x - block.x)) / 100;
  const output = player.brain.activate([dist]);
  if (player.canJump && output[0] > 0.5) {
    // jump
    player.canJump = false;
    player.vy = -15;
  }

  // check if player collided with block
  if (isColliding(player, block)) {
    player.score--;
    player.isDead = true;
  }

  player.y += player.vy;
  player.vy += 0.9;

  if (player.y >= ctx.canvas.height / 2) {
    player.y = ctx.canvas.height / 2;
    player.vy = 0;
    player.canJump = true;
  }
}

function updateBlock({ block }) {
  block.x -= 5;
}

function drawPlayer({ player }) {
  if (images > 0) return;
  // ctx.globalAlpha = 0.9;
  ctx.drawImage(playerImage, player.x, player.y);
  // ctx.globalAlpha = 1.0;
}

function drawBlock({ block }) {
  if (images > 0) return;
  ctx.drawImage(blockImage, block.x, block.y);
}

const update = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(groundImage, background.x, background.y);

  for (const player of players) {
    const block = getNextBlock({ player });
    updatePlayer({ player, block });
    drawPlayer({ player });
  }

  for (const block of blocks) {
    updateBlock({ block });
    drawBlock({ block });
  }

  if (players.every(player => player.isDead)) {
    endEvaluation();
  } else {
    const stillAlive = players.filter(player => !player.isDead);
    const player = stillAlive[0];
    if (getNextBlock({ player }) === blocks[blocks.length - 1]) {
      console.log('This network won the game');
      console.log(JSON.stringify(player.brain.nodes));
    }
  }

  ctx.font = '30px Arial';
  ctx.fillText(`generation ${neat.generation + 1}`, 10, 30);
};

startEvaluation();

setInterval(update, 10);
