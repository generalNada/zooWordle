document.addEventListener("DOMContentLoaded", () => {
  // Create clown face element
  const clownFace = document.createElement("div");
  clownFace.className = "clown-face";
  document.body.appendChild(clownFace);

  // Create balloon decorations
  const balloonContainer = document.createElement("div");
  balloonContainer.className = "balloon-container";
  document.body.appendChild(balloonContainer);

  // Add 8 balloons with different emojis
  const balloonEmojis = ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"];
  balloonEmojis.forEach((emoji) => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = emoji;
    balloonContainer.appendChild(balloon);
  });

  // Function to show clown face at random position
  function showClownFace() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    clownFace.style.left = `${x}px`;
    clownFace.style.top = `${y}px`;
    clownFace.style.display = "block";

    // Reset animation
    clownFace.style.animation = "none";
    clownFace.offsetHeight; // Trigger reflow
    clownFace.style.animation = "clownAppear 3s ease-in-out";

    // Hide clown face after animation
    setTimeout(() => {
      clownFace.style.display = "none";
    }, 3000);
  }

  // Show clown face randomly every 5-15 seconds
  function scheduleNextClown() {
    const delay = Math.random() * 10000 + 5000; // 5-15 seconds
    setTimeout(() => {
      showClownFace();
      scheduleNextClown();
    }, delay);
  }

  // Start the clown show
  scheduleNextClown();
});
