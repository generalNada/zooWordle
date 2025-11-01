import { wordleWords, dailyWordsSmall } from "../../../theWholeEnchilada.js";

let filteredWords = [...dailyWordsSmall];
let history = [];

document.addEventListener("DOMContentLoaded", () => {
  const resetButton1 = document.getElementById("resetButton1");
  const resetButton2 = document.getElementById("resetButton2");
  const submitButton = document.getElementById("submitButton");
  const toggleGroupOne = document.getElementById("toggleGroupOne");
  const groupOneSection = document.querySelector(".group-one");
  const applyFilterButton = document.getElementById("applyFilterButton");
  const fieldOne = document.querySelector(".field-one");
  const groupTwoSection = document.querySelector(".group-two");
  const toggleGroupTwo = document.getElementById("toggleGroupTwo");
  const toggleInstructions = document.getElementById("toggleInstructions");
  const instructions = document.getElementById("instructions");
  const toggleLookupButton = document.getElementById("toggleLookupButton");
  const lookupSection = document.getElementById("lookupSection");
  const lookupWordNumberButton = document.getElementById(
    "lookupWordNumberButton"
  );
  const undoButton = document.getElementById("undoButton");

  // Average Score functionality elements
  const toggleAverageScoreButton = document.getElementById(
    "toggleAverageScoreButton"
  );
  const averageScoreSection = document.getElementById("averageScoreSection");
  const calculateAverageButton = document.getElementById(
    "calculateAverageButton"
  );
  const averageScoreResult = document.getElementById("averageScoreResult");

  // Letter Average Score functionality elements
  const toggleLetterAverageScoreButton = document.getElementById(
    "toggleLetterAverageScoreButton"
  );
  const letterAverageScoreSection = document.getElementById(
    "letterAverageScoreSection"
  );
  const calculateLetterAverageButton = document.getElementById(
    "calculateLetterAverageButton"
  );
  const letterAverageScoreResult = document.getElementById(
    "letterAverageScoreResult"
  );

  resetButton1.addEventListener("click", resetGroupOne);
  resetButton2.addEventListener("click", resetFilteredWords);
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleWordInput();
  });
  toggleGroupOne.addEventListener("click", function () {
    groupOneSection.classList.toggle("hidden");
  });
  toggleGroupTwo.addEventListener("click", function () {
    groupTwoSection.classList.toggle("hidden");
  });
  toggleInstructions.addEventListener("click", function () {
    instructions.classList.toggle("hidden");
  });
  applyFilterButton.addEventListener("click", handleApplyFilter);
  toggleLookupButton.addEventListener("click", function () {
    lookupSection.classList.toggle("hidden");
  });
  lookupWordNumberButton.addEventListener("click", function () {
    lookupWordNumber();
  });
  undoButton.addEventListener("click", handleUndo);

  // Average Score event listeners
  toggleAverageScoreButton.addEventListener("click", () => {
    averageScoreSection.classList.toggle("hidden");
  });

  calculateAverageButton.addEventListener("click", () => {
    const wordNumber1 = parseInt(document.getElementById("wordNumber1").value);
    const wordNumber2 = parseInt(document.getElementById("wordNumber2").value);

    if (isNaN(wordNumber1) || isNaN(wordNumber2)) {
      averageScoreResult.textContent = "These are not even numbers!";
      return;
    }

    const start = Math.min(wordNumber1, wordNumber2);
    const end = Math.max(wordNumber1, wordNumber2);

    const filteredWords = wordleWords.filter(
      (word) =>
        word.wordNumber >= start && word.wordNumber <= end && word.myScore > 0
    );

    if (filteredWords.length === 0) {
      averageScoreResult.textContent = "Invalid Entry Jerk!";
      return;
    }

    const totalScore = filteredWords.reduce(
      (sum, word) => sum + word.myScore,
      0
    );
    const averageScore = totalScore / filteredWords.length;

    averageScoreResult.textContent = `Average Score between words #${start} & #${end} = a crisp ${averageScore.toFixed(
      6
    )}, You Cocksucker!`;
  });

  // Letter Average Score event listeners
  toggleLetterAverageScoreButton.addEventListener("click", () => {
    letterAverageScoreSection.classList.toggle("hidden");
  });

  calculateLetterAverageButton.addEventListener("click", () => {
    const letter = document
      .getElementById("letterForAverage")
      .value.toUpperCase();

    if (!letter || !/^[A-Z]$/.test(letter)) {
      letterAverageScoreResult.textContent =
        "Please enter a valid letter (A-Z).";
      return;
    }

    // Filter words that start with the letter and have a score > 0
    const wordsStartingWithLetter = wordleWords.filter(
      (word) => word.word.startsWith(letter) && word.myScore > 0
    );

    if (wordsStartingWithLetter.length === 0) {
      letterAverageScoreResult.textContent = `No words starting with '${letter}' found with valid scores.`;
      return;
    }

    const totalScore = wordsStartingWithLetter.reduce(
      (sum, word) => sum + word.myScore,
      0
    );
    const averageScore = totalScore / wordsStartingWithLetter.length;

    letterAverageScoreResult.textContent = `The average score for words starting with '${letter}' is ${averageScore.toFixed(
      5
    )} (${wordsStartingWithLetter.length} words).`;
  });
});

