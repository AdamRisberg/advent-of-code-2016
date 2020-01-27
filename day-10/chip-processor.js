function processChips(instructions, trackedChips = [], lookup = {}, seen = {}) {
  let shouldRecurse = false;

  for (let instruction of instructions) {
    if (seen[instruction]) {
      continue;
    }

    const regex = new RegExp(/[a-z]+ [0-9]+/g);
    shouldRecurse = true;

    if (instruction.startsWith("value")) {
      const value = runRegex(regex, instruction, true);
      const botToGetValue = runRegex(regex, instruction);

      transferChip(botToGetValue, value, lookup);
    } else {
      const botWithChips = runRegex(regex, instruction);
      const botToGetLow = runRegex(regex, instruction);
      const botToGetHigh = runRegex(regex, instruction);

      if (!hasTwoChips(botWithChips, lookup)) {
        continue;
      }

      const [lowChip, highChip] = lookup[botWithChips];

      if (isTrackedChips(lowChip, highChip, trackedChips)) {
        lookup.trackedChips = botWithChips.slice(4);
      }

      transferChip(botToGetLow, lowChip, lookup);
      transferChip(botToGetHigh, highChip, lookup);
      lookup[botWithChips] = [];
    }

    seen[instruction] = true;
  }

  if (shouldRecurse) {
    processChips(instructions, trackedChips, lookup, seen);
  }

  return lookup;
}

function isTrackedChips(chipA, chipB, trackedChips) {
  return trackedChips.includes(chipA) && trackedChips.includes(chipB);
}

function hasTwoChips(botName, lookup) {
  return lookup[botName] && lookup[botName].length === 2;
}

function transferChip(botName, chip, lookup) {
  if (!lookup[botName]) {
    lookup[botName] = [];
  }

  lookup[botName].push(chip);
  lookup[botName].sort((a, b) => a - b);
}

function runRegex(regex, str, getValue) {
  const regResult = regex.exec(str)[0];

  if (getValue) {
    return Number(regResult.split(" ")[1]);
  }

  return regResult;
}

function multiplyChips(arrayOfChips, lookup) {
  return arrayOfChips.reduce((total, chip) => total * lookup[chip][0], 1);
}

module.exports = {
  processChips,
  multiplyChips
};
