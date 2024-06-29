document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.cal-btn button');
  let currentInput = '';
  let operator = '';
  let previousInput = '';
  let expression = '';
  let resultDisplayed = false;

  // Arithmetic functions
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) return 'Error'; // Handle division by zero
    return a / b;
  }

  function modulo(a, b) {
    return a % b;
  }

  function floorDivide(a, b) {
    return Math.floor(a / b);
  }

  // Operate function
  function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case 'X':
        return multiply(a, b);
      case '÷':
        return divide(a, b);
      case '%':
        return modulo(a, b);
      default:
        return b;
    }
  }

  function updateDisplay() {
    display.value = expression || '0';
  }

  function handleInput(value) {
    if (!isNaN(value) || value === '.') {
      if (value === '.' && currentInput.includes('.')) return;
      if (value === '0' && (currentInput === '' || currentInput === '0')) return;
      if (resultDisplayed) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      expression += value;
      updateDisplay();
    } else if (['÷', 'X', '-', '+', '%'].includes(value)) {
      if (currentInput) {
        if (previousInput && operator && currentInput) {
          previousInput = operate(operator, previousInput, currentInput).toString();
          expression = previousInput + value;
        } else {
          previousInput = currentInput;
          expression += value;
        }
        operator = value;
        currentInput = '';
        resultDisplayed = false;
        updateDisplay();
      }
    } else if (value === 'C') {
      currentInput = '';
      operator = '';
      previousInput = '';
      expression = '';
      display.value = '0';
    } else if (value === 'D') {
      if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
        updateDisplay();
      } else if (previousInput && operator) {
        operator = '';
        expression = previousInput;
        updateDisplay();
      }
    } else if (value === '=') {
      if (currentInput && previousInput) {
        const result = operate(operator, previousInput, currentInput);
        expression = result.toString();
        display.value = expression;
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        resultDisplayed = true;
      }
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      handleInput(button.textContent);
    });
  });

  document.addEventListener('keydown', function (e) {
    let key = e.key;

    if (key >= '0' && key <= '9') {
      handleInput(key);
    } else if (key === '.') {
      handleInput(key);
    } else if (key === '+') {
      handleInput('+');
    } else if (key === '-') {
      handleInput('-');
    } else if (key === '*') {
      handleInput('X');
    } else if (key === '/') {
      handleInput('÷');
    } else if (key === 'Enter' || key === '=') {
      handleInput('=');
    } else if (key === 'Backspace') {
      handleInput('D');
    } else if (key === 'Escape') {
      handleInput('C');
    }
  });
});