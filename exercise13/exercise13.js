function createCard(title, cName, views, monthsOld, duration, thumbnail){
    let card = document.createElement("div")
    card.setAttribute("class","card")

    let viewStr

    if(views<1000){
        viewStr = views
    }else if(views>=1000000){
        viewStr = views/1000000 + "M"
    }else{
        viewStr = views/1000 + "K"
    }

    card.innerHTML = `<div class="img">
                <img src="${thumbnail}"
                    alt="thumbnail" height="150px">
                <div class="text">
                    ${duration}
                </div>
            </div>
            <div class="content">
                <h3>${title}</h3>
                <ul>
                    <li>${cName}</li>
                    <li>${viewStr} Views</li>
                    <li>${monthsOld} months ago</li>
                </ul>
            </div>`
    document.querySelector(".container").append(card)

}

createCard("JavaScript Exercise 13 - Dynamic Website Builder | Sigma Web Development Course - Tutorial #73", "CodeWithHarry", "727000","2", "31:20","https://i.ytimg.com/vi/KB7GzBv5p4Q/hqdefault.jpg?s…AIYBjgBQAE=&rs=AOn4CLDHpDiAzX3RJIFqB-cFW-sRYzUfGQ")

createCard("JavaScript Exercise 13 - Dynamic Website Builder | Sigma Web Development Course - Tutorial #73", "CodeWithHarry", "1000000","2", "31:20","https://i.ytimg.com/vi/KB7GzBv5p4Q/hqdefault.jpg?s…AIYBjgBQAE=&rs=AOn4CLDHpDiAzX3RJIFqB-cFW-sRYzUfGQ")

// let card = document.querySelectorAll(".card")

// card.forEach(e=>{
//     e.setAttribute("style","display: flex; gap: 20px; background-color: rgba(0, 0, 0, 0.925); padding: 20px; margin: 10px;")
//     e.querySelector(".img").setAttribute("style","position: relative; height: 150px;")
//     e.querySelector(".img").firstElementChild.style.borderRadius = "10px"
//     e.querySelector(".text").setAttribute("style","position: sticky; color: white; position: absolute; bottom: 0; right: 10px;")
//     e.querySelector(".content").setAttribute("style","position: relative; z-index: 1; color: white;")
//     e.querySelector(".content").lastElementChild.setAttribute("style","display: flex; list-style: none; gap: 0 10px; position: absolute; left: -40px;")
// })