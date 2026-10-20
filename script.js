
const display = document.getElementById("display");

let firstNumber = null;
let currentOperator = null;
let shouldReset = false;

function appendNumber(number) {
    if (shouldReset) {
        display.value = number === "." ? "0." : number;
        shouldReset = false;
        return;
    }

    if (number === "." && display.value.includes(".")) {
        return;
    }

    if (display.value === "0" && number !== ".") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function chooseOperator(operator) {
    firstNumber = parseFloat(display.value);
    currentOperator = operator;
    shouldReset = true;
}

function calculate() {
    if (currentOperator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);
    let result;

    switch (currentOperator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                display.value = "Cannot divide by zero";
                firstNumber = null;
                currentOperator = null;
                shouldReset = true;
                return;
            }
            result = firstNumber / secondNumber;
            break;
    }

    display.value = String(
        Number(result.toPrecision(12))
    );

    firstNumber = null;
    currentOperator = null;
    shouldReset = true;
}

function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    currentOperator = null;
    shouldReset = false;
}

function deleteLast() {
    if (shouldReset) {
        display.value = "0";
        shouldReset = false;
        return;
    }

    display.value = display.value.slice(0, -1) || "0";
}

function percentage() {
    display.value = String(parseFloat(display.value) / 100);
    shouldReset = true;
}
