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

let screenDisplay;
let numToDisplay = [];

//event listeners for number btns
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (currentOperator != undefined && !enteringNumB) {
      numToDisplay.length = 0;
      screen.textContent = "";
      enteringNumB = true;
    }
    numToDisplay.push(number.textContent);
    screenDisplay = numToDisplay.join("");
    screen.textContent = screenDisplay;

    !enteringNumB
      ? (numA = parseInt(screenDisplay))
      : (numB = parseInt(screenDisplay));
  });
});

//event listeners for operators
operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (typeof numA !== "number" || enteringNumB) return;

    if (currentOperator != undefined) {
      operations.forEach((operation) => {
        console.log("removing highlight");
        operation.classList.remove("op-select");
      });
    }

    operation.classList.toggle("op-select");
    if (currentOperator == operation.id) {
      currentOperator = undefined;
      console.log("operation = " + currentOperator);
      return;
    }

    currentOperator = operation.id;
    console.log("operation = " + currentOperator);
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
    }
  });
});

function operate(operandOne, operandTwo, operation) {
  //results stored in 'numA' to allow for further calculations
  switch (operation) {
    case "plus":
      numA = operandOne + operandTwo;
      console.log(`${operandOne} + ${operandTwo}`);
      console.log(operandOne + operandTwo);
      screen.textContent = numA;
      partialReset();
      break;
    case "minus":
      numA = operandOne - operandTwo;
      console.log(`${operandOne} - ${operandTwo}`);
      console.log(operandOne - operandTwo);
      screen.textContent = numA;
      partialReset();
      break;
    case "multiply":
      numA = operandOne * operandTwo;
      console.log(`${operandOne} * ${operandTwo}`);
      console.log(operandOne * operandTwo);
      screen.textContent = numA;
      partialReset();
      break;
    case "divide":
      numA = operandOne / operandTwo;
      console.log(`${operandOne} / ${operandTwo}`);
      console.log(operandOne / operandTwo);
      screen.textContent = numA;
      partialReset();
      break;
  }
}
function partialReset() {
  numB = undefined;
  currentOperator = undefined;
  operations.forEach((operation) => {
    operation.classList.remove("op-select");
  });
}
