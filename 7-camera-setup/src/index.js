import state from './state';
import startGameLoop from './loop';
import loadImages from './images';
import setupInputListeners from './input';

window.state = state;
window.tank = state.tank;

loadImages({
  state,
  ready: () => {
    setupInputListeners({ state });
    startGameLoop({ state });
  }
});