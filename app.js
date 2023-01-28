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

const operations = {
    plus(x, y) {
        return Number(x) + Number(y)
    },
    minus(x, y) {
        return Number(x) - Number(y)
    },

    multi(x, y) {
        return Number(x) * Number(y)
    },
    divide(x, y) {

        return Number(x) / Number(y)


    }
}

const num = [...numbers]
const op = [...operators]

num.forEach((item) => {
    item.removeEventListener("click", action)
    item.addEventListener("click", action)
})
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







op.forEach((item) => {
    item.removeEventListener("click", deploy)
    item.addEventListener("click", deploy)


})
function deploy(e) {

    if (count < 1) {
        ary.push(screen.innerText)
        count++
    }
    screen.innerText = 0
    let idy = e.target.id
    assign.removeEventListener("click", finalassis)
    assign.addEventListener("click", finalassis)

    function finalassis(e) {
        ary.push(screen.innerText)
        console.log(ary)
        let [x, y] = ary
        console.log(x, y)
        answer(x, y, idy)
    }



}








function answer(num1, num2, idy) {

    if (idy === "divide") {
        let ans = operations.divide(num1, num2)
        screen.innerText = ans
        while (ary.length) {
            ary.pop()
        }
        ary.push(ans)
    }

    else if (idy === "plus") {
        let ans = operations.plus(num1, num2)
        screen.innerText = ans
        while (ary.length) {
            ary.pop()
        }
        ary.push(ans)

    }
    else if (idy === "mutiplay") {
        let ans = operations.multi(num1, num2)
        screen.innerText = ans
        while (ary.length) {
            ary.pop()
        }

        ary.push(ans)
        console.log(ary)

    }
    else if (idy === "minus") {
        let ans = operations.minus(num1, num2)
        screen.innerText = ans
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
})