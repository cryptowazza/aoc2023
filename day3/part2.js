const rows = require('fs').readFileSync('./input.txt', 'utf-8').split('\n');
const gearBoxIndexes = [];
for (let i = 0; i < rows.length; i++) {
  const regex = new RegExp("\\*", "g");
  while ((match = regex.exec(rows[i]))) {
    const index = match.index;
    const adjacentIndexes = [];

    if (index > 0) {
      adjacentIndexes.push(index - 1);
    }
    adjacentIndexes.push(index);
    if (index < rows[i].length - 1) {
      adjacentIndexes.push(index + 1);
    }

    const gearboxAdjacentIndexes = {};
    if (i > 0) {
      gearboxAdjacentIndexes[i - 1] = adjacentIndexes;
    }

    gearboxAdjacentIndexes[i] = adjacentIndexes;

    if (i < rows.length - 1) {
      gearboxAdjacentIndexes[i + 1] = adjacentIndexes;
    }

    gearBoxIndexes.push(gearboxAdjacentIndexes);
  }
}

const gears = [];
for (const gearBoxIndex of gearBoxIndexes) {
  const rowIndexes = Object.keys(gearBoxIndex).map((o) => parseInt(o));
  const parts = [];
  for (const rowIndex of rowIndexes) {
    const regex = new RegExp(/\d+/, "g");
    const hitIndexes = gearBoxIndex[rowIndex];

    while ((match = regex.exec(rows[rowIndex]))) {
      const partNumber = parseInt(match[0]);
      const partNumberLength = match[0].length;
      const partIndexes = [];
      for (let j = 0; j < partNumberLength; j++) {
        partIndexes.push(match.index + j);
      }
      // console.log('YO', partNumber, partIndexes);

      // Check if partIndexes are in hitIndexes
      let isHit = false;
      for (let k = 0; k < partIndexes.length; k++) {
        if (hitIndexes.includes(partIndexes[k])) {
          isHit = true;
          break;
        }
      }

      if (isHit) {
        parts.push(partNumber);
      }
    }
  }
  if (parts.length === 2) {
    gears.push(parts[0] * parts[1]);
  }
}

const sumOfAllGears = gears.reduce((a, b) => a + b, 0);
console.log(gears, sumOfAllGears);
