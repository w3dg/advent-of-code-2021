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

  isTraversed() {
    return this.traversed;
  }
}

function getAdjacentPoints(point, grid) {
  // grab whatever adjacent point is available
  let adjacents = [];
  point.col - 1 >= 0 && adjacents.push(grid[point.row][point.col - 1]);
  point.col + 1 < grid[point.row].length &&
    adjacents.push(grid[point.row][point.col + 1]);
  point.row - 1 >= 0 && adjacents.push(grid[point.row - 1][point.col]);
  point.row + 1 < grid.length && adjacents.push(grid[point.row + 1][point.col]);
  const isValid = (p) => p.height !== 9 && p.traversed === false;
  adjacents = adjacents.filter(isValid);
  // console.log("ADJACENTS TO ", point.row, point.col, "are", adjacents);
  return [adjacents, grid];
}
export function traverseNearby(startPoint, heightMap) {
  // recursively traverse the points around the startPoint until we find an edge or corner or 9s

  startPoint.setTraversed();
  const [adjacentPointsToTraverse, heightMapAfterTraversing] =
    getAdjacentPoints(startPoint, heightMap);
  heightMap = heightMapAfterTraversing;
  if (adjacentPointsToTraverse.length > 0) {
    adjacentPointsToTraverse.forEach((adjacentPoint) => {
      // console.log("TRAVERSING MORE");
      return traverseNearby(adjacentPoint, heightMap);
    });
  } else {
    return heightMap;
  }
  return heightMap;
}
