let x = "Hello Mr. Nothing";
console.log(x);


window.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById("theOpener");
    const linksVille = document.getElementById("linksVille");

    toggleButton.addEventListener("click", () => {
        linksVille.classList.toggle("hidden");
    });
});





document.getElementById("footerClocks").style.fontWeight = "bold"; // Example of targeting the new ID 
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
  document.getElementById("currentTime").textContent = `Current Eastern Time: ${formatTime(
    easternNow
  )}`;

  // Update countdown to midnight
  document.getElementById("countdownToMidnight").textContent = `Countdown to Midnight: ${getTimeUntilMidnightEastern()}`;
}

// Start the clock
setInterval(updateFooter, 1000);
updateFooter(); // Initi