function Walker(x, y) {
  this.x = x;
  this.y = y;
  this.directionX = 0;
  this.directionY = 1;
  this.visited = new Set();
  this.addVisited();
}

Walker.prototype.getPosition = function() {
  return { x: this.x, y: this.y };
};

Walker.prototype.getDirection = function() {
  return { x: this.directionX, y: this.directionY };
};

Walker.prototype.addVisited = function() {
  this.visited.add(`${this.x} ${this.y}`);
};

Walker.prototype.hasVisited = function() {
  return this.visited.has(`${this.x} ${this.y}`);
};

Walker.prototype.step = function() {
  this.x += this.directionX;
  this.y += this.directionY;
};

Walker.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
};

Walker.prototype.turn = function(direction) {
  if (direction === "R") {
    this.turnRight();
  } else {
    this.turnLeft();
  }
};

Walker.prototype.turnLeft = function() {
  const oldDir = this.getDirection();

  this.directionX = -oldDir.y;
  this.directionY = oldDir.x;
};

Walker.prototype.turnRight = function() {
  const oldDir = this.getDirection();

  this.directionX = oldDir.y;
  this.directionY = -oldDir.x;
};

module.exports = Walker;
