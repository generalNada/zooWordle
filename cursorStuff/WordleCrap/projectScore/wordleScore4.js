
import { wordleWords } from '/theWholeEnchilada.js';
  //INCLUDES ZEROES

  const scoreCounts = {};
  let totalNonZeroScores = 0;
  let totalScores = 0;

  // Calculate the number of games for each score and the total number of non-zero scores
  wordleWords.forEach((entry) => {
    scoreCounts[entry.myScore] = (scoreCounts[entry.myScore] || 0) + 1;
    if (entry.myScore !== 0) {
      totalNonZeroScores++;
    }
    totalScores++;
  });

  const toggleButton = document.getElementById("toggleButton");
  const scoreDropdown = document.getElementById("scoreDropdown");
  const scoreField = document.getElementById("scoreField");

  // Toggle the display of the dropdown menu
  toggleButton.addEventListener("click", () => {
    scoreDropdown.style.display = scoreDropdown.style.display === "none" ? "block" : "none";
  });

  // Display the count of games for the selected score and the percentage
  scoreDropdown.addEventListener("change", (event) => {
    const selectedScore = Number(event.target.value);
    const count = scoreCounts[selectedScore] || 0;
    const percentageNonZero = selectedScore !== 0 && totalNonZeroScores > 0 ? ((count / totalNonZeroScores) * 100).toFixed(2) : 0;
    const percentageZero = selectedScore === 0 && totalScores > 0 ? ((count / totalScores) * 100).toFixed(2) : 0;

    let message = `The # of games you played with the score of ${selectedScore} is ${count}. `;
    if (selectedScore !== 0) {
      message += `The % of games you played with the score of ${selectedScore} is ${percentageNonZero}%.`;
    } else {
      message += `The % of all games not played is ${percentageZero}%.`;
    }
    scoreField.textContent = message;
  });

  // Initialize the dropdown to be hidden
  scoreDropdown.style.display = "none";
