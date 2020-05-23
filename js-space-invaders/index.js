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

const getOverlappingBullet = (entity) => {
  for (const bullet of bullets) {
    if (Util.isOverlapping(entity, bullet)) {
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

const setLives = (lives) => hud.setLives(lives);

const ship = new Ship({
  createBullet,
  setLives,
});

const aliens = [];
const aliensGrid = [];
const ROWS = 5;
const COLS = 11;
const ALIEN_OFFSET_X = 100;
const ALIEN_OFFSET_Y = 40;

for (let row = 0; row < ROWS; row++) {
  const alienCol = [];
  for (let col = 0; col < COLS; col++) {
    const alien = new Alien({
      x: col * 60 + ALIEN_OFFSET_X,
      y: row * 60 + ALIEN_OFFSET_Y,
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

const getRandomLowestAliens = () => {
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

const update = () => {
  ship.update({
    delta: 20,
    setLives,
  });

  if (keys['d']) {
    ship.moveRight();
  } else if (keys['a']) {
    ship.moveLeft();
  }

  if (keys['space']) {
    ship.fire();
  }

  bullets.forEach((bullet) => bullet.update());

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
      addToScore: (amount) => hud.addToScore(amount),
    })
  );

  bullets.forEach((bullet) => {
    if (bullet.shouldRemove) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  });

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

setInterval(() => {
  const alien = getRandomLowestAliens();
  createBullet(alien, true);
}, 2000);

setInterval(() => {
  update();
}, 20);
