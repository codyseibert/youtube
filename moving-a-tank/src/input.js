const codeMap = {
  'w': 'up',
  's': 'down',
  'd': 'right',
  'a': 'left',
}

export default ({ state }) => {
  window.addEventListener('keydown', (event) => {
    state.input[codeMap[event.key]] = true;
  });

  window.addEventListener('keyup', (event) => {
    state.input[codeMap[event.key]] = false;
  });
}