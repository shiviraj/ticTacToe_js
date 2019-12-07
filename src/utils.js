const initGrid = function() {
  const grid = [];
  grid.push(new Array(3).fill(' '));
  grid.push(new Array(3).fill(' '));
  grid.push(new Array(3).fill(' '));
  return grid;
};

const seperateRowColumn = function(position) {
  return {
    row: Math.floor((position - 1) / 3),
    column: (position - 1) % 3
  };
};

const isSubset = function(superSet, subset) {
  const isIncluded = function(item) {
    return superSet.includes(item);
  };
  return subset.every(isIncluded);
};

module.exports = { initGrid, seperateRowColumn, isSubset };
