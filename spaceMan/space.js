document.getElementById("activateSky").addEventListener("click", () => {
  console.log("You're in Space, Ace!!!");
  document.getElementById("nightSky").style.opacity = "1";
  document.getElementById("nightSky").style.pointerEvents = "auto";
  generateStars(1500);
  generatePlanets(6);
  setInterval(generateShootingStar, 10000);
});

// 🌟 Generate Stars
function generateStars(count) {
  const sky = document.getElementById("nightSky");
  for (let i = 0; i < count; i++) {
    let star = document.createElement("div");
    star.classList.add("star");

    // Random Position
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    // Random Size
    let size = Math.random() * 3 + 1; // Between 1px and 4px
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Random Twinkle Speed
    let duration = Math.random() * 5 + 3; // Between 3s and 8s
    star.style.animationDuration = duration + "s";

    // Random Opacity (Some stars appear dimmer)
    star.style.opacity = Math.random() * 0.8 + 0.2;

    sky.appendChild(star);
  }
}

// 🪐 Generate Planets
function generatePlanets(count) {
  const sky = document.getElementById("nightSky");
  const planetTypes = ["rocky", "gas", "ice"];
  const depthLevels = ["far", "mid", "close"];

  for (let i = 0; i < count; i++) {
    let planet = document.createElement("div");
    planet.classList.add("planet");

    let type = planetTypes[Math.floor(Math.random() * planetTypes.length)];
    planet.setAttribute("data-type", type);

    let depth = depthLevels[Math.floor(Math.random() * depthLevels.length)];
    planet.setAttribute("data-depth", depth);

    let size = depth === "far" ? 10 : depth === "mid" ? 13 : 17;
    planet.style.width = size + "px";
    planet.style.height = size + "px";
    planet.style.left = Math.random() * 80 + 10 + "vw";
    planet.style.top = Math.random() * 80 + 10 + "vh";

    planet.addEventListener("click", () =>
      showMessage(`This ${type} planet is ${depth} away.`)
    );
    sky.appendChild(planet);
  }
}

// ☄️ Shooting Star
function generateShootingStar() {
  let star = document.createElement("div");
  star.classList.add("shooting-star");
  star.style.left = Math.random() * 80 + 10 + "vw";
  star.style.top = Math.random() * 50 + "vh";
  document.getElementById("nightSky").appendChild(star);
  setTimeout(() => star.remove(), 2000);
}

// 📜 Show Planet Message
function showMessage(text) {
  console.log("FUCK THOU, CHIP!");
  let msgBox = document.getElementById("messageBox");
  msgBox.textContent = text;
  msgBox.style.display = "block";
  setTimeout(() => {
    msgBox.style.display = "none";
  }, 3000);
}

// 🌙 Calculate the Current Moon Phase
// 🌙 Function to Get the Correct Moon Phase
function getMoonPhase() {
  const moonPhases = [
    "new",
    "waxing-crescent",
    "first-quarter",
    "waxing-gibbous",
    "full",
    "waning-gibbous",
    "last-quarter",
    "waning-crescent",
  ];

  // Get the real current date
  let today = new Date();

  // Reference New Moon (Jan 6, 2000) for calculations
  let startOfCycle = new Date(2000, 0, 6);

  // One full moon cycle is 29.53 days
  let lunarCycleDays = 29.53;

  // Get days since reference new moon
  let diff = (today - startOfCycle) / (1000 * 60 * 60 * 24);

  // Calculate which phase we are in
  let phaseIndex = Math.floor(
    (diff % lunarCycleDays) / (lunarCycleDays / moonPhases.length)
  );

  return moonPhases[phaseIndex];
}

// 🌙 Update the Moon's Phase in Real-Time
function updateMoonPhase() {
  let moon = document.getElementById("moon");
  let phase = getMoonPhase();
  moon.setAttribute("data-phase", phase);
  moon.title = `Current Phase: ${phase.replace("-", " ")}`;
}

// 🌙 Start the Moon Moving Across the Sky
function startMoonAnimation() {
  let moon = document.getElementById("moon");
  moon.classList.add("moving");
}

// 🚀 Initialize the Moon
document.addEventListener("DOMContentLoaded", () => {
  updateMoonPhase();
  startMoonAnimation();

  // Update moon phase every 12 hours
  setInterval(updateMoonPhase, 43200000);
});

// 🌙 Click Moon to Show Date & Phase
document.getElementById("moon").addEventListener("click", () => {
  alert(`Today's Moon Phase: ${getMoonPhase().replace("-", " ")}`);
});

document.getElementById("activateSky").addEventListener("click", () => {
  playBlueDanube();
});

function playBlueDanube() {
  console.log("Playing Blue Danube..."); // Debugging
  const audio = document.getElementById("myDanube");
  if (audio) {
    audio.play().catch((err) => console.error("Error playing audio:", err));
  } else {
    console.error("Audio element not found");
  }
}
