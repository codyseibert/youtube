export default ({ state, target, progress }) => {
  state.camera.x = target.x - state.screen.width / 2;
  state.camera.y = target.y - state.screen.height / 2;
}