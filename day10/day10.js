import { readFileSync } from "fs";

import BracketStack from "./utils";

// const data = readFileSync(__dirname + "/sample.txt", "utf8").split("\r\n");
const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

const openingTags = "([{<";
const closingTags = ")]}>";

const matchingPairs = new Map();
matchingPairs.set("[", "]");
matchingPairs.set("{", "}");
matchingPairs.set("<", ">");
matchingPairs.set("(", ")");

const points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let incompleteLines = [];

function puzzle1() {
  let syntaxErrorScore = 0;
  const bstack = new BracketStack();
  data.forEach((line, i) => {
    const tokens = line.split("");
    let isCorrupt = false;
    for (const token of tokens) {
      if (openingTags.indexOf(token) != -1) {
        bstack.pushOpening(token);
      }

      if (closingTags.indexOf(token) != -1) {
        const resultCharacter = bstack.pushClosingAndPop(token);
        if (resultCharacter != "") {
          syntaxErrorScore += points[resultCharacter];
          isCorrupt = true;
          return;
        }
      }
    }
    if (!isCorrupt) {
      incompleteLines.push(line);
    }
  });

  return syntaxErrorScore;
}

function puzzle2() {
  let autoCompleteScores = [];
  const points = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const bstack = new BracketStack();

  incompleteLines.forEach((line) => {
    let autocompleteScore = 0;
    bstack.reset();
    for (const token of line.split("")) {
      if (openingTags.indexOf(token) != -1) {
        bstack.pushOpening(token);
      } else if (closingTags.indexOf(token) != -1) {
        bstack.pushClosingAndPopDontReturn(token);
      }
    }
    let endSequence = "";
    for (const openingBracket of bstack.st) {
      endSequence = matchingPairs.get(openingBracket) + endSequence;
    }

    for (const character of endSequence.split("")) {
      autocompleteScore = autocompleteScore * 5 + points[character];
    }

    // console.log("Score = ", autocompleteScore);
    autoCompleteScores.push(autocompleteScore);
  });

  // Sort the autocomplete scores
  autoCompleteScores = autoCompleteScores.sort((a, b) => a - b);

  return autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
