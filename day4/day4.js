import { readFileSync } from "fs";

// CUSTOM BOARD CLASS FOR HANDLING BOARDS
import Board from "./Board";

const randomOrderAndBoards = readFileSync(
  __dirname + "/input.txt",
  "utf8"
).split("\r\n\r\n");

const randomOrder = randomOrderAndBoards[0].split(",").map((x) => +x); // parse first line as random order
let rawboards = randomOrderAndBoards.splice(1); // leaving the first, all others are boards
let allBoards = [];

// SETUP ALL BOARDS
for (const board of rawboards) {
  let brd = new Board(board);
  allBoards.push(brd);
}

function puzzle1() {
  let notFound = true;
  let winningBoard = null;
  let winningOrder = null;
  // for each order called,
  for (const order of randomOrder) {
    if (!notFound) break;
    // draw the number on the board
    for (const board of allBoards) {
      board.drawNumberOnBoard(order);
    }
    // check if any of the boards are winning
    for (const board of allBoards) {
      if (!notFound) break;
      if (board.checkBoardIfWinning()) {
        winningBoard = board; // set winning board and order, break out of loop
        winningOrder = order;
        notFound = false;
        break;
      }
    }
  }
  return winningBoard.getSum() * winningOrder;
}

function puzzle2() {
  let winningBoard = null;
  let winningOrder = null;
  // for each order called, draw the number on the board and check if any of the boards are winning
  for (const order of randomOrder) {
    for (const board of allBoards) {
      board.drawNumberOnBoard(order);
    }

    for (const board of allBoards) {
      if (board.checkBoardIfWinning()) {
        winningBoard = board; // update winning board and order
        winningOrder = order;
        allBoards.splice(allBoards.indexOf(board), 1); // remove that board from the array
      }
    }
  }
  return winningBoard.getSum() * winningOrder;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
