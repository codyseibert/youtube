const codeMap = {
  'w': 'forward',
  's': 'back',
  'd': 'right',
  'a': 'left',
  ' ': 'fire',
}

export default ({ state }) => {
  window.addEventListener('keydown', (event) => {
    state.input[codeMap[event.key]] = true;
  });

  window.addEventListener('keyup', (event) => {
    state.input[codeMap[event.key]] = false;
  });

  window.addEventListener('mousemove', (event) => {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
  });
}