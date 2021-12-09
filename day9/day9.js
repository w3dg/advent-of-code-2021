import { readFileSync } from "fs";

import { Point, traverseNearby } from "./utils";

// const data = readFileSync(__dirname + "/sample.txt", "utf8").split("\r\n");
const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");
const dataMatrix = data.map((row) => row.split("").map((x) => +x));
const heightMapMatrix = [];

for (let i = 0; i < dataMatrix.length; i++) {
  let temp = [];
  for (let j = 0; j < dataMatrix[i].length; j++) {
    const point = new Point(i, j, dataMatrix[i][j]);
    temp.push(point); // this makes them 0 based
  }
  heightMapMatrix.push(temp);
}

const lowPoints = [];

function puzzle1() {
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

function puzzle2() {
  // start at each lowest point and go in all possible directions until you hit a 9
  // add every non traversed point to a set/array

  const originalMap = heightMapMatrix;

  let basinSizes = [];
  lowPoints.forEach((lowPoint) => {
    const newHeightMap = traverseNearby(lowPoint, originalMap);
    const pointsInBasin = newHeightMap
      .flat()
      .filter((point) => point.traversed);

    //* SOMETHING HERE, ITS ADDING THE PREVIOUS SIZE AS WELL>>???
    basinSizes.push(pointsInBasin.length);
  });

  basinSizes = basinSizes
    .map((ele, i) => {
      return i === 0 ? ele : basinSizes[i] - basinSizes[i - 1];
    })
    .sort((a, b) => b - a);
  // return the product of largest 3 basins
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
