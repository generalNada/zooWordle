const tomatoArea = document.getElementById("tomato-area");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timerDisplay = document.getElementById("timer-display");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const incrementMinutesButton = document.getElementById("increment-minutes");
const decrementMinutesButton = document.getElementById("decrement-minutes");
const incrementSecondsButton = document.getElementById("increment-seconds");
const decrementSecondsButton = document.getElementById("decrement-seconds");

let timeLeft = 150; // 2:30 in seconds
let isRunning = false;
let animationFrameId = null;
let fragmentAnimations = [];
let startTime = 0;
let pausedTimeRemaining = null;

function formatTime(ms) {
  if (ms === null || ms === undefined) return "--:--";

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10);

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${hundredths
    .toString()
    .padStart(2, "0")}`;
}

function updateDisplay() {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  timeLeft = minutes * 60 + seconds;

  if (timeLeft > 0) {
    timerDisplay.textContent = formatTime(timeLeft * 1000);
  } else {
    timerDisplay.textContent = "--:--";
  }
}

function incrementMinutes() {
  const currentValue = parseInt(minutesInput.value) || 0;
  if (currentValue < 60) {
    minutesInput.value = currentValue + 1;
    updateDisplay();
  }
}

function decrementMinutes() {
  const currentValue = parseInt(minutesInput.value) || 0;
  if (currentValue > 0) {
    minutesInput.value = currentValue - 1;
    updateDisplay();
  }
}

function incrementSeconds() {
  const currentValue = parseInt(secondsInput.value) || 0;
  if (currentValue < 59) {
    secondsInput.value = currentValue + 1;
    updateDisplay();
  }
}

function decrementSeconds() {
  const currentValue = parseInt(secondsInput.value) || 0;
  if (currentValue > 0) {
    secondsInput.value = currentValue - 1;
    updateDisplay();
  }
}

function createFragments() {
  tomatoArea.innerHTML = "";
  const fragmentSize = 0.5;
  const numFragments = 750;
  const radius = 12;

  // Calculate how many fragments we need for each feature
  const circleFragments = Math.floor(numFragments * 0.65);
  const mouthFragments = Math.floor(numFragments * 0.15);
  const eyeFragments = Math.floor(numFragments * 0.1);
  const hairFragments = Math.floor(numFragments * 0.1);

  // Create all fragments at once
  const fragments = [];
  for (let i = 0; i < numFragments; i++) {
    const fragment = document.createElement("div");
    fragment.classList.add("fragment");
    fragments.push(fragment);

    // Calculate initial position in a circle
    const angle = (i / numFragments) * Math.PI * 2;
    const distanceFromCenter = radius + (Math.random() - 0.5) * 1.2;
    const xPos = Math.cos(angle) * distanceFromCenter;
    const yPos = Math.sin(angle) * distanceFromCenter;

    // Closer starting positions for more immediate visibility
    const startAngle = Math.random() * Math.PI * 2;
    const startDistance = 25 + Math.random() * 15; // Even closer starting area
    const randomX = Math.cos(startAngle) * startDistance + "rem";
    const randomY = Math.sin(startAngle) * startDistance + "rem";

    // More gradual mid-point positions
    const midAngle = (startAngle + angle) / 2 + (Math.random() - 0.5) * Math.PI;
    const midDistance =
      (startDistance + distanceFromCenter) / 2 + (Math.random() - 0.5) * 8;
    const midX = Math.cos(midAngle) * midDistance + "rem";
    const midY = Math.sin(midAngle) * midDistance + "rem";

    // Final positions
    let finalX, finalY;

    // Determine if this fragment should be part of a feature
    if (i < hairFragments) {
      // Hair fragments - create a curlicue pattern
      const t = i / hairFragments;
      const curlRadius = 2;
      const spiralT = t * 4 * Math.PI;
      const shrinkFactor = 1 - t * 0.5;
      const hairX = Math.cos(spiralT) * curlRadius * shrinkFactor;
      const hairY = Math.sin(spiralT) * curlRadius * shrinkFactor - radius - 1;
      finalX = hairX + "rem";
      finalY = hairY + "rem";
    } else if (i < hairFragments + eyeFragments) {
      // Eye fragments - slightly scattered
      const isLeftEye = i % 2 === 0;
      const eyeAngle = Math.random() * Math.PI * 2;
      const eyeRadius = 0.6 + (Math.random() - 0.5) * 0.2;
      if (isLeftEye) {
        finalX =
          Math.cos(eyeAngle) * eyeRadius -
          3 +
          (Math.random() - 0.5) * 0.3 +
          "rem";
        finalY =
          Math.sin(eyeAngle) * eyeRadius -
          2 +
          (Math.random() - 0.5) * 0.3 +
          "rem";
      } else {
        finalX =
          Math.cos(eyeAngle) * eyeRadius +
          3 +
          (Math.random() - 0.5) * 0.3 +
          "rem";
        finalY =
          Math.sin(eyeAngle) * eyeRadius -
          2 +
          (Math.random() - 0.5) * 0.3 +
          "rem";
      }
    } else if (i < hairFragments + eyeFragments + mouthFragments) {
      // Mouth fragments - with slight variation
      const t = (i - (hairFragments + eyeFragments)) / mouthFragments;
      const mouthWidth = 4;
      const mouthHeight = 1.5;
      const mouthX = (t * 2 - 1) * mouthWidth + (Math.random() - 0.5) * 0.3;
      const mouthY =
        Math.sin(Math.PI * t) * mouthHeight + 2.5 + (Math.random() - 0.5) * 0.2;
      finalX = mouthX + "rem";
      finalY = mouthY + "rem";
    } else {
      // Circle outline fragments - with frilly edges
      const circleAngle =
        ((i - (hairFragments + eyeFragments + mouthFragments)) /
          circleFragments) *
        Math.PI *
        2;
      const frillyRadius =
        radius + Math.sin(circleAngle * 12) * 0.4 + (Math.random() - 0.5) * 0.4;
      finalX = Math.cos(circleAngle) * frillyRadius + "rem";
      finalY = Math.sin(circleAngle) * frillyRadius + "rem";
    }

    // More dramatic rotations
    const randomRotation = Math.random() * 3600 - 1800 + "deg";
    const midRotation = Math.random() * 1800 - 900 + "deg";

    fragment.style.setProperty("--animation-time", timeLeft + "s");
    fragment.style.setProperty("--random-x", randomX);
    fragment.style.setProperty("--random-y", randomY);
    fragment.style.setProperty("--mid-x", midX);
    fragment.style.setProperty("--mid-y", midY);
    fragment.style.setProperty("--final-x", finalX);
    fragment.style.setProperty("--final-y", finalY);
    fragment.style.setProperty("--random-rotation", randomRotation);
    fragment.style.setProperty("--mid-rotation", midRotation);

    tomatoArea.appendChild(fragment);
  }

  // Start animations immediately with precise timing
  requestAnimationFrame(() => {
    fragments.forEach((frag) => {
      frag.style.animation = `moveToSmiley ${timeLeft}s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
    });
  });
}

