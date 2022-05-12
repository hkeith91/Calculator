const numbersNL = document.querySelectorAll(".number");
const numbers = Array.from(numbersNL);
const operationsNL = document.querySelectorAll(".operation");
const operations = Array.from("operations");
const screen = document.querySelector("#screen");
const buttonsNL = document.querySelectorAll(".btn");
const btns = Array.from(buttonsNL);
const buttons = btns.forEach(element => {
  // let
});

let screenDisplay;
let numToDisplay = []

// function displayText() {
//   buttons.forEach((button) => {
//     button.addEventListener("click", () =>{
//         numToDisplay.push(button.textContent);
//         screenDisplay = numToDisplay.join("");
//         screen.textContent = screenDisplay;
//     });
//   });
// }

// displayText()

btns.forEach((button) => {
  button.addEventListener("click", () =>{
      numToDisplay.push(button.textContent);
      screenDisplay = numToDisplay.join("");
      screen.textContent = screenDisplay;
  });
});

console.table(btns);
