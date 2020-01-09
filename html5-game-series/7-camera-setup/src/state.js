export default {
  camera: {
    x: 0,
    y: 0,
  },
  entities: [
    {
      id: 'tank',
      type: 'tank',
      x: 100,
      y: 100,
      vx: 0,
      vy: 0,
      fireDelay: 1000,
      untilNextFire: 0,
      speed: 3.0,
      gunRotation: 0,
      bodyRotation: 0,
      bodyRotationSpeed: 0.02
    },
  ],
  images: {},
  screen: {
    width: 0,
    height: 0,
  },
  mouse: {
    x: 0,
    y: 0,
  },
  input: {
    up: false,
    down: false,
    left: false,
    right: false
  }
};