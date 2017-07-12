const fs = require("fs");
const lev = require("fast-levenshtein");

console.log("Loading file...");
let dicBuf = fs.readFileSync("dic.txt", { encoding: 'utf8' });
let dic = dicBuf.toString().split("\r\n");
console.log("Loaded.");

let count = 0;
let startTime = new Date();
let lastStatusTime = startTime;
console.log("Starting...");
for(let dicIndex1 in dic) {
  let str1 = dic[dicIndex1];
  for(let dicIndex2 in dic) {
    let str2 = dic[dicIndex2];
    let dst = lev.get(str1, str2);

    //console.log(str1, str2, dst);
    count++;
    if (count % 1000000 === 0) {
      let rps = count / (new Date() - lastStatusTime) * 1000;
      console.log(`RPS: ${rps}`);

      count = 0;
      lastStatusTime = new Date();
    }
  }
}

let avgRps = (dic.length * dic.length) / (new Date() - startTime) * 1000;
console.log(`Average RPS: ${avgRps}`);



// let _lastStatusTime = new Date();
// let _statusInterval = setInterval(() => {
//   let rps = _lastRequestCount / (new Date() - _lastStatusTime) * 1000;
//
//   console.log(`connections: ${Object.keys(io.engine.clients).length}, rps: ${rps}`);
//
//   _lastRequestCount = 0;
//   _lastStatusTime = new Date();
// }, 1000);
//
// _statusInterval.unref();