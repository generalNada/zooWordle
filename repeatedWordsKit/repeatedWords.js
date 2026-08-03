import { wordleWords } from "../theWholeEnchilada.js";

let currentSortMode = "alphabetical";

function parseGameDate(str) {
  if (!str) return 0;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

/**
 * Finds words that appear more than once in the wordleWords array
 * Returns an object where keys are words and values are arrays of occurrences
 */
export function findRepeatedWords() {
  const wordMap = {};

  wordleWords.forEach((wordObj) => {
    const word = wordObj.word.toUpperCase();
    if (!wordMap[word]) {
      wordMap[word] = [];
    }
    wordMap[word].push({
      word: wordObj.word,
      gameDate: wordObj.gameDate,
      myScore: wordObj.myScore,
      wordNumber: wordObj.wordNumber,
    });
  });

  const repeatedWords = {};
  Object.keys(wordMap).forEach((word) => {
    if (wordMap[word].length > 1) {
      repeatedWords[word] = wordMap[word].sort(
        (a, b) => parseGameDate(a.gameDate) - parseGameDate(b.gameDate)
      );
    }
  });

  return repeatedWords;
}

function mostRecentDate(occurrences) {
  return Math.max(...occurrences.map((o) => parseGameDate(o.gameDate)));
}

function sortWordKeys(repeatedWords, mode) {
  const keys = Object.keys(repeatedWords);
  if (mode === "date") {
    return keys.sort(
      (a, b) =>
        mostRecentDate(repeatedWords[b]) - mostRecentDate(repeatedWords[a])
    );
  }
  return keys.sort();
}

function buildSortControls(activeMode) {
  const wrapper = document.createElement("div");
  wrapper.className = "repeated-words-sort-controls";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", "Sort repeated words");

  const label = document.createElement("span");
  label.className = "repeated-words-sort-label";
  label.textContent = "View by:";
  wrapper.appendChild(label);

  ["alphabetical", "date"].forEach((mode) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "repeated-words-sort-btn";
    btn.dataset.sort = mode;
    btn.textContent = mode === "alphabetical" ? "Alphabetical" : "Date";
    btn.classList.toggle("active", mode === activeMode);
    btn.addEventListener("click", () => {
      currentSortMode = mode;
      const modalContent = document.getElementById("repeatedWordsContent");
      if (modalContent) {
        renderRepeatedWordsContent(modalContent, mode);
      }
    });
    wrapper.appendChild(btn);
  });

  return wrapper;
}

function renderGroupedView(repeatedWords, container, sortMode) {
  const wordsContainer = document.createElement("div");
  wordsContainer.className = "repeated-words-container";

  sortWordKeys(repeatedWords, sortMode).forEach((word) => {
    const occurrences = repeatedWords[word];
    const wordEntry = document.createElement("div");
    wordEntry.className = "repeated-word-entry";

    const wordHeader = document.createElement("h4");
    wordHeader.className = "repeated-word-header";
    if (sortMode === "date") {
      const latest = occurrences[occurrences.length - 1];
      wordHeader.textContent = `${word} (appears ${occurrences.length} times, latest: ${latest.gameDate})`;
    } else {
      wordHeader.textContent = `${word} (appears ${occurrences.length} times)`;
    }
    wordEntry.appendChild(wordHeader);

    const occurrencesList = document.createElement("ul");
    occurrencesList.className = "repeated-word-occurrences";

    occurrences.forEach((occurrence) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>Word #${occurrence.wordNumber}</strong> -
        Date: ${occurrence.gameDate} -
        Score: ${occurrence.myScore}
      `;
      occurrencesList.appendChild(listItem);
    });

    wordEntry.appendChild(occurrencesList);
    wordsContainer.appendChild(wordEntry);
  });

  container.appendChild(wordsContainer);
}

export function renderRepeatedWordsContent(modalContent, sortMode = currentSortMode) {
  const repeatedWords = findRepeatedWords();
  modalContent.innerHTML = "";

  const wordCount = Object.keys(repeatedWords).length;
  if (wordCount === 0) {
    modalContent.innerHTML =
      "<p>No repeated words found in the Wordle data.</p>";
    return;
  }

  modalContent.appendChild(buildSortControls(sortMode));

  const header = document.createElement("h3");
  header.className = "repeated-words-summary";
  header.textContent =
    sortMode === "date"
      ? `${wordCount} word(s), sorted by most recent use`
      : `${wordCount} word(s) used more than once`;
  modalContent.appendChild(header);

  renderGroupedView(repeatedWords, modalContent, sortMode);
}

/**
 * Displays repeated words in a modal
 */
function closeRepeatedWordsModal() {
  const modal = document.getElementById("repeatedWordsModal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

export function displayRepeatedWordsModal() {
  const modal = document.getElementById("repeatedWordsModal");
  const modalContent = document.getElementById("repeatedWordsContent");

  if (!modal || !modalContent) {
    console.error("Modal elements not found");
    return;
  }

  // Show overlay first so a render error can't leave the UI looking dead
  modal.classList.add("active");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  try {
    renderRepeatedWordsContent(modalContent, currentSortMode);
  } catch (err) {
    console.error("Failed to render repeated words:", err);
    modalContent.innerHTML =
      "<p>Could not load repeated words. Check the console for details.</p>";
  }
}

let repeatedWordsUiReady = false;

function initRepeatedWordsUi() {
  if (repeatedWordsUiReady) return;
  const toggleButton = document.getElementById("toggleRepeatedWordsButton");
  const modal = document.getElementById("repeatedWordsModal");
  const closeButton = document.querySelector(".repeated-words-close");

  if (!toggleButton || !modal) {
    console.warn(
      "Repeated words UI missing #toggleRepeatedWordsButton or #repeatedWordsModal",
    );
    return;
  }

  repeatedWordsUiReady = true;

  toggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayRepeatedWordsModal();
  });

  if (closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeRepeatedWordsModal();
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeRepeatedWordsModal();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      (modal.classList.contains("active") || modal.style.display === "flex")
    ) {
      closeRepeatedWordsModal();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRepeatedWordsUi);
} else {
  initRepeatedWordsUi();
}
