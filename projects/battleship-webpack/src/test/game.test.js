import { Game } from "../game";

let game = new Game;
game.human.gameboard.placeShip(3, 4, 5);
game.computer.gameboard.placeShip(2, 8, 3);


test("game over", () => {
  game.checkGameOver();
  expect(game.gameOver).toBe(false);
})


test("game over", () => {
  game.human.attack(game.computer.gameboard, 8, 3);
  game.human.attack(game.computer.gameboard, 8, 4);
  game.checkGameOver();
  expect(game.gameOver).toBe(true);
})

test("switch current player to computer", () => {
  game.switchPlayer();
  expect(game.currentPlayer).toBe(game.computer);
  expect(game.enemyPlayer).toBe(game.human);
})