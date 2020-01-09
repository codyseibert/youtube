import tankImageSrc from './assets/tank.png';

const tankImage = new Image();
// let imageLoaded = false;
tankImage.onload = () => {
  // imageLoaded = true;
}
tankImage.src = tankImageSrc

export default {
  update: ({ progress, state }) => {
    state.tank.rotation = Math.atan2(
      state.mouse.x - state.tank.x,
      -(state.mouse.y - state.tank.y),
    );
  },
  draw: ({ ctx, state }) => {
    ctx.save();
    ctx.translate(
      state.tank.x,
      state.tank.y,
    );
    ctx.rotate(state.tank.rotation);

    ctx.drawImage(
      tankImage,
      -tankImage.width / 2,
      -tankImage.height / 2,
    )

    ctx.restore();
  }
}