const Phaser = require('phaser');

class Human {
  constructor({ game, humanGroup, staticGroup }) {
    this.game = game;
    this.speed = 30;
    this.angle = Math.random() * 2 * Math.PI;

    this.sprite = game.physics.add.sprite(
      Math.random() * 700 + 50,
      Math.random() * 500 + 50,
      'human'
    );
    game.physics.world.enable(this.sprite);

    game.physics.add.collider(this.sprite, staticGroup);

    this.sprite.setCollideWorldBounds(true);

    this.sprite.getParent = () => this;

    humanGroup.add(this.sprite);

    game.physics.add.overlap(
      this.sprite,
      humanGroup,
      this.handleOverlapHumans,
      null,
      this
    );

    setInterval(() => {
      this.angle = Math.random() * 2 * Math.PI;

      this.sprite.setVelocity(
        Math.cos(this.angle) * this.speed,
        Math.sin(this.angle) * this.speed
      );
    }, 5000);

    this.sprite.setVelocity(
      Math.cos(this.angle) * this.speed,
      Math.sin(this.angle) * this.speed
    );
  }

  handleOverlapHumans(a, b) {
    if (b.getParent().infected) {
      this.infect();
    }
  }

  infect() {
    this.infected = true;
    this.sprite.setTint(0x00ff00);
  }

  update(delta) {
    // debugger;
    // const nx =
    //   this.sprite.x + Math.cos(this.angle) * this.speed;
    // if (nx >= 0 && nx <= 800) {
    //   this.sprite.x = nx;
    // }
    // const ny =
    //   this.sprite.y + Math.sin(this.angle) * this.speed;
    // if (ny >= 0 && ny <= 600) {
    //   this.sprite.y = ny;
    // }
  }
}

module.exports = Human;
