import { Gameboard } from "../gameboard";

let newBoard = new Gameboard();

test("board array has 10 elements (rows)", () => {
  expect(newBoard.board.length).toEqual(10);
});

test("board's 10th row has 10 elements (columns)", () => {
  expect(newBoard.board[9].length).toEqual(10);
});

test("ships array contains 1 ship", () => {
  newBoard.placeShip(3, 2, 3);
  expect(newBoard.ships.length).toEqual(1);
});

test("ship receive attack", () => {
  newBoard.receiveAttack(2, 3);
  const target = newBoard.board[2][3];
  expect(target).toEqual("hit");
});

test("all ships are not sunk", () => {
  newBoard.receiveAttack(2, 4);
  expect(newBoard.allShipsSunk()).toBe(false);
});

test("all ships are sunk", () => {
  newBoard.receiveAttack(2, 5);
  newBoard.receiveAttack(2, 4);
  expect(newBoard.allShipsSunk()).toBe(true);
});

test("add 3 ships", () => {
  newBoard.addRandomShips([3, 2, 1]);
  expect(newBoard.ships.length).toEqual(4); // sunk ship is included
})