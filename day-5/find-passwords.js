const crypto = require("crypto");

function findPasswords(id) {
  let counter = 0;
  let passwordChars = new Array(8).fill(false);
  let passwordCharsAlt = [...passwordChars];
  let passIdx = 0;

  while (!passwordCharsAlt.every(Boolean)) {
    const hash = crypto
      .createHash("md5")
      .update(id + counter)
      .digest("hex");

    if (hash.startsWith("00000")) {
      const pos = hash[5];
      const val = hash[6];

      if (isValidPosition(pos, 0, 7) && !passwordCharsAlt[pos]) {
        passwordCharsAlt[pos] = val;
      }

      if (passIdx < passwordChars.length) {
        passwordChars[passIdx++] = pos;
      }
    }
    counter++;
  }

  return [passwordChars.join(""), passwordCharsAlt.join("")];
}

function isValidPosition(position, start, end) {
  const pos = Number(position);
  return pos >= start && pos <= end;
}

module.exports = findPasswords;
