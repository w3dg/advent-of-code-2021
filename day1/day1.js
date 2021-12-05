import { readFileSync } from "fs";

const rawinput = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

const data = rawinput.map((x) => parseInt(x));

function puzzle1() {
  let increments = 0;

  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) increments++;
  }

  return increments;
}

function puzzle2() {
  let i = 3;
  let increments = 0;
  while (i < data.length) {
    let sum1 = data[i - 3] + data[i - 2] + data[i - 1];
    let sum2 = data[i - 2] + data[i - 1] + data[i];

    if (sum2 > sum1) {
      increments++;
    }
    i++;
  }

  return increments;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
