import analyzeArray from "../src/analyzeArray";

test("array[1,8,3,4,2,6] average is 4", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).average).toBeCloseTo(4);
});

test("array[1,8,3,4,2,6] min is 1", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).min).toBe(1);
});

test("array[1,8,3,4,2,6] max is 8", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).max).toBe(8);
});

test("array[1,8,3,4,2,6] length is 6", () => {
  const length = { length: 6 };
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).length).toBe(6);
});
