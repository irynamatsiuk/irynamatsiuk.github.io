import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.ships = [];
    this.board = this.createBoard();
  }

  createBoard() {
    return Array.from({ length: 10 }, () => new Array(10).fill(null));
  }

  receiveAttack(row, col) {
    const target = this.board[row][col];
    if (target instanceof Ship) {
      target.hit();
      this.board[row][col] = "hit";
      return true;
    } else {
      this.board[row][col] = "missed";
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }

  addRandomShips(shipsLengths) {
    for (let length of shipsLengths) {
      this.genRandomCoordinates(length);
      }
    }

  genRandomCoordinates(len) {
    let row, col;
    let max = 10 - len;
    let array = [];
    const isShip = (el) => el instanceof Ship;
    const isAR = (el) => el === "AR";
    do {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * max);
      array = this.board[row].slice(col, col + len);
    } while ( array.some(isShip) || array.some(isAR) ) 
    return this.placeShip(len, row, col);
  }

  placeShip(len, row, col) {
    let ship = new Ship(len);
    for (let i = 0; i < ship.length; i++) {
      this.board[row][col + i] = ship; 
    }
    this.reserveArea(len, row, col); 
    this.ships.push(ship);
  }

  // reserve 1-cell area around ships to avoid ships "touching" each other
  reserveArea(len, row, col) {
    for (let i = 0; i < len; i++) {
      if ( row != 0 ) 
        this.board[row - 1][col + i] = "AR"; // AR is for "Area Reserved"
      if ( row != 9 ) 
        this.board[row + 1][col + i] = "AR";
    }
    if ( col != 0 ) 
      this.board[row][col - 1] = "AR";
    if ( col != 9 )
      this.board[row][col + len] = "AR";
    if ( row != 0 && col != 0 )
      this.board[row - 1][col - 1] = "AR"; 
    if ( row != 9 && col != 9 )
      this.board[row + 1][col + len] = "AR"; 
    if ( row != 9 && col != 0 )
      this.board[row + 1][col - 1] = "AR"; 
    if ( row != 0 && col != 9 )
      this.board[row - 1][col + len] = "AR"; 
  }

}
