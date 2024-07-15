let startTime;
let endTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapNumber = 1;
let isCountingDown = false;
let isRunning = false; // Track if the stopwatch is running

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const setTimeBtn = document.getElementById('setTimeBtn');
const setTimeInput = document.getElementById('setTimeInput');
const setTimeContainer = document.getElementById('setTimeContainer'); // Container for set time elements
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetBtn.addEventListener('click', function() {
    resetTimer();
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        addLap();
    } else {
        resetLaps();
    }
});

setTimeBtn.addEventListener('click', function() {
    setTimer(setTimeInput.value);
});

function startTimer() {
    if (elapsedTime <= 0) {
        isCountingDown = false;
        startTime = Date.now();
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            updateTimeDisplay(elapsedTime);
        }, 10);
    } else {
        startCountdown();
    }
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    lapBtn.textContent = 'Lap';
    setTimeContainer.style.display = 'none'; // Hide set time elements
}

function startCountdown() {
    startTime = Date.now();
    endTime = startTime + elapsedTime;
    isCountingDown = true;
    timerInterval = setInterval(function printTime() {
        elapsedTime = endTime - Date.now();
        if (elapsedTime <= 0) {
            stopTimer();
            elapsedTime = 0;
            updateTimeDisplay(elapsedTime);
            alert('Countdown completed!');
        } else {
            updateTimeDisplay(elapsedTime);
        }
    }, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    lapBtn.textContent = 'Lap';
    setTimeContainer.style.display = 'none'; // Hide set time elements
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isCountingDown = false;
    startStopBtn.textContent = 'Start';
    lapBtn.textContent = 'Reset Laps';
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimeDisplay(elapsedTime);
    lapsList.innerHTML = '';
    laps = [];
    lapNumber = 1;
    isRunning = false;
    isCountingDown = false;
    startStopBtn.textContent = 'Start';
    lapBtn.textContent = 'Lap';
    setTimeContainer.style.display = 'block'; // Show set time elements on reset
}

function addLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    laps.push(lapItem.textContent);
    lapNumber++;
}

function resetLaps() {
    lapsList.innerHTML = '';
    laps = [];
    lapNumber = 1;
}

function setTimer(timeStr) {
    const timeParts = timeStr.split(':').map(part => parseInt(part, 10));
    if (timeParts.length !== 3 || isNaN(timeParts[0]) || isNaN(timeParts[1]) || isNaN(timeParts[2])) {
        alert('Please enter time in HH:MM:SS format.');
        return;
    }
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2];
    elapsedTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
    if (elapsedTime <= 0) {
        alert('Please enter a valid time greater than zero.');
        return;
    }
    if (isRunning) {
        stopTimer();
    }
    updateTimeDisplay(elapsedTime);
    setTimeContainer.style.display = 'none'; // Hide set time elements after setting time
}

function updateTimeDisplay(time) {
    const formattedTime = formatTime(time);
    timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000)).toString().padStart(3, '0');
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
}
