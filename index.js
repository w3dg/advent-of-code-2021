import { existsSync } from "fs";

for (let i = 1; ; i++) {
  if (existsSync(`./day${i}/day${i}.js`)) {
    // Green coloured text :D
    console.log(
      "\x1b[32m%s\x1b[0m",
      `\n\n-------------------------------\n/*          Day ${i}:          */`
    );
    require(`./day${i}/day${i}.js`);
  } else break;
}
