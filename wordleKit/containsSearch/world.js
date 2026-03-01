import {
  combinedWords,
  fixedWordsLarge,
  letterValues,
  wordleWords,
} from "../../theWholeEnchilada.js";

// Helper function to calculate Scrabble points for a word
function calculateScrabblePoints(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((total, letter) => total + (letterValues[letter] || 0), 0);
}

// Function to get all wordleWords entries for a given word
function getWordleWordEntries(word) {
  const wordUpper = word.toUpperCase();
  return wordleWords.filter((entry) => entry.word.toUpperCase() === wordUpper);
}

// Function to check if a word is a wordleWord
function isWordleWord(word) {
  return getWordleWordEntries(word).length > 0;
}

// Daily Words Search Elements
const dailyWordsSearchContainer = document.getElementById(
  "dailyWordsSearchContainer"
);
const dailyWordsListType = document.getElementById("dailyWordsListType");
const dailyWordsContainsControls = document.getElementById(
  "dailyWordsContainsControls"
);
const dailyWordsContainsInput = document.getElementById(
  "dailyWordsContainsInput"
);
const dailyWordsSearchResults = document.getElementById(
  "dailyWordsSearchResults"
);
const dailyWordsSearchTitle = document.getElementById("dailyWordsSearchTitle");
const closeDailyWordsSearchButton = document.getElementById(
  "closeDailyWordsSearchButton"
);

// Word Details Elements
const wordDetailsContainer = document.getElementById("wordDetailsContainer");
const wordDetailsTitle = document.getElementById("wordDetailsTitle");
const wordDetailsContent = document.getElementById("wordDetailsContent");
const closeWordDetailsButton = document.getElementById("closeWordDetailsButton");

// Toggle controls visibility when clicking section header
dailyWordsSearchTitle.addEventListener("click", () => {
  dailyWordsSearchContainer.classList.toggle("show-controls");
});

// Close button functionality
closeDailyWordsSearchButton.addEventListener("click", () => {
  clearDailyWordsSearch();
});

// Word Details close button
closeWordDetailsButton.addEventListener("click", () => {
  wordDetailsContainer.style.display = "none";
});

// Contains letters search for daily words
dailyWordsContainsInput.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toUpperCase();
  if (!inputValue) {
    dailyWordsSearchResults.innerHTML = "";
    closeDailyWordsSearchButton.style.display = "none";
    return;
  }
  searchDailyWordsByContains(inputValue);
});

// Update search when list type changes
dailyWordsListType.addEventListener("change", () => {
  // Re-run current search if there is one
  if (dailyWordsContainsInput.value.trim()) {
    searchDailyWordsByContains(dailyWordsContainsInput.value.trim().toUpperCase());
  }
});

