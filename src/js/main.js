let intervalId = null;
let timeStart = 10;
let totalTime = 10;
let isPaused = false;

const display = document.getElementById("countdownDisplay");
const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const statusMsg = document.getElementById("statusMsg");
const customTime = document.getElementById("customTime");

function updateDisplay() {
  display.textContent = timeStart;
  const pct = (timeStart / totalTime) * 100;
  progressBar.style.width = pct + "%";

  if (timeStart <= 3) {
    display.className = "timer-display danger";
    progressBar.style.background = "#E24B4A";
  } else if (timeStart <= Math.floor(totalTime * 0.3)) {
    display.className = "timer-display warning";
    progressBar.style.background = "#EF9F27";
  } else {
    display.className = "timer-display";
    progressBar.style.background = "#1D9E75";
  }
}

// Update display when user types a new time
customTime.addEventListener("input", () => {
  if (!intervalId && !isPaused) {
    const val = parseInt(customTime.value);
    if (val > 0) {
      timeStart = val;
      totalTime = val;
      updateDisplay();
    }
  }
});

// Start / Resume
startBtn.addEventListener("click", () => {
  if (intervalId) return;
  const val = parseInt(customTime.value);
  if (!isPaused) {
    if (!val || val <= 0) {
      statusMsg.textContent = "Please enter a valid time!";
      return;
    }
    timeStart = val;
    totalTime = val;
  }
  isPaused = false;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  customTime.disabled = true;
  statusMsg.textContent = "Counting down...";
  updateDisplay();

  intervalId = setInterval(() => {
    timeStart--;
    updateDisplay();
    if (timeStart <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      display.textContent = "0";
      progressBar.style.width = "0%";
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      customTime.disabled = false;
      statusMsg.textContent = "Time's up!";
    }
  }, 1000);
});

// Pause
pauseBtn.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = true;
    pauseBtn.textContent = "Resume";
    startBtn.disabled = false;
    statusMsg.textContent = "Paused — press Start to resume";
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  isPaused = false;
  const val = parseInt(customTime.value) || 10;
  timeStart = val;
  totalTime = val;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = "Pause";
  customTime.disabled = false;
  statusMsg.textContent = "Enter a time and press Start";
  updateDisplay();
});

updateDisplay();
