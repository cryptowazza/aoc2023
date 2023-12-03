const games = require('fs').readFileSync('./input.txt', 'utf-8').split('\n').map((game) => {
  const [name, result] = game.split(": ");
  const id = parseInt(name.split(" ")[1]);
  const results = result.split("; ");
  const resultsParsed = results.map((result) => {
    const set = result.split(", ");
    return set.map((color) => {
      const [count, colorName] = color.split(" ");
      return { [colorName]: parseInt(count) };
    });
  });

  let topResult = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const result of resultsParsed) {
    for (const set of result) {
      for (const color in set) {
        if (topResult[color] < set[color]) {
          topResult[color] = set[color];
        }
      }
    }
  }

  const powerOfTopResult = Object.keys(topResult).reduce((acc, color) => {
    acc = topResult[color] * acc;
    return acc;
  }, 1);

  console.log(id, topResult, powerOfTopResult);
  return { id, powerOfTopResult };
});

const sumOfPower = games.reduce((acc, game) => {
  acc += game.powerOfTopResult;
  return acc;
}, 0);

console.log(sumOfPower);
