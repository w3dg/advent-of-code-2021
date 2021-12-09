import { readFileSync } from "fs";

import { utility } from "./utils";

const data = readFileSync(__dirname + "/sample.txt", "utf8").split("\r\n");
// const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

function puzzle1() {
  const heightMapMatrix = data.map((row) => row.split("").map((x) => +x));
  const lowPoints = [];

  // if right, left, top bottom whatever available exists, then if its lowest than all of them, then its a low point

  for (let i = 0; i < heightMapMatrix.length; i++) {
    // rows
    for (let j = 0; j < heightMapMatrix[i].length; j++) {
      // cols
      // grab whatever adjacent point is available
      let adjacents = [];
      j - 1 >= 0 && adjacents.push(heightMapMatrix[i][j - 1]);
      j + 1 < heightMapMatrix[i].length &&
        adjacents.push(heightMapMatrix[i][j + 1]);
      i - 1 >= 0 && adjacents.push(heightMapMatrix[i - 1][j]);
      i + 1 < heightMapMatrix.length &&
        adjacents.push(heightMapMatrix[i + 1][j]);

      // check if the current i,j is lowest than the adjacent points
      const currentPoint = heightMapMatrix[i][j];
      const isHigher = (adjacent) => adjacent > currentPoint;
      if (adjacents.every(isHigher)) {
        lowPoints.push(heightMapMatrix[i][j]);
      }
    }
  }

  const totalRiskLevel = lowPoints.reduce((acc, curr) => acc + curr + 1, 0);
  return totalRiskLevel;
}

function puzzle2() {}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
