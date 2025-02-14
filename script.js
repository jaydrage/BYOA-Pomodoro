let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const notificationSound = new Audio('notification.mp3');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('currentStatus');
const toggleButton = document.getElementById('toggle');
const workSlider = document.getElementById('workSlider');
const breakSlider = document.getElementById('breakSlider');
const workValue = document.getElementById('workValue');
const breakValue = document.getElementById('breakValue');

function updateDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.title = `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}) Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = isWorkTime ? workTime : breakTime;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            notificationSound.play();
            clearInterval(timerId);
            timerId = null;
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
            startTimer();
        }
    }, 1000);

    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    statusText.textContent = 'Work Time';
    updateDisplay(timeLeft);
    startButton.disabled = false;
    pauseButton.disabled = false;
}

function toggleMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    updateDisplay(timeLeft);
    startButton.disabled = false;
    pauseButton.disabled = false;
}

// Initialize
timeLeft = workTime;
updateDisplay(timeLeft);
toggleButton.textContent = 'Rest Mode';

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);
workSlider.addEventListener('input', function() {
    workValue.textContent = this.value;
    workTime = this.value * 60;
    if (isWorkTime) {
        timeLeft = workTime;
        updateDisplay(timeLeft);
    }
});
breakSlider.addEventListener('input', function() {
    breakValue.textContent = this.value;
    breakTime = this.value * 60;
    if (!isWorkTime) {
        timeLeft = breakTime;
        updateDisplay(timeLeft);
    }
}); 