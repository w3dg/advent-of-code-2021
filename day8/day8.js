import { readFileSync } from "fs";

import { utility } from "./utils";

// const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");
const data = readFileSync(__dirname + "/sample.txt", "utf8").split("\r\n");

const entries = data.map((entry) => {
  const [uniqueSignalPattern, FourDigOutput] = entry.split(" | ");
  const uniqueSignalArray = uniqueSignalPattern.split(" ");
  const FourDigArray = FourDigOutput.split(" ");

  const entryObject = {
    uniqueSignalArray,
    FourDigArray,
  };

  return entryObject;
});

function puzzle1() {
  let totalUniqueSegmentDigits = 0;

  entries.forEach((entry) => {
    const { FourDigArray } = entry;

    // how many segments it takes to light up the numbers 1, 4, 7, 8
    const length1 = 2;
    const length4 = 4;
    const length7 = 3;
    const length8 = 7;

    const onlyThoseWhichAreUnique = FourDigArray.filter(
      (digit) =>
        digit.length === length1 ||
        digit.length === length4 ||
        digit.length === length7 ||
        digit.length === length8
    );

    totalUniqueSegmentDigits += onlyThoseWhichAreUnique.length;
  });

  return totalUniqueSegmentDigits;
}

function puzzle2() {}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
