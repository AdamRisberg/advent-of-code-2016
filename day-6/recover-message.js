function recoverMessage(messages, altMode) {
  return createListOfCharsByPosition(messages)
    .map(createCharCountsObj)
    .map(counts => charCountsToChar(counts, altMode))
    .join("");
}

function createListOfCharsByPosition(messages) {
  const positions = new Array(messages[0].length).fill(null).map(() => []);

  for (let message of messages) {
    for (let i = 0; i < message.length; i++) {
      positions[i].push(message[i]);
    }
  }

  return positions;
}

function createCharCountsObj(chars) {
  const counts = {};

  for (let char of chars) {
    if (!counts[char]) {
      counts[char] = 0;
    }
    counts[char]++;
  }

  return counts;
}

function charCountsToChar(counts, useLeastCommon) {
  return Object.keys(counts).sort((a, b) => {
    if (useLeastCommon) {
      return counts[a] - counts[b];
    }
    return counts[b] - counts[a];
  })[0];
}

module.exports = recoverMessage;