function doesNotContainLetter(letter) {
  return filteredWords.filter((word) => !word.includes(letter.toUpperCase()));
}

function containsLetterAtPosition(letter, position) {
  return filteredWords.filter(
    (word) => word[position - 1] === letter.toUpperCase()
  );
}

function containsLetterNotAtPosition(letter, position) {
  return filteredWords.filter((word) => {
    const upperLetter = letter.toUpperCase();
    return word.includes(upperLetter) && word[position - 1] !== upperLetter;
  });
}

function doesNotContainMultipleLetters(letters) {
  return filteredWords.filter((word) => {
    // Check if the word contains any of the letters
    return !letters
      .split("")
      .some((letter) => word.includes(letter.toUpperCase()));
  });
}

function containsRepeatingConsecutiveLetters() {
  return filteredWords.filter((word) => {
    for (let i = 0; i < word.length - 1; i++) {
      if (word[i] === word[i + 1]) {
        return true;
      }
    }
    return false;
  });
}

function containsDuplicateLetters() {
  return filteredWords.filter((word) => {
    const letterCount = {};
    for (let letter of word) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
      if (letterCount[letter] > 1) {
        return true;
      }
    }
    return false;
  });
}

function handleWordInput() {
  const inputWord = document.getElementById("wordInput").value.toLowerCase();
  const foundWord = wordleWords.find(
    (wordObj) => wordObj.word.toLowerCase() === inputWord
  );

  if (foundWord) {
    const averageScoreUpToDate = calculateAverageScoreUpToDate(
      foundWord.gameDate
    );
    const resultString = `'${foundWord.word}' was already Goddamn Fucking used by Wordle on ${foundWord.gameDate}.<br> It was word #${foundWord.wordNumber}, 
          and you had a score of '${foundWord.myScore}'.<br> Your average score up to this date: ${averageScoreUpToDate}!<br> Do NOT guess '${foundWord.word}', and do not waste our time!`;
    document.querySelector(".field-one").innerHTML = resultString;
  } else {
    const notFoundString = `The word "${inputWord}" was not found, making Rand Paul a rapist. Shut up, but<br> feel free, feel obligated, to guess the word "${inputWord}", Fuckface!`;
    document.querySelector(".field-one").innerHTML = notFoundString;
  }
}

function displayResults(results) {
  const resultsDiv = document.getElementById("filteredWords");
  const wordsList = results.join(", ");
  const totalWords = results.length;
  const listWithTotal = `${wordsList} (${totalWords} Christing words exist in this unlit frickin list! It's steadily shrinking, like my sanity! Got it?)`;
  resultsDiv.innerHTML = listWithTotal;
}

function resetFilteredWords() {
  filteredWords = [...dailyWordsSmall];
  displayResults(filteredWords);
  document.getElementById("filteredWords").innerHTML = "";
}

function calculateAverageScoreUpToDate(date) {
  const scoresUpToDate = wordleWords
    .filter(
      (wordObj) =>
        new Date(wordObj.gameDate) <= new Date(date) && wordObj.myScore !== 0
    )
    .map((wordObj) => wordObj.myScore);
  const totalScore = scoresUpToDate.reduce((acc, score) => acc + score, 0);
  const averageScore =
    scoresUpToDate.length > 0
      ? (totalScore / scoresUpToDate.length).toFixed(6)
      : 0;
  return averageScore;
}

