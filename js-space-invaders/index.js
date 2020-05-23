import { Hud } from './Hud';
import { Ship } from './Ship';
import { Bullet } from './Bullet';
import {
  updateAliens,
  getRandomLowestAliens,
} from './Aliens';

const keys = {
  a: false,
  d: false,
  space: false,
};

document.addEventListener('keydown', ({ key, keyCode }) => {
  if (keyCode === 32) {
    key = 'space';
  }
  keys[key] = true;
});

document.addEventListener('keyup', ({ key, keyCode }) => {
  if (keyCode === 32) {
    key = 'space';
  }
  keys[key] = false;
});

const bullets = [];
const hud = new Hud();

const isOverlapping = (a, b) => {
  const rect1 = a.el.getBoundingClientRect();
  const rect2 = b.el.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

const getOverlappingBullet = (entity) => {
  for (const bullet of bullets) {
    if (isOverlapping(entity, bullet)) {
      return bullet;
    }
  }
  return null;
};

const createBullet = (entity, isAlien = false) => {
  bullets.push(
    new Bullet({
      x: entity.position.x + 25,
      y: entity.position.y,
      isAlien,
    })
  );
};

setInterval(() => {
  const alien = getRandomLowestAliens();
  createBullet(alien, true);
}, 2000);

const setLives = (lives) => hud.setLives(lives);

const ship = new Ship({
  createBullet,
  setLives,
  getOverlappingBullet,
});

const update = () => {
  if (keys['d']) {
    ship.moveRight();
  } else if (keys['a']) {
    ship.moveLeft();
  }

  if (keys['space']) {
    ship.fire();
  }

  ship.update();

  bullets.forEach((bullet) => bullet.update());

  bullets.forEach((bullet) => {
    if (bullet.shouldRemove) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  });

  updateAliens({
    getOverlappingBullet,
    addToScore: (amount) => hud.addToScore(amount),
  });
};

setInterval(() => {
  update();
}, 20);
