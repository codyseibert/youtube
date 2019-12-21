import state from './state';
import setupEventListeners from './listeners';
import startGameLoop from './loop';
import loadImages from './images';

setupEventListeners({ state });

loadImages({
  state,
  ready: () => startGameLoop({ state })
});