let currentInput = '0';
let previousInput = '';
let operator = null;
let awaitingNextInput = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
    if (currentInput.length > 10) {
        display.style.fontSize = '2em';
    } else {
        display.style.fontSize = '3em';
    }
}

function appendInput(value) {
    if (awaitingNextInput) {
        currentInput = value;
        awaitingNextInput = false;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else if (value === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    awaitingNextInput = false;
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (operator && !awaitingNextInput) {
        calculateResult();
    }
    if (currentInput === 'Error') return;

    previousInput = currentInput;
    operator = nextOperator;
    awaitingNextInput = true; 
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        currentInput = 'Error';
        updateDisplay();
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    awaitingNextInput = true;
    updateDisplay();
}


document.querySelectorAll('.operator').forEach(button => {
    button.onclick = () => handleOperator(button.textContent === '÷' ? '/' : button.textContent === '*' ? '*' : button.textContent);
});

updateDisplay();