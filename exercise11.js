// let n = prompt("Enter a num")
let n =5
let ans = 1

let arr = Array.from(Array(n+1).keys())
console.log(arr)
arr = arr.slice(1)
console.log(arr)
for (let index = 1; index <= n; index++) {
    ans = ans*index;
    // arr.push(index)
}

console.log(ans)

console.log(arr.reduce((a,b) => a*b))

