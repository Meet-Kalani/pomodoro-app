const countHour = document.querySelector('.time-hour');
const countMinute = document.querySelector('.time-minute');
const countSecond = document.querySelector('.time-second');
const startStopBtn = document.querySelector('.time-container');
const resetBtn = document.querySelector('.reset-btn');
const progressContainer = document.querySelector('.progress-container');
let second = 0;
let minute = 0;
let hour = 0;
let resetTime;
let isBreakTime = false;
let progress = 0;

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    resetTime = setInterval(changeTime, 10);
}

function resetTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    countSecond.textContent = "00";
    countMinute.textContent = "00";
    countHour.textContent = "00";
    console.trace();
    //  working on resetting the progress indicators
    let progressIcons =  progressContainer.children;
    for(let i = 0;i < progressIcons.length;i++){
        progressIcons[i].style.backgroundColor = '#fff';
    }
    
    clearInterval(resetTime);
}

function changeTime() {
    second++;
    if (second == 60) {
        second = 0;
        minute++;
    }

    if (minute == 60) {
        minute = 0;
        hour++;
    }

    countSecond.textContent = second.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    countMinute.textContent = minute.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    countHour.textContent = hour.toLocaleString('en-US', { minimumIntegerDigits: 2 });

    // focus time then change the indicator after completeion
    if (!isBreakTime && minute == 1) {
        resetTimer();
        isBreakTime = !isBreakTime;
        progressContainer.children[progress].style.backgroundColor = "#291711";
        progress++;
    } else if(isBreakTime && minute == 1){
        resetTimer();
        isBreakTime = !isBreakTime;
        progressContainer.children[progress].style.backgroundColor = "#291711";
        progress++;
    }
}

function changeProgress(){

}