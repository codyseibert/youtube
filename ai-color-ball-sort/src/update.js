const SPAWN_DELAY = 50;
const MAX_SPAWNS = 100;
let untilNextSpawn = 0;

const isColliding = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

function updatePlayer({ player, state }) {
  for (let block of state.blocks) {
    if (!block.sorted && isColliding(player, block)) {
      block.sorted = true;
      let input = null;
      if (block.color === 'red') {
        input = 1;
      } else if (block.color === 'blue') {
        input = 0.5;
      } else {
        input = 0;
      }

      const sortDirection = player.brain.activate([input]);
      if (
        (sortDirection >= 0.66 && block.color === 'red') ||
        (sortDirection > 0.33 &&
          sortDirection < 0.66 &&
          block.color === 'blue') ||
        (sortDirection > 0 &&
          sortDirection <= 0.33 &&
          block.color === 'green')
      ) {
        player.brain.score++;
      }

      if (sortDirection >= 0.66) {
        block.vx = 1;
      } else if (
        sortDirection >= 0.33 &&
        sortDirection < 0.66
      ) {
        block.vx = 0;
      } else {
        block.vx = -1;
      }

      setTimeout(() => {
        if (state.blocks.indexOf(block) > -1) {
          state.blocks.splice(
            state.blocks.indexOf(block),
            1
          );
        }
      }, 700);
      return;
    }
  }
}

function updateBlock({ block }) {
  block.y += block.vy;
  block.x += block.vx;
}

export default ({ progress, state }) => {
  untilNextSpawn -= progress;
  if (untilNextSpawn <= 0 && state.spawns < MAX_SPAWNS) {
    state.spawns++;
    untilNextSpawn = SPAWN_DELAY;
    for (const player of state.players) {
      state.blocks.push({
        x: player.x + player.width / 2,
        y: player.y - 50,
        width: 2,
        height: 2,
        vx: 0,
        vy: 1,
        color: ['red', 'blue', 'green'][
          parseInt(Math.random() * 3)
        ]
      });
    }
  }

  for (const player of state.players) {
    updatePlayer({ player, state });
  }

  for (const block of state.blocks) {
    updateBlock({ block });
  }

  return state.spawns < MAX_SPAWNS;
};
