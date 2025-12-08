let time = 0;
let isRunning = false;

let timerValElem = document.getElementById("timer-val");

async function toggleTimer() {
  isRunning = !isRunning;

  if (isRunning) {
    updateTimer();
  }
}

async function updateTimer() {
  timerValElem.textContent = formatTime(time);

  await new Promise((r) => setTimeout(r, 50));
  if (!isRunning) return;

  time += 0.05;
  updateTimer();
}

function resetTimer() {
  time = 0;
}

function formatTime(seconds) {
  displaySeconds = Math.floor(seconds);
  if (seconds < 60) {
    return displaySeconds + "s";
  } else {
    return Math.round(seconds / 60) + "m" + (displaySeconds % 60) + "s";
  }
}
