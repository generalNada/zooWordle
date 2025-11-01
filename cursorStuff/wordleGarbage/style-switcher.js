document.addEventListener("DOMContentLoaded", () => {
  const styleToggle = document.getElementById("styleToggle");
  const mainStyle = document.getElementById("main-style");
  const altStyle = document.getElementById("alt-style");
  const circusStyle = document.getElementById("circus-style");
  let currentStyle = 0; // 0: main, 1: alt, 2: circus

  // Function to toggle styles
  function toggleStyles() {
    currentStyle = (currentStyle + 1) % 3;

    // Disable all styles first
    mainStyle.disabled = true;
    altStyle.disabled = true;
    circusStyle.disabled = true;

    // Enable the current style
    switch (currentStyle) {
      case 0:
        mainStyle.disabled = false;
        styleToggle.textContent = "Enjoy A Different Layout!";
        styleToggle.style.background = "";
        styleToggle.style.boxShadow = "";
        break;
      case 1:
        altStyle.disabled = false;
        styleToggle.textContent = "Enjoy A Circus Layout!";
        styleToggle.style.background =
          "linear-gradient(45deg, #00f3ff, #b967ff)";
        styleToggle.style.boxShadow = "0 0 20px rgba(0, 243, 255, 0.5)";
        break;
      case 2:
        circusStyle.disabled = false;
        styleToggle.textContent = "Back to Original Layout!";
        styleToggle.style.background =
          "linear-gradient(45deg, #ff1a1a, #ffd700)";
        styleToggle.style.boxShadow = "0 0 20px rgba(255, 26, 26, 0.5)";
        break;
    }
  }

  // Add click event listener
  styleToggle.addEventListener("click", toggleStyles);

  // Add some initial styling to the toggle button
  styleToggle.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.8rem 1.5rem;
        border: 2px solid #00f3ff;
        border-radius: 6px;
        background: transparent;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1000;
    `;

  styleToggle.addEventListener("mouseover", () => {
    styleToggle.style.transform = "translateY(-2px)";
    if (currentStyle === 0) {
      styleToggle.style.boxShadow = "0 0 15px rgba(0, 243, 255, 0.3)";
    }
  });

  styleToggle.addEventListener("mouseout", () => {
    styleToggle.style.transform = "";
    if (currentStyle === 0) {
      styleToggle.style.boxShadow = "";
    }
  });
});
