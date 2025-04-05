let a = Math.random();
console.log(a);

let num1 = prompt("Enter first number: ");
let num2  = prompt("Enter second number: ");

let op = prompt("Enter operator: ");

let obj = {
    '+' : '-',
    '-' : '*',
    '*' : '+',
    '/' : '**'
}

if(a<0.1){
    op = obj[op]
    console.log(`Result is ${eval(`${num1}${op}${num2}`)}`)
}else{
    console.log(`Result is ${eval(`${num1}${op}${num2}`)}`)
}