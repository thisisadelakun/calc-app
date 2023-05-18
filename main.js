// ----------------------------- ?_____LEVEL_____? -------------------------------------- 

const switchLevel = document.querySelector('.switch');
const calc = document.querySelector('.calc-col');
const calcPro = document.querySelector('.calcpro-col');
const hideTag = document.querySelector('.hiddentag');
const showTag = document.querySelector('.showntag')

switchLevel.addEventListener('change', function () {
    if (this.checked) {
        calcPro.style.display = 'block';
        hideTag.style.display = "block";
        calc.style.display = 'none';
        showTag.style.display = "none";
    } else {
        calcPro.style.display = 'none';
        hideTag.style.display = "none";
        calc.style.display = 'block';
        showTag.style.display = "block";
    }
});


// ----------------------------- ?_____THEME_____? -------------------------------------- 

const styles = document.querySelectorAll("link");
let switchTheme = document.querySelectorAll('.choose-theme-check input[type="radio"]');

function chooseTheme(i) {
    if (i === "0") {
        styles[2].setAttribute("href", "");
    } else {
        styles[2].setAttribute("href", `css/theme${i}.css`);
    }
}

switchTheme.forEach(radioButton => {
    radioButton.addEventListener("click", () => {
        chooseTheme(radioButton.value);
    });
});





// ----------------------------- ?_____CALC_____? -------------------------------------- 


const calculator = {
    displayValue: "0",
    initialOperand: null,
    currentOperand: null,
    awaitingCurrentOperand: false,
    operator: null,
};

const displayScreen = document.querySelector(".displayscreen");
const keyPads = document.querySelector("#keypad-col");

function updateDisplay() {
    const displayValue = calculator.displayValue;
    const formattedValue = formatNumber(displayValue);
    displayScreen.value = formattedValue;
} updateDisplay();

function formatNumber(number) {
    const parts = number.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1];

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedValue = integerPart;

    if (decimalPart) {
        formattedValue += "." + decimalPart;
    }

    return formattedValue;
}



keyPads.addEventListener("mousedown", (e) => {
    const target = e.target;
    const key = target.dataset.key;

    if (key === undefined) {
        return;
    }

    switch (key) {
        case "+":
        case "-":
        case "x":
        case "/":
        case "=":
            operation(key);
            break;
        case "RESET":
            reset();
            break;
        case "DEL":
            deleteDigit();
            break;
        case "+/-":
            changeSign();
            break;
        default:
            if (Number.isInteger(parseFloat(key))) {
                inputDigit(key);
            } else if (key === ".") {
                inputDecimalPoint();
            }
    }

    updateDisplay();
});

function inputDigit(digit) {
    const displayValue = calculator.displayValue;
    const awaitingCurrentOperand = calculator.awaitingCurrentOperand;

    if (awaitingCurrentOperand === true) {
        calculator.displayValue = digit;
        calculator.awaitingCurrentOperand = false;
    } else {
        calculator.displayValue =
            displayValue === "0" ? digit : displayValue + digit;
    }
}

function inputDecimalPoint() {
    if (calculator.awaitingCurrentOperand === true || calculator.displayValue === ".") {
        calculator.displayValue = "0.";
    } else if (!calculator.displayValue.includes(".")) {
        calculator.displayValue += ".";
    }
    calculator.awaitingCurrentOperand = false;
}


