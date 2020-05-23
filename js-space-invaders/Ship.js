class Ship extends Entity {
  constructor({ createBullet, setLives }) {
    super({ tag: 'img' });
    this.nextFireIn = 0;
    this.SPEED = 2;
    this.el.src = 'images/ship.png';
    this.el.className = 'ship';
    this.createBullet = createBullet;
    this.position.x = window.innerWidth / 2;
    this.position.y = window.innerHeight - 80;
    this.lives = 3;
    this.isDead = false;
    setLives(this.lives);
  }

  fire() {
    if (this.canFire()) {
      this.createBullet(this);
      this.nextFireIn = 1000;
    }
  }

  canFire() {
    return this.nextFireIn <= 0;
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

  update({ delta, setLives }) {
    if (this.isDead) return;

    this.nextFireIn -= delta;

    const bullet = getOverlappingBullet(this);
    if (bullet && bullet.isAlien) {
      this.kill();
      bullet.markForRemoval();
      setLives(this.lives);

      setTimeout(() => {
        this.revive();
      }, 3000);
    }
  }
}