function lookupWordNumber() {
  const wordNumber = parseInt(document.getElementById("wordNumberInput").value);
  const foundWord = wordleWords.find(
    (wordObj) => wordObj.wordNumber === wordNumber
  );

  const wordDetailsDiv = document.getElementById("wordDetails");
  if (foundWord) {
    const averageScore = calculateAverageScoreUpToDate(foundWord.gameDate);
    wordDetailsDiv.innerHTML = `Word: ${foundWord.word}, Date: ${foundWord.gameDate}, My Score:
           ${foundWord.myScore}, Average Score: ${averageScore}`;
  } else {
    wordDetailsDiv.innerHTML = `Word # ${wordNumber} not found.`;
  }
}

function applyFilter(selectedFunction, letter, position) {
  switch (selectedFunction) {
    case "doesNotContainLetter":
      filteredWords = doesNotContainLetter(letter);
      break;
    case "doesNotContainMultipleLetters":
      filteredWords = doesNotContainMultipleLetters(letter);
      break;
    case "containsLetterAtPosition":
      if (!position || position < 1 || position > 5) {
        alert("Please enter a valid position (1-5).");
        return;
      }
      filteredWords = containsLetterAtPosition(letter, position);
      break;
    case "containsLetterNotAtPosition":
      if (!position || position < 1 || position > 5) {
        alert("Please enter a valid position (1-5).");
        return;
      }
      filteredWords = containsLetterNotAtPosition(letter, position);
      break;
    case "containsRepeatingConsecutiveLetters":
      filteredWords = containsRepeatingConsecutiveLetters();
      break;
    case "containsDuplicateLetters":
      filteredWords = containsDuplicateLetters();
      break;
    default:
      alert("Please select a valid function. Don't be a stupid asshole.");
      return;
  }
}

function handleApplyFilter() {
  const letter = document.getElementById("letterInput").value;
  const position = parseInt(document.getElementById("positionInput").value);
  const selectedFunction = document.getElementById("functionSelect").value;

  if (!letter) {
    alert("Please enter a letter!");
    return;
  }

  // Save the current state of filteredWords before applying the new filter
  history.push([...filteredWords]);

  applyFilter(selectedFunction, letter, position);

  displayResults(filteredWords);
}

function handleUndo() {
  if (history.length > 0) {
    filteredWords = history.pop(); // Restore the previous state
    displayResults(filteredWords);
  } else {
    alert("Stop being impatient, Dickus!");
  }
}

function resetGroupOne() {
  document.getElementById("wordInput").value = "";
  fieldOne.innerHTML = "";
  if (!groupOneSection.classList.contains("hidden")) {
    groupOneSection.classList.add("hidden");
  }
}

// Function to calculate letter frequencies
function calculateLetterFrequencies(words) {
  const frequencies = {};
  const positionFrequencies = {};
  let totalLetters = 0;

  // Initialize position frequencies for each letter
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    positionFrequencies[letter] = [0, 0, 0, 0, 0];
  });

  words.forEach((word) => {
    const uniqueLetters = new Set(word);
    uniqueLetters.forEach((letter) => {
      frequencies[letter] = (frequencies[letter] || 0) + 1;
      totalLetters++;
    });

    // Count letter positions
    word.split("").forEach((letter, index) => {
      positionFrequencies[letter][index]++;
    });
  });

  return { frequencies, positionFrequencies, totalLetters };
}

