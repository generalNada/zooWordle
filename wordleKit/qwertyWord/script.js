import {
  wordleWords,
  combinedWords,
  fixedWordsLarge,
} from "../../theWholeEnchilada.js";

let usingLargeList = false;
let currentWordList = [...combinedWords];
let filteredWords = [...currentWordList];
let activeFilter = null;
let selectedLetter = null;
let selectedPosition = null;
let filterHistory = [];
let highlightRepeats = false;
let highlightConsecutive = false;
let highlightWordle = false;

// Create a Set of wordleWords for fast lookup (uppercase for comparison)
// wordleWords is an array of objects with a 'word' property
const wordleWordsSet = new Set(wordleWords.map(item => item.word.toUpperCase()));


// Create the keyboard layout
const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

document.addEventListener("DOMContentLoaded", () => {
  createKeyboard();
  setupEventListeners();
  setupHighlightToggles();
  updateUI();
  displayResults(filteredWords);

  // Word list toggle button
  document.getElementById("wordlistToggle").addEventListener("click", () => {
    usingLargeList = !usingLargeList;
    currentWordList = usingLargeList
      ? [...fixedWordsLarge]
      : [...combinedWords];
    document.getElementById("wordlistToggle").textContent = usingLargeList
      ? "Use Small Word List, Dipshit"
      : "Use Large Word List, Shithead";
    // Reset everything
    filteredWords = [...currentWordList];
    filterHistory = [];
    activeFilter = null;
    selectedLetter = null;
    selectedPosition = null;
    document
      .querySelectorAll(".filter-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".position-button")
      .forEach((btn) => btn.classList.remove("active"));
    document.querySelector(".position-buttons").classList.add("hidden");
    updateKeyboardKeys();
    updateUI();
    displayResults(filteredWords);
  });
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
  document.getElementById("clearButton").addEventListener("click", handleClear);
}

function setupHighlightToggles() {
  const repeatToggle = document.getElementById("repeatLettersToggle");
  const consecutiveToggle = document.getElementById("consecutiveLettersToggle");
  const wordleToggle = document.getElementById("highlightWordleButton");

  if (repeatToggle) {
    repeatToggle.addEventListener("click", () => {
      highlightRepeats = !highlightRepeats;
      repeatToggle.classList.toggle("active", highlightRepeats);
      displayResults(filteredWords);
    });
  }

  if (consecutiveToggle) {
    consecutiveToggle.addEventListener("click", () => {
      highlightConsecutive = !highlightConsecutive;
      consecutiveToggle.classList.toggle("active", highlightConsecutive);
      displayResults(filteredWords);
    });
  }

  if (wordleToggle) {
    wordleToggle.addEventListener("click", () => {
      highlightWordle = !highlightWordle;
      wordleToggle.classList.toggle("active", highlightWordle);
      displayResults(filteredWords);
    });
  }
}

function handleFilterClick(filter) {
  // Reset previous state
  selectedLetter = null;
  selectedPosition = null;
  document.querySelector(".position-buttons").classList.add("hidden");

  // Update active filter
  if (activeFilter === filter) {
    activeFilter = null;
    filteredWords = [...currentWordList];
    filterHistory = [];
  } else {
    activeFilter = filter;
    // Don't reset filteredWords here - keep current filtered state
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

  updateUI();
}

function handlePositionClick(position) {
  selectedPosition = position;

  // Update UI
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.position) === position);
  });

  // If we have a letter selected, apply the filter immediately
  if (selectedLetter) {
    const newFilter = {
      type: activeFilter,
      letter: selectedLetter,
      position: selectedPosition,
    };
    filteredWords = applyFilter(filteredWords, newFilter);
    filterHistory.push(newFilter);
    displayResults(filteredWords);
  }

  updateUI();
}

function handleKeyPress(key) {
  if (!activeFilter) return;

  selectedLetter = key;
  const newFilter = {
    type: activeFilter,
    letter: key,
    position: selectedPosition,
  };

  // Apply the new filter to current filteredWords
  filteredWords = applyFilter(filteredWords, newFilter);
  filterHistory.push(newFilter);

  // Update keyboard keys
  updateKeyboardKeys();
  updateUI();
  displayResults(filteredWords);
}