function animateFragments() {
  // No need for separate animation function anymore as it's handled in createFragments
}

function startTimer() {
  if (isRunning) return;

  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  timeLeft = minutes * 60 + seconds;

  if (timeLeft > 0 && timeLeft <= 3600) {
    isRunning = true;
    startTime = Date.now();

    const smiley = document.getElementById("smiley");
    smiley.style.display = "none";

    createFragments();
    updateTimer();
  }
}

function updateTimer() {
  if (!isRunning) return;

  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const remainingTime = Math.max(0, timeLeft * 1000 - elapsedTime);

  timerDisplay.textContent = formatTime(remainingTime);

  if (remainingTime <= 0) {
    isRunning = false;
    const fragments = document.querySelectorAll(".fragment");
    fragments.forEach((frag) => {
      const computedStyle = window.getComputedStyle(frag);
      frag.style.transform = computedStyle.transform;
      frag.style.animation = "none";
    });

    const smiley = document.getElementById("smiley");
    smiley.style.display = "block";
    smiley.classList.add("smiley-show");
  } else {
    animationFrameId = requestAnimationFrame(updateTimer);
  }
}

function stopTimer() {
  if (!isRunning) return;

  isRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  pausedTimeRemaining = timeLeft * 1000 - elapsedTime;
}

function resetTimer() {
  isRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  pausedTimeRemaining = null;
  const smiley = document.getElementById("smiley");
  smiley.style.display = "none";
  smiley.classList.remove("smiley-show");

  const fragments = document.querySelectorAll(".fragment");
  fragments.forEach((frag) => frag.remove());

  updateDisplay();
}

// Event Listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
incrementMinutesButton.addEventListener("click", incrementMinutes);
decrementMinutesButton.addEventListener("click", decrementMinutes);
incrementSecondsButton.addEventListener("click", incrementSeconds);
decrementSecondsButton.addEventListener("click", decrementSeconds);
minutesInput.addEventListener("input", updateDisplay);
secondsInput.addEventListener("input", updateDisplay);

// Initialize display
updateDisplay();
