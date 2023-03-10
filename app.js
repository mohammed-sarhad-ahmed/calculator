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
let secondEvaluator = 0
let temp;
let dump;
let plusOj = document.querySelector("#plus")
let minusOj = document.querySelector("#minus")
let multiplyOj = document.querySelector("#mutiplay")
let divideOJ = document.querySelector("#divide")
let sign = document.querySelector("#negativetopositive")
let tempOp = 0
let cope = 0
const deleter = document.querySelector("#delete")
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
    deleter.disabled = false;
    state = false
    disable(state)
    if ((screen.innerText.length === 1 && screen.innerText == 0 && e.target.innerText !== ".")) {
        screen.innerText = ""
    }


    if (e.target.innerText === ".") {
        point.disabled = true
    }

    if (shower === 1) {
        screen.innerText = ""
        shower = 0
    }




    if (answer == Infinity) {
        screen.innerText = "you broke math"
        evaluator = 0
        shower = 0
        count = 0
    }

    else if (answer !== Infinity) {
        screen.innerText += e.target.dataset.value
        if (screen.innerText === ".") {
            screen.innerText = "0."
        }

        if (screen.innerText != 0) {
            sign.disabled = false
            deleter.disabled = false;
        }

        if (ary.length >= 1) {
            ary.push(screen.innerText)
            assign.disabled = false;
        }


        function getsecondsNumber() {
            if (ary.length >= 2) {
                secondEvaluator = 0
                cope++
                if (ary.length > 2) {
                    temp = ary.slice(0)
                    dump = ary.slice(-1)
                    while (ary.length) {
                        ary.pop()
                    }
                    let [z] = temp;
                    let [e] = dump;
                    ary.push(z)
                    ary.push(e)
                }
                count++
                let [x, y] = ary;
                assign.removeEventListener("click", getsecondsNumber)
                doEvaluation(x, y, currentOperator)


            }

        }

    }

    assign.addEventListener("click", getsecondsNumber)
}



//when you click a operator call a function to save the operator
allOperates.forEach((operator) => {
    operator.addEventListener("click", getOperator)
})
function getOperator(e) {
    deleter.disabled = true;
    secondEvaluator++
    console.log(tempOp)
    console.log(secondEvaluator)
    sign.disabled = true
    if (answer == Infinity) {
        screen.innerText = "you broke math"
        evaluator = 0
        shower = 0
        count = 0
    }
    else {
        if (secondEvaluator === 2 || secondEvaluator === 1 & tempOp === 1) {
            getBackgroundColor()
            function getsecondsNumber() {
                if (ary.length >= 2) {
                    if (ary.length > 2) {
                        temp = ary.slice(0)
                        dump = ary.slice(-1)
                        while (ary.length) {
                            ary.pop()
                        }
                        let [z] = temp;
                        let [e] = dump;
                        ary.push(z)
                        ary.push(e)
                    }
                    count++
                    let [x, y] = ary;
                    assign.removeEventListener("click", getsecondsNumber)
                    doEvaluation(x, y, currentOperator)
                }
            }
            secondEvaluator = 0
            tempOp = 0
            cope = 0
            getsecondsNumber()
        }
        point.disabled = false
        if (count === 0) {
            ary.push(screen.innerText)
        }
        evaluator++
        shower++
        currentOperator = e.target.id
        state = true
        disable(state)
        if (e.target.id !== "negativetopositive") {
            e.target.style.backgroundColor = "white"
            e.target.style.color = "orange"
        }
        allNumbers.forEach((number) => {
            number.disabled = false
        })
    }
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
    tempOp++
    state = false
    disable(state)
    ary.push(Math.round(answer * 100) / 100)
    display()
}
// if you click = it will show you the answer
function display() {
    getBackgroundColor()
    if (answer == Infinity) {
        screen.innerText = "you broke math"
        evaluator = 0
    }
    else {
        screen.innerText = Math.round(answer * 100) / 100
        evaluator = 0
        allNumbers.forEach((number) => {
            number.disabled = true

        })
        if (cope === 1) {
            tempOp = 0
            cope = 0
        }

    }

}

//clear
clear.addEventListener("click", clearer)
function clearer() {
    count = 0
    while (ary.length) {
        ary.pop()
    }
    state = true
    disable(state)
    screen.innerText = 0
    answer = 0
    shower = 0
    evaluator = 0
    assign.disabled = true;
    getBackgroundColor()
    sign.disabled = true
    secondEvaluator = 0
    allNumbers.forEach((number) => {
        number.disabled = false
    })
    tempOp = 0
    deleter.disabled = true;
    cope = 0
}
//disable button
function disable(state) {
    if (state === true) {
        plusOj.disabled = true
        minusOj.disabled = true
        multiplyOj.disabled = true
        divideOJ.disabled = true
    }
    else {
        plusOj.disabled = false
        minusOj.disabled = false
        multiplyOj.disabled = false
        divideOJ.disabled = false
    }
}
let state = true
disable(state)
//assignment disabler
assign.disabled = true;
//background color
function getBackgroundColor() {
    if (multiplyOj.style.backgroundColor === "white" || plusOj.style.backgroundColor === "white"
        || divideOJ.style.backgroundColor === "white" || minusOj.style.backgroundColor === "white") {
        multiplyOj.style.backgroundColor = "orange"
        multiplyOj.style.color = "white"
        plusOj.style.backgroundColor = "orange"
        plusOj.style.color = "white"
        minusOj.style.backgroundColor = "orange"
        minusOj.style.color = "white"
        divideOJ.style.backgroundColor = "orange"
        divideOJ.style.color = "white"
    }
}
// change sign
sign.disabled = true
sign.addEventListener("click", getSign)
function getSign(e) {
    if (screen.innerText !== 0 && !(isNaN(screen.innerText))) {
        screen.innerText = `${screen.innerText * -1}`
        ary.pop()
        ary.push(screen.innerText)
    }
}
//delete on 
deleter.disabled = true;
deleter.addEventListener("click", () => {
    getDelete()
})
function getDelete() {
    if (screen.innerText !== 0 && !(isNaN(screen.innerText))) {
        screen.innerText = screen.innerText.slice(0, -1)
        if (screen.innerText.length === 0 || screen.innerText === "-") {
            screen.innerText = 0
        }
        ary.pop()
        ary.push(screen.innerText)
    }

}