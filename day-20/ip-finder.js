function extractRanges(input) {
  return input
    .map(str => {
      const [start, end] = str.split("-");
      return { start: Number(start), end: Number(end) };
    })
    .sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      } else if (a.start > b.start) {
        return 1;
      } else if (a.end < b.end) {
        return -1;
      } else {
        return 1;
      }
    });
}

function findLowestNotBlocked(blockedRanges, validStart, validEnd) {
  let first = validStart;

  for (let { start, end } of blockedRanges) {
    if (start > first) {
      return first;
    }

    first = Math.max(end + 1, first);
  }

  if (first <= validEnd) {
    return first;
  }

  return null;
}

function countNotBlocked(blockedRanges, validStart, validEnd) {
  let first = validStart;
  let total = 0;
  validEnd++;

  for (let { start, end } of blockedRanges) {
    if (start > first) {
      total += start - first;
    }

    first = Math.max(end + 1, first);
  }

  if (first <= validEnd) {
    total += validEnd - first;
  }

  return total;
}

module.exports = {
  extractRanges,
  findLowestNotBlocked,
  countNotBlocked
};
