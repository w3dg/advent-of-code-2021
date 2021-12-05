import { readFileSync } from "fs";

const rawinput = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

function greaterBitInCol(j, matrix) {
  let ones = 0;
  let zeros = 0;

  // moving thru each row
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][j] === 1) {
      ones++;
    } else {
      zeros++;
    }
  }

  if (ones > zeros) {
    return 1;
  } else if (zeros > ones) {
    return 0;
  } else {
    return -1;
  }
}

function puzzle1() {
  let matrix = [];

  for (let i = 0; i < rawinput.length; i++) {
    matrix[i] = rawinput[i].split("").map((x) => parseInt(x));
  }
  let epsilon = "";
  let gamma = "";

  // moving thru each column
  for (let j = 0; j < matrix[0].length; j++) {
    let bit = greaterBitInCol(j, matrix);
    if (bit == 1) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  let power = parseInt(gamma, 2) * parseInt(epsilon, 2);

  return power;
}

function puzzle2() {
  let matrix = [];
  let oxygenmatrix = [];
  let co2matrix = [];

  for (let i = 0; i < rawinput.length; i++) {
    matrix[i] = rawinput[i].split("").map((x) => parseInt(x));
  }
  oxygenmatrix = matrix;
  co2matrix = matrix;

  let j = 0;
  while (oxygenmatrix.length > 1) {
    let grbit = greaterBitInCol(j, oxygenmatrix);
    oxygenmatrix = oxygenmatrix.filter((x) => {
      if (grbit !== -1) {
        return x[j] === grbit;
      } else {
        return x[j] === 1;
      }
    });
    j++;
  }

  j = 0;
  while (co2matrix.length > 1) {
    let grbit = greaterBitInCol(j, co2matrix);
    co2matrix = co2matrix.filter((x) => {
      if (grbit !== -1) {
        return x[j] !== grbit;
      } else {
        return x[j] === 0;
      }
    });
    j++;
  }

  let power =
    parseInt(oxygenmatrix[0].join(""), 2) * parseInt(co2matrix[0].join(""), 2);

  return power;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
