import { readFileSync } from "fs";

import { calcFuelWithIncrease } from "./utils";

// Input Array for iterating through all positions and calculating fuel for each position
const horizPosition = readFileSync(__dirname + "/input.txt", "utf8")
  .split(",")
  .map(Number);

// Set to keep track of unique positions to save calculations
const uniquePositions = new Set(horizPosition);

// total valid horizontal positions 0 - max
const totalPlaces = Array(Math.max(...uniquePositions) + 1)
  .fill(0)
  .map((_, i) => i);

function puzzle1() {
  // Map `total fuel required for that position` => `its position`
  const fuelMap = new Map();

  for (let position = 0; position < totalPlaces.length; position++) {
    // go through the given list of horizontal positions
    let totalFuel = 0;

    for (let i = 0; i < horizPosition.length; i++) {
      const steps = Math.floor(Math.abs(horizPosition[i] - position));
      totalFuel += steps;
    }
    fuelMap.set(position, totalFuel);
  }

  // at the end we will return the position with the least amount of fuel
  let totalFuelArray = Array.from(fuelMap.values());
  let minFuel = Math.min(...totalFuelArray);
  return minFuel;
}

function puzzle2() {
  // Map `total fuel required for that position` => `its position`
  const fuelMap = new Map();

  for (let position = 0; position < totalPlaces.length; position++) {
    // go through the given list of horizontal positions
    let totalFuel = 0;

    for (let i = 0; i < horizPosition.length; i++) {
      const fuelSteps = Math.floor(Math.abs(horizPosition[i] - position));
      totalFuel += calcFuelWithIncrease(fuelSteps); // we get total fuel for each step which is increasing as we go
    }
    fuelMap.set(position, totalFuel);
  }

  // at the end we will return the position with the least amount of fuel
  let totalFuelArray = Array.from(fuelMap.values());

  let minFuel = Math.min(...totalFuelArray);
  return minFuel;
}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
