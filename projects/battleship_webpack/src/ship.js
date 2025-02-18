export class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
    this.sunk = false;
  }

  hit() {
    this.numHits += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.numHits < this.length) return;
    return (this.sunk = true);
  }
}
