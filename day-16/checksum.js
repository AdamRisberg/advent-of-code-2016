function invert(char) {
  return char === "0" ? "1" : "0";
}

function applyDragonCurve(arr) {
  const length = arr.length;
  arr.push("0");

  for (let i = length - 1; i >= 0; i--) {
    arr.push(invert(arr[i]));
  }

  return arr;
}

function dragonCurveToSize(arr, size) {
  while (arr.length < size) {
    applyDragonCurve(arr);
  }

  arr.length = size;
}

function performChecksumPass(arr) {
  let curIdx = 0;

  for (let i = 0; i < arr.length - 1; i += 2) {
    arr[curIdx++] = arr[i] === arr[i + 1] ? 1 : 0;
  }

  return (arr.length = arr.length / 2);
}

function createChecksum(str, diskSize) {
  let arr = str.split("");

  dragonCurveToSize(arr, diskSize);

  do {
    performChecksumPass(arr);
  } while (arr.length % 2 === 0);

  return arr.join("");
}

module.exports = createChecksum;
