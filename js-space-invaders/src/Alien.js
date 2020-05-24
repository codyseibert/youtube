import alienImage from '../images/alien.png';

import { Entity } from './Entity';

const LEFT = 'left';
const RIGHT = 'right';

const POINTS_PER_KILL = 20;

export class Alien extends Entity {
  constructor({
    x,
    y,
    getOverlappingBullet,
    removeAlien,
    removeBullet,
    addToScore,
  }) {
    super({ tag: 'img' });
    this.el.src = alienImage;
    this.SPEED = 0.5;
    this.DOWN_DISTANCE = 10;
    this.direction = LEFT;

    this.getOverlappingBullet = getOverlappingBullet;
    this.removeAlien = removeAlien;
    this.removeBullet = removeBullet;
    (this.addToScore = addToScore), this.setX(x);
    this.setY(y);
  }

  setDirectionRight() {
    this.direction = RIGHT;
  }

  setDirectionLeft() {
    this.direction = LEFT;
  }

  moveDown() {
    this.setY(this.y + this.DOWN_DISTANCE);
  }

  update() {
    if (this.direction === LEFT) {
      this.setX(this.x - this.SPEED);
    } else {
      this.setX(this.x + this.SPEED);
    }

    const bullet = this.getOverlappingBullet(this);
    if (bullet && !bullet.isAlien) {
      this.removeAlien(this);
      this.removeBullet(bullet);
      this.addToScore(POINTS_PER_KILL);
    }
  }
}
