const fs = require("fs");
const { removeItemAll } = require("./utils");

const randomOrderAndBoards = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\r\n\r\n");

const randomOrder = randomOrderAndBoards[0].split(",").map((x) => +x); // parse first line as random order
let rawboards = randomOrderAndBoards.splice(1); // leaving the first, all others are boards
let allBoards = [];

// CUSTOM BOARD CLASS FOR HANDLING BOARDS
class Board {
  constructor(rawboard) {
    this.board = rawboard.split("\r\n").map((line) => {
      let splitline = removeItemAll(line.split(" "), "").map((x) => +x);
      return splitline;
    });
  }

  getBoard() {
    return this.board;
  }

  getSum() {
    let sum = 0;
    this.board.forEach((row) => {
      row.forEach((col) => {
        sum += col;
      });
    });
    return sum;
  }

  checkBoardIfWinning() {
    // Check each Row if any of them add to 0
    for (let i = 0; i < this.board.length; i++) {
      let rowsum = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        rowsum += this.board[i][j];
      }
      if (rowsum == 0) {
        rowsum = 0;
        return true;
      }
    }

    // Check each Column if any of them add to 0
    for (let i = 0; i < this.board[0].length; i++) {
      let colsum = 0;
      for (let j = 0; j < this.board.length; j++) {
        colsum += this.board[j][i];
      }
      if (colsum == 0) {
        colsum = 0;
        return true;
      }
    }

    return false;
  }

  drawNumberOnBoard(number) {
    // replace the number by a 0
    this.board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === number) {
          this.board[i][j] = 0;
        }
      });
    });
  }
}
// SETUP ALL BOARDS
for (const board of rawboards) {
  let brd = new Board(board);
  allBoards.push(brd);
}

function puzzle1() {
  let notFound = true;
  let winningBoard = null;
  let winningOrder = null;

  for (const order of randomOrder) {
    if (!notFound) break;

    for (const board of allBoards) {
      board.drawNumberOnBoard(order);
    }

    for (const board of allBoards) {
      if (!notFound) break;
      if (board.checkBoardIfWinning()) {
        winningBoard = board;
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

  for (const order of randomOrder) {
    for (const board of allBoards) {
      board.drawNumberOnBoard(order);
    }

    for (const board of allBoards) {
      if (board.checkBoardIfWinning()) {
        winningBoard = board;
        winningOrder = order;
        allBoards.splice(allBoards.indexOf(board), 1); // remove that board from the list
      }
    }
  }
  return winningBoard.getSum() * winningOrder;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
