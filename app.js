//declaration
const screen = document.querySelector("#screen p")
const numbers = document.querySelectorAll(".numbers")
const clear = document.querySelector("#clear")
const point = document.querySelector("#point")
const operators = document.querySelectorAll(".oparators")
const assign = document.querySelector("#assgiment")
const ary = []
let currentOperator
let answer;
let count = 0
let shower = 0
let evaluator = 0
//evaluate 2 values and return answer 
const doOperations = {
    plus(x, y) {
        return ((Number(x) + Number(y)) * 100) / 100
    },
    minus(x, y) {
        return ((Number(x) - Number(y)) * 100) / 100
    },

    multi(x, y) {
        return ((Number(x) * Number(y)) * 100) / 100
    },
    divide(x, y) {

        return ((Number(x) / Number(y)) * 100) / 100


    }
}
//it convert numbers and operators nodelist to an array so that we can use array methods on it
const allNumbers = [...numbers]
const allOperates = [...operators]
//when you click a number call a function to save the number
allNumbers.forEach((number) => {
    number.addEventListener("click", getNumbers)
})

function getNumbers(e) {
    if (screen.innerText.length === 1 && screen.innerText == 0) {
        screen.innerText = ""
    }
    if (shower === 1) {
        screen.innerText = ""
        shower = 0
    }
    screen.innerText += e.target.dataset.value
    if (ary.length === 1) {
        ary.push(screen.innerText)
    }
    if (ary.length === 2) {
        count++
        let [x, y] = ary;
        doEvaluation(x, y, currentOperator)
    }

}
//when you click a operator call a function to save the operator
allOperates.forEach((operator) => {
    operator.addEventListener("click", getOperator)
})
function getOperator(e) {
    if (count === 0) {
        ary.push(screen.innerText)
    }
    evaluator++

    if (evaluator === 2) {
        screen.innerText = Math.round(answer * 100) / 100
        evaluator = 0
    }


    shower++
    currentOperator = e.target.id
}

//help to do the operation when we have 2 number in the array
function doEvaluation(num1, num2, currentOperator) {

    if (currentOperator === "divide") {
        answer = doOperations.divide(num1, num2)
    }
    else if (currentOperator === "minus") {
        answer = doOperations.minus(num1, num2)
    }
    else if (currentOperator === "plus") {
        answer = doOperations.plus(num1, num2)
    }
    else if (currentOperator === "mutiplay") {
        answer = doOperations.multi(num1, num2)
    }
    while (ary.length) {
        ary.pop()
    }
   
    ary.push(Math.round(answer * 100) / 100)

}
// if you click = it will show you the answer
assign.addEventListener("click", () => {
    screen.innerText = Math.round(answer * 100) / 100
    evaluator = 0

})


//clear
clear.addEventListener("click", () => {
    answer = 0
    count = 0
    while (ary.length) {
        ary.pop()
    }
    screen.innerText = 0
    shower = 0
    evaluator = 0
})