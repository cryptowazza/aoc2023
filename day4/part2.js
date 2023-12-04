const games = require('fs').readFileSync('./input.txt', 'utf-8').split('\n');

let cardCounts = games.map(() => 1);
games.forEach((game, index) => {
    const [card, winningNumbers, numbers] = game.replace('Card ', '').split(/:|\|/);
    const winningNumbersArray = winningNumbers.split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
    const numbersArray = numbers.split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
    const matchedNumbers = numbersArray.filter(number => winningNumbersArray.includes(number));

    // console.log(card, matchedNumbers.length);

    for(let j = 0; j < cardCounts[index]; j++) {
        for(let i = 0; i < matchedNumbers.length; i++) {
            cardCounts[parseInt(card) + i]++;
        }
    }
});

const totalCards = cardCounts.reduce((a, b) => a + b, 0);
console.log(cardCounts, totalCards);