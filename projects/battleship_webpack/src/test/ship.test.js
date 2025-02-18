import { Ship } from "../ship.js";

const newShip = new Ship(3);

test("ship created with length 3", () => {
  expect(newShip.length).toEqual(3);
});

test("ship is hit 1 time", () => {
  newShip.hit();
  expect(newShip.numHits).toEqual(1);
});

test("ship is sunk after 2 more hits", () => {
  newShip.hit();
  newShip.hit();
  expect(newShip.sunk).toBe(true);
});
