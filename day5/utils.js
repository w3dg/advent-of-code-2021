export function fillLine(start, end, grid, fillAlong, fillAt) {
  // if start is greater than end, swap them and fill as usual
  let s = start < end ? start : end;
  let e = start < end ? end : start;

  if (fillAlong === "x") {
    // fill along x axis, keep y constant
    while (s <= e) {
      grid[fillAt][s]++;
      s++;
    }
  } else {
    // fill along y axis keep x constant
    while (s <= e) {
      grid[s][fillAt]++;
      s++;
    }
  }
  return grid;
}

export function fillDiagonal(startX, startY, endX, endY, grid) {
  let slope = Math.floor((endY - startY) / (endX - startX));

  if (slope === 1) {
    // LEFT DIAGONAL ish
    // check if the end point is earlier and set the increment accordingly to go front or back
    let increment = startX < endX ? 1 : -1;
    do {
      grid[startY][startX]++;
      startX += increment;
      startY += increment;
    } while (startX !== endX + increment && startY !== endY + increment);
  }

  if (slope === -1) {
    // RIGHT DIAGONAL ish
    // check if the end point is earlier and set the increment accordingly to go front or back
    let increment = startX > endX ? 1 : -1;

    do {
      grid[startY][startX]++;
      startX -= increment;
      startY += increment;
    } while (startX !== endX - increment && startY !== endY + increment);
  }

  return grid;
}

export function calculateOverlaps(grid) {
  let counter = 0;
  grid.forEach((row) => {
    row.forEach((col) => {
      if (col >= 2) {
        counter++;
      }
    });
  });

  return counter;
}
