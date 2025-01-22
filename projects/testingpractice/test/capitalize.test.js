import capitalize from "../src/capitalize";

test("capitalize from lower case", () => {
  expect(capitalize("word")).toBe("Word");
});

test("capitalize from upper case", () => {
  expect(capitalize("WORD")).toBe("Word");
});
