import { readFileSync } from "fs";

const rawdata = readFileSync(__dirname + "/sample.txt", "utf8");
const fishes = rawdata.split(",").map(Number);

//  GENERAL ANSWER
function calcFishes(days) {
  const fishesMap = new Array(9).fill(0); // the timers 0 - 8

  for (const fish of fishes) {
    fishesMap[fish] = fishesMap[fish] + 1; // count how many fishes have same day numbers no need to recalculate
  }

  // Loop over days find how many times it passes
  let zeroIdx = 0;
  for (let i = 0; i < days; i++) {
    fishesMap[(zeroIdx + 7) % 9] += fishesMap[zeroIdx]; // add previous generations to same number altogether
    zeroIdx = (zeroIdx + 1) % 9; // move zero index to next day
  }

  let allFishes = fishesMap.reduce((prev, curr) => prev + curr, 0);
  return allFishes;
}

function puzzle1() {
  return calcFishes(80);
}

function puzzle2() {
  return calcFishes(256);
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
