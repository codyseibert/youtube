import { Entity } from './Entity';

import alienImage from './images/alien.png';

export class Alien extends Entity {
  constructor({ x, y }) {
    super({ tag: 'img' });
    this.direction = 'left';
    this.SPEED = 0.5;
    this.el.src = alienImage;
    this.el.className = 'alien';
    this.position.x = x;
    this.position.y = y;
    this.direction = 'left';
  }

  moveLeft() {
    this.direction = 'left';
  }

  moveRight() {
    this.direction = 'right';
  }

  moveDown() {
    this.position.y += 10;
  }

  update({ addToScore, getOverlappingBullet }) {
    if (this.direction === 'left') {
      this.position.x -= this.SPEED;
    } else {
      this.position.x += this.SPEED;
    }

    const bullet = getOverlappingBullet(this);
    if (bullet && !bullet.isAlien) {
      this.markForRemoval();
      bullet.markForRemoval();
      addToScore(20);
    }
  }
}
