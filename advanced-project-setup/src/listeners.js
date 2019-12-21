export default ({ state }) => {
  window.addEventListener('mousemove', (event) => {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
  });
}