// object that contains functions for the basic operations:
// add, subtract, divide, and multiply.
// Each of these functions should take two numbers and return the correct calculation
const calculator = {
  add: (a, b) => a + b,
  substract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b == 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  },
};

module.exports = calculator;
