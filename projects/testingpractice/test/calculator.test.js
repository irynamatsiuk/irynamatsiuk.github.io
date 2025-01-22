import calculator from "../src/calculator";

test("add 3 + 2 to equal 5", () => {
  expect(calculator.add(3, 2)).toBe(5);
});

test("substract 9 - 2 to equal 7", () => {
  expect(calculator.substract(9, 2)).toBe(7);
});

test("multiply 5 * 3 to equal 15", () => {
  expect(calculator.multiply(5, 3)).toBeCloseTo(15);
});

test("divide 6 / 2 to equal 3", () => {
  expect(calculator.divide(6, 2)).toBeCloseTo(3);
});

test("divide 6 / 0 throw an Error", () => {
  expect(() => calculator.divide(6, 0)).toThrow("Cannot divide by zero");
});
