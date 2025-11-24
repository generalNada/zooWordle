// Import wordList and convert all words to lowercase for consistency
import { combinedWords } from "./theCombinedEnchilada.js";
import { initKeyboard } from "./zoosKeys.js";

let lowerCaseCombinedWords = combinedWords.map((word) => word.toLowerCase());

const inputField = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const previousGuessesContainer = document.getElementById("previous-guesses");
const filteredWordsContainer = document.getElementById("filtered-words");
const wordCount = document.getElementById("word-count");
const wordDropdown = document.getElementById("word-dropdown");
const wordDropdownLabel = document.querySelector('label[for="word-dropdown"]');
const newWordButton = document.getElementById("new-word");
const keyboardContainer = document.getElementById("keyboard");
const successMessage = document.getElementById("success-message");

// Function to handle virtual keyboard key clicks
function handleVirtualKeyClick(letter) {
  if (inputField) {
    const currentValue = inputField.value;

    if (letter === "Backspace") {
      // Remove last character
      inputField.value = currentValue.slice(0, -1);
    } else {
      // Only add letter if input is less than 5 characters
      if (currentValue.length < 5) {
        inputField.value = currentValue + letter.toLowerCase();
      }
    }

    // Trigger input event to ensure any listeners are notified
    inputField.dispatchEvent(new Event("input", { bubbles: true }));
    // Focus the input field
    // inputField.focus();
  }
}

const keyboard = initKeyboard("keyboard", handleVirtualKeyClick);

let possibleWords = [...lowerCaseCombinedWords];
let previousGuesses = [];
let secretWord = "";

function resetGame() {
  possibleWords = [...lowerCaseCombinedWords];
  previousGuesses = [];
  previousGuessesContainer.innerHTML = "";
  filteredWordsContainer.innerHTML = "";
  wordCount.textContent = possibleWords.length;
  inputField.value = "";
  if (wordDropdown) {
    wordDropdown.value = "";
    wordDropdown.style.display = ""; // Show dropdown again
  }
  if (wordDropdownLabel) {
    wordDropdownLabel.style.display = ""; // Show label again
  }
  keyboard.reset();
  hideSuccessMessage();
  // Show keyboard again and hide success message
  if (keyboardContainer) {
    keyboardContainer.style.display = "";
  }
  if (successMessage) {
    successMessage.style.display = "";
  }
}

function generateNewSecretWord() {
  secretWord =
    lowerCaseCombinedWords[
      Math.floor(Math.random() * lowerCaseCombinedWords.length)
    ];
  resetGame();
}

if (newWordButton) {
  newWordButton.addEventListener("click", generateNewSecretWord);
  generateNewSecretWord();
} else {
  generateNewSecretWord();
}

// ✅ Populate dropdown with sorted words
function populateDropdown() {
  if (!wordDropdown) {
    console.error("Dropdown not found in the DOM!");
    return;
  }
  lowerCaseCombinedWords.forEach((word) => {
    let option = document.createElement("option");
    option.value = word;
    option.textContent = word;
    wordDropdown.appendChild(option);
  });
}
populateDropdown();

// ✅ Sync dropdown with input field
wordDropdown.addEventListener("change", () => {
  inputField.value = wordDropdown.value; // Auto-fill input when dropdown is selected
});

function submitGuess() {
  let userWord = inputField.value.toLowerCase();

  // **************************************************
  // if (userWord.length !== 5 || !possibleWords.includes(userWord)) {
  //   alert("Please enter a valid 5-letter word!");
  //   return;
  // }

  if (userWord.length !== 5) {
    alert("Please enter a 5-letter word!");
    return;
  }
  // **************************************************
  const feedback = getFeedback(secretWord.toLowerCase(), userWord);
  previousGuesses.push({ word: userWord, feedback });
  displayPreviousGuesses();
  keyboard.applyFeedback(userWord, feedback);

  possibleWords = filterWords(possibleWords, userWord, feedback);
  updateWordList(possibleWords);

  // Hide the dropdown label and select after first submission
  if (wordDropdownLabel) {
    wordDropdownLabel.style.display = "none";
  }
  if (wordDropdown) {
    wordDropdown.style.display = "none";
  }

  // Clear the input field for next entry
  inputField.value = "";

  // Refocus input field for next entry (on non-iOS devices)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isIOS) {
    inputField.focus();
  }

  // Check for win condition (all green)
  if (feedback.every((color) => color === "green")) {
    showSuccessMessage();
  }
}

submitButton.addEventListener("click", submitGuess);

// Allow Enter key to submit on non-iOS devices
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitGuess();
  }
});

