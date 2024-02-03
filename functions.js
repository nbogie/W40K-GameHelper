// counts how many times the number appears in the dice rolls

// returns an object of how many times a number occurs
//in the array that is generated from the diceRolling function
function countNumOccurences(diceRolls) {
  let resultObj = {};

  for (let diceRoll of diceRolls) {
    if (diceRoll in resultObj) {
      resultObj[diceRoll] += 1;
    } else {
      resultObj[diceRoll] = 1;
    }
  }
  return resultObj;
}

// determines the rolls for x amount of dice
function diceRolling(stringOfDice) {
  let numberOfDice = parseInt(stringOfDice);
  let sixSided = [1, 2, 3, 4, 5, 6];
  let diceRolls = [];
  let count = 0;

  if (Number.isInteger(numberOfDice)) {
    while (count < numberOfDice) {
      const index = Math.floor(Math.random() * sixSided.length);
      diceRolls.push(sixSided[index]);
      count++;
    }

    return countNumOccurences(diceRolls);
  }
  // must fix this
  if (!Number.isInteger(numberOfDice)) {
    return "please enter a valid whole number";
  }
}

module.exports = { diceRolling };
