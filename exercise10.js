let adj = {
    1 : "Crazy",
    2 : "Amazing",
    3: "Fire"
}

let shop = {
    1 : "Engine",
    2 : "Foods",
    3 : "Garments"
}

let word ={
    1 : "Bros",
    2 : "Limited",
    3 : "Hub" 
}

let random1 = (Math.random()*10 % 3 +1)
let random2 =(Math.random()*10 % 3 +1)
let random3 = (Math.random()*10 % 3 +1)

console.log(Math.trunc(random1))
let ans = adj[Math.trunc(random1)]+ shop[Math.trunc(random2)] + word[Math.trunc(random3)];
console.log(ans)