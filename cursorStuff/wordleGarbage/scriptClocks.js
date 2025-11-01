document.getElementById("footerClocks").style.border = "1px solid #ccc"; // Example of targeting the new ID
// Function to format time in the "HH:MM:SS" format
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to calculate time remaining until midnight in the Eastern Time Zone
function getTimeUntilMidnightEastern() {
  const now = new Date();

  // Convert current time to Eastern Time Zone
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const midnight = new Date(easternNow);
  midnight.setHours(24, 0, 0, 0); // Set to midnight

  const diff = midnight - easternNow; // Difference in milliseconds

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to update time display every second
function updateFooter() {
  const now = new Date();

  // Get current Eastern Time
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  // Update current time display
  document.getElementById(
    "currentTime"
  ).textContent = `Current Eastern Time: ${formatTime(easternNow)}
  YOU ARE SLATED FOR HELL, PIGS!`;

  // Update countdown to midnight
  document.getElementById(
    "countdownToMidnight"
  ).textContent = `Countdown to Midnight: 🧌 ${getTimeUntilMidnightEastern()} Clocks: Thou Clockest Can't Tick Fast Enough! With no due respect, you make me want to die, GOP.`;
}

// Start the clock
setInterval(updateFooter, 1000);
updateFooter(); // Initial call

function calculateCountdown(targetDate) {
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const diff = new Date(targetDate) - new Date(now);

  if (diff <= 0) return "00:00:00"; // Countdown complete

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days} very longAss fickin' days, ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.textContent = `The American Mid-Term Elections 0f 2026: ${calculateCountdown(
      "2026-11-03T00:00:00"
    )}. 
    Will We Goddamn MotherFucking Make Her Till Then, Thoun Jerkoes? Thou Dastardly Fools? Likely We Art Fucketh, Fuckoes!`;
  }
}

// Start countdown and update every second
updateCountdown();
setInterval(updateCountdown, 1000);
