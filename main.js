"use strict";
//declarations
const values = ["0"];
const sign = [];
const deleteButton = document.getElementById("delete");
const clearButton = document.querySelector("#AC");
let currentNumber = 0;
const screen = document.querySelector("#Screen");
const oparations = {
  multiply(num1, num2) {
    screen.innerText = String(num1 * num2).includes(".")
      ? (num1 * num2).toFixed(2)
      : num1 * num2;
  },
  plus(num1, num2) {
    screen.innerText = String(num1 + num2).includes(".")
      ? (num1 + num2).toFixed(2)
      : num1 + num2;
  },
  minus(num1, num2) {
    screen.innerText = String(num1 - num2).includes(".")
      ? (num1 - num2).toFixed(2)
      : num1 - num2;
  },
  divide(num1, num2) {
    screen.innerText = String(num1 / num2).includes(".")
      ? (num1 / num2).toFixed(2)
      : num1 / num2;
  },
};
//functions

function initialState() {
  clearButton.innerText = "AC";
  for (let i = 0; i < sign.length; i++) {
    sign.pop();
  }
  for (let i = 0; i < values.length; i++) {
    values.pop();
  }
  values.push("0");
  currentNumber = 0;
  screen.innerText = 0;
}
initialState();
function resterAfterEachCalculation() {
  sign.forEach((_) => sign.pop());
  const length = values.length;
  currentNumber = 0;
  for (let i = 0; i < length; i++) {
    values.pop();
  }
  values.push(screen.innerText);
}

function oparationCaller(num1, num2, sign) {
  console.log(sign);
  console.log(sign === "*");
  switch (true) {
    case sign === "+":
      oparations.plus(+num1, +num2);
      console.log(num1, num2, sign);

      break;
    case sign === "/":
      oparations.divide(+num1, +num2);
      console.log(num1, num2, sign);

      break;
    case sign === "-":
      oparations.minus(+num1, +num2);
      console.log(num1, num2, sign);

      break;
    case sign === "*":
      oparations.multiply(+num1, +num2);
      console.log(num1, num2, sign);
  }
  resterAfterEachCalculation();
}

function isItEquall(target) {
  target.innerText === "=" &&
    values.length === 2 &&
    sign.length === 1 &&
    oparationCaller(...values, ...sign);
}

function signMangement(target) {
  if (target.dataset.math && sign.length !== 1) {
    sign.push(target.dataset.math);
  } else if (sign.length === 1 && values.length === 2 && target.dataset.math) {
    oparationCaller(...values, ...sign);
    sign.push(target.dataset.math);
    console.log(sign, values);
  }
}

function valueMangement(target) {
  if (target.classList.contains("number")) {
    clearButton.innerText = "C";
    if (screen.innerText === "0" && target.innerText !== ".")
      screen.innerText = "";
    if (!sign.length || values.length === 2) {
      values.pop();
      currentNumber = screen.innerText + target.innerText;
      screen.innerText = screen.innerText.concat(target.innerText);
    } else {
      currentNumber = target.innerText;
      screen.innerText =
        target.innerText === "." ? 0 + target.innerText : target.innerText;
    }
    values.push(currentNumber);
  }
}

function negator() {
  let currentNumber = +values.pop();
  if (isNaN(currentNumber)) return;
  currentNumber *= -1;
  screen.innerText = currentNumber;
  values.push(String(currentNumber));
}

function deleter(e) {
  if (!values.length || !e.key === "Backspace" || !e.target.innerText === "X")
    return;
  let currentText = screen.innerText;
  if (currentText.includes("-") && currentText.length === 2)
    currentText = String(Math.abs(Number(currentText)));
  currentText = currentText.split("");
  currentText.pop();
  currentText = currentText.join("");
  screen.innerText = currentText ? currentText : 0;
  let currentNumber = values.pop();
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.split("");
    currentNumber.pop();
    currentNumber = currentNumber.join("");
    values.push(currentNumber);
  }
}
//events
document.body.addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) return;
  signMangement(e.target);
  valueMangement(e.target);
  isItEquall(e.target);
});
clearButton.addEventListener("click", initialState);
document.querySelector("#negation").addEventListener("click", negator);
deleteButton.addEventListener("click", deleter);
document.addEventListener("keydown", deleter);
