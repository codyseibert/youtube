import Bullet from './bullet';

const drawGun = ({ tank, draw, state }) => {
  draw.image({
    image: state.images.gun,
    x: tank.x,
    y: tank.y,
    rotation: tank.gunRotation,
  })
}

const drawBody = ({ tank, draw, state }) => {
  draw.image({
    image: state.images.tank,
    x: tank.x,
    y: tank.y,
    rotation: tank.bodyRotation,
  })
}

const moveTankTowardsBodyRotation = ({ tank, state }) => {
  let speed = 0;

  if (state.input.forward) {
    speed = +tank.speed;
  } else if (state.input.back) {
    speed = -tank.speed;
  }
  if (speed !== 0) {
    tank.vx = Math.cos(tank.bodyRotation) * speed;
    tank.vy = Math.sin(tank.bodyRotation) * speed;
  } else {
    tank.vx = 0;
    tank.vy = 0;
  }
}

const determineGunRotation = ({ tank, state }) => {
  tank.gunRotation = Math.atan2(
    state.mouse.y - state.screen.height / 2,
    state.mouse.x - state.screen.width / 2,
  );
}

const determineBodyRotation = ({ tank, state }) => {
  if (state.input.left) {
    if (state.input.back) {
      tank.bodyRotation += tank.bodyRotationSpeed;
    } else {
      tank.bodyRotation -= tank.bodyRotationSpeed;
    }

  } else if (state.input.right) {
    if (state.input.back) {
      tank.bodyRotation -= tank.bodyRotationSpeed;
    } else {
      tank.bodyRotation += tank.bodyRotationSpeed;
    }
  }
}

const fireBullets = ({ tank, state }) => {
  if (state.input.fire && tank.untilNextFire <= 0) {
    tank.untilNextFire = tank.fireDelay;
    state.entities.push(Bullet.create({
      position: {
        x: tank.x,
        y: tank.y,
      },
      angle: tank.gunRotation,
    }))
  }
};

export default {
  update: ({ progress, entity: tank, state }) => {
    tank.untilNextFire -= progress;
    determineGunRotation({ tank, state })
    determineBodyRotation({ tank, state });
    moveTankTowardsBodyRotation({ tank, state })
    fireBullets({ tank, state });
  },
  draw: ({ draw, entity: tank, state }) => {
    drawBody({ draw, tank, state });
    drawGun({ draw, tank, state });
  }
}