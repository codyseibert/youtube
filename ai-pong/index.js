const robot = require('robotjs');
const fs = require('fs');
let Jimp = require('jimp');
const cv = require('opencv4nodejs');

(async () => {
  // setTimeout(() => {
  const width = 1280 * 2;
  const height = 720 * 2;

  console.time('capture image');
  const bitmap = robot.screen.capture(0, 0, width, height);
  console.timeEnd('capture image');

  const jimp = new Jimp(width, height);

  console.time('making image');
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index =
        y * bitmap.byteWidth + x * bitmap.bytesPerPixel;
      let r = bitmap.image[index];
      let g = bitmap.image[index + 1];
      let b = bitmap.image[index + 2];
      let num =
        r * 256 + g * 256 * 256 + b * 256 * 256 * 256 + 255;
      jimp.setPixelColor(num, x, y);
    }
  }
  console.timeEnd('making image');

  console.time('writing image');
  jimp.getBuffer(Jimp.MIME_PNG, (err, result) => {
    fs.writeFileSync('./out.png', result);
    console.timeEnd('writing image');
  });

  // const screenMat = await cv.imreadAsync(`./out.png`);
  const screenMat = await cv.imreadAsync(`./board.png`);
  const templateMat = await cv.imreadAsync(
    `./smallPellet.png`
  );
  // const templateMat = await cv.imreadAsync(
  //   `./largePellet.png`
  // );
  // const templateMat = await cv.imreadAsync(
  //   `./orangeGhost.png`
  // );
  // const templateMat = await cv.imreadAsync(`./pacman.png`);

  // Match template (the brightest locations indicate the highest match)
  let matchedMat = screenMat.matchTemplate(
    templateMat,
    cv.TM_CCOEFF_NORMED
  );

  let maxValue;
  let value;
  while (true) {
    const minMax = matchedMat.minMaxLoc();
    const {
      maxLoc: { x, y }
    } = minMax;
    value = minMax.maxVal;
    if (maxValue === undefined) {
      maxValue = value;
    }

    if (value < maxValue * 0.9) {
      break;
    }

    for (let i = 0; i < templateMat.rows; i++) {
      for (let j = 0; j < templateMat.cols; j++) {
        const tx = x + j - templateMat.cols / 2;
        const ty = y + i - templateMat.rows / 2;
        if (ty >= matchedMat.rows || ty < 0) continue;
        if (tx >= matchedMat.cols || tx < 0) continue;
        matchedMat.set(ty, tx, 0);
      }
    }

    // Draw bounding rectangle
    screenMat.drawRectangle(
      new cv.Rect(x, y, templateMat.cols, templateMat.rows),
      new cv.Vec(0, 255, 0),
      2,
      cv.LINE_8
    );
  }

  cv.imshow('we found your templates!', screenMat);
  cv.waitKey();
})();
