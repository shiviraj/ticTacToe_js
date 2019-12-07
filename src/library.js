// const readline = require('readline');
const { stdin, stdout, exit } = process;
const { initGrid, seperateRowColumn, isSubset } = require('./utils.js');
// const rl = readline.createInterface(stdin);

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const players = {
  counter: 0,
  '1': { name: 'Player 1', moves: [] },
  '2': { name: 'Player 2', moves: [] },
  crntPlayer: function() {
    return this[(this.counter++ % 2) + 1];
  },
  updateMoves: function(position) {
    let crntPlayer = this.crntPlayer();
    crntPlayer.moves.push(position);
    return crntPlayer;
  },
  hasWon: function(position) {
    let crntPlayer = this.updateMoves(position);
    let isSubsetOfMoves = isSubset.bind(null, crntPlayer.moves);
    let wonCondition = winningCombinations.filter(isSubsetOfMoves);
    if (wonCondition.length) {
      return { name: crntPlayer.name, hasWon: true };
    }
    return { name: crntPlayer.name, hasWon: false };
  },
  displayResult: function(position) {
    let result = this.hasWon(position);
    if (result.hasWon) {
      return `${result.name} has won`;
    }
  }
};

const board = {
  grid: initGrid(),
  display: function() {
    return this.grid.map(element => element.join('|')).join('\n-----\n');
  },
  insert: function(symbol, position) {
    let cell = seperateRowColumn(position);
    this.grid[cell.row][cell.column] = symbol;
    return this.grid;
  }
};

const symbolDetails = {
  symbols: ['X', 'O'],
  crntSymbol: function() {
    let index = 0;
    let symbols = this.symbols;
    return function() {
      return symbols[index++ % 2];
    };
  }
};

const runGame = function(turnNo, crntSymbol) {
  return function(position) {
    position = +position;
    board.insert(crntSymbol(), position);
    console.clear();
    console.log(board.display());
    let result = players.displayResult(position);
    if (result) {
      console.log(result);
      exit();
    }
    turnNo++;
    if (turnNo == 9) {
      console.log('GAME DRAW.....');
      exit();
    }
  };
};

const startGame = function() {
  let crntSymbol = symbolDetails.crntSymbol();
  console.log(board.display());
  let turnNo = 0;
  stdin.on('data', runGame(turnNo, crntSymbol));
};

module.exports = { startGame };
