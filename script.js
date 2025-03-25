let currentInput = "";
let previousInput = "";
let operator = "";

const display = document.getElementById("display");

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === "" && number === "0") return; // Prevent leading zero
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (currentInput.includes(".")) return; // Prevent multiple decimals
    currentInput += ".";
    updateDisplay();
}

function handleOperator(selectedOperator) {
    if (currentInput === "") return; // Prevent operator input if no number entered
    if (previousInput !== "") {
        operate();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = "";
}

function operate() {
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        if (num2 === 0) {
            result = "Error";
            currentInput = "";
            operator = "";
            previousInput = "";
            updateDisplay();
            return;
        } else {
            result = num1 / num2;
        }
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay();
}

function handleEquals() {
    if (previousInput !== "" && currentInput !== "") {
        operate();
    }
}

// Event listeners
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("equals").addEventListener("click", handleEquals);

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        const buttonText = button.innerText;
        if (buttonText >= "0" && buttonText <= "9") {
            appendNumber(buttonText);
        } else if (buttonText === ".") {
            appendDecimal();
        } else if (buttonText === "+" || buttonText === "-" || buttonText === "*" || buttonText === "/") {
            handleOperator(buttonText);
        }
    });
});
