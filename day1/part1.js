const lines = require('fs').readFileSync('./input.txt', 'utf-8').split('\n');
const codes = lines.map((line) => {
  const firstNumber = line.match(/\d{1}/g).at(0);
  const lastNumber = line.match(/\d{1}/g).at(-1);
  const code = parseInt(`${firstNumber}${lastNumber}`);
  return code;
});

const sum = codes.reduce((acc, code) => acc + code, 0);
console.log(sum);