function operation(setOperation) {
    const { initialOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.awaitingCurrentOperand) {
        calculator.operator = setOperation;
        return;
    }

    if (initialOperand === null && !isNaN(inputValue)) {
        calculator.initialOperand = inputValue;
    } else if (operator) {
        const result = calculating(initialOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.initialOperand = result;
        calculator.awaitingCurrentOperand = true;
    }

    calculator.awaitingCurrentOperand = true;
    calculator.operator = setOperation;
    updateDisplay();
}

function calculating(initialOperand, currentOperand, operator) {
    if (operator === "+") {
        return initialOperand + currentOperand;
    } else if (operator === "-") {
        return initialOperand - currentOperand;
    } else if (operator === "x") {
        return initialOperand * currentOperand;
    } else if (operator === "/") {
        return initialOperand / currentOperand;
    }

    return currentOperand;
}

function changeSign() {
    const displayValue = calculator.displayValue;

    if (displayValue === "0") {
        return;
    }

    if (displayValue.startsWith("-")) {
        calculator.displayValue = displayValue.substring(1);
    } else {
        calculator.displayValue = "-" + displayValue;
    }
}

function reset() {
    calculator.displayValue = "0";
    calculator.initialOperand = null;
    calculator.awaitingCurrentOperand = false;
    calculator.operator = null;
}

function deleteDigit() {
    if (calculator.awaitingCurrentOperand) {
        return;
    }

    const displayValue = calculator.displayValue;

    if (displayValue.length === 1) {
        calculator.displayValue = "0";
    } else {
        calculator.displayValue = displayValue.slice(0, -1);
    }
}

// ----------------------------- ?_____END OF CALC_____? --------------------------------------




// ----------------------------- ?_____CALC PRO_____? --------------------------------------

const calculatorPro = {
    displayValuePro: "0",
    initialOperandPro: null,
    currentOperandPro: null,
    awaitingCurrentOperandPro: false,
    operatorPro: null,
};

const displayScreenPro = document.querySelector(".displayscreenPro");
const keyPadsPro = document.querySelector("#keypad-colPro");
const acButton = document.getElementById("acButton");

function updateDisplayPro() {
    const displayValuePro = parseFloat(calculatorPro.displayValuePro);
    const formattedValuePro = displayValuePro.toLocaleString("en");
    displayScreenPro.value = formattedValuePro;
}

updateDisplayPro();

keyPadsPro.addEventListener("click", (e) => {
    const target = e.target;
    const dataKey = target.getAttribute("data-key");

    if (!dataKey) {
        return;
    }

    switch (dataKey) {
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
        case "equal":
            operationPro(dataKey);
            break;
        case ".":
            inputDecimalPointPro();
            break;
        case "sqrt":
            calculateSquareRoot();
            break;
        case "percentage":
            calculatePercentage();
            break;
        case "AC":
            resetPro();
            break;
        case "power":
            calculateExponentiation();
            break;
        case "delete":
            deleteDigitPro();
            break;
        case "inverse":
            calculateInverse();
            break;
        case "changeSignPro":
            changeSignPro();
            break;
        default:
            if (!isNaN(parseFloat(dataKey))) {
                inputDigitPro(dataKey);
            }
    }
    updateDisplayPro();
});

function inputDigitPro(digitPro) {
    const displayValuePro = calculatorPro.displayValuePro;
    const awaitingCurrentOperandPro = calculatorPro.awaitingCurrentOperandPro;

    if (awaitingCurrentOperandPro === true) {
        calculatorPro.displayValuePro = digitPro;
        calculatorPro.awaitingCurrentOperandPro = false;
    } else {
        calculatorPro.displayValuePro =
            displayValuePro === "0" ? digitPro : displayValuePro + digitPro;
    }
}

function inputDecimalPointPro() {
    if (calculatorPro.awaitingCurrentOperandPro === true) {
        calculatorPro.displayValuePro = "0.";
        calculatorPro.awaitingCurrentOperandPro = false;
        return;
    }

    if (!calculatorPro.displayValuePro.includes(".")) {
        calculatorPro.displayValuePro += ".";
    }
}

function operationPro(setOperationPro) {
    const { initialOperandPro, displayValuePro, operatorPro } = calculatorPro;
    const inputValuePro = parseFloat(displayValuePro);

    if (operatorPro && calculatorPro.awaitingCurrentOperandPro) {
        calculatorPro.operatorPro = setOperationPro;
        return;
    }

    if (initialOperandPro === null && !isNaN(inputValuePro)) {
        calculatorPro.initialOperandPro = inputValuePro;
    } else if (operatorPro) {
        const result = calculatingPro(initialOperandPro, inputValuePro, operatorPro);
        calculatorPro.displayValuePro = `${parseFloat(result.toFixed(7))}`;
        calculatorPro.initialOperandPro = result;
        calculatorPro.awaitingCurrentOperandPro = true;
    }

    calculatorPro.awaitingCurrentOperandPro = true;
    calculatorPro.operatorPro = setOperationPro;
}

function calculatingPro(initialOperandPro, currentOperandPro, operatorPro) {
    if (operatorPro === "add") {
        return initialOperandPro + currentOperandPro;
    } else if (operatorPro === "subtract") {
        return initialOperandPro - currentOperandPro;
    } else if (operatorPro === "multiply") {
        return initialOperandPro * currentOperandPro;
    } else if (operatorPro === "divide") {
        return initialOperandPro / currentOperandPro;
    }

    return currentOperandPro;
}

function calculateSquareRoot() {
    const inputValuePro = parseFloat(calculatorPro.displayValuePro);
    const result = Math.sqrt(inputValuePro);
    calculatorPro.displayValuePro = parseFloat(result.toFixed(7));
    calculatorPro.awaitingCurrentOperandPro = true;
}

function calculatePercentage() {
    const inputValuePro = parseFloat(calculatorPro.displayValuePro);
    const result = inputValuePro / 100;
    calculatorPro.displayValuePro = parseFloat(result.toFixed(7));
    calculatorPro.awaitingCurrentOperandPro = true;
}

function calculateExponentiation() {
    const { initialOperandPro, displayValuePro } = calculatorPro;
    const inputValuePro = parseFloat(displayValuePro);
    const result = Math.pow(initialOperandPro, inputValuePro);
    calculatorPro.displayValuePro = parseFloat(result.toFixed(7));
    calculatorPro.awaitingCurrentOperandPro = true;
}


function calculateInverse() {
    const inputValuePro = parseFloat(calculatorPro.displayValuePro);
    const result = 1 / inputValuePro;
    calculatorPro.displayValuePro = parseFloat(result.toFixed(7));
    calculatorPro.awaitingCurrentOperandPro = true;
}


function resetPro() {
    calculatorPro.displayValuePro = "0";
    calculatorPro.initialOperandPro = null;
    calculatorPro.currentOperandPro = null;
    calculatorPro.awaitingCurrentOperandPro = false;
    calculatorPro.operatorPro = null;
}

function deleteDigitPro() {
    const displayValuePro = calculatorPro.displayValuePro;
    const newValuePro = displayValuePro.slice(0, -1);
    calculatorPro.displayValuePro = newValuePro === "" ? "0" : newValuePro;
}

function changeSignPro() {
    const displayValuePro = calculatorPro.displayValuePro;
    const newValuePro = parseFloat(displayValuePro) * -1;
    calculatorPro.displayValuePro = parseFloat(newValuePro.toFixed(7));
}










// function calculatingPro(initialOperandPro, currentOperandPro, operatorPro) {
//     if (operatorPro === "+") {
//         return initialOperandPro + currentOperandPro;
//     } else if (operatorPro === "-") {
//         return initialOperandPro - currentOperandPro;
//     } else if (operatorPro === "x") {
//         return initialOperandPro * currentOperandPro;
//     } else if (operatorPro === "/") {
//         return initialOperandPro / currentOperandPro;
//     }

//     return currentOperandPro;
// }

// function changeSignPro() {
//     const
//         displayValuePro = calculatorPro.displayValuePro;

//     if (displayValuePro === "0") {
//         return;
//     }

//     if (displayValuePro.startsWith("-")) {
//         calculatorPro.displayValuePro = displayValuePro.substring(1);
//     } else {
//         calculatorPro.displayValuePro = "-" + displayValuePro;
//     }
// }

// function calculatePower() {
//     const displayValue = parseFloat(calculator.displayValue);
//     const powerValue = parseFloat(prompt("Enter the power value:"));

//     if (!isNaN(powerValue)) {
//         const result = Math.pow(displayValue, powerValue);
//         calculator.displayValue = result.toString();
//     } else {
//         // Handle invalid power value
//         calculator.displayValue = "Error";
//     }
// }


// function calculateSquareRoot() {
//     const displayValue = parseFloat(calculator.displayValue);

//     if (displayValue >= 0) {
//         const result = Math.sqrt(displayValue);
//         calculator.displayValue = result.toString();
//     } else {
//         calculator.displayValue = "Invalid input";
//     }
// }

// function calculateExponentiation() {
//     const displayValue = parseFloat(calculator.displayValue);
//     const initialOperand = parseFloat(calculator.initialOperand);
//     const result = Math.pow(initialOperand, displayValue);
//     calculator.displayValue = result.toString();
// }


// function resetPro() {
//     calculatorPro.displayValuePro = "0";
//     calculatorPro.initialOperandPro = null;
//     calculatorPro.awaitingCurrentOperandPro = false;
//     calculatorPro.operatorPro = null;
// }

// function deleteDigitPro() {
//     if (calculatorPro.awaitingCurrentOperandPro) {
//         return; //
//     }

//     const displayValuePro = calculatorPro.displayValuePro;

//     if (displayValuePro.length === 1) {
//         calculatorPro.displayValuePro = "0";
//     } else {
//         calculatorPro.displayValuePro = displayValuePro.slice(0, -1);
//     }
// }


// ----------------------------- ?_____END OF CALC PRO_____? -------------------------------------- 







