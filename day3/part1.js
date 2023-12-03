const input = require('fs').readFileSync('./input.txt', 'utf-8');

const symbols = input.match(/[^\d\.]/gm);
const uniqueSymbols = [...new Set(symbols)];

const rows = input.split("\n");
const hitIndexes = [];
for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < uniqueSymbols.length; j++) {
    const regex = new RegExp(`\\${uniqueSymbols[j]}`, "g");
    const indexes = [];
    while ((match = regex.exec(rows[i]))) {
      indexes.push(match.index);
    }

    const adjacentIndexes = indexes.map((index) => {
      const currentAdjacentIndexes = [];
      if (index > 0) {
        currentAdjacentIndexes.push(index - 1);
      }
      currentAdjacentIndexes.push(index);
      if (index < rows[i].length - 1) {
        currentAdjacentIndexes.push(index + 1);
      }

      return currentAdjacentIndexes;
    });

    if (i > 0) {
      if (!hitIndexes[i - 1]) hitIndexes[i - 1] = [];
      hitIndexes[i - 1] = [...hitIndexes[i - 1], ...adjacentIndexes];
    }

    if (!hitIndexes[i]) hitIndexes[i] = [];
    hitIndexes[i] = [...hitIndexes[i], ...adjacentIndexes];

    if (i < rows.length - 1) {
      if (!hitIndexes[i + 1]) hitIndexes[i + 1] = [];
      hitIndexes[i + 1] = [...hitIndexes[i + 1], ...adjacentIndexes];
    }

    // console.log(i, uniqueSymbols[j], indexes, adjacentIndexes);
  }
}

// Flatten hitIndex results and remove duplicates
hitIndexes.forEach((row, i) => {
  // flatten array of arrays
  hitIndexes[i] = [
    ...new Set(row.reduce((acc, val) => acc.concat(val), [])),
  ].sort((a, b) => a - b);
  //   console.log(hitIndexes[i]);
});

const hitParts = [];
for (let i = 0; i < rows.length; i++) {
  const regex = new RegExp(/\d+/, "g");

  while ((match = regex.exec(rows[i]))) {
    const partNumber = parseInt(match[0]);
    const partNumberLength = match[0].length;
    const partIndexes = [];
    for (let j = 0; j < partNumberLength; j++) {
      partIndexes.push(match.index + j);
    }

    // Check if partIndexes are in hitIndexes
    let isHit = false;
    for (let k = 0; k < partIndexes.length; k++) {
      if (hitIndexes[i].includes(partIndexes[k])) {
        isHit = true;
        break;
      }
    }

    if (isHit) {
      hitParts.push(partNumber);
    }
  }
}

const sumOfAllParts = hitParts.reduce((acc, val) => acc + val, 0);
console.log(hitParts, sumOfAllParts);
