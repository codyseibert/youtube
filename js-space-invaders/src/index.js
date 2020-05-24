import { Ship } from './Ship';
import { Bullet } from './Bullet';
import { Alien } from './Alien';
import { Score } from './Score';
import { Lives } from './Lives';

const ALIEN_ROWS = 5;
const ALIEN_COLS = 9;

const scoreGui = new Score();
const livesGui = new Lives();

const keys = {
  a: false,
  d: false,
  [' ']: false,
};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

const bullets = [];

const removeAlien = (alien) => {
  aliens.splice(aliens.indexOf(alien), 1);
  alien.remove();

  for (let row = 0; row < aliensGrid.length; row++) {
    for (let col = 0; col < aliensGrid.length; col++) {
      if (aliensGrid[row][col] === alien) {
        aliensGrid[row][col] = null;
      }
    }
  }
};

const removeBullet = (bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  bullet.remove();
};

const isOverlapping = (entity1, entity2) => {
  const rect1 = entity1.el.getBoundingClientRect();
  const rect2 = entity2.el.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

const getOverlappingBullet = (entity) => {
  for (let bullet of bullets) {
    if (isOverlapping(entity, bullet)) {
      return bullet;
    }
  }
  return null;
};

const ship = new Ship({
  removeLife: () => livesGui.removeLife(),
  removeBullet,
  getOverlappingBullet,
});

const aliens = [];
const aliensGrid = [];

for (let row = 0; row < ALIEN_ROWS; row++) {
  const aliensCol = [];
  for (let col = 0; col < ALIEN_COLS; col++) {
    const alien = new Alien({
      x: col * 60 + 120,
      y: row * 60 + 50,
      getOverlappingBullet,
      removeAlien,
      removeBullet,
      addToScore: (amount) => scoreGui.addToScore(amount),
    });
    aliens.push(alien);
    aliensCol.push(alien);
  }
  aliensGrid.push(aliensCol);
}

const getBottomAliens = () => {
  const bottomAliens = [];
  for (let col = 0; col < ALIEN_COLS; col++) {
    for (let row = ALIEN_ROWS - 1; row >= 0; row--) {
      if (aliensGrid[row][col]) {
        bottomAliens.push(aliensGrid[row][col]);
        break;
      }
    }
  }
  return bottomAliens;
};

const getRandomAlien = (aliensList) => {
  return aliensList[
    parseInt(Math.random() * aliensList.length)
  ];
};

const aliensFireBullet = () => {
  const bottomAliens = getBottomAliens();
  const randomAlien = getRandomAlien(bottomAliens);
  createBullet({
    x: randomAlien.x + 15,
    y: randomAlien.y + 33,
    isAlien: true,
  });
};

setInterval(aliensFireBullet, 3000);

const getLeftMostAlien = () => {
  return aliens.reduce((minimumAlien, currentAlien) => {
    return currentAlien.x < minimumAlien.x
      ? currentAlien
      : minimumAlien;
  });
};

const getRightMostAlien = () => {
  return aliens.reduce((maximumAlien, currentAlien) => {
    return currentAlien.x > maximumAlien.x
      ? currentAlien
      : maximumAlien;
  });
};

const createBullet = ({ x, y, isAlien = false }) => {
  bullets.push(
    new Bullet({
      x,
      y,
      isAlien,
    })
  );
};

const update = () => {
  if (
    keys['d'] &&
    ship.x < window.innerWidth - ship.SHIP_IMAGE_WIDTH
  ) {
    ship.moveRight();
  } else if (keys['a'] && ship.x > 0) {
    ship.moveLeft();
  }

  if (keys[' ']) {
    // create a bullet
    ship.fire({
      createBullet,
    });
  }

  ship.update();

  bullets.forEach((bullet) => {
    bullet.update();

    if (bullet.y < 0) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  });

  aliens.forEach((alien) => {
    alien.update();
  });

  const leftMostAlien = getLeftMostAlien();
  if (leftMostAlien.x < 30) {
    aliens.forEach((alien) => {
      alien.setDirectionRight();
      alien.moveDown();
    });
  }

  const rightMostAlien = getRightMostAlien();
  if (rightMostAlien.x > window.innerWidth - 60) {
    aliens.forEach((alien) => {
      alien.setDirectionLeft();
      alien.moveDown();
    });
  }
};

setInterval(update, 20);
