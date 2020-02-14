const Phaser = require('phaser');

class Base {
  constructor(phaser) {
    this.type = 'base';
    const base = phaser.physics.add.image(945, 287, 'base');
    this.base = base;
  }

  getFlashableImage() {
    return this.base;
  }

  getX() {
    return this.base.x;
  }

  getY() {
    return this.base.y;
  }

  destroy() {
    this.base.destroy();
  }

  update(delta) {}
}

module.exports = Base;
