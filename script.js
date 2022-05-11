const numbersNL = document.querySelectorAll(".number");
const numbers = Array.from(numbersNL);
const operationsNL = document.querySelectorAll(".operation");
const operations = Array.from("operations");
const screen = document.querySelector("#screen");
const buttonsNL = document.querySelectorAll(".btn");
const buttons = Array.from(buttonsNL);

let screenDisplay;
let numToDisplay = []

function displayText() {
  buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        numToDisplay.push(button.textContent);
        screenDisplay = numToDisplay.join("");
        screen.textContent = screenDisplay;
    });
  });
}

displayText()
