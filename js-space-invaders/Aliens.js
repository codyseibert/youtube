import { Alien } from './Alien';

const aliens = [];
const aliensGrid = [];
const ROWS = 5;
const COLS = 11;
const ALIEN_OFFSET_X = 100;
const ALIEN_OFFSET_Y = 40;
const ALIEN_PADDING = 60;

for (let row = 0; row < ROWS; row++) {
  const alienCol = [];
  for (let col = 0; col < COLS; col++) {
    const alien = new Alien({
      x: col * ALIEN_PADDING + ALIEN_OFFSET_X,
      y: row * ALIEN_PADDING + ALIEN_OFFSET_Y,
    });
    aliens.push(alien);
    alienCol.push(alien);
  }
  aliensGrid.push(alienCol);
}

const getLeftMostAlien = () => {
  return aliens.reduce(
    (best, cur) => {
      if (cur.position.x < best.position.x) return cur;
      return best;
    },
    { position: { x: 1e9 } }
  );
};

const getRightMostAlien = () => {
  return aliens.reduce(
    (best, cur) => {
      if (cur.position.x > best.position.x) return cur;
      return best;
    },
    { position: { x: -1e9 } }
  );
};

export const getRandomLowestAliens = () => {
  const lowest = [];
  for (let col = 0; col < COLS; col++) {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (aliensGrid[row][col]) {
        lowest.push(aliensGrid[row][col]);
        break;
      }
    }
  }
  return lowest[parseInt(Math.random() * lowest.length)];
};

export const updateAliens = ({
  getOverlappingBullet,
  addToScore,
  createBullet,
}) => {
  const leftMost = getLeftMostAlien();
  if (leftMost.position.x < 20) {
    aliens.forEach((alien) => {
      alien.moveRight();
      alien.moveDown();
    });
  }

  const rightMost = getRightMostAlien();
  if (rightMost.position.x + 33 > window.innerWidth - 20) {
    aliens.forEach((alien) => {
      alien.moveLeft();
      alien.moveDown();
    });
  }

  aliens.forEach((alien) =>
    alien.update({
      getOverlappingBullet,
      addToScore,
      createBullet,
    })
  );

  aliens.forEach((alien) => {
    if (alien.shouldRemove) {
      alien.remove();
      aliens.splice(aliens.indexOf(alien), 1);
    }
  });

  for (let row = 0; row < aliensGrid.length; row++) {
    for (let col = 0; col < aliensGrid[row].length; col++) {
      const alien = aliensGrid[row][col];
      if (alien && alien.shouldRemove) {
        aliensGrid[row][col] = null;
      }
    }
  }
};
