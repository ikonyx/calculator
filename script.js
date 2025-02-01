let num1;
let num2;
let ans;

const calculator = {
    displayValue: "0",
    firstOperand: null,
    secondOperand: false,
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
    if (operator == "+") {
        add(num1, num2);
    } else if (operator == "-") {
        substract(num1, num2);
    } else if (operator == "*") {
        multiply(num1, num2);
    } else if (operator == "/") {
        divide(num1, num2);
    }
}

const keys = document.querySelector('.container');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    

    if(target.classList.contains('operator')) {
        handleOperator(target.textContent);
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

        inputDigit(target.textContent);
        updateDisplay();

    });

const inputDigit = (digit) => {
    const { displayValue, secondOperand } = calculator;

    if(secondOperand === true) {
        calculator.displayValue = digit;
        calculator.secondOperand = false;   
    } else {
        calculator.displayValue = displayValue === "0" ? 
        digit: displayValue + digit;
    }
}


const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.secondOperand) {
        calculator.operator = nextOperator;
        return
    }

    if (firstOperand == null && inputValue !== NaN ) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const ans = operate(firstOperand, inputValue, operator)

        calculator.displayValue = `${parseFloat(ans.toFixed(6))}`;
        calculator.firstOperand = ans;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOperator;

};

const inputDot = (dot) => {
    if (calculator.secondOperand === true) {
        calculator.displayValue = "0.";
        calculator.secondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}