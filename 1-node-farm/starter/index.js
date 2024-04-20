
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
console.log(textIn)

// to write some new text to the file we already read

const textOut = `this is what I now about node.js readFileSync & writeFileSync command ${textIn}.\n Created on ${Date()}`;
fs.writeFileSync("./txt/input.txt", textOut);
// in here the first argument is the file path that we are going to write something into it,
// and the second argument is what we actually writing, there fore in this case what we want to write
// we stored in a variable called textOut.
fs.writeFileSync("./txt/output3.txt", textOut);
