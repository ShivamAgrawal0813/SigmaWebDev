/*To get a random number b/w 2 no.s a and b
use formula num = a + random*(b-a)*/

function randomColour() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)

    return `rgb(${r},${g},${b})`

}

let ele = document.querySelectorAll(".box")
// console.log(ele)

ele.forEach(e => {
    e.style.backgroundColor = randomColour()
    e.style.color = randomColour()
})
