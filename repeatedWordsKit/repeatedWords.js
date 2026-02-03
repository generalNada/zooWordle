import { wordleWords } from "../theWholeEnchilada.js";

/**
 * Finds words that appear more than once in the wordleWords array
 * Returns an object where keys are words and values are arrays of occurrences
 */
export function findRepeatedWords() {
  const wordMap = {};
  
  // Group all occurrences of each word
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
  
  // Filter to only words that appear more than once
  const repeatedWords = {};
  Object.keys(wordMap).forEach((word) => {
    if (wordMap[word].length > 1) {
      repeatedWords[word] = wordMap[word];
    }
  });
  
  return repeatedWords;
}

/**
 * Displays repeated words in a modal
 */
export function displayRepeatedWordsModal() {
  const repeatedWords = findRepeatedWords();
  const modal = document.getElementById("repeatedWordsModal");
  const modalContent = document.getElementById("repeatedWordsContent");
  const closeButton = document.querySelector(".repeated-words-close");
  
  if (!modal || !modalContent) {
    console.error("Modal elements not found");
    return;
  }
  
  // Clear previous content
  modalContent.innerHTML = "";
  
  const wordCount = Object.keys(repeatedWords).length;
  
  if (wordCount === 0) {
    modalContent.innerHTML = "<p>No repeated words found in the Wordle data.</p>";
  } else {
    // Create header
    const header = document.createElement("h3");
    header.textContent = `Found ${wordCount} word(s) used more than once:`;
    header.style.marginBottom = "1rem";
    header.style.color = "rgb(11, 164, 110)";
    modalContent.appendChild(header);
    
    // Sort words alphabetically
    const sortedWords = Object.keys(repeatedWords).sort();
    
    // Create container for all word entries
    const wordsContainer = document.createElement("div");
    wordsContainer.className = "repeated-words-container";
    
    sortedWords.forEach((word) => {
      const occurrences = repeatedWords[word];
      
      // Create word entry
      const wordEntry = document.createElement("div");
      wordEntry.className = "repeated-word-entry";
      
      // Word header
      const wordHeader = document.createElement("h4");
      wordHeader.textContent = `${word} (appears ${occurrences.length} times)`;
      wordHeader.className = "repeated-word-header";
      wordEntry.appendChild(wordHeader);
      
      // List of occurrences
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
    
    modalContent.appendChild(wordsContainer);
  }
  
  // Show modal
  modal.style.display = "block";
  
  // Close button functionality
  if (closeButton) {
    closeButton.onclick = () => {
      modal.style.display = "none";
    };
  }
  
  // Close when clicking outside the modal
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const repeatedWords = findRepeatedWords();
  console.log(repeatedWords);
  
  const toggleButton = document.getElementById("toggleRepeatedWordsButton");
  if (toggleButton) {
    toggleButton.addEventListener("click", displayRepeatedWordsModal);
  }
});