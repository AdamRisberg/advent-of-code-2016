// Slow, but allowed me to find a pattern
function stealPresents(numOfElves) {
  if (numOfElves === 1) {
    return 1;
  }

  const elves = new Array(numOfElves).fill(1);
  let lastElfIdx = 0;
  let curElfIdx = 1;

  while (lastElfIdx !== curElfIdx) {
    elves[lastElfIdx] += elves[curElfIdx];
    elves[curElfIdx] = 0;

    lastElfIdx = findNextNthWithPresents(elves, curElfIdx, 1);
    curElfIdx = findNextNthWithPresents(elves, lastElfIdx, 1);
  }

  return lastElfIdx + 1;
}

// Way too slow, but allowed me to find a pattern
function stealPresentsCircle(numOfElves) {
  const elves = new Array(numOfElves).fill(1);
  let elvesLeft = elves.length;
  let curElfIdx = 0;

  while (elvesLeft > 1) {
    const n = Math.floor(elvesLeft / 2);
    const stealFromIdx = findNextNthWithPresents(elves, curElfIdx, n);

    elves[curElfIdx] += elves[stealFromIdx];
    elves[stealFromIdx] = 0;
    elvesLeft--;
    curElfIdx = findNextNthWithPresents(elves, curElfIdx, 1);
  }

  return curElfIdx + 1;
}

function findNextNthWithPresents(elves, curIdx, n) {
  while (n) {
    curIdx++;

    if (curIdx >= elves.length) {
      curIdx = 0;
    }

    if (elves[curIdx]) {
      n--;
    }
  }

  return curIdx;
}

function findWinner(numOfElves) {
  let winner = 1;
  let roundCounter = 1;
  let roundGoal = 2;
  numOfElves -= 2;

  while (numOfElves > 0) {
    numOfElves--;
    winner += 2;

    if (roundCounter === roundGoal) {
      roundGoal *= 2;
      roundCounter = 1;
      winner = 1;
    } else {
      roundCounter++;
    }
  }

  return winner;
}

function findWinnerInCircle(numOfElves) {
  if (numOfElves === 3) {
    return 3;
  }

  let winner = 1;
  let roundCounter = 1;
  let roundGoal = 3;
  let single = true;
  numOfElves -= 4;

  while (numOfElves > 0) {
    numOfElves--;
    winner += single ? 1 : 2;

    if (roundCounter === roundGoal) {
      if (!single) {
        roundGoal *= 3;
        winner = 1;
      }

      single = !single;
      roundCounter = 1;
    } else {
      roundCounter++;
    }
  }

  return winner;
}

module.exports = {
  findWinner,
  findWinnerInCircle
};
