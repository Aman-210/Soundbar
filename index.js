
const PlayButton = document.getElementById("play");
const AudioFile = document.querySelector("audio")

let isMusicPlay = false

function playMusic()
{
    // Logic to replace the play icon to pause icon
    PlayButton.classList.replace("fa-play" , "fa-pause")

   AudioFile.play()
   isMusicPlay = true
}

function pauseMusic()
{
 // Logic to replace the pause icon to play icon
 PlayButton.classList.replace("fa-pause" , "fa-play")

 AudioFile.pause()
 isMusicPlay = false
}

PlayButton.addEventListener("click" , function()
{
//  logic to play the music

 if(isMusicPlay){
 pauseMusic()
 }else{
    playMusic()
 }
})


// I want to get to know about the current-time and the total duration of the audio file

const TotalTime = document.querySelector(".totaltime");
const CurrentTime = document.querySelector(".currenttime");
const ProgressBar = document.querySelector(".progressbar")

AudioFile.addEventListener("timeupdate" , function(output)
{
 let audioCurrentTime = output.srcElement.currentTime;
 let audioTotalTime = output.srcElement.duration;

//  Logic to start the progressbar
 let MusicCompletedPercentage = audioCurrentTime / audioTotalTime * 100;
 ProgressBar.style.width = `${MusicCompletedPercentage}%`

// Converting TotalTime and CurrentTime into minutes
 let audioTotalTimeInMinutes = Math.floor(audioTotalTime / 60);
 let audioTotalTimeInSeconds = Math.floor(audioTotalTime % 60);
 
//  logic for display the timings in the webpage
 if(audioTotalTimeInSeconds < 10)
 {
     audioTotalTimeInSeconds =  `0${audioTotalTimeInSeconds}`;
 }
      TotalTime.textContent = `${audioTotalTimeInMinutes}:${audioTotalTimeInSeconds}`;

      let audioCurrentTimeInMinutes = Math.floor(audioCurrentTime / 60);
      let audioCurrentTimeInSeconds = Math.floor(audioCurrentTime % 60);
      
      
      if(audioCurrentTimeInSeconds < 10)
      {
          audioCurrentTimeInSeconds =  `0${audioCurrentTimeInSeconds}`;
      }
    CurrentTime.textContent = `${audioCurrentTimeInMinutes}:${audioCurrentTimeInSeconds}`
  
})


// Store Song Detail

const ForwardButton = document.getElementById("forward");
const BackwardButton = document.getElementById("backward")
const songsData =[
    
    {
        songName : "Save your tears",
        singerName : "Weeknd",
        data: 2,
    },
    {
        songName : "Little bit of Love",
        singerName : "Tom Grennan",
        data: 3,
    },
    {
        songName : "Drivers License",
        singerName : "Olivia Rodrigo",
        data: 1,
    },
    
]

const SongName = document.getElementById("songname");
const SingerName = document.getElementById("singername");
const Image = document.getElementById("image");
const Heart = document.getElementById("heart")

let songIndex = 0 ;

const displaySong = function()
{
    SongName.textContent =  songsData[songIndex].songName
    SingerName.textContent =  songsData[songIndex].singerName
    Image.src =  `Images/image-${songsData[songIndex].data}.jpg`
    AudioFile.src =  `Songs/music-${songsData[songIndex].data}.mp3`
 
    playMusic();
}

// Logic to load the one by one forward on the web page
ForwardButton.addEventListener("click" , function()
{

   displaySong()
   songIndex++
 
  Heart.style.color= "white"

   if(songIndex > songsData.length -1){
    songIndex = 0
   }

})

// Logic to load the one by one backward on the web page
BackwardButton.addEventListener("click" , function()
{
    songIndex--;

    Heart.style.color= "white"

    if (songIndex < 0) {
       songIndex = songsData.length - 1;
    }
 
   displaySong()
})

// logic for the shuffle button

const ShuffleButton = document.getElementById("shuffle");

ShuffleButton.addEventListener("click" , function()
{

    let randomsongIndex = Math.floor(Math.random()* 3 );
    songIndex = randomsongIndex;

    displaySong()

})

// Logic for heart icon or wishlist 

let isColorRed = false;

Heart.addEventListener("click" , function()
{
    if(isColorRed){
        Heart.style.color = "white";
        isColorRed = false;
        
    }else{
        Heart.style.color = "red";
        isColorRed = true;
    }

    //  Logic to store data in local storage 

    localStorage.setItem(SongName.textContent , SingerName.textContent)

    // Logic to remove data from local storage 
   if(isColorRed === false){
    localStorage.clear()
   }

})


// Logic for dragging the scrollbar

const ProgressContainer = document.getElementById("ProgressContainer");

 ProgressContainer.addEventListener("click" , function(event){

//  Logic to get distance from start


    let TotalWidthFromStart = event.offsetX;
    let TotalWidth = event.srcElement.offsetWidth;
   
    ProgressBar.style.width = `${event.offsetX}px`;

    AudioFile.currentTime = TotalWidthFromStart / TotalWidth * AudioFile.duration;


 })

//  logic for forward the music for 5sec;

 Image.addEventListener("dblclick" , function()
 {
    AudioFile.currentTime  = AudioFile.currentTime + 5 ;
 })
