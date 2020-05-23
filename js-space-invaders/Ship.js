class Ship extends Entity {
  constructor({ createBullet }) {
    super({ tag: 'img' });
    this.nextFireIn = 0;
    this.SPEED = 2;
    this.el.src = 'images/ship.png';
    this.el.className = 'ship';
    this.createBullet = createBullet;
    this.position.x = window.innerWidth / 2;
    this.position.y = window.innerHeight - 50;
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

  update(delta) {
    this.nextFireIn -= delta;
  }
}
