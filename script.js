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

let num1;
let num2;
let operator;

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


function digitsClick(e) {
    const display = document.querySelector(".display");
    const digit = e.target.getAttribute("id");
    const displayValue = display.textContent;

    if (digit === "." && display.textContent.includes(".")) {
        return;
    }

    if (display.textContent.length >= 15) {
        return;
    }

    if (display.textContent == "NaN" || display.textContent == "0") {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
    
}
    
const digits = document.querySelectorAll(".number");
    digits.forEach(btn => {
        btn.addEventListener("click", digitsClick);
    });

    