import { readFileSync } from "fs";

const rawinput = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

const data = rawinput.map((line) => {
  const [direction, value] = line.split(" ");
  return { direction: direction, value: parseInt(value) };
});

function puzzle1() {
  let horizontal = 0;
  let depth = 0;

  for (const command of data) {
    if (command.direction == "up") {
      depth -= command.value;
    }

    if (command.direction == "down") {
      depth += command.value;
    }

    if (command.direction == "forward") {
      horizontal += command.value;
    }
  }

  return horizontal * depth;
}

function puzzle2() {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const command of data) {
    if (command.direction == "up") {
      aim -= command.value;
    }

    if (command.direction == "down") {
      aim += command.value;
    }

    if (command.direction == "forward") {
      horizontal += command.value;
      depth += aim * command.value;
    }
  }

  return horizontal * depth;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
