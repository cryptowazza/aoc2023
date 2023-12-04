const games = require('fs').readFileSync('./input.txt', 'utf-8').split('\n');

const points = games.map(game => {
    const [card, winningNumbers, numbers] = game.replace('Card ', '').split(/:|\|/);
    const winningNumbersArray = winningNumbers.split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
    const numbersArray = numbers.split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
    const matchedNumbers = numbersArray.filter(number => winningNumbersArray.includes(number));
    // console.log(card, winningNumbersArray, numbersArray, matchedNumbers, points);
    return Math.floor(Math.pow(2, matchedNumbers.length - 1));
});

console.log(points.reduce((a, b) => a + b, 0));