function updateKeyboardKeys() {
  const keyboardKeys = document.querySelectorAll(".key");
  const eliminatedLetters = new Set();
  const confirmedLetters = new Set();
  const presentLetters = new Set();
  // Map: letter -> Set of unavailable positions (1-5)
  const presentPositions = {};
  // Map: letter -> Set of confirmed positions (1-5)
  const confirmedPositions = {};

  // Find all eliminated, confirmed, and present letters
  filterHistory.forEach((filter) => {
    if (filter.type === "doesNotContainLetter") {
      eliminatedLetters.add(filter.letter);
    } else if (filter.type === "containsLetterAtPosition") {
      confirmedLetters.add(filter.letter);
      if (!confirmedPositions[filter.letter])
        confirmedPositions[filter.letter] = new Set();
      confirmedPositions[filter.letter].add(filter.position);
    } else if (filter.type === "containsLetterNotAtPosition") {
      presentLetters.add(filter.letter);
      if (!presentPositions[filter.letter])
        presentPositions[filter.letter] = new Set();
      presentPositions[filter.letter].add(filter.position);
    }
  });

  // Update each key
  keyboardKeys.forEach((key) => {
    const letter = key.dataset.key;
    key.classList.toggle("eliminated", eliminatedLetters.has(letter));
    key.classList.toggle("confirmed", confirmedLetters.has(letter));
    key.classList.toggle(
      "present",
      presentLetters.has(letter) &&
        !confirmedLetters.has(letter) &&
        !eliminatedLetters.has(letter)
    );
    // Remove any old indicators
    key.querySelectorAll(".key-position-indicator").forEach((e) => e.remove());

    // Add position indicators for confirmed keys (green)
    if (confirmedLetters.has(letter) && confirmedPositions[letter]) {
      [...confirmedPositions[letter]].forEach((pos) => {
        if (pos >= 1 && pos <= 5) {
          const span = document.createElement("span");
          span.className = `key-position-indicator pos-${pos}`;
          span.textContent = pos;
          key.appendChild(span);
        }
      });
    }

    // Add position indicators for present keys (orange)
    if (
      presentLetters.has(letter) &&
      !confirmedLetters.has(letter) &&
      !eliminatedLetters.has(letter) &&
      presentPositions[letter]
    ) {
      [...presentPositions[letter]].forEach((pos) => {
        if (pos >= 1 && pos <= 5) {
          const span = document.createElement("span");
          span.className = `key-position-indicator pos-${pos}`;
          span.textContent = pos;
          key.appendChild(span);
        }
      });
    }
  });
}

function applyFilter(words, filter) {
  const { type, letter, position } = filter;
  const upperLetter = letter.toUpperCase();

  switch (type) {
    case "doesNotContainLetter":
      return words.filter((word) => !word.includes(upperLetter));
    case "containsLetterAtPosition":
      if (!position) return words; // Don't filter if no position selected
      return words.filter((word) => word[position - 1] === upperLetter);
    case "containsLetterNotAtPosition":
      if (!position) return words; // Don't filter if no position selected
      return words.filter(
        (word) =>
          word.includes(upperLetter) && word[position - 1] !== upperLetter
      );
    default:
      return words;
  }
}

function handleBack() {
  if (filterHistory.length === 0) return;

  // Remove the last filter
  filterHistory.pop();

  // Reset to initial state
  filteredWords = [...currentWordList];

  // Reapply all remaining filters
  filterHistory.forEach((filter) => {
    filteredWords = applyFilter(filteredWords, filter);
  });

  // Update the last filter state
  const lastFilter = filterHistory[filterHistory.length - 1];
  if (lastFilter) {
    activeFilter = lastFilter.type;
    selectedLetter = lastFilter.letter;
    selectedPosition = lastFilter.position;
  } else {
    activeFilter = null;
    selectedLetter = null;
    selectedPosition = null;
  }

  // Update UI
  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
  });
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.toggle(
      "active",
      parseInt(btn.dataset.position) === selectedPosition
    );
  });
  document
    .querySelector(".position-buttons")
    .classList.toggle(
      "hidden",
      !activeFilter ||
        (activeFilter !== "containsLetterAtPosition" &&
          activeFilter !== "containsLetterNotAtPosition")
    );

  updateKeyboardKeys();
  updateUI();
  displayResults(filteredWords);
}

