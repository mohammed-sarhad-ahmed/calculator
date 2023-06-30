"use strict";
//declarations
let StartPosition = 0;
let swap = false;
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
    if (!isFinite(num1 / num2)) {
      screen.innerText = "Stop";
      return;
    } else {
      screen.innerText = String(num1 / num2).includes(".")
        ? (num1 / num2).toFixed(2)
        : num1 / num2;
    }
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
  swap = false;
  StartPosition = 0;
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
  switch (true) {
    case sign === "+":
      oparations.plus(+num1, +num2);
      break;
    case sign === "/":
      oparations.divide(+num1, +num2);
      break;
    case sign === "-":
      oparations.minus(+num1, +num2);
      break;
    case sign === "*":
      oparations.multiply(+num1, +num2);
  }
  resterAfterEachCalculation();
}

function isItEquall(target) {
  values.forEach((value, i) => {
    if (value.slice(-1) === ".") {
      values[i] = value + 0;
    }
  });
  console.log(values, sign);

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
  if (screen.innerText.includes(".") && target.innerText === ".") return;
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
  if (!isFinite(screen.innerText)) return;
  let currentNumber = +values.pop();
  if (isNaN(currentNumber)) return;
  currentNumber *= -1;
  screen.innerText = currentNumber;
  values.push(String(currentNumber));
}

function deleter(e) {
  if (!isFinite(screen.innerText)) return;

  if (screen.innerText === "0") {
    console.log(values.length);
    values.length === 0 && values.push("0");
    return;
  }
  if (e?.target.innerText === "X" || e?.key === "Backspace" || swap) {
    swap && (swap = false) && (StartPosition = 0);
    let currentText = screen.innerText;
    if (currentText.includes("-") && currentText.length === 2)
      currentText = String(Math.abs(Number(currentText)));
    currentText = currentText.split("");
    currentText.pop();
    currentText = currentText.join("");
    screen.innerText = currentText ? currentText : 0;
    let currentNumber = values.pop();
    if (currentNumber.includes("-") && currentNumber.length === 2)
      currentNumber = String(Math.abs(Number(currentNumber)));
    if (currentNumber.length > 1) {
      currentNumber = currentNumber.split("");
      currentNumber.pop();
      currentNumber = currentNumber.join("");
      values.push(currentNumber);
    }

    screen.innerText === "0" && (clearButton.innerText = "AC");
    values.length === 0 && values.push("0");
  }
}

function swapStart(e) {
  if (e.touches.length === 1 && e.target.closest("p")) {
    StartPosition = e.touches[0]?.clientX;
  }
}
function swapEnd(e) {
  const offSet = 10;

  if (
    StartPosition &&
    Math.abs(e.changedTouches[0]?.clientX - StartPosition) >= offSet
  ) {
    swap = true;
    StartPosition = 0;
    deleter();
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
window.addEventListener("touchstart", swapStart);
window.addEventListener("touchend", swapEnd);
