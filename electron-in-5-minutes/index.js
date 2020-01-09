const screenshot = require('desktop-screenshot');

let id = 0;
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById(
    'take-screenshot'
  ).onclick = () => {
    screenshot(`~/Desktop/${id++}-screenshot.png`);
  };
});
