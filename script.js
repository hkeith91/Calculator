const numbersNL = document.querySelectorAll(".number");
const numbers = Array.from(numbersNL);
const operationsNL = document.querySelectorAll(".operation");
const operations = Array.from(operationsNL);
const screen = document.querySelector("#screen");
const buttonsNL = document.querySelectorAll(".btn");
const btns = Array.from(buttonsNL);
const specOpsNL = document.querySelectorAll(".spec-op");
const specOps = Array.from(specOpsNL);
let numA;
let numB;
let currentOperator;
let enteringNumB = false;
let hasDecimal = false;

let screenDisplay;
let numToDisplay = [];

//
//TODO:
//--percent button
//--positive/negative button
//-- dont' allow decimal after entering operation
//--fix errors that occur when entering two decimal numbers
//error around line 69-70.  having problems when trying to perform multiple
// calculations with decimals without using equals button
//--pressing decimal after entering operation should disply "0."

//event listeners for number btns
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (currentOperator != undefined && !enteringNumB) {
      numToDisplay.length = 0;
      screen.textContent = "";
      enteringNumB = true;
      hasDecimal = false;
    }

    if (enteringNumB) {
      operations.forEach((operation) => {
        operation.classList.remove("op-select");
      });
    }
    if (numToDisplay.length == 8) return;

    numToDisplay.push(number.textContent);
    updateScreen();

    !enteringNumB ? (numA = screenDisplay) : (numB = screenDisplay);
  });
});

//event listeners for operators
operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (currentOperator != undefined) {
      operations.forEach((operation) => {
        operation.classList.remove("op-select");
      });
    }
    if (currentOperator == operation.id) {
      currentOperator = undefined;
      operation.classList.remove("op-select");
      return;
    }

    operation.classList.toggle("op-select");
    if (enteringNumB && numToDisplay.length > 0) {
      numB = parseInt(screenDisplay);
      console.log("b = " + numB);
      console.log(currentOperator);
      operate(numA, numB, currentOperator);
    }

    currentOperator = operation.id;
  });
});

//event listeners for special keys
specOps.forEach((special) => {
  special.addEventListener("click", () => {
    switch (special.id) {
      case "equals":
        if (
          numA != undefined &&
          numB != undefined &&
          currentOperator != undefined
        ) {
          operate(numA, numB, currentOperator);
        }
        break;
      case "clear":
        fullReset();
        break;
      case "backspace":
        if (numToDisplay.length > 0) {
          if (numToDisplay[numToDisplay.length - 1] == ".") hasDecimal = false;
          numToDisplay.pop();
          updateScreen();
        }
        break;
      case "decimal":
        console.log("decimal");
        if (!hasDecimal && currentOperator == undefined) {
          hasDecimal = true;
          if (numToDisplay.length < 0) numToDisplay.push(0);
          numToDisplay.push(".");
          updateScreen();
        }
        break;
    }
  });
});

function operate(inputOne, inputTwo, operation) {
  let operandOne = formatDecNumber(inputOne);
  let operandTwo = formatDecNumber(inputTwo);

  //results stored in 'numA' to allow for further calculations
  switch (operation) {
    case "plus":
      numA = operandOne + operandTwo;
      // console.log(`${operandOne} + ${operandTwo} = ${operandOne + operandTwo}`);
      break;
    case "minus":
      numA = operandOne - operandTwo;
      // console.log(`${operandOne} + ${operandTwo} = ${operandOne + operandTwo}`);
      break;
    case "multiply":
      numA = operandOne * operandTwo;
      // console.log(`${operandOne} + ${operandTwo} = ${operandOne + operandTwo}`);
      break;
    case "divide":
      numA = operandOne / operandTwo;
      // console.log(`${operandOne} + ${operandTwo} = ${operandOne + operandTwo}`);
      break;
  }
  displayResult(numA);
  partialReset();
}

function checkForDecimal(input) {
  if (typeof input === "number") input = input.toString();
  let check = input.split("");
  let dec = false;
  for (let i = 0; i < check.length; i++) {
    const element = check[i];
    if (element === ".") dec = true;
  }
  return dec;
}

function formatDecNumber(input) {
  if (!checkForDecimal(input)) return parseInt(input);

  let splitArr = input.split(".");
  let len = splitArr[1].split("");
  let output = parseInt(splitArr.join(""));
  for (let i = 0; i < len.length; i++) {
    output /= 10;
  }
  return output;
}

function partialReset() {
  numB = undefined;
  currentOperator = undefined;
  enteringNumB = false;
  hasDecimal = false;
  operations.forEach((operation) => {
    operation.classList.remove("op-select");
  });
  numToDisplay.length = 0;
}

function fullReset() {
  screen.textContent = "";
  numToDisplay.length = 0;
  numA = undefined;
  numB = undefined;
  currentOperator = undefined;
  hasDecimal = false;
}

function displayResult(number) {
  let roundedNumber = Math.round(number * 1000000) / 1000000;
  console.log(roundedNumber);
  screen.textContent = roundedNumber;
}

function updateScreen() {
  screenDisplay = numToDisplay.join("");
  screen.textContent = screenDisplay;
}