function searchDailyWordsByContains(inputLetters) {
  // Get the selected list type
  const listType = dailyWordsListType.value;
  const wordList = listType === "small" ? combinedWords : fixedWordsLarge;
  // const wordList = listType === "small" ? dailyWordsSmall : dailyWordsLarge;
  const listName =
    listType === "small" ? "Regular List" : "Massive List";

  // Parse input: remove spaces and non-letter characters, convert to uppercase
  const cleanedInput = inputLetters.replace(/[^A-Z]/g, "");
  
  if (cleanedInput.length === 0) {
    dailyWordsSearchResults.innerHTML = "";
    closeDailyWordsSearchButton.style.display = "none";
    return;
  }

  // Count occurrences of each letter in the input
  const requiredLetterCounts = {};
  for (const letter of cleanedInput) {
    requiredLetterCounts[letter] = (requiredLetterCounts[letter] || 0) + 1;
  }

  // Filter words that contain at least the required count of each letter
  const matchingWords = wordList.filter((word) => {
    const wordUpper = word.toUpperCase();
    // Count occurrences of each letter in the word
    const wordLetterCounts = {};
    for (const letter of wordUpper) {
      wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
    }

    // Check if word contains at least the required count of each letter
    for (const [letter, requiredCount] of Object.entries(requiredLetterCounts)) {
      const wordCount = wordLetterCounts[letter] || 0;
      if (wordCount < requiredCount) {
        return false;
      }
    }
    return true;
  });

  // Clear previous results
  dailyWordsSearchResults.innerHTML = "";

  if (matchingWords.length === 0) {
    dailyWordsSearchResults.innerHTML = `<div class="daily-words-search-summary">No words found containing "${inputLetters}" in ${listName}</div>`;
    closeDailyWordsSearchButton.style.display = "block";
    return;
  }

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "daily-words-search-summary";
  summaryDiv.innerHTML = `
    <strong>${listName} - Contains "${inputLetters}":</strong> ${matchingWords.length} words
  `;
  dailyWordsSearchResults.appendChild(summaryDiv);

  // Show close button
  closeDailyWordsSearchButton.style.display = "block";

  // Sort words alphabetically
  matchingWords.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  matchingWords.forEach((word) => {
    const wordContainer = document.createElement("div");
    wordContainer.className = "word-container";
    
    const wordButton = document.createElement("button");
    const wordleEntries = getWordleWordEntries(word);
    const isWordle = wordleEntries.length > 0;

    // Apply wordleWord styling if it's a wordleWord
    if (isWordle) {
      wordButton.className = "daily-words-button wordle-word-button";
    } else {
      wordButton.className = "daily-words-button";
    }

    const scrabblePoints = calculateScrabblePoints(word);
    let detailsVisible = false;

    // Create star indicator - multiple stars for multiple entries
    const starCount = wordleEntries.length;
    const wordleIndicator = isWordle ? '<span class="wordle-indicator">' + '★'.repeat(starCount) + '</span>' : '';

    wordButton.innerHTML = `
      <div class="word-text">${word} ${wordleIndicator}</div>
    `;

    wordContainer.appendChild(wordButton);

    // Create details section (hidden by default)
    const wordDetailsInline = document.createElement("div");
    if (isWordle) {
      wordDetailsInline.className = "wordle-word-details-inline";
    } else {
      wordDetailsInline.className = "word-details-inline";
    }
    wordDetailsInline.style.display = "none";
    
    let detailsHTML = '';
    
    // If it's a wordleWord, show Wordle entries
    if (isWordle) {
      wordleEntries.forEach((entry, index) => {
        detailsHTML += `
          <div class="wordle-entry-inline">
            <div class="wordle-entry-header-inline">Date: ${entry.gameDate}</div>
            <div class="wordle-entry-detail-inline">
              <span>Score: ${entry.myScore}</span>
              ${entry.wordNumber !== undefined ? `<span> | Word #${entry.wordNumber}</span>` : ''}
            </div>
          </div>
        `;
      });
    }
    
    // Always show Scrabble points
    detailsHTML += `<div class="wordle-scrabble-inline">Scrabble Points: ${scrabblePoints}</div>`;
    
    wordDetailsInline.innerHTML = detailsHTML;
    wordContainer.appendChild(wordDetailsInline);

    // Toggle details on click
    wordButton.addEventListener("click", (e) => {
      detailsVisible = !detailsVisible;
      wordDetailsInline.style.display = detailsVisible ? "block" : "none";
    });

    dailyWordsSearchResults.appendChild(wordContainer);
  });
}

// Function to display word details
function showWordDetails(word, wordleEntries) {
  wordDetailsTitle.textContent = `Word Details: ${word}`;
  
  let detailsHTML = `<div class="word-details-word">${word}</div>`;
  
  if (wordleEntries.length === 0) {
    detailsHTML += "<p>No Wordle entries found for this word.</p>";
  } else {
    detailsHTML += `<div class="wordle-entries-count">Found ${wordleEntries.length} Wordle ${wordleEntries.length === 1 ? 'entry' : 'entries'}:</div>`;
    
    wordleEntries.forEach((entry, index) => {
      detailsHTML += `
        <div class="wordle-entry">
          <div class="wordle-entry-header">Entry ${index + 1}</div>
          <div class="wordle-entry-detail">
            <span class="detail-label">Game Date:</span>
            <span class="detail-value">${entry.gameDate}</span>
          </div>
          <div class="wordle-entry-detail">
            <span class="detail-label">Score:</span>
            <span class="detail-value">${entry.myScore}</span>
          </div>
          <div class="wordle-entry-detail">
            <span class="detail-label">Word Number:</span>
            <span class="detail-value">${entry.wordNumber !== undefined ? entry.wordNumber : 'N/A'}</span>
          </div>
        </div>
      `;
    });
  }
  
  // Add Scrabble points
  const scrabblePoints = calculateScrabblePoints(word);
  detailsHTML += `
    <div class="wordle-entry">
      <div class="wordle-entry-header">Scrabble Points</div>
      <div class="wordle-entry-detail">
        <span class="detail-label">Value:</span>
        <span class="detail-value">${scrabblePoints}</span>
      </div>
    </div>
  `;
  
  wordDetailsContent.innerHTML = detailsHTML;
  wordDetailsContainer.style.display = "block";
}

function clearDailyWordsSearch() {
  dailyWordsListType.value = "small";
  dailyWordsContainsInput.value = "";
  dailyWordsSearchResults.innerHTML = "";
  closeDailyWordsSearchButton.style.display = "none";
}
