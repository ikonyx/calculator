const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingSecondOperand: false,
    operator: null,
};

const updateDisplay = () => {
    const display = document.querySelector(".display");
    display.textContent = calculator.displayValue;
}

updateDisplay();



function add(a, b) {
    return a+b;
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return substract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    }
}

const keys = document.querySelector('.container');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if(target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('dot')) {
        inputDot(target.textContent);
        updateDisplay();
        return;
    }

    if(target.classList.contains('clear')) {
        resetDisplay(target.textContent);
        updateDisplay();
        return;
    }

    if(target.classList.contains('delete')) {
        deleteLastDigit(target.textContent);
        updateDisplay();
        return;
    }

        inputDigit(target.textContent);
        updateDisplay();

    });

const inputDigit = (digit) => {
    const { displayValue, waitingSecondOperand } = calculator;

    if(waitingSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingSecondOperand = false;   
    } else {
        calculator.displayValue = displayValue === "0" ? 
        digit: displayValue + digit;
    }
}

let ans;

const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingSecondOperand) {
        calculator.operator = nextOperator;
        return
    }

    if (firstOperand == null && inputValue !== NaN ) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        ans = operate(firstOperand, inputValue, operator);
        
        if (inputValue === 0 && operator === "/") {
            calculator.displayValue = "0xM1ndbl0wn 🤯";
            resetParameters();
        } else {
            calculator.displayValue = `${parseFloat(ans.toFixed(6))}`;
            calculator.firstOperand = ans;
        }     
    }

    calculator.waitingSecondOperand = true;
    calculator.operator = nextOperator;

};

const inputDot = (dot) => {
    if (calculator.waitingSecondOperand === true) {
        calculator.displayValue = "0.";
        calculator.waitingSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

const deleteLastDigit = () => {

    if (ans !== parseFloat(calculator.displayValue)) { 
        calculator.displayValue = Math.floor(calculator.displayValue/10);
    }
    
    

}

const resetDisplay = () => {
    calculator.displayValue =  "0";
    calculator.firstOperand = null;
    calculator.waitingSecondOperand = false;
    calculator.operator = null;
};

const resetParameters = () => {
    calculator.firstOperand = null;
    calculator.waitingSecondOperand = false;
    calculator.operator = null;
};