import { Entity } from './Entity';

import shipImage from './images/ship.png';

export class Ship extends Entity {
  constructor({
    createBullet,
    setLives,
    getOverlappingBullet,
  }) {
    super({ tag: 'img' });
    this.SPEED = 2;
    this.el.src = shipImage;
    this.setLives = setLives;
    this.createBullet = createBullet;
    this.getOverlappingBullet = getOverlappingBullet;
    this.el.className = 'ship';
    this.position.x = window.innerWidth / 2;
    this.position.y = window.innerHeight - 80;
    this.lives = 3;
    this.canFire = true;
    this.isDead = false;
    setLives(this.lives);
  }

  fire() {
    if (this.canFire) {
      this.createBullet(this);
      this.canFire = false;
      setTimeout(() => {
        this.canFire = true;
      }, 1000);
    }
  }

  moveLeft() {
    this.position.x -= this.SPEED;
  }

  moveRight() {
    this.position.x += this.SPEED;
  }

  kill() {
    this.el.style.opacity = 0;
    this.lives--;
    this.isDead = true;
  }

  revive() {
    this.el.style.opacity = 1;
    this.isDead = false;
    this.position.x = window.innerWidth / 2;
    this.position.y = window.innerHeight - 80;
  }

  update() {
    if (this.isDead) return;

    const bullet = this.getOverlappingBullet(this);
    if (bullet && bullet.isAlien) {
      this.kill();
      bullet.markForRemoval();
      this.setLives(this.lives);

      setTimeout(() => {
        this.revive();
      }, 3000);
    }
  }
}
