import state from './state';
import startGameLoop from './loop';
import loadImages from './images';
import setupInputListeners from './input';

loadImages({
  state,
  ready: () => {
    setupInputListeners({ state });
    startGameLoop({ state });
  }
});