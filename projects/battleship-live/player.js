import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard;
  }
  attack(gameboard, row, col) {
    return gameboard.receiveAttack(row, col);
  }
}

export class ComputerPlayer extends Player {

  computerAttack(gameboardHuman) {
    let row, col;
    let board = gameboardHuman.board;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (board[row][col] === "missed" || board[row][col] === "hit" );
      return this.attack(gameboardHuman, row, col);
  }

}







