import { Entity } from './Entity';

export class Bullet extends Entity {
  constructor({ x, y, isAlien }) {
    super();
    this.position.x = x;
    this.position.y = y;
    this.isAlien = isAlien;
    this.SPEED = 4;
    this.el.className = 'bullet';
  }

  update() {
    this.position.y += this.isAlien
      ? this.SPEED
      : -this.SPEED;

    if (this.position.y < -20) {
      this.markForRemoval();
    }
  }
}
