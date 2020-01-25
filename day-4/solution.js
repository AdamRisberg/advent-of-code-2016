const input = require("./input");
const roomDecrypter = require("./room-decrypter");
const {
  parseAllRoomData,
  filterInvalidRooms,
  sumRoomIDs,
  decryptAllRoomNames,
  searchRoomsByName
} = roomDecrypter;

const rooms = parseAllRoomData(input);
const validRooms = filterInvalidRooms(rooms);
const part1 = sumRoomIDs(validRooms);
console.log(`Part 1: ${part1}`);

const decryptedRooms = decryptAllRoomNames(validRooms);
const northPoleRoom = searchRoomsByName(decryptedRooms, "north");
const part2 = northPoleRoom.id;
console.log(`Part 2: ${part2}`);
