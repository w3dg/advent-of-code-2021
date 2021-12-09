import { readFileSync } from "fs";

import { Point } from "./utils";

// const data = readFileSync(__dirname + "/sample.txt", "utf8").split("\r\n");
const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");
const dataMatrix = data.map((row) => row.split("").map((x) => +x));
let heightMapMatrix = [];

for (let i = 0; i < dataMatrix.length; i++) {
  let temp = [];
  for (let j = 0; j < dataMatrix[i].length; j++) {
    const point = new Point(i, j, dataMatrix[i][j]);
    temp.push(point); // this makes them 0 based
  }
  heightMapMatrix.push(temp);
}

function puzzle1() {
  const lowPoints = [];
  // if right, left, top bottom whatever available exists, then if its lowest than all of them, then its a low point

  for (let i = 0; i < heightMapMatrix.length; i++) {
    // rows
    for (let j = 0; j < heightMapMatrix[i].length; j++) {
      // cols
      const currentPoint = heightMapMatrix[i][j];
      // grab whatever adjacent point is available
      let adjacents = [];
      currentPoint.col - 1 >= 0 &&
        adjacents.push(heightMapMatrix[i][currentPoint.col - 1]);
      currentPoint.col + 1 < heightMapMatrix[i].length &&
        adjacents.push(heightMapMatrix[i][currentPoint.col + 1]);
      currentPoint.row - 1 >= 0 &&
        adjacents.push(heightMapMatrix[currentPoint.row - 1][j]);
      currentPoint.row + 1 < heightMapMatrix.length &&
        adjacents.push(heightMapMatrix[currentPoint.row + 1][j]);

      // check if the currentPoint is lowest than the adjacent points
      const isHigher = (adjacent) => adjacent.height > currentPoint.height;
      if (adjacents.every(isHigher)) {
        lowPoints.push(heightMapMatrix[i][j]);
      }
    }
  }

  const totalRiskLevel = lowPoints.reduce(
    (acc, curr) => acc + curr.height + 1,
    0
  );
  return totalRiskLevel;
}

function puzzle2() {}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
