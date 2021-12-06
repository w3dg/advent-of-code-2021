import { readFileSync } from "fs";

const rawdata = readFileSync(__dirname + "/input.txt", "utf8");
const listOfDays = rawdata.split(",").map(Number);

function puzzle1() {
  let list = [...listOfDays];
  // let noOfDays = 18;
  let noOfDays = 80;
  // let noOfDays = 256;

  for (let day = 1; day <= noOfDays; day++) {
    let countZeros = 0;

    list = list.map((item) => {
      if (item === 0) {
        countZeros++;
        return 6;
      }
      return item - 1;
    });

    for (let i = 0; i < countZeros; i++) {
      list = list.concat([8]);
    }
  }

  return list.length;
}

// THIS IMPLEMENTATION IS SAME AS ABOVE BUT NOT AT ALL PERFORMANT FOR SUCH HUGE ITERATIONS
// NONETHELESS, IT WILL RUN OUT OF MEMORY ON Array BEFORE IT EVEN FINISHES
// EVEN FOR THE SAMPLE INPUT, THE ANSWER IS GREATER THAN THE MAX ARRAY SIZE WHICH I RETURN...
// SEE THE IMAGE IN THIS FOLDER :P

/*
function puzzle2() {
  let list = [...listOfDays];
  // let noOfDays = 18;

  for (let day = 1; day <= noOfDays; day++) {
    let countZeros = 0;

    list = list.map((item) => {
      if (item === 0) {
        countZeros++;
        return 6;
      }
      return item - 1;
    });

    for (let i = 0; i < countZeros; i++) {
      list = list.concat([8]);
    }
  }

  return list.length;
}
*/

console.log("Answer to puzzle 1 with the input data is", puzzle1());
// console.log("Answer to puzzle 2 with the input data is", puzzle2());
