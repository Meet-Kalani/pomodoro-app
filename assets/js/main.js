const hourElement = document.querySelector('.time-hour');
const minuteElement = document.querySelector('.time-minute');
const secondElement = document.querySelector('.time-second');
const timeContainerElement = document.querySelector('.time-container');
const resetBtnElement = document.querySelector('.reset-btn');
const progressContainerElement = document.querySelector('.progress-container');

let second = 0;
let minute = 0;
let hour = 0;
let resetTime;
let isBreakTime = false;
let progress = 0;

let progressStartValue = 0;
    let progressEndValue = 100;

timeContainerElement.addEventListener('click', startTimer);
resetBtnElement.addEventListener('click', resetTimer);

function startTimer() {
    if(progress == 5){
        resetTimer()
    }
    
    resetTime = setInterval(changeTime, 100);
    console.log(progress);
    // if(progress == 4){
    //     alert('congratulations')
    //     resetTimer();

    // }
}

function resetTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    secondElement.textContent = "00";
    minuteElement.textContent = "00";
    hourElement.textContent = "00";

    if(this.name === 'reset-btn'){
        resetProgress();
        isBreakTime = false;
    }

    if(progress === 5){
        alert('you are done!')
        resetProgress();
        isBreakTime = false;
        resetTimer();

    }
    timeContainerElement.style.background = `conic-gradient(#7d2ae8 3.6deg,#ededed 0deg)`;
    clearInterval(resetTime);
}

function changeTime() {
        
    progressStartValue++;
    
    minuteElement.textContent = `${progressStartValue}`
    // timeContainerElement.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 15}deg,#ededed 0deg)`;
    
    if(isBreakTime){
        timeContainerElement.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 71}deg,#ededed 0deg)`;
    } else {
        timeContainerElement.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 15}deg,#ededed 0deg)`;
    }


    second++;
    if (second == 60) {
        second = 0;
        minute++;
    }

    if (minute == 60) {
        minute = 0;
        hour++;
    }

    secondElement.textContent = second.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    minuteElement.textContent = minute.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    hourElement.textContent = hour.toLocaleString('en-US', { minimumIntegerDigits: 2 });

    // focus time then change the indicator after completeion
    if (!isBreakTime && second == 5) {
        progressStartValue = 0;
        resetTimer();
        isBreakTime = !isBreakTime;
        progressContainerElement.children[progress].style.backgroundColor = "#291711";
        progress++;
    } else if(isBreakTime && second == 5){
        resetTimer();
        isBreakTime = !isBreakTime;
        progressContainerElement.children[progress].style.backgroundColor = "#291711";
        progress++;
    }
}

function resetProgress(){
    //  working on resetting the progress indicators
    let progressIcons =  progressContainerElement.children;
    for(let i = 0;i < progressIcons.length;i++){
        progressIcons[i].style.backgroundColor = '#fff';
    }
    progress = 0;
}

function changeProgress(){

}

// let progressStartValue = 0;
//     let progressEndValue = 100;
    
//     let progressAnimation = setInterval(()=>{
//         progressStartValue++;
    
//         countMinute.textContent = `${progressStartValue}`
//         timeContainerElement.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg,#ededed 0deg)`
    
//         if(progressStartValue === progressEndValue){
//             clearInterval(progressAnimation);
//         }
//     },100)