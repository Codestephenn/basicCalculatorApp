let firstOperand = "";
let secondOperand = "";
let operator = "";
let shouldResetDisplay = false;

const valuesBtn = document.querySelectorAll(".values");
const operatorsBtn = document.querySelectorAll(".operators");
const inputEl = document.getElementById("display");
const equalsBtn = document.getElementById("equals");

// Basic arithmetic functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error"; // Prevent division by zero
  }
  let result = (num1 / num2).toFixed(2);
  return Number(result);
}

// Function to operate based on the operator
function operate(num1, operatorSign, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operatorSign) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "X":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return null;
  }
}

// Clear the display
function clearDisplay() {
  inputEl.value = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
}

// Delete the last character from the display
function deleteLastCharacter() {
  inputEl.value = inputEl.value.slice(0, -1);
}

// Calculate percentage
function calculatePercentage() {
  const currentValue = Number(inputEl.value);
  const percentageValue = (currentValue / 100).toString();
  inputEl.value = percentageValue;
}

// Add event listeners to the values buttons
valuesBtn.forEach(value => {
  value.addEventListener('click', () => {
    if (shouldResetDisplay) {
      inputEl.value = "";
      shouldResetDisplay = false;
    }
    inputEl.value += value.textContent;
  });
});

// Add event listeners to the operators buttons
operatorsBtn.forEach(operatorBtn => {
  operatorBtn.addEventListener('click', () => {
    console.log(firstOperand)
    console.log(operator)
    const operatorValue = operatorBtn.textContent;
    if (operatorValue === "C") {
      clearDisplay();
    } else if (operatorValue === "D") {
      deleteLastCharacter();
    } else if (["+", "-", "X", "÷"].includes(operatorValue)) {
      if (firstOperand === "") {
        firstOperand = inputEl.value;
        operator = operatorValue;
        shouldResetDisplay = true;
      } else if (operator !== "") {
        secondOperand = inputEl.value;
        const result = operate(firstOperand, operator, secondOperand);
        inputEl.value = result;
        firstOperand = result;
        operator = operatorValue;
        shouldResetDisplay = true;
      }
    } else if (operatorValue === "%") {
      calculatePercentage();
    }
  });
});

// Add event listener to the equals button
equalsBtn.addEventListener('click', () => {
  if (firstOperand !== "" && operator !== "") {
    secondOperand = inputEl.value;
    const result = operate(firstOperand, operator, secondOperand);
    inputEl.value = result;
    firstOperand = result;
    operator = "";
    shouldResetDisplay = true;
    console.log("=clicked")
    
  }
});