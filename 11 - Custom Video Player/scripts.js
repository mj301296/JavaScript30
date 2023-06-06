/*Get elements*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/*Functions*/

let rangeClick = false;
let progressClick = false;
function toggleVideo(){
    console.log(video);
    video[video.paused ? 'play' : 'pause']();
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skipTime(){
    console.log(this)
    video.currentTime += parseFloat(this.dataset.skip);
}

function toggleRange(){
    if(rangeClick==true)
    {
        video[this.name] = this.value;
    } 
}

function toggleProgress(e){
    if(progressClick==true)
    {
        video.currentTime = (e.offsetX/ progress.offsetWidth)* video.duration;
    } 
}

function handleProgress(){
    let percent = (video.currentTime/video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

/*Event listerners*/
video.addEventListener('click', toggleVideo)
toggle.addEventListener('click', toggleVideo)
skipButtons.forEach(sB=>  sB.addEventListener('click', skipTime))
ranges.forEach(range => range.addEventListener('mousedown', ()=> rangeClick = true));
ranges.forEach(range => range.addEventListener('mouseup', ()=> rangeClick = false));
ranges.forEach(range => range.addEventListener('mousemove', toggleRange));
progress.addEventListener('click', (e)=> {progressClick = true, toggleProgress(e), progressClick = false});
progress.addEventListener('mousedown', ()=> progressClick = true);
progress.addEventListener('mouseup', ()=> progressClick = false);
progress.addEventListener('mousemove', toggleProgress);
video.addEventListener('timeupdate', handleProgress)