function handleReset() {
  // Reset everything
  activeFilter = null;
  selectedLetter = null;
  selectedPosition = null;
  filteredWords = [...currentWordList];
  filterHistory = [];

  // Reset UI
  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(".position-buttons").classList.add("hidden");

  updateKeyboardKeys();
  updateUI();
  displayResults(filteredWords);
}

function handleClear() {
  // Clear letter and position selections
  selectedLetter = null;
  selectedPosition = null;

  // Update UI
  document.querySelectorAll(".position-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Keep position buttons visible if the filter type requires them
  if (
    activeFilter &&
    (activeFilter === "containsLetterAtPosition" ||
      activeFilter === "containsLetterNotAtPosition")
  ) {
    document.querySelector(".position-buttons").classList.remove("hidden");
  }

  updateKeyboardKeys();
  updateUI();
  // Don't change filteredWords or filterHistory
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

      keyElement.addEventListener("click", () => handleKeyPress(key));
      rowElement.appendChild(keyElement);
    });

    keyboardContainer.appendChild(rowElement);
  });

  keyboardSection.appendChild(keyboardContainer);
}

function updateUI() {
  document.getElementById("currentFilter").textContent = activeFilter
    ? activeFilter.replace(/([A-Z])/g, " $1").trim()
    : "None";
  document.getElementById("currentLetter").textContent =
    selectedLetter || "None";
  document.getElementById("currentPosition").textContent =
    selectedPosition || "None";
}

function displayResults(results) {
  const resultsDiv = document.getElementById("filteredWords");
  const totalWords = results.length;
  const wordsList = results
    .map((word) => {
      const upperWord = word.toUpperCase();
      const hasRepeat = hasRepeatedLetters(upperWord);
      const hasConsecutive = hasConsecutiveLetters(upperWord);
      const isWordleWord = wordleWordsSet.has(upperWord);

      const classes = ["word-chip"];
      const badges = [];
      if (highlightRepeats && hasRepeat) {
        classes.push("highlight-repeat");
        badges.push("repeated letters");
      }
      if (highlightConsecutive && hasConsecutive) {
        classes.push("highlight-consecutive");
        badges.push("consecutive letters");
      }
      if (highlightWordle && isWordleWord) {
        classes.push("highlight-wordle");
        badges.push("wordle word");
      }

      const title = badges.length
        ? `title="Contains ${badges.join(" & ")}"`
        : "";

      // Add data attribute for wordle words so they're clickable even when highlighting is off
      const dataAttr = isWordleWord ? `data-wordle-word="true"` : "";

      return `<span class="${classes.join(" ")}" ${title} ${dataAttr}>${word}</span>`;
    })
    .join(" ");

  // Calculate letter frequencies
  const frequencies = {};
  for (let i = 0; i < 26; i++) {
    frequencies[String.fromCharCode(65 + i)] = 0;
  }
  results.forEach((word) => {
    for (const char of word.toUpperCase()) {
      if (frequencies.hasOwnProperty(char)) {
        frequencies[char]++;
      }
    }
  });

  // Render frequency bar as a table with zero class
  const freqBar = `
    <table class="letter-frequency-bar" style="margin: 0.5em auto 1em auto; border-collapse: collapse;">
      <tr>
        ${Object.keys(frequencies)
          .map((l) => {
            const zero = frequencies[l] === 0 ? "letter-zero" : "";
            return `<th class="${zero}" style="padding:2px 4px; font-weight:bold; font-size:0.95em;">${l}</th>`;
          })
          .join("")}
      </tr>
      <tr>
        ${Object.values(frequencies)
          .map((c, i) => {
            const zero = c === 0 ? "letter-zero" : "";
            return `<td class="${zero}" style="padding:2px 4px; font-size:0.95em; text-align:center;">${c}</td>`;
          })
          .join("")}
      </tr>
    </table>
  `;

  resultsDiv.innerHTML = `
    <div class="results-header">
      <span class="total-words">Total Words: ${totalWords}</span>
    </div>
    ${freqBar}
    <div class="words-list">${wordsList}</div>
  `;
}

function hasRepeatedLetters(word) {
  const seen = new Set();
  for (const char of word) {
    if (seen.has(char)) return true;
    seen.add(char);
  }
  return false;
}

function hasConsecutiveLetters(word) {
  for (let i = 1; i < word.length; i++) {
    if (word[i] === word[i - 1]) {
      return true;
    }
  }
  return false;
}

console.log(keyboardLayout);
console.log("WTF? Seriously....");
