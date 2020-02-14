const Phaser = require('phaser');

class Zombie {
  constructor(phaser, base, biteSound) {
    this.canAttack = true;
    this.base = base;
    this.type = 'zombie';
    this.biteSound = biteSound;
    this.attack = 1;

    const zombie = phaser.physics.add.image(
      -100,
      300 + Math.random() * 40,
      'zombie'
    );
    this.phaser = phaser;

    zombie.setInteractive();

    zombie.on('pointerdown', () => {
      zombie.setTint(0xff0000);
      this.damage(1);
    });

    zombie.on('pointerover', function() {
      this.setTint(0xffff00);
      document.body.style.cursor = 'pointer';
    });

    zombie.on('pointerout', function() {
      this.clearTint();
      document.body.style.cursor = 'default';
    });

    phaser.physics.add.overlap(
      zombie,
      base.base,
      this.touchingBase,
      null,
      this
    );

    this.image = zombie;

    this.speed = 0.7;
  }

  getFlashableImage() {
    return this.image;
  }

  touchingBase() {
    if (this.canAttack) {
      this.biteSound.play();
      this.base.damage(this.attack);
      this.canAttack = false;
      setTimeout(() => {
        this.canAttack = true;
      }, 1000);
    }
  }

  walk() {
    this.image.x += this.speed;
  }

  destroy() {
    this.image.destroy();
  }

  getX() {
    return this.image.x;
  }

  getY() {
    return this.image.y;
  }

  update(delta) {
    if (this.image.x < 890) {
      this.walk();
    }
  }
}

module.exports = Zombie;
