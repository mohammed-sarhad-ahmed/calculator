const screen = document.querySelector("#screen p")
const numbers = document.querySelectorAll(".numbers")
const clear = document.querySelector("#clear")
const point = document.querySelector("#point")
const operators = document.querySelectorAll(".oparators")
const assign = document.querySelector("#assgiment")
const ary = []
const minusOj = document.querySelector("#minus")
const plusOJ = document.querySelector("#plus")
const multiplyOJ = document.querySelector("#mutiplay")
const divideOJ = document.querySelector("#divide")
count = 0
let idy;

const operations = {
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

const num = [...numbers]
const op = [...operators]

num.forEach((item) => {
    function action(e) {

        if (screen.innerText.length === 1 && screen.innerText == 0) {

            screen.innerText = ""
        }

        value = e.target.innerText
        if (e.target.innerText === ".") {
            point.disabled = true

        }
        screen.innerText += value

        if (screen.innerText.length <= 1 && screen.innerText != 0) {
            clear.innerText = `C`


        }


    }

    item.addEventListener("click", action)

})








op.forEach((item) => {
    item.addEventListener("click", deploy)

})
function deploy(e) {
    point.disabled = false


    if (count < 1) {
        ary.push(screen.innerText)
        count++
    }
    screen.innerText = 0
    idy = e.target.id


    assign.addEventListener("click", finalassis)

    function finalassis(e) {
        ary.push(screen.innerText)
        console.log(ary)
        let [x, y] = ary
        console.log(x, y)
        answer(x, y, idy)
        assign.removeEventListener("click", finalassis)
    }



}








function answer(num1, num2, idy) {

    if (idy === "divide") {
        let ans = operations.divide(num1, num2)
        let value = Math.round((ans + Number.EPSILON) * 100) / 100
        screen.innerText = value
        while (ary.length) {
            ary.pop()
        }
        ary.push(ans)
    }

    else if (idy === "plus") {
        let ans = operations.plus(num1, num2)
        let value = Math.round((ans + Number.EPSILON) * 100) / 100
        screen.innerText = value
        while (ary.length) {
            ary.pop()
        }

        ary.push(ans)

    }
    else if (idy === "mutiplay") {
        let ans = operations.multi(num1, num2)
        let value = Math.round((ans + Number.EPSILON) * 100) / 100
        screen.innerText = value
        while (ary.length) {
            ary.pop()
        }

        ary.push(ans)


    }
    else if (idy === "minus") {
        let ans = operations.minus(num1, num2)
        let value = Math.round((ans + Number.EPSILON) * 100) / 100
        screen.innerText = value
        while (ary.length) {
            ary.pop()
        }
        ary.push(ans)

    }
}

//clear
clear.addEventListener("click", () => {
    screen.innerText = 0
    clear.innerText = "AC"
    while (ary.length) {
        ary.pop()
    }
    count = 0
}) 