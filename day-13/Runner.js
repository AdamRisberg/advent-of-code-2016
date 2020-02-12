class Runner {
  constructor(position = new Coords(), visited = new Set()) {
    this.position = position;
    this.visited = visited;
    this.addVisited(this.position);
  }

  hasVisited(coords) {
    return this.visited.has(JSON.stringify(coords));
  }

  addVisited(coords) {
    this.visited.add(JSON.stringify(coords));
  }
}

module.exports = Runner;
