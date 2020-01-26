function filterNonTLS(addresses) {
  return addresses
    .map(separateHypernet)
    .filter(supportsTLS)
    .map(address => address.original);
}

function filterNonSSL(addresses) {
  return addresses
    .map(separateHypernet)
    .filter(supportsSSL)
    .map(address => address.original);
}

function supportsSSL(addressInfo) {
  const { segments, hypernets } = addressInfo;

  const abas = findABAs(segments);
  return hasMatchingBAB(hypernets, abas);
}

function findABAs(segments) {
  const abas = [];

  for (let segment of segments) {
    for (let i = 0; i < segment.length; i++) {
      const aba = segment.slice(i, i + 3);

      if (aba[0] === aba[2] && aba[0] !== aba[1]) {
        abas.push(aba);
      }
    }
  }

  return abas;
}

function hasMatchingBAB(hypernets, abas) {
  for (let hypernet of hypernets) {
    for (let aba of abas) {
      if (hypernet.indexOf(aba[1] + aba[0] + aba[1]) !== -1) {
        return true;
      }
    }
  }
  return false;
}

function supportsTLS(addressInfo) {
  const { segments, hypernets } = addressInfo;
  return segments.some(hasABBA) && !hypernets.some(hasABBA);
}

function hasABBA(str) {
  for (let i = 0; i < str.length - 3; i++) {
    const pairA = str.substr(i, 2);
    const reversedPairB = str
      .substr(i + 2, 2)
      .split("")
      .reverse()
      .join("");

    if (pairA === reversedPairB && pairA[0] !== pairA[1]) {
      return true;
    }
  }
  return false;
}

function separateHypernet(address) {
  const regex = new RegExp(/\[[a-z]+\]/g);
  let regResult = regex.exec(address);
  const hypernets = [];
  const segments = address.replace(regex, ",").split(",");

  while (regResult) {
    hypernets.push(regResult[0].slice(1, -1));
    regResult = regex.exec(address);
  }

  return {
    original: address,
    segments,
    hypernets
  };
}

module.exports = {
  filterNonSSL,
  filterNonTLS
};
