// given the number ( difference ) return the sum from 1 to that difference

// NOTE: recursive version took quite long, never the less for loop also takes too long. idk.
export function calcFuelWithIncrease(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }

  return sum;
}
