import { readFileSync } from "fs";

import { utility } from "./utils";

const data = readFileSync(__dirname + "/input.txt", "utf8").split("\r\n");

function puzzle1() {}

function puzzle2() {}

console.log("Answer to puzzle 1 with the input data is", puzzle1());
console.log("Answer to puzzle 2 with the input data is", puzzle2());
