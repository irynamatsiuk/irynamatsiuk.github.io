import { Player, ComputerPlayer } from "./player.js";

export class Game {
  constructor() {
    this.human = new Player("human");
    this.computer = new ComputerPlayer("computer");
    this.currentPlayer = this.human;
    this.enemyPlayer = this.computer;
    this.gameOver = false;
  }
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.human ? this.computer : this.human;
    this.enemyPlayer = this.enemyPlayer === this.computer ? this.human : this.computer;
  }

  checkGameOver() {
    if (this.enemyPlayer.gameboard.allShipsSunk()) {
      return this.gameOver = true; }
    return this.gameOver = false;
  }
}


