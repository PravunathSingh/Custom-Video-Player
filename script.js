const media_video = document.querySelector('video');
const controls = document.querySelector('.controls');
const playAndPause = document.querySelector('.play');
const stopVideo = document.querySelector('.stop');
const rewind = document.querySelector('.rewind');
const forward = document.querySelector('.fastforward');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

controls.style.visibility = 'visible';

function playPause() {
    if(media_video.paused) {
        playAndPause.setAttribute('data-icon', 'u');
        media_video.play();
    }
    else {
        playAndPause.setAttribute('data-icon','P');
        media_video.pause();
    }

}

function stopMedia() {
    media_video.pause();
    media_video.currentTime = 0;
    playAndPause.setAttribute('data-icon', 'P');

    rewind.classList.remove('active');
    forward.classList.remove('active');
    clearInterval(intervalRewind);
    clearInterval(intervalForward);
}

let intervalRewind;
let intervalForward;

function rewindVideo() {
    clearInterval(intervalForward);
    forward.classList.remove('active');

    if(rewind.classList.contains('active')) {
        media_video.play();
    } 
    else {
        rewind.classList.add('active');
        media_video.pause();
        intervalRewind = setInterval(windBackward, 200);
    }
}

function forwardVideo() {
    clearInterval(intervalRewind);
    rewind.classList.remove('active');

    if(forward.classList.contains('active')) {
        media_video.play();
    } 
    else {
        forward.classList.add('active');
        media_video.pause();
        intervalForward = setInterval(windForward, 200);
    }
}

function windBackward() {
    if(media_video.currentTime <= 3) {
      rewind.classList.remove('active');
      clearInterval(intervalRewind);
      stopMedia();
    } 
    else {
      media_video.currentTime -= 3;
    }
}
  
function windForward() {
    if(media_video.currentTime >= media_video.duration - 3) {
      forward.classList.remove('active');
      clearInterval(intervalForward);
      stopMedia();
    } 
    else {
      media_video.currentTime += 3;
    }
}

function setTime() {
    let minutes = Math.floor(media_video.currentTime / 60);
    let seconds = Math.floor(media_video.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } 
    else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } 
    else {
      secondValue = seconds;
    }
  
    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;
  
    let barLength = timerWrapper.clientWidth * (media_video.currentTime/media_video.duration);
    timerBar.style.width = barLength + 'px';
}

playAndPause.addEventListener('click', playPause);
stopVideo.addEventListener('click', stopMedia);
media_video.addEventListener('ended', stopMedia);
rewind.addEventListener('click', rewindVideo);
forward.addEventListener('click', forwardVideo);
media_video.addEventListener('timeupdate', setTime);
