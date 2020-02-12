const crypto = require("crypto");

function findIndexOfKeyN(salt, n, hashRounds = 1) {
  const potentialKeys = {};
  let index = 0;
  const keys = [];

  while (keys.length < n) {
    const hash = generateHash(index, salt, hashRounds);
    const [triple, five] = findThreeAndFive(hash);

    if (five && potentialKeys[five]) {
      potentialKeys[five].forEach(key => {
        if (index - key.idx < 1000) {
          keys.push(key);
        }
      });
      potentialKeys[five] = [];
    }

    if (triple) {
      if (!potentialKeys[triple]) {
        potentialKeys[triple] = [];
      }

      potentialKeys[triple].push({
        idx: index,
        hash: hash
      });
    }

    index++;
  }

  return keys[n - 1].idx;
}

function generateHash(num, salt, hashRounds) {
  let hash = salt + num;

  while (hashRounds) {
    hash = crypto
      .createHash("md5")
      .update(hash)
      .digest("hex");
    hashRounds--;
  }

  return hash;
}

function findThreeAndFive(hash) {
  let prevChar = hash[0];
  let count = 1;

  let triple = "";
  let five = "";

  for (let i = 1; i <= hash.length; i++) {
    if (!triple && count === 3) {
      triple = prevChar;
    }

    if (count === 5) {
      five = prevChar;
    }

    if (hash[i] === prevChar) {
      count++;
    } else {
      prevChar = hash[i];
      count = 1;
    }
  }

  return [triple, five];
}

module.exports = { findIndexOfKeyN };