function displayLetterFrequencyTable(words) {
  const { frequencies, positionFrequencies, totalLetters } =
    calculateLetterFrequencies(words);
  const tableBody = document.getElementById("letterFrequencyTableBody");
  tableBody.innerHTML = "";

  // Convert frequencies to array and sort by count
  const sortedFrequencies = Object.entries(frequencies).sort(
    (a, b) => b[1] - a[1]
  );

  sortedFrequencies.forEach(([letter, count]) => {
    const percentage = ((count / totalLetters) * 100).toFixed(2);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><button class="letter-button" data-letter="${letter}">${letter}</button></td>
      <td><button class="count-button" data-letter="${letter}">${count}</button></td>
      <td>${percentage}%</td>
      ${[0, 1, 2, 3, 4]
        .map(
          (pos) => `
        <td>
          <button class="position-button" data-letter="${letter}" data-position="${
            pos + 1
          }">
            ${positionFrequencies[letter][pos]}
          </button>
        </td>
      `
        )
        .join("")}
    `;
    tableBody.appendChild(row);
  });

  // Add click handlers to all buttons
  document.querySelectorAll(".letter-button").forEach((button) => {
    button.addEventListener("click", function () {
      const letter = this.dataset.letter;
      showWordsWithLetter(letter, filteredWords);
    });
  });

  document.querySelectorAll(".count-button").forEach((button) => {
    button.addEventListener("click", function () {
      const letter = this.dataset.letter;
      showWordsWithLetter(letter, filteredWords);
    });
  });

  document.querySelectorAll(".position-button").forEach((button) => {
    button.addEventListener("click", function () {
      const letter = this.dataset.letter;
      const position = parseInt(this.dataset.position);
      showWordsWithLetterAtPosition(letter, position, filteredWords);
    });
  });
}

function showWordsWithLetter(letter, words) {
  const container = document.getElementById("wordsWithLetterContainer");
  const letterSpan = document.getElementById("selectedLetterFrequency");
  const wordList = document.getElementById("wordsWithLetterList");

  // Update the selected letter display
  letterSpan.textContent = letter;

  // Get words containing the letter
  const wordsWithLetter = words.filter((word) => word.includes(letter));

  // Count total occurrences
  const totalOccurrences = wordsWithLetter.reduce((count, word) => {
    return count + (word.match(new RegExp(letter, "g")) || []).length;
  }, 0);

  // Create the display HTML
  wordList.innerHTML = `
    <div class="word-stats">
      <p>Total occurrences of ${letter}: <strong>${totalOccurrences}</strong></p>
      <p>Number of words containing ${letter}: <strong>${
    wordsWithLetter.length
  }</strong></p>
    </div>
    <div class="word-list">
      ${wordsWithLetter
        .map((word) => {
          // Find all positions of the letter in the word
          const positions = [];
          for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
              positions.push(i + 1);
            }
          }

          // Create the word with highlighted letters
          const highlightedWord = word
            .split("")
            .map((char, index) => {
              if (char === letter) {
                return `<span class="highlighted-letter" data-position="${
                  index + 1
                }">${char}</span>`;
              }
              return char;
            })
            .join("");

          return `<div class="word-item">${highlightedWord} (positions: ${positions.join(
            ", "
          )})</div>`;
        })
        .join("")}
    </div>
  `;

  // Show the container
  container.classList.remove("hidden");
}

function showWordsWithLetterAtPosition(letter, position, words) {
  const results = containsLetterAtPosition(letter, position);
  const positionWordsList = document.getElementById("positionWordsList");
  const positionWordsContainer = document.getElementById(
    "positionWordsContainer"
  );
  const selectedLetterPosition = document.getElementById(
    "selectedLetterPosition"
  );
  const selectedPosition = document.getElementById("selectedPosition");
  const totalWords = filteredWords.length;
  const percentage = ((results.length / totalWords) * 100).toFixed(2);

  selectedLetterPosition.textContent = letter;
  selectedPosition.textContent = position;
  positionWordsList.innerHTML =
    `<p>There are ${results.length} words (${percentage}%) with ${letter} at position ${position}:</p>` +
    results.map((word) => `<div>${word}</div>`).join("");
  positionWordsContainer.classList.remove("hidden");
}

// Update the event listener for the letter frequency button
document
  .getElementById("toggleLetterFrequencyButton")
  .addEventListener("click", function () {
    const section = document.getElementById("letterFrequencySection");
    const wordContainer = document.getElementById("wordsWithLetterContainer");
    const positionContainer = document.getElementById("positionWordsContainer");

    if (section.classList.contains("hidden")) {
      // Show the section
      section.classList.remove("hidden");
      displayLetterFrequencyTable(filteredWords);
    } else {
      // Hide everything
      section.classList.add("hidden");
      wordContainer.classList.add("hidden");
      positionContainer.classList.add("hidden");
    }
  });
