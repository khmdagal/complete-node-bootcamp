const fs = require("fs");
// fs stands for file system

//Blocking, Synchronous way
const txt = fs.readFileSync("../final/txt/input.txt", "utf-8");
const write = `${txt}🙂dddd😚ffff😙`;
fs.writeFileSync("../starter/txt/out.txt", write);
//console.log(write)

// Non-blocking Asynchronous

fs.readFile("./qoaal.txt", "utf-8", (err, xogta1) => {
  err && console.log("👎👎not right👎👎👎");
  fs.readFile("../final/dev-data/data.json", "utf-8", (err, xogta2) => {
    console.log(xogta2);

    fs.writeFile("../final/txt/newTxt.txt", `${xogta1}`, "utf-8", (err) => err);
  });
});
//console.log("this is another data which is placed -----> line 19");
