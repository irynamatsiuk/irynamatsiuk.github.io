import caesarCipher from "../src/caesarCipher";

test("xyz became abc", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("HeLLo became KhOOr", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("Hello, World! became KhOOr", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
