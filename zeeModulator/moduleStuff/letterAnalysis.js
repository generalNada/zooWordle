import { fixedWordsLarge } from "../../theWholeEnchilada.js";

function analyzeLetterFrequency() {
  const letterStats = {};
  const positionTotals = [0, 0, 0, 0, 0]; // Tracks the number of words with each position available

  // Loop through each word in the word list
  fixedWordsLarge.forEach((word) => {
    [...word.toUpperCase()].forEach((letter, index) => {
      // Increment position availability
      if (index < 5) positionTotals[index]++;

      // Initialize stats for the letter if not already added
      if (!letterStats[letter]) {
        letterStats[letter] = { counts: [0, 0, 0, 0, 0], total: 0 };
      }

      // Increment the position-specific count and total count for the letter
      letterStats[letter].counts[index] =
        (letterStats[letter].counts[index] || 0) + 1;
      letterStats[letter].total++;
    });
  });

  // Calculate percentages and add position totals
  Object.keys(letterStats).forEach((letter) => {
    letterStats[letter].percentages = letterStats[letter].counts.map(
      (count, index) => {
        const possibleOccurrences = positionTotals[index]; // Total words long enough for this position
        return {
          count,
          percentage: ((count / possibleOccurrences) * 100).toFixed(2),
          possibleOccurrences,
        };
      }
    );
  });

  return letterStats;
}

function displayLetterFrequencyStats() {
  const resultDiv = document.getElementById("letterFrequencyOutput");
  const letterStats = analyzeLetterFrequency();

  // Clear any existing content
  resultDiv.innerHTML = "<strong>Letter Frequency Analysis:</strong><br><br>";

  // Create clickable links for each letter
  Object.keys(letterStats).forEach((letter) => {
    const letterLink = document.createElement("a");
    letterLink.href = "#";
    letterLink.textContent = `${letter} (${letterStats[letter].total})`;
    letterLink.style.marginRight = "10px";
    letterLink.style.textDecoration = "underline";
    letterLink.style.cursor = "pointer";

    // Create a div to show/hide stats for this letter
    const statsDiv = document.createElement("div");
    statsDiv.id = `stats-${letter}`;
    statsDiv.style.display = "none"; // Initially hidden

    const { percentages } = letterStats[letter];
    let statsHtml = "";
    percentages.forEach(({ count, percentage, possibleOccurrences }, index) => {
      statsHtml += `Position ${
        index + 1
      }: ${count} occurrences (${percentage}%) out of ${possibleOccurrences} possible occurrences<br>`;
    });
    statsDiv.innerHTML = statsHtml;

    // Add click event to toggle stats visibility
    letterLink.addEventListener("click", (event) => {
      event.preventDefault();
      statsDiv.style.display =
        statsDiv.style.display === "none" ? "block" : "none";
    });

    // Append the letter link and stats div to the output container
    resultDiv.appendChild(letterLink);
    resultDiv.appendChild(statsDiv);
  });
}

document
  .getElementById("analyzeLetterFrequency")
  .addEventListener("click", displayLetterFrequencyStats);
