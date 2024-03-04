// DOM elements
const hourElement = document.querySelector(".time-hour");
const minuteElement = document.querySelector(".time-minute");
const secondElement = document.querySelector(".time-second");
const timeContainerElement = document.querySelector(".time-container");
const resetBtnElement = document.querySelector(".reset-btn");
const progressContainerElement = document.querySelector(".progress-container");
const mainContainer = document.querySelector("#pomodoro-app");
const achievementContainer = document.querySelector(".achievement-container");
const focusMsgContainer = document.querySelector(".focus-msg-container");
const closeBtn = document.querySelector(".close-icon");
const resetCycleBtn = document.querySelector(".reset-cycle-btn");

// Variables for tracking time and tracking progress
let second = 0,
  minute = 0,
  hour = 0,
  resetTime,
  isBreakTime = false,
  progressCycle = 0,
  progressBarValue = 0;

timeContainerElement.addEventListener("click", startTimer); // Start timer when time container is clicked
resetBtnElement.addEventListener("click", resetTimer); // Reset timer when reset button is clicked
resetCycleBtn.addEventListener("click", resetTimer); // Reset timer when reset cycle button is clicked
document.addEventListener("visibilitychange", handleVisibilityChange); // Handle visibility change event

// Hide focus message container when close button is clicked
closeBtn.addEventListener("click", () => {
  hideElement(focusMsgContainer);
});

function startTimer() {
  if (progressCycle == 5) resetTimer();
  resetTime = setInterval(changeTime, 1000);
  timeContainerElement.removeEventListener("click", startTimer);
}

function resetTimer() {
  progressBarValue = 0;
  // enabling time click which was disabled during tab(screen) change scenario
  enableTimeClick();

  // Resetting time variables and time display
  hour = minute = second = 0;
  secondElement.textContent = "00";
  hourElement.textContent = minuteElement.textContent = "00:";

  // Resetting progress indicators
  if (this.name === "reset-btn" || this.name === "reset-cycle-btn") {
    resetProgress();
    isBreakTime = false;
  }

  if (this.name === "reset-cycle-btn") hideElement(achievementContainer);

  // Resetting Progress bar
  timeContainerElement.style.background = `conic-gradient(#7d2ae8 0deg,#ededed 0deg)`;
  clearInterval(resetTime);
}

let previousValue = null;

// function for checking if the value has changed
function checkValueChanged(currentValue) {
  const changed = previousValue !== currentValue;
  previousValue = currentValue;
  return changed;
}

function changeTime() {
  // Increase progressbar with minute spent
  if (checkValueChanged(progressBarValue)) {
    if (isBreakTime) {
      timeContainerElement.style.background = `conic-gradient(#C33C54 ${
        progressBarValue * 71
      }deg,#ededed 0deg)`;
    } else {
      timeContainerElement.style.background = `conic-gradient(#C33C54 ${
        progressBarValue * 15
      }deg,#ededed 0deg)`;
    }
  }

  // Changing time
  second++;
  progressBarValue++;
  if (second == 60) {
    second = 0;
    minute++;
  }

  if (minute == 60) {
    minute = 0;
    hour++;
  }

  // Printing current time
  secondElement.textContent = second.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  minuteElement.textContent =
    minute.toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":";
  hourElement.textContent =
    hour.toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":";

  // Changing cycle in 25 second for focus time and 5 second for break
  if (!isBreakTime && second == 25) {
    changeProgress();
    enableTimeClick();
  } else if (isBreakTime && second == 5) {
    changeProgress();
    enableTimeClick();
  }
}

function displayAchievement(value) {
  if (value === 5) {
    achievementContainer.style.display = "flex";
  }
}

function resetProgress() {
  // Changing all the progress indicator to white so user can know that cycle has been reset
  const progressIcons = progressContainerElement.children;
  for (let i = 0; i < progressIcons.length; i++) {
    progressIcons[i].style.backgroundColor = "#fff";
  }
  progressCycle = 0;
}

function changeProgress() {
  progressBarValue = 0;
  resetTimer();

  // Changing current cycle from break time to focus time and vice versa
  isBreakTime = !isBreakTime;

  // Changing color of progress indicator so user can track how much he has accomplished
  progressContainerElement.children[progressCycle].style.backgroundColor =
    "#C33C54";
  progressCycle++;

  // only displayed if the user has completed entire lifecycle of pomodoro app (i.e 5 cycle in total of focus and break)
  displayAchievement(progressCycle);
}

function hideElement(element) {
  element.style.display = "none";
}

function enableTimeClick() {
  timeContainerElement.addEventListener("click", startTimer);
}

function handleVisibilityChange() {
  if (document.visibilityState !== "hidden") {
    // displaying message to user for leaving the screen
    focusMsgContainer.style.display = "initial";

    // removing listener so user can't continue with the progress
    timeContainerElement.removeEventListener("click", startTimer);
    clearInterval(resetTime);

    // changing color of progress indicator as user has left the screen
    const progressIcons = Array.from(progressContainerElement.children);
    progressIcons.forEach((icon) => {
      if (icon.style.backgroundColor === "rgb(195, 60, 84)") {
        icon.style.backgroundColor = "red";
      } else {
        return;
      }
    });
  }
}
