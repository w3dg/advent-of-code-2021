export class Point {
  constructor(row, col, height) {
    this.row = row;
    this.col = col;
    this.traversed = false;
    this.height = height;
  }

  setTraversed() {
    this.traversed = true;
  }
}
