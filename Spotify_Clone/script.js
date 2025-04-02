
let currSong = new Audio()

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    // console.log(response);

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    // console.log(as);

    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    };

    // console.log(songs)

    return songs
}

function formatTime(seconds) {
    seconds = Math.floor(seconds);
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    // Ensure two-digit formatting (e.g., 05:09 instead of 5:9)
    minutes = String(minutes).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    return `${minutes}:${secs}`;
}


function playMusic(track,pause=false){
    currSong.src = "/songs/"+track
    if(!pause){
        currSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

(async function main() {

    let songs = await getSongs()
    playMusic(songs[0],true)
    // console.log(songs);

    let songUrl = document.querySelector(".songList ul")
    for (const song of songs) {
        songUrl.innerHTML += `<li>
                            <img src="music.svg" class="invert" alt="music">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Shivam</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img src="play.svg" class="invert" alt="play">
                            </div>
                        </li>`
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",ele=>{            
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.replaceAll("&amp;","&"))
        })
    })

    play.addEventListener("click",()=>{
        if(currSong.paused){
            currSong.play()
            play.src = "pause.svg"
        }else{
            currSong.pause()
            play.src = "play.svg"
        }
    })


    currSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songTime").innerHTML = `${formatTime(currSong.currentTime)}/${formatTime(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime / currSong.duration)*100 +"%"
    })    

    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left = percent +"%"
        currSong.currentTime = (currSong.duration * percent)/100
    })

})()

