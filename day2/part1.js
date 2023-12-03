const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

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

  const gamePossible = Object.keys(topResult).every(
    (color) => topResult[color] <= rules[color]
  );
  //   console.log(id, topResult, gamePossible);
  return { id, gamePossible };
});

const sumOfIds = games.reduce((acc, game) => {
//   if (game.gamePossible) {
    acc += game.id;
//   }
  return acc;
}, 0);

console.log(sumOfIds);
