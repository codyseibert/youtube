const rockets = [];
const particles = [];

class Particle {
  constructor(x, y) {
    const colors = [
      'red',
      'blue',
      'orange',
      'green',
      'pink',
      'cyan'
    ];

    this.x = x;
    this.y = y;
    this.SPEED = Math.random() * 3 + 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.lifeSpan = 300;
    this.vx = Math.cos(this.angle) * this.SPEED;
    this.vy = -Math.sin(this.angle) * this.SPEED;
    this.color =
      colors[parseInt(Math.random() * colors.length)];
    this.el = document.createElement('div');
    this.el.className = 'particle';
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
    this.el.style.backgroundColor = this.color;
    document.body.appendChild(this.el);

    setTimeout(() => {
      this.el.remove();
      particles.splice(particles.indexOf(this), 1);
    }, this.lifeSpan);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
  }
}

class Rocket {
  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight;
    this.numberOfParticlesToSpawn = 100;
    this.SPEED = 13;
    this.angle =
      (Math.random() * Math.PI) / 2 + Math.PI / 4;
    this.vx = Math.cos(this.angle) * this.SPEED;
    this.vy = -Math.sin(this.angle) * this.SPEED;
    this.el = document.createElement('div');
    this.el.className = 'rocket';
    this.lifeSpan = 600;
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
    document.body.appendChild(this.el);

    setTimeout(() => {
      this.explode();
      this.el.remove();
      rockets.splice(rockets.indexOf(this), 1);
    }, this.lifeSpan);
  }

  explode() {
    for (
      let i = 0;
      i < this.numberOfParticlesToSpawn;
      i++
    ) {
      const particle = new Particle(this.x, this.y);
      particles.push(particle);
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2;
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
  }
}

setInterval(() => {
  const rocket = new Rocket();
  rockets.push(rocket);
}, 150);

setInterval(() => {
  rockets.forEach(rocket => {
    rocket.update();
  });
  particles.forEach(particle => {
    particle.update();
  });
}, 10);
