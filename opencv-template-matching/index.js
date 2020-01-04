// 1. load in opencv4nodejs
const cv = require('opencv4nodejs');

(async () => {
  // 2. load template and board image
  const boardImage = await cv.imreadAsync('./board.png');
  const templateImage = await cv.imreadAsync(
    './largePellet.png'
  );

  // 3. run template matching
  const matched = boardImage.matchTemplate(
    templateImage,
    cv.TM_CCOEFF_NORMED
  );

  let maxVal = null;
  while (true) {
    // 4. keep getting minMax while value still near max
    const minMax = matched.minMaxLoc();
    const x = minMax.maxLoc.x;
    const y = minMax.maxLoc.y;

    if (maxVal === null) {
      maxVal = minMax.maxVal;
    }
    const value = minMax.maxVal;

    if (value < maxVal * 0.9) {
      break;
    }

    // 5. empty matched mat roi where template was found
    for (let i = 0; i < templateImage.rows; i++) {
      for (let j = 0; j < templateImage.cols; j++) {
        const tx = x + j - templateImage.cols / 2;
        const ty = y + i - templateImage.rows / 2;
        if (ty >= matched.rows || ty < 0) continue;
        if (tx >= matched.cols || tx < 0) continue;
        matched.set(ty, tx, 0);
      }
    }

    // 6. draw a rectangle where match was found on original image
    boardImage.drawRectangle(
      new cv.Rect(
        x,
        y,
        templateImage.cols,
        templateImage.rows
      ),
      new cv.Vec(0, 255, 0),
      2,
      cv.LINE_8
    );
  }

  // 7. show the image
  cv.imshow('boardImage', boardImage);
  cv.waitKey();
})();
