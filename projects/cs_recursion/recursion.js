// Function which takes a number and returns an array
// containing that many numbers from the Fibonacci sequence

// 1. Simple solution: for loop
function fibs(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    let num = arr[i - 1] + arr[i - 2];
    arr.push(num);
  }
  return arr;
}

// 2. Complex solution: recursion and loop
let arrayRecFor = [];
let number = 5;

function fibsRec(number) {
  if (number < 2) return number;
  else {
    return fibsRec(number - 1) + fibsRec(number - 2);
  }
}

for (let i = 0; i < number; i++) {
  let fibNum = fibsRec(i);
  arrayRecFor.push(fibNum);
}

// 3. Crazy recursive solution: double recursion
let arrayRecDouble = [];
// we use same fibsRec function from previuos solution to get a fibonacci number,
// but instead of for loop we use one more recursion to make a sequance

function fibsRecDouble(n) {
  if (n == 0) return;
  else {
    let arrayEl = fibsRec(n - 1);
    arrayRecDouble.unshift(arrayEl);
    fibsRecDouble(n - 1);
  }
}

// 4. Best recursive solution: recursion with memoization
let arrayMemo = [0, 1];
let num = 6;

function fibsMemo(n) {
  if (arrayMemo[n]) {
    return arrayMemo[n];
  }
  if (n < 2) {
    return n;
  }
  arrayMemo[n] = fibsMemo(n - 1) + fibsMemo(n - 2);
  return arrayMemo[n];
}

// Results:
// Array of 8 fibonacci numbers, created with for lopp
console.log(fibs(8)); // Output: [ 0, 1, 1, 2, 3, 5, 8, 13 ]

// Array of 5 fibonacci numbers, created with recursion and for loop
console.log(arrayRecFor); // Output: [ 0, 1, 1, 2, 3 ]

// Array of 9 fibonacci numbers, created with two recursions
fibsRecDouble(9);
console.log(arrayRecDouble); // Output: [ 0, 1, 1, 2, 3, 5, 8, 13, 21]

// Array of 6 fibonacci numbers, created with recursion and memoization
fibsMemo(num - 1);
console.log(arrayMemo); // Output: [ 0, 1, 1, 2, 3, 5 ]
