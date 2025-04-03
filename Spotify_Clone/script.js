
let currSong = new Audio()
let songs;
let currFolder;

async function getSongs(folder) {

    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    currFolder = folder
    let response = await a.text()
    // console.log(response);

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    // console.log(as);

    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${currFolder}/`)[1])
        }
    };

    let songUrl = document.querySelector(".songList ul")
    songUrl.innerHTML = "";
    for (const song of songs) {
        songUrl.innerHTML += `<li>
                            <img src="img/music.svg" class="invert" alt="music">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Shivam</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img src="img/play.svg" class="invert" alt="play">
                            </div>
                        </li>`
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", ele => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.replaceAll("&amp;", "&"))
        })
    })

    return songs


    // console.log(songs)
}

function formatTime(seconds) {
    seconds = Math.floor(seconds);

    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }

    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    // Ensure two-digit formatting (e.g., 05:09 instead of 5:9)
    minutes = String(minutes).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    return `${minutes}:${secs}`;
}


function playMusic(track, pause = false) {
    currSong.src = `/${currFolder}/` + track
    if (!pause) {
        currSong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let array = Array.from(as);

    let cardContainer = document.querySelector(".cardContainer")

    for (let index = 0; index < array.length; index++) {
        const element = array[index];

        if (element.href.includes("/songs/")) {
            let folder = (element.href.split("/").slice(-2)[0])
            let f = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let resp = await f.json()
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder=${folder} class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                                <circle cx="12" cy="12" r="10" fill="#1fdf64" stroke="#1fdf64" stroke-width="1.5" />
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="black" />
                            </svg>

                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="cover">
                        <h2>${resp.title}</h2>
                        <p>${resp.description}</p>
                    </div>`

        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })

    
}

(async function main() {

    displayAlbums()

    await getSongs("songs/ncs")
    playMusic(songs[0], true)
    // console.log(songs);

    play.addEventListener("click", () => {
        if (currSong.paused) {
            currSong.play()
            play.src = "img/pause.svg"
        } else {
            currSong.pause()
            play.src = "img/play.svg"
        }
    })


    currSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${formatTime(currSong.currentTime)} / ${formatTime(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime / currSong.duration) * 100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currSong.currentTime = (currSong.duration * percent) / 100
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    prev.addEventListener("click", () => {
        currSong.pause()
        // console.log(songs)
        let index = songs.indexOf(currSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })
    next.addEventListener("click", () => {
        currSong.pause()
        let index = songs.indexOf(currSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currSong.volume = e.target.value / 100;

        if(currSong.volume >0){
            document.querySelector(".volume>img").src = "img/volume.svg"
        }
    })

    document.querySelector(".volume>img").addEventListener("click",(e)=>{
        console.log(e.target.src)
        if(e.target.src.includes("img/volume.svg")){
            e.target.src = "img/mute.svg"
            currSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }else{
            currSong.volume = 0.1;
            e.target.src = "img/volume.svg"
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
            
        }
    })
    

})()