function getFeedback(secret, guess) {
  let feedback = Array(5).fill("gray");
  let secretArr = secret.split("");
  let guessArr = guess.split("");

  // First pass: Check for Green (correct letter & position)
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === secretArr[i]) {
      feedback[i] = "green";
      secretArr[i] = null;
      guessArr[i] = null;
    }
  }

  // Second pass: Check for Orange (correct letter, wrong position)
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] && secretArr.includes(guessArr[i])) {
      feedback[i] = "orange";
      secretArr[secretArr.indexOf(guessArr[i])] = null;
    }
  }

  return feedback;
}
// THE FILTER STUFF
function filterWords(combinedWords, guess, feedback) {
  return combinedWords.filter((word) => {
    let wordArr = word.split("");
    let guessArr = guess.split("");

    let grayLetters = new Map(); // Gray letters and their count
    let orangeLetters = new Map(); // Orange letters and their incorrect positions
    let greenPositions = new Map(); // Green letters and their correct positions
    let guessLetterCount = {}; // Count occurrences of each letter in the guess

    // Count letter occurrences in the guess
    for (let letter of guessArr) {
      guessLetterCount[letter] = (guessLetterCount[letter] || 0) + 1;
    }

    // Extract constraints from feedback
    for (let i = 0; i < 5; i++) {
      let letter = guessArr[i];

      if (feedback[i] === "green") {
        greenPositions.set(i, letter);
      } else if (feedback[i] === "orange") {
        if (!orangeLetters.has(letter)) {
          orangeLetters.set(letter, []);
        }
        orangeLetters.get(letter).push(i);
      } else if (feedback[i] === "gray") {
        if (!greenPositions.has(i) && !orangeLetters.has(letter)) {
          grayLetters.set(letter, (grayLetters.get(letter) || 0) + 1);
        }
      }
    }

    // Count occurrences of each letter in the word
    let wordLetterCount = {};
    for (let letter of wordArr) {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
    }

    // ✅ Green letter check (must be in the correct position)
    for (let [pos, letter] of greenPositions) {
      if (wordArr[pos] !== letter) return false;
    }

    // ✅ Orange letter check (must be in the word but NOT at the wrong positions)
    for (let [letter, wrongPositions] of orangeLetters) {
      if (!wordArr.includes(letter)) return false; // Letter must exist
      for (let pos of wrongPositions) {
        if (wordArr[pos] === letter) return false; // Letter must not be in wrong spot
      }
    }

    // ✅ Gray letter check (must NOT exist beyond expected count)
    for (let [letter, count] of grayLetters) {
      if (wordLetterCount[letter] > guessLetterCount[letter] - count) {
        return false; // Too many occurrences of a gray letter
      }
    }

    return true;
  });
}

function displayPreviousGuesses() {
  previousGuessesContainer.innerHTML = "";
  previousGuesses.forEach((guess, index) => {
    let li = document.createElement("li");
    li.classList.add("guess-item");
    li.innerHTML = `<strong>${index + 1}.</strong> ${formatFeedback(
      guess.word,
      guess.feedback
    )}`;
    previousGuessesContainer.appendChild(li);
  });
}

function formatFeedback(word, feedback) {
  return word
    .split("")
    .map((letter, i) => {
      return `<span class="letter-box ${
        feedback[i]
      }">${letter.toUpperCase()}</span>`;
    })
    .join("");
}

function updateWordList(words) {
  wordCount.textContent = words.length;

  // Display words in a paragraph, comma-separated
  filteredWordsContainer.innerHTML =
    words.length === 0
      ? "<p>No possible words found.</p>"
      : `<p>${words.join(", ")}</p>`;
}

function displayFeedback(word, feedback) {
  feedbackContainer.innerHTML = "";
  word.split("").forEach((letter, i) => {
    let span = document.createElement("span");
    span.classList.add("letter-box", feedback[i]);
    span.textContent = letter.toUpperCase();
    span.style.animationDelay = `${i * 0.15}s`; // Staggered delay per letter
    feedbackContainer.appendChild(span);
  });
}

// Return a custom success message based on how many tries the user needed
function getSuccessMessageForTries(tries) {
  if (tries === 1) {
    return "Unbelievable! You solved it in";
  } else if (tries === 2) {
    return "Genius! You solved it in";
  } else if (tries === 3) {
    return "Awesome! You cracked it in";
  } else if (tries === 4) {
    return "Nice work! You found it in";
  } else if (tries === 5) {
    return "Phew! You got it in";
  } else if (tries === 6) {
    return "Close call! You solved it in";
  } else {
    return "You found it in"; // 7 or more
  }
}

function showSuccessMessage() {
  const triesParagraph = successMessage
    ? successMessage.querySelector("p")
    : null;

  const tries = previousGuesses.length;

  if (successMessage && triesParagraph) {
    const baseMessage = getSuccessMessageForTries(tries);
    const triesWord = tries === 1 ? "try" : "tries";

    // Build custom HTML so we can keep the highlighted tries-count styling
    triesParagraph.innerHTML = `${baseMessage} <span id="tries-count">${tries}</span> ${triesWord}! Tap here to play again.`;

    successMessage.classList.remove("hidden");

    // Hide keyboard and show success message in its place
    if (keyboardContainer) {
      keyboardContainer.style.display = "none";
    }
    successMessage.style.display = "block";
  }
}

function hideSuccessMessage() {
  if (successMessage) {
    successMessage.classList.add("hidden");
    successMessage.style.display = "none";
  }
}

// Handle success message click to generate new word (after DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const successMessage = document.getElementById("success-message");
  if (successMessage) {
    successMessage.addEventListener("click", () => {
      generateNewSecretWord();
      hideSuccessMessage();
    });
  }

  // Handle possible words header toggle
  const possibleWordsHeader = document.getElementById("possible-words-header");
  const filteredWords = document.getElementById("filtered-words");
  if (possibleWordsHeader && filteredWords) {
    possibleWordsHeader.addEventListener("click", () => {
      filteredWords.classList.toggle("hidden-words");
    });
  }

  // Auto-focus input field on non-iOS devices for better keyboard experience
  // Check if not iOS (iOS devices typically don't benefit from auto-focus)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isIOS && inputField) {
    inputField.focus();
  }
});
