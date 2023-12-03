const lines = require('fs').readFileSync('./input.txt', 'utf-8').split('\n');

const numberMappings = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const codes = lines.map((line) => {
  let lineSafe = line;
  for (const [key, value] of Object.entries(numberMappings)) {
    // Add safety duplicated letter
    const safeNumberText = `${key}${key.slice(-1)}`;
    lineSafe = lineSafe.replaceAll(key, `${safeNumberText}`);
  }

  let lineFormatted = lineSafe;
  for (const [key, value] of Object.entries(numberMappings)) {
    lineFormatted = lineFormatted.replaceAll(key, value);
  }

  const firstNumber = lineFormatted.match(/\d{1}/g).at(0);
  const lastNumber = lineFormatted.match(/\d{1}/g).at(-1);
  const code = parseInt(`${firstNumber}${lastNumber}`);
  console.log(line, lineSafe, lineFormatted, firstNumber, lastNumber, code);
  return code;
});

const sum = codes.reduce((acc, code) => acc + code, 0);
console.log(sum);
