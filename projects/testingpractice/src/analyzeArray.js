// An analyzeArray function that takes an array of numbers
// and returns an object with the following properties:
// average, min, max, and length.

function analyzeArray(array) {
  const average =
    array.reduce((accumulator, currentValue) => accumulator + currentValue) /
    array.length;
  const min = Math.min(...array);
  const max = Math.max(...array);
  const length = array.length;
  return {
    length: length,
    min: min,
    max: max,
    average: average,
  };
}

module.exports = analyzeArray;
