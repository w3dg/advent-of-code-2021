import removeItemAll from "./utils.js";

export default class Board {
  constructor(rawboard) {
    this.board = rawboard.split("\r\n").map((line) => {
      let splitline = removeItemAll(line.split(" "), "").map((x) => +x);
      return splitline;
    });
  }

  getSum() {
    let sum = 0;
    this.board.forEach((row) => {
      row.forEach((col) => {
        sum += col != -1 ? col : 0;
      });
    });
    return sum;
  }

  checkBoardIfWinning() {
    // REFACTOR - https://stackoverflow.com/questions/38720885/find-the-sum-of-each-row-as-well-as-that-of-each-column-in-2-dimensional-matrix

    // Check each Row if any of them add to 0
    let rowsum = this.board.map((r) =>
      r.reduce((prev, curr) => prev + curr, 0)
    );
    if (rowsum.includes(-5)) {
      // 5 -1s in a row :p
      return true;
    }

    // Check each Column if any of them add to 0
    let colSum = this.board.reduce((a, b) => a.map((x, i) => x + b[i]));
    if (colSum.includes(-5)) {
      // 5 -1s in a col :p
      return true;
    }
  }

  drawNumberOnBoard(number) {
    this.board.forEach((row, i) =>
      // if number is found at that row and col, set it to 0
      row.forEach((col, j) => (col === number ? (this.board[i][j] = -1) : null))
    );
  }
}
