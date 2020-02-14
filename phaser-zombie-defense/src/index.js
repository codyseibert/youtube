const Phaser = require('phaser');
const bgImage = require('../assets/bg.png');
const zombieImage = require('../assets/zombie.png');
const baseImage = require('../assets/base.png');

const biteMp3 = require('../assets/bite.mp3');
const moanMp3 = require('../assets/moan.mp3');
const musicMp3 = require('../assets/music.mp3');

const Zombie = require('./Zombie');
const Base = require('./Base');
const HealthBar = require('./HealthBar');
const Damageable = require('./Damageable');

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 400,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  }
};

let base = null;

let currentRound = 0;
const totalRounds = 1;
let zombiesRemaining = 0;
let roundText = null;
const rounds = [
  {
    zombies: 5
  },
  {
    zombies: 15
  },
  {
    zombies: 30
  }
];

let moan;
new Phaser.Game(config);

const entities = [];

let gameOverText;

let spawner = null;
let biteSound;

function startRound() {
  if (spawner) {
    clearInterval(spawner);
  }
  moan.play();
  const round = { ...rounds[currentRound] };
  zombiesRemaining = round.zombies;
  const spawnZombies = () => {
    setTimeout(() => {
      if (round.zombies > 0) {
        const zombie = new Zombie(this, base, biteSound);
        Damageable({ entity: zombie, maxHealth: 5 });
        HealthBar({
          entity: zombie,
          phaser: this,
          width: 40,
          offsetY: -40,
          offsetX: -20
        });
        entities.push(zombie);
        round.zombies--;
        spawnZombies();
      }
    }, Math.random() * 2000 + 250);
  };
  spawnZombies();
  currentRound++;
  roundText.setText(`Round ${currentRound}`);
}

function preload() {
  this.load.image('bg', bgImage);
  this.load.image('zombie', zombieImage);
  this.load.image('base', baseImage);

  this.load.audio('bite', [biteMp3]);
  this.load.audio('music', [musicMp3]);
  this.load.audio('moan', [moanMp3]);
}

function create() {
  this.add.image(500, 200, 'bg');
  base = new Base(this);
  Damageable({ entity: base, maxHealth: 100 });
  HealthBar({
    entity: base,
    phaser: this,
    width: 70,
    offsetY: -130,
    offsetX: -20
  });
  entities.push(base);

  moan = this.sound.add('moan');
  const music = this.sound.add('music');
  music.play();

  biteSound = this.sound.add('bite');

  roundText = this.add.text(25, 25, '', {
    font: '32px Arial Black',
    fill: '#333'
  });

  gameOverText = this.add.text(400, 200, 'GAME OVER', {
    font: '60px Arial Black',
    fill: '#FFF'
  });
  gameOverText.alpha = 0;

  startRound.call(this);
}

function update(delta) {
  entities.forEach(entity => {
    if (entity.shouldDestroy) {
      if (entity.type === 'zombie') {
        zombiesRemaining--;
      }
      entities.splice(entities.indexOf(entity), 1);
    } else {
      entity.update(delta);
    }
  });

  if (isRoundOver()) {
    startRound.call(this);
  }

  if (isGameOver()) {
    gameOverText.alpha = 1;
  }
}

function isRoundOver() {
  return zombiesRemaining === 0;
}

function isGameOver() {
  return (
    entities.filter(e => e.type === 'base').length === 0
  );
}
