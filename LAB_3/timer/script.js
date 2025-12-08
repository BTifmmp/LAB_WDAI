let time = 0;
let isRunning = false;
let intervalId = null;

const timerValElem = document.getElementById("timer-val");

function toggleTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    timerValElem.textContent = formatTime(time);
  } else {
    isRunning = true;
    intervalId = setInterval(updateTimer, 10);
  }
}

function updateTimer() {
  time += 10;
  timerValElem.textContent = formatTime(time);
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  time = 0;
  timerValElem.textContent = formatTime(time);
}

function formatTime(ms) {
  displaySeconds = Math.floor(ms / 1000);
  if (displaySeconds < 60) {
    return displaySeconds + "s";
  } else {
    return Math.round(displaySeconds / 60) + "m" + (displaySeconds % 60) + "s";
  }
}

timerValElem.textContent = formatTime(time);
