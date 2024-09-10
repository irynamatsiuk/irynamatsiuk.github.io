let previousNumber = '';
let currentNumber = '';
let operator = '';

let display = document.querySelector('.display');
let numberButtons = document.querySelectorAll('.number');
let operatorButtons = document.querySelector('#right');

// Calculation
function operate(op, prevNum, curNum) {
    prevNum = Number(prevNum);
    curNum = Number(curNum);
    switch (op) {
        case '+':
            return add(prevNum, curNum);
            break;
        case '-':
            return substract(prevNum,curNum);
            break;
        case '*':
            return multiply(prevNum, curNum);
            break;
        case '/':
            return divide(prevNum, curNum);
    }
}

function add(previousNumber, currentNumber) {
 return previousNumber + currentNumber;
}

function substract(previousNumber, currentNumber) {
    return previousNumber - currentNumber;
}

function multiply(previousNumber, currentNumber) {
    return previousNumber * currentNumber;
}

function divide(previousNumber, currentNumber) {
    if(currentNumber==0) {
        clearAllData;
        return 'error'}
    return previousNumber / currentNumber;
}


// -------------------------EventListeners:
// ---------------- forEach: EventListeners Numbers
numberButtons.forEach((number) => {
    number.addEventListener('click', function(event) {
        if(currentNumber.length <= 5) {
            currentNumber += event.target.textContent;
            display.textContent = currentNumber;
            }
        }
    )
})

// ----------------- Event Delegation: EeventListeners Operators
operatorButtons.addEventListener('click', (event) => {
    
    if(previousNumber != '' && currentNumber != '') {
        previousNumber = operate(operator, previousNumber, currentNumber); 
        display.textContent = previousNumber; 
    } else {
        previousNumber = currentNumber;
        display.textContent = ''; 
    }
    currentNumber = '';
    operator = (event.target.textContent);
})

equals.addEventListener('click', function() {
    if(currentNumber !='' && previousNumber !='' && operator != '') {
        display.textContent = operate(operator, previousNumber, currentNumber);  
        operator = '';
        previousNumber = '';
    }
    currentNumber = display.textContent;
})

clear.addEventListener('click', function() {
    clearAllData();
})


decimal.addEventListener('click', function() {
    if(!currentNumber.includes ('.')) {
        currentNumber +=('.');
    }
})

backspace.addEventListener('click', function() {
    if(display.textContent === 'error') {
        clearAllData();
    } else {
    currentNumber = currentNumber.slice(0,-1);
    display.textContent = currentNumber;
    }
}) 

function clearAllData() {
    previousNumber = '';
    currentNumber = '';
    operator = '';
    display.textContent = '';
}



