import 'regenerator-runtime/runtime';
import neataptic from 'neataptic';

import game from './game';
import loadImages from './images';

const Methods = neataptic.methods;

const state = {
  images: {},
  spawns: 0
};

const POP_SIZE = 16;
const neat = new neataptic.Neat(1, 1, null, {
  mutation: [
    Methods.mutation.ADD_NODE,
    Methods.mutation.SUB_NODE,
    Methods.mutation.ADD_CONN,
    Methods.mutation.SUB_CONN,
    Methods.mutation.MOD_WEIGHT,
    Methods.mutation.MOD_BIAS,
    Methods.mutation.MOD_ACTIVATION,
    Methods.mutation.ADD_GATE,
    Methods.mutation.SUB_GATE,
    Methods.mutation.ADD_SELF_CONN,
    Methods.mutation.SUB_SELF_CONN,
    Methods.mutation.ADD_BACK_CONN,
    Methods.mutation.SUB_BACK_CONN
  ],
  popsize: POP_SIZE,
  mutationRate: 0.15,
  elitism: Math.round(0.15 * POP_SIZE)
});

neat.mutate();

const startGameLoop = () => {
  (async () => {
    let bestPlayer = null;
    while (true) {
      try {
        bestPlayer = await game({
          neat,
          state
        });
        break;
      } catch (err) {
        console.log('no one won, trying again', err);

        neat.sort();

        const newPopulation = [];

        for (let i = 0; i < neat.elitism; i++) {
          newPopulation.push(neat.population[i]);
        }

        for (
          let i = 0;
          i < neat.popsize - neat.elitism;
          i++
        ) {
          newPopulation.push(neat.getOffspring());
        }

        neat.population = newPopulation;
        neat.mutate();

        neat.generation++;
      }
    }
    console.log('bestPlayer', bestPlayer);
  })();
};

loadImages({
  state,
  ready: () => startGameLoop({ state })
});
