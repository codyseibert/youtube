import Tank from "./tank";
import Bullet from "./bullet";
import physicsHandler from "./physicsHandler";
import cameraManager from "./cameraManager";

const entityTypes = {
  tank: Tank,
  bullet: Bullet
};

const updateEntities = ({ progress, state }) => {
  for (const entity of state.entities) {
    entityTypes[entity.type].update({ entity, progress, state });
    physicsHandler({ entity, progress, state });
  }
};

const drawEntities = ({ draw, state }) => {
  for (const entity of state.entities) {
    entityTypes[entity.type].draw({ draw, entity, state });
  }
};

const getEntityById = ({ state, id }) => {
  return state.entities.find(entity => entity.id === id);
};

export default ({ state }) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  state.screen.width = ctx.canvas.width;
  state.screen.height = ctx.canvas.height;

  const draw = {
    image: ({ image, x, y, rotation = 0 }) => {
      ctx.save();
      ctx.translate(x - state.camera.x, y - state.camera.y);
      ctx.rotate(rotation);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();
    },
    square: ({ x, y, size, color = "#FF0000" }) => {
      ctx.fillStyle = color;
      ctx.fillRect(x - state.camera.x, y - state.camera.y, size, size);
    }
  };

  const tank = getEntityById({ state, id: "tank" });

  function loop(timestamp) {
    const progress = timestamp - lastRender;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    draw.image({
      image: state.images.grass,
      x: 0,
      y: 0
    });

    cameraManager({ progress, state, target: tank });
    updateEntities({ progress, state });
    drawEntities({ draw, state });

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
  let lastRender = 0;
  window.requestAnimationFrame(loop);
};
