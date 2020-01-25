function searchRoomsByName(rooms, name) {
  const regex = new RegExp(name);

  for (let room of rooms) {
    if (regex.test(room.name)) {
      return room;
    }
  }

  return null;
}

function decryptAllRoomNames(rooms) {
  return rooms.map(decryptRoomName);
}

function decryptRoomName(room) {
  room.name = room.name
    .split("")
    .map(char => rotateChar(char, room.id))
    .join("");

  return room;
}

function rotateChar(char, amount) {
  let adjAmount = amount % 26;
  let charCode = char.charCodeAt(0);

  if (charCode < 97 || charCode > 122) {
    return char;
  }

  while (adjAmount--) {
    charCode++;
    if (charCode > 122) {
      charCode = 97;
    }
  }
  return String.fromCharCode(charCode);
}

function sumRoomIDs(rooms) {
  return rooms.reduce((sum, room) => sum + room.id, 0);
}

function filterInvalidRooms(rooms) {
  return rooms.filter(isRoomValid);
}

function isRoomValid(room) {
  const charCount = getCharCount(room.name);
  const checksum = charCountToChecksum(charCount);
  return checksum === room.checksum;
}

function getCharCount(str) {
  const chars = {};

  for (let char of str) {
    if (!chars[char]) {
      chars[char] = 0;
    }
    if (char !== " ") {
      chars[char]++;
    }
  }

  return chars;
}

function charCountToChecksum(charCount) {
  return Object.keys(charCount)
    .map(char => ({
      char,
      count: charCount[char]
    }))
    .sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      if (a.char < b.char) return -1;
      if (a.char > b.char) return 1;
    })
    .map(({ char }) => char)
    .join("")
    .slice(0, 5);
}

function parseAllRoomData(data) {
  return data.map(parseRoomData);
}

function parseRoomData(data) {
  const id = Number(data.replace(/[^0-9]/g, ""));
  const checksum = data.slice(-6, -1);
  const name = data.slice(0, -10).replace(/-/g, " ");

  return { name, id, checksum };
}

module.exports = {
  parseAllRoomData,
  filterInvalidRooms,
  sumRoomIDs,
  decryptAllRoomNames,
  searchRoomsByName
};
