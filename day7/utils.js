// given the number ( difference ) return the sum from 1 to that difference

// NOTE: recursive version took quite long, never the less for loop also takes too long. idk.
export function calcFuelWithIncrease(num) {
  return Math.floor((num * (num + 1)) / 2);
}
