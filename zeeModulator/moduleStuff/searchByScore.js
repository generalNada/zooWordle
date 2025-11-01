import { fixedWordsLarge, letterValues } from "../../theWholeEnchilada.js";
// Filter words by Scrabble score
function filterWordsByScore(score) {
  const wordsWithScore = fixedWordsLarge.filter((word) => {
    let totalScore = 0;
    for (let char of word) {
      if (letterValues[char.toUpperCase()]) {
        totalScore += letterValues[char.toUpperCase()];
      }
    }
    return totalScore === score;
  });
  return wordsWithScore;
}

// Display words by score
function displayWordsByScore() {
  const scoreInput = parseInt(
    document.getElementById("scoreInput").value.trim(),
    10
  );
  const resultDiv = document.getElementById("scoreOutput");

  if (isNaN(scoreInput) || scoreInput <= 0) {
    resultDiv.innerHTML = "Please enter a valid score.";
    return;
  }

  const words = filterWordsByScore(scoreInput);
  const wordCount = words.length;

  resultDiv.innerHTML =
    wordCount > 0
      ? `<strong>Score:</strong> ${scoreInput}<br><strong>Word Count:</strong> ${wordCount}<br><br>${words.join(
          ", "
        )}`
      : `No words found with the score of ${scoreInput}.`;
}

document
  .getElementById("filterByScore")
  .addEventListener("click", displayWordsByScore);
