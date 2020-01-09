const drawGun = ({ ctx, state }) => {
  ctx.save();
  ctx.translate(
    state.tank.x,
    state.tank.y,
  );
  ctx.rotate(state.tank.gunRotation);
  ctx.drawImage(
    state.images.gun,
    -state.images.gun.width / 2,
    -state.images.gun.height / 2,
  )
  ctx.restore();
}

const drawBody = ({ ctx, state }) => {
  ctx.save();
  ctx.translate(
    state.tank.x,
    state.tank.y,
  );
  ctx.rotate(state.tank.bodyRotation);
  ctx.drawImage(
    state.images.tank,
    -state.images.tank.width / 2,
    -state.images.tank.height / 2,
  )
  ctx.restore();
}

const moveTankTowardsBodyRotation = ({ state }) => {
  let speed = 0;
  const { tank } = state;

  if (state.input.forward) {
    speed = +tank.speed;
  } else if (state.input.back) {
    speed = -tank.speed;
  }

  if (speed !== 0) {
    tank.x += Math.cos(tank.bodyRotation) * speed;
    tank.y += Math.sin(tank.bodyRotation) * speed;
  }
}

const determineGunRotation = ({ state }) => {
  const tank = state.tank;
  tank.gunRotation = Math.atan2(
    state.mouse.y - tank.y,
    state.mouse.x - tank.x,
  );
}

const determineBodyRotation = ({ state }) => {
  const tank = state.tank;

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

export default {
  update: ({ progress, state }) => {
    determineGunRotation({ state })
    determineBodyRotation({ state });
    moveTankTowardsBodyRotation({ state })
  },
  draw: ({ ctx, state }) => {
    drawBody({ ctx, state });
    drawGun({ ctx, state });
  }
}