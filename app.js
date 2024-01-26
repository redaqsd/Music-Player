const audio = document.querySelector('.audio');
const mainBtn = document.querySelector('.play-pause');
const prev = document.querySelector('.prev');
const prec = document.querySelector('.prec');
const title = document.querySelector('.name');
const randomBtn = document.querySelector(".randomBtn");
const audioTimeDisplay = document.querySelector('.audio-time');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.audio-duration');
const seekBar = document.getElementById("myRange");
const loopBtn = document.querySelector('.loop-btn');
const bx = document.querySelector(".bx-chevron-up");
const musicPlayer = document.querySelector(".music-player");
const control = document.querySelector(".control");
const playlistContainer = document.querySelector('.playlist');


const beats =  [
    {
        source : "beat 1.mp3",
        nom : 'Beat 1',
    },

    {
        source : "beat 2.mp3",
        nom : 'Beat 2',
    },

    {
        source : "beat 3.mp3",
        nom : 'Beat 3',
    },

    {
        source : "beat 4.mp3",
        nom : 'Beat 4',
    },

    {
        source : "beat 5.mp3",
        nom : 'Beat 5',
    },

    {
        source : "beat 6.mp3",
        nom : 'Beat 6',
    },

    {
        source : "beat 7.mp3",
        nom : 'Beat 7',
    },

    {
        source : "beat 8.mp3",
        nom : 'Beat 8',
    },

    {
        source : "beat 9.mp3",
        nom : 'Beat 9',
    },

    {
        source : "beat 10.mp3",
        nom : 'Beat 10',
    },

    {
        source : "beat 11.mp3",
        nom : 'Beat 11',
    },

    {
        source : "beat 12.mp3",
        nom : 'Beat 12',
    },

    {
        source : "beat 13.mp3",
        nom : 'Beat 13',
    },

    {
        source : "beat 14.mp3",
        nom : 'Beat 14',
    },


    {
        source : "beat 15.mp3",
        nom : 'Beat 15',
    },


    {
        source : "beat 16.mp3",
        nom : 'Beat 16',
    },

    {
        source : "beat 17.mp3",
        nom : 'Beat 17',
    },

    {
        source : "beat 18.mp3",
        nom : 'Beat 18',
    },

    {
        source : "beat 19.mp3",
        nom : 'Beat 19',
    },

    {
        source : "beat 20.mp3",
        nom : 'Beat 20',
    },

    {
        source : "beat 21.mp3",
        nom : 'Beat 21',
    },


    {
        source : "beat 22.mp3",
        nom : 'Beat 22',
    },

    {
        source : "beat 23.mp3",
        nom : 'Beat 23',
    },

    {
        source : "beat 24.mp3",
        nom : 'Beat 24',
    },


    {
        source : "beat 25.mp3",
        nom : 'Beat 25',
    },

]

let isPlaying = false;
let chosenMusicIndex = 0;
let Time = 0;

mainBtn.addEventListener("click", ()=>{
    if (isPlaying === false) {
        audio.src = beats[chosenMusicIndex].source;
        title.textContent = beats[chosenMusicIndex].nom;
        audio.play();
        isPlaying = true;
        mainBtn.classList.remove('bx-play');
        mainBtn.classList.add('bx-pause');
        audio.currentTime = Time;
    } else {
        audio.pause();
        mainBtn.classList.remove('bx-pause');
        mainBtn.classList.add('bx-play');
        isPlaying = false;
        Time = audio.currentTime;
    }
    selectedMusic ()

})



prec.addEventListener("click",()=>{
    chosenMusicIndex = (chosenMusicIndex + 1) % beats.length;
    audio.src = beats[chosenMusicIndex].source;
    title.textContent = beats[chosenMusicIndex].nom;

    if (isPlaying === true) {
        audio.play();
    } else {
        audio.pause();
    }
    selectedMusic ()
})


prev.addEventListener("click",()=>{
    chosenMusicIndex = (chosenMusicIndex - 1 + beats.length) % beats.length;
    audio.src = beats[chosenMusicIndex].source;
    title.textContent = beats[chosenMusicIndex].nom;

    if (isPlaying === true) {
        audio.play();
    } else {
        audio.pause();
    }
    selectedMusic ()
})



audio.addEventListener("loadedmetadata",()=>{
    seekBar.max = audio.duration;
    durationDisplay.textContent = formatTime(audio.duration);
})


let isDisplayed = false;

audio.addEventListener("timeupdate",()=>{
    seekBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);

    if (audio.currentTime >= 60 && !isDisplayed) {
        console.log("done");
        isDisplayed = true;
    }

    if (audio.currentTime >= seekBar.max) {
        chosenMusicIndex = (chosenMusicIndex + 1) % beats.length;
        audio.src = beats[chosenMusicIndex].source;
        title.textContent = beats[chosenMusicIndex].nom;
        audio.play();
    } 
})

seekBar.addEventListener("input", function(){
    audio.currentTime = this.value;
})


randomBtn.addEventListener("click",()=>{
    
    chosenMusicIndex = Math.floor(Math.random() * beats.length);

    audio.src = beats[chosenMusicIndex].source;
    title.textContent = beats[chosenMusicIndex].nom;


    if (isPlaying === true) {
        audio.play();
        isPlaying = true;
    } else {
        audio.play();
        mainBtn.classList.remove('bx-play');
        mainBtn.classList.add('bx-pause');
        isPlaying = true;
    }

    selectedMusic ()
})


function formatTime (timeInSecondes) {
    const minutes = Math.floor(timeInSecondes / 60);
    const secondes = Math.floor(timeInSecondes % 60);
    return `${minutes}:${secondes.toString().padStart(2,'0')}`
}


let isLooping = false;

loopBtn.addEventListener("click",()=>{
    if (!isLooping) {
        audio.loop = true;
        isLooping = true;
        loopBtn.style.color = 'blueviolet';
    } else if (isLooping) {
        audio.loop = false;
        isLooping = false;
        loopBtn.style.color = 'white';
    }
})



function fixingIssues () {
    let isClicked = false;
    playlistContainer.style.transform = "translateY(500px)";
    musicPlayer.style.height = "350px";
    control.style.marginBottom = "0px";

    bx.addEventListener("click",()=>{
        if (!isClicked) {
            bx.classList.remove('bx-chevron-up');
            bx.classList.add("bx-chevron-down");
            isClicked = true;
            playlistContainer.style.transform = "translateY(0)";
            musicPlayer.style.height = "600px";
            control.style.marginBottom = "300px";
        }else {
            bx.classList.remove('bx-chevron-down');
            bx.classList.add("bx-chevron-up");
            isClicked = false;
            musicPlayer.style.height = "350px";
            control.style.marginBottom = "0px";
            playlistContainer.style.transform = "translateY(500px)";
        }
        
    })
}


fixingIssues();

beats.forEach((beat, index) => {
    let playlistItem = document.createElement('li');
    playlistItem.textContent = beat.nom;
    playlistContainer.appendChild(playlistItem);
    

    
    playlistItem.addEventListener('click', () => {
        chosenMusicIndex = index;
        audio.src = beats[chosenMusicIndex].source;
        title.textContent = beats[chosenMusicIndex].nom;
        audio.play();
        isPlaying = true;
        mainBtn.classList.remove('bx-play');
        mainBtn.classList.add('bx-pause');
        selectedMusic ();
    });
});

function selectedMusic () {
    const playlistItems = document.querySelectorAll('.playlist li');
        
    playlistItems.forEach((item, index) => {
        if (index === chosenMusicIndex) {
            item.classList.add('current-music');
        } else {
            item.classList.remove('current-music');
        }
    });
}








