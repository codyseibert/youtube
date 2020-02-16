const Phaser = require('phaser');
const humanImage = require('../assets/human.png');
const wallImage = require('../assets/wall.png');
const wallUpImage = require('../assets/wall_up.png');
const grassImage = require('../assets/grass.png');

const Human = require('./Human');

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

new Phaser.Game(config);

const humans = [];

function preload() {
  this.load.image('human', humanImage);
  this.load.image('wall', wallImage);
  this.load.image('wallUp', wallUpImage);
  this.load.image('grass', grassImage);
}

function create() {
  this.add.image(400, 300, 'grass');

  const staticGroup = this.physics.add.staticGroup();
  staticGroup.create(100, 100, 'wall');
  staticGroup.create(300, 300, 'wallUp');
  staticGroup.create(500, 500, 'wallUp');
  staticGroup.create(600, 200, 'wall');
  staticGroup.create(100, 400, 'wall');

  const humanGroup = this.physics.add.group();

  for (let i = 0; i < 1000; i++) {
    humans.push(
      new Human({ game: this, humanGroup, staticGroup })
    );
  }
  humans[0].infect();
}

function update(delta) {
  humans.forEach(human => human.update(delta));
}
