const { SVGPathData } = require("svg-pathdata");
const cheerio = require("cheerio");
const quadratic = require("adaptive-quadratic-curve");
const robot = require("robotjs");
const fs = require("fs");
const potrace = require("potrace");

const offsetX = 600;
const offsetY = 150;

robot.setMouseDelay(2);

const trace = () => {
  potrace.posterize("./terran.jpg", { steps: 1 }, async (err, svg) => {
    if (err) throw err;

    // fs.writeFileSync("./output.svg", svg);
    const $ = cheerio.load(svg);

    $("path").each((i, elm) => {
      const d = elm.attribs.d;
      const pathData = new SVGPathData(d);
      let current = pathData.commands[0];
      robot.moveMouse(current.x + offsetX, current.y + offsetY);
      robot.mouseToggle("down");

      for (let command of pathData.commands) {
        if (command.type === SVGPathData.MOVE_TO) {
          robot.mouseToggle("up");
          robot.moveMouse(command.x + offsetX, command.y + offsetY);
          robot.mouseToggle("down");
        } else if (command.type === SVGPathData.CURVE_TO) {
          robot.moveMouse(command.x1 + offsetX, command.y1 + offsetY);
          const points = quadratic(
            [command.x1, command.y1],
            [command.x, command.y],
            [command.x2, command.y2],
            1
          );
          for (let [x, y] of points) {
            robot.dragMouse(x + offsetX, y + offsetY);
          }
        } else if (command.type === SVGPathData.LINE_TO) {
          robot.dragMouse(command.x + offsetX, command.y + offsetY);
        }
      }
      robot.mouseToggle("up");
    });
  });
};

const run = () => {
  trace();
};

setTimeout(run, 2000);
