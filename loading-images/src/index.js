import state from './state';
import startGameLoop from './loop';
import loadImages from './images';

loadImages({
  state,
  ready: () => startGameLoop({ state })
});