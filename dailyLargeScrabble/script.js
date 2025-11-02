import { dailyWordsLarge, letterValues } from "../theWholeEnchilada.js";

// Filter words by prefix
function filterWordsByPrefix(prefix) {
  return dailyWordsLarge.filter((word) =>
    word.startsWith(prefix.toUpperCase())
  );
}

// Display filtered words
function displayFilteredWords(prefix) {
  const resultDiv = document.getElementById("wordListOutput");
  const words = filterWordsByPrefix(prefix);
  resultDiv.innerHTML = words.length > 0 ? words.join(", ") : "No words found.";
}

// Calculate and display Scrabble score
function calculateScore() {
  const input = document.getElementById("inputText").value.toUpperCase();
  const outputDiv = document.getElementById("output");
  const totalScoreEl = document.getElementById("totalScore");
  const scoreMessageEl = document.getElementById("output2");

  outputDiv.innerHTML = ""; // Clear previous results
  totalScoreEl.innerText = ""; // Clear total score
  scoreMessageEl.innerText = ""; // Clear message

  if (!dailyWordsLarge.includes(input)) {
    totalScoreEl.innerText = ` The word "${input}" is no longer in this word list! It is probably a used Wordle word!`;
    return;
  }

  let totalScore = 0;
  let delay = 0;

  for (let char of input) {
    if (letterValues[char]) {
      totalScore += letterValues[char];
      const letterBox = document.createElement("div");
      letterBox.classList.add("letter-box");

      // Create letter and value elements
      const letterEl = document.createElement("div");
      letterEl.classList.add("letter");
      letterEl.innerText = char;

      const valueEl = document.createElement("div");
      valueEl.classList.add("value");
      valueEl.innerText = letterValues[char];

      letterBox.appendChild(letterEl);
      letterBox.appendChild(valueEl);

      setTimeout(() => {
        outputDiv.appendChild(letterBox);
      }, delay);

      delay += 200;
    }
  }

  setTimeout(() => {
    totalScoreEl.innerText = `Total Scrabble Score: ${totalScore}`;
    scoreMessageEl.innerText = getScoreMessage(totalScore);
  }, delay);
}

// Generate message based on score
function getScoreMessage(totalScore) {
  if (totalScore <= 5) return "That's a terrible score.";
  if (totalScore <= 8) return "OK, better than that 5-point crap.";
  if (totalScore <= 10) return "Still weak, but you're trying.";
  if (totalScore <= 15) return "Okay! You're playing some scrabble now.";
  if (totalScore <= 20) return "Pushing it! Are you hoarding tiles?";
  return "You're unstoppable... or are you cheating?";
}

// Attach filtering and scoring functionality on page load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterButton").addEventListener("click", () => {
    const prefix = document.getElementById("filterInput").value.trim();
    displayFilteredWords(prefix);
  });

  document
    .getElementById("scoreButton")
    .addEventListener("click", calculateScore);
});
