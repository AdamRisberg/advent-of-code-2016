function findDecompressedLength(str, recursive) {
  let length = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      const info = extractRepeatInfo(str, i);
      let sectionLength = info.repeatedStr.length;

      if (recursive) {
        sectionLength = findDecompressedLength(info.repeatedStr, recursive);
      }

      length += sectionLength * info.repeat;
      i = info.end;
    } else {
      length++;
    }
  }

  return length;
}

function extractRepeatInfo(str, index) {
  const endIdx = str.indexOf(")", index);
  const rawInst = str.slice(index + 1, endIdx);
  const params = rawInst.split("x");

  const length = Number(params[0]);
  const repeat = Number(params[1]);
  const start = endIdx + 1;
  const end = endIdx + length;

  return {
    repeatedStr: str.slice(start, start + length),
    length,
    repeat,
    start,
    end
  };
}

module.exports = findDecompressedLength;
