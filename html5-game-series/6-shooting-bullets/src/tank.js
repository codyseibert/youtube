import Bullet from './bullet';

const drawGun = ({ tank, ctx, state }) => {
  ctx.save();
  ctx.translate(
    tank.x,
    tank.y,
  );
  ctx.rotate(tank.gunRotation);
  ctx.drawImage(
    state.images.gun,
    -state.images.gun.width / 2,
    -state.images.gun.height / 2,
  )
  ctx.restore();
}

const drawBody = ({ tank, ctx, state }) => {
  ctx.save();
  ctx.translate(
    tank.x,
    tank.y,
  );
  ctx.rotate(tank.bodyRotation);
  ctx.drawImage(
    state.images.tank,
    -state.images.tank.width / 2,
    -state.images.tank.height / 2,
  )
  ctx.restore();
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
    state.mouse.y - tank.y,
    state.mouse.x - tank.x,
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
  draw: ({ ctx, entity: tank, state }) => {
    drawBody({ ctx, tank, state });
    drawGun({ ctx, tank, state });
  }
}