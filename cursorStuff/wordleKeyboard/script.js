import { wordleWords, dailyWordsSmall } from "/theWholeEnchilada.js";

let filteredWords = [...dailyWordsSmall];
let activeFilter = null;
let selectedLetter = null;
let selectedPosition = null;
let keyboardState = {};

// Create the keyboard layout
const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

document.addEventListener("DOMContentLoaded", () => {
  createKeyboard();
  initializeKeyboardState();
  setupEventListeners();
  updateSelectionDisplay();
  displayResults(filteredWords);
});

function setupEventListeners() {
  // Filter button click handlers
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      handleFilterClick(filter);
    });
  });

  // Position button click handlers
  document.querySelectorAll(".position-button").forEach((button) => {
    button.addEventListener("click", () => {
      const position = parseInt(button.dataset.position);
      handlePositionClick(position);
    });
  });

  // Navigation button click handlers
  document.getElementById("backButton").addEventListener("click", handleBack);
  document.getElementById("resetButton").addEventListener("click", handleReset);
}

function updateSelectionDisplay() {
  document.getElementById("currentFilter").textContent = activeFilter
    ? activeFilter.replace(/([A-Z])/g, " $1").trim()
    : "None";
  document.getElementById("currentLetter").textContent =
    selectedLetter || "None";
  document.getElementById("currentPosition").textContent =
    selectedPosition || "None";
}

function handleFilterClick(filter) {
  // Reset previous state
  selectedLetter = null;
  selectedPosition = null;
  document.querySelector(".position-buttons").classList.add("hidden");

  // Update active filter
  if (activeFilter === filter) {
    activeFilter = null;
  } else {
    activeFilter = filter;
  }

  // Update UI
  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
  });

  // Show position buttons if needed
  if (
    activeFilter &&
    (activeFilter === "containsLetterAtPosition" ||
      activeFilter === "containsLetterNotAtPosition")
  ) {
    document.querySelector(".position-buttons").classList.remove("hidden");
  }

  updateSelectionDisplay();
  checkAndApplyFilter();
}

function handlePositionClick(position) {
  selectedPosition = position;

  // Update UI
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.position) === position);
  });

  updateSelectionDisplay();
  checkAndApplyFilter();
}

function handleKeyPress(key) {
  if (!activeFilter) return;

  selectedLetter = key;
  animateKeyPress(key);

  updateSelectionDisplay();
  checkAndApplyFilter();
}

function checkAndApplyFilter() {
  if (!activeFilter) return;

  if (activeFilter === "doesNotContainLetter" && selectedLetter) {
    applyFilter();
  } else if (
    (activeFilter === "containsLetterAtPosition" ||
      activeFilter === "containsLetterNotAtPosition") &&
    selectedLetter &&
    selectedPosition
  ) {
    applyFilter();
  }
}

function applyFilter() {
  // Reset to initial state before applying new filter
  filteredWords = [...dailyWordsSmall];

  switch (activeFilter) {
    case "doesNotContainLetter":
      filteredWords = filteredWords.filter(
        (word) => !word.includes(selectedLetter.toUpperCase())
      );
      break;
    case "containsLetterAtPosition":
      if (selectedLetter && selectedPosition) {
        filteredWords = filteredWords.filter(
          (word) => word[selectedPosition - 1] === selectedLetter.toUpperCase()
        );
      }
      break;
    case "containsLetterNotAtPosition":
      if (selectedLetter && selectedPosition) {
        filteredWords = filteredWords.filter(
          (word) =>
            word.includes(selectedLetter.toUpperCase()) &&
            word[selectedPosition - 1] !== selectedLetter.toUpperCase()
        );
      }
      break;
  }

  displayResults(filteredWords);
}

function handleBack() {
  // Reset to previous state
  if (selectedPosition) {
    selectedPosition = null;
    document.querySelectorAll(".position-button").forEach((btn) => {
      btn.classList.remove("active");
    });
  } else if (selectedLetter) {
    selectedLetter = null;
  } else if (activeFilter) {
    activeFilter = null;
    document.querySelectorAll(".filter-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(".position-buttons").classList.add("hidden");
  }

  updateSelectionDisplay();

  // Reset filtered words to initial state
  filteredWords = [...dailyWordsSmall];
  displayResults(filteredWords);
}

function handleReset() {
  // Reset everything
  activeFilter = null;
  selectedLetter = null;
  selectedPosition = null;

  // Reset UI
  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(".position-buttons").classList.add("hidden");

  updateSelectionDisplay();

  // Reset filtered words
  filteredWords = [...dailyWordsSmall];
  displayResults(filteredWords);
}

function createKeyboard() {
  const keyboardSection = document.querySelector(".keyboard-section");
  const keyboardContainer = document.createElement("div");
  keyboardContainer.className = "keyboard-container";

  keyboardLayout.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.className = "keyboard-row";

    row.forEach((key) => {
      const keyElement = document.createElement("button");
      keyElement.className = "key";
      keyElement.textContent = key;
      keyElement.dataset.key = key;

      // Add initial animation
      keyElement.style.animation = "fadeIn 0.5s ease-out forwards";
      keyElement.style.animationDelay = `${rowIndex * 0.1}s`;

      keyElement.addEventListener("click", () => handleKeyPress(key));
      rowElement.appendChild(keyElement);
    });

    keyboardContainer.appendChild(rowElement);
  });

  keyboardSection.appendChild(keyboardContainer);
}

function initializeKeyboardState() {
  keyboardLayout.forEach((row) => {
    row.forEach((key) => {
      keyboardState[key] = {
        pressed: false,
        color: getRandomColor(),
      };
    });
  });
}

function animateKeyPress(key) {
  const keyElement = document.querySelector(`[data-key="${key}"]`);
  if (keyElement) {
    keyElement.style.animation = "none";
    keyElement.offsetHeight; // Trigger reflow
    keyElement.style.animation = "keyPress 0.3s ease-out";
  }
}

function getRandomColor() {
  const hue = Math.random() * 360;
  return `hsl(${hue}, 70%, 60%)`;
}

function displayResults(results) {
  const resultsDiv = document.getElementById("filteredWords");
  const wordsList = results.join(", ");
  const totalWords = results.length;

  // Add animation to results
  resultsDiv.style.animation = "none";
  resultsDiv.offsetHeight; // Trigger reflow
  resultsDiv.style.animation = "fadeIn 0.5s ease-out";

  resultsDiv.innerHTML = `
        <div class="results-header">
            <span class="total-words">Total Words: ${totalWords}</span>
        </div>
        <div class="words-list">${wordsList}</div>
    `;
}

// Add keyPress animation to the styles
const style = document.createElement("style");
style.textContent = `
    @keyframes keyPress {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
    
    .results-header {
        margin-bottom: 1rem;
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .words-list {
        line-height: 1.6;
    }
`;
document.head.appendChild(style);
