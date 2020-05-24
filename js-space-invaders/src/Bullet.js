import { Entity } from './Entity';

export class Bullet extends Entity {
  constructor({ x, y, isAlien }) {
    super({ className: 'bullet' });
    this.SPEED = 3;
    this.isAlien = isAlien;

    this.setX(x);
    this.setY(y);
  }

  update() {
    const dy = this.isAlien ? this.SPEED : -this.SPEED;
    this.setY(this.y + dy);
  }
}
