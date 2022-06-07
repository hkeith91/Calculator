const numbersNL = document.querySelectorAll(".number");
const numbers = Array.from(numbersNL);
const operationsNL = document.querySelectorAll(".operation");
const operations = Array.from(operationsNL);
const screen = document.querySelector("#screen");
const buttonsNL = document.querySelectorAll(".btn");
const btns = Array.from(buttonsNL);
let numA;
let numB;
let currentOperator;
let enteringNumB = false;

let screenDisplay;
let numToDisplay = [];

//if operandA == undefined add store value
//if operandA and operation selected =>
//  call Operate() when operandB has value and
//  equals or another operator is added

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

    numA = undefined
      ? (numA = parseInt(screenDisplay))
      : (numB = parseInt(screenDisplay));
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (typeof numA !== "number") return;

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
