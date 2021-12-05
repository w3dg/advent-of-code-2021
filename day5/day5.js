import { readFileSync } from "fs";

import { fillDiagonal, fillLine, calculateOverlaps } from "./utils";

const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

const lines = [];
let maxX = 0;
let maxY = 0;

data.forEach((data) => {
  const [start, end] = data.split(" -> ");
  const [x1, y1] = start.split(",").map((x) => +x);
  const [x2, y2] = end.split(",").map((x) => +x);

  maxX = Math.max(maxX, x1, x2);
  maxY = Math.max(maxY, y1, y2);

  const line = { x1, y1, x2, y2 };
  lines.push(line);
});

function puzzle1() {
  // make a new array of size maxX * maxY, filled with 0s, i.e each row is an array filled with 0s
  let grid = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0));

  // Fill grid with instructions only consider horizontal and vertical lines
  lines.forEach((line) => {
    if (line.x1 === line.x2) {
      grid = fillLine(line.y1, line.y2, grid, "y", line.x1); // fill along y
    }
    if (line.y1 === line.y2) {
      grid = fillLine(line.x1, line.x2, grid, "x", line.y1); // fill along x
    }
  });

  const result = calculateOverlaps(grid);
  return result;
}

function puzzle2() {
  // make a new array of size maxX * maxY, filled with 0s, i.e each row is an array filled with 0s
  let grid = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0));

  lines.forEach((line) => {
    // Fill grid with instructions only consider horizontal and vertical lines same as before
    if (line.x1 === line.x2)
      grid = fillLine(line.y1, line.y2, grid, "y", line.x1);
    if (line.y1 === line.y2)
      grid = fillLine(line.x1, line.x2, grid, "x", line.y1);

    // Fill grid with instructions only consider diagonal lines at 45 degree angle
    let slope = Math.abs(Math.floor((line.y2 - line.y1) / (line.x2 - line.x1)));
    if (slope === 1) {
      grid = fillDiagonal(line.x1, line.y1, line.x2, line.y2, grid);
    }
  });

  const result = calculateOverlaps(grid);
  return result;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
