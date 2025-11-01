import { wordleWords, dailyWordsSmall } from "../../theWholeEnchilada.js";
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
function handleWordInput() {
  const inputWord = document.getElementById("wordInput").value.toLowerCase();
  const foundWord = wordleWords.find(
    (wordObj) => wordObj.word.toLowerCase() === inputWord
  );

  if (foundWord) {
    const averageScoreUpToDate = calculateAverageScoreUpToDate(
      foundWord.gameDate
    );
    const resultString = `'${foundWord.word}' was already used by Wordle on ${foundWord.gameDate}.<br> It was word #${foundWord.wordNumber}, 
          and you had a score of '${foundWord.myScore}'.<br> Your average score up to this date: ${averageScoreUpToDate}.<br> Do NOT guess '${foundWord.word}'.`;
    document.querySelector(".field-one").innerHTML = resultString;
  } else {
    const notFoundString = `The word "${inputWord}" was not found....<br> Feel free to guess the word "${inputWord}"`;
    document.querySelector(".field-one").innerHTML = notFoundString;
  }
}

function displayResults(results) {
  const resultsDiv = document.getElementById("filteredWords");
  const wordsList = results.join(", ");
  const totalWords = results.length;
  const listWithTotal = `${wordsList} (There are ${totalWords} words in this list!!!)`;
  resultsDiv.innerHTML = listWithTotal;
}

function resetFilteredWords() {
  filteredWords = [...dailyWordsSmall];
  displayResults(filteredWords);
  document.getElementById("filteredWords").innerHTML = "";
}
// function resetFilteredWords() {
//   filteredWords = [...wordleWords];
//   displayResults(filteredWords);
//   document.getElementById("filteredWords").innerHTML = "";
// }

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
      alert("Please select a valid function.");
      return;
  }
}

function handleApplyFilter() {
  const letter = document.getElementById("letterInput").value;
  const position = parseInt(document.getElementById("positionInput").value);
  const selectedFunction = document.getElementById("functionSelect").value;

  if (!letter) {
    alert("Please enter a letter.");
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
    alert("No more actions to undo.");
  }
}

function resetGroupOne() {
  document.getElementById("wordInput").value = "";
  fieldOne.innerHTML = "";
  if (!groupOneSection.classList.contains("hidden")) {
    groupOneSection.classList.add("hidden");
  }
}

const toggleAverageScoreButton = document.getElementById(
  "toggleAverageScoreButton"
);
const averageScoreSection = document.getElementById("averageScoreSection");
const calculateAverageButton = document.getElementById(
  "calculateAverageButton"
);
const averageScoreResult = document.getElementById("averageScoreResult");

toggleAverageScoreButton.addEventListener("click", () => {
  averageScoreSection.classList.toggle("hidden");
});

calculateAverageButton.addEventListener("click", () => {
  const wordNumber1 = parseInt(document.getElementById("wordNumber1").value);
  const wordNumber2 = parseInt(document.getElementById("wordNumber2").value);

  if (isNaN(wordNumber1) || isNaN(wordNumber2)) {
    averageScoreResult.textContent = "Please enter valid numbers.";
    return;
  }

  const start = Math.min(wordNumber1, wordNumber2);
  const end = Math.max(wordNumber1, wordNumber2);

  const filteredWords = oldWords.filter(
    (word) =>
      word.wordNumber >= start && word.wordNumber <= end && word.myScore > 0
  );

  if (filteredWords.length === 0) {
    averageScoreResult.textContent = "Invalid Entry Jerk!";
    return;
  }

  const totalScore = filteredWords.reduce((sum, word) => sum + word.myScore, 0);
  const averageScore = totalScore / filteredWords.length;

  averageScoreResult.textContent = `Your average score between words #${start} and #${end} is a crisp ${averageScore.toFixed(
    6
  )} !`;
});

document.getElementById("footerClocks").style.border = "1px solid #ccc"; // Example of targeting the new ID
// Function to format time in the "HH:MM:SS" format
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to calculate time remaining until midnight in the Eastern Time Zone
function getTimeUntilMidnightEastern() {
  const now = new Date();

  // Convert current time to Eastern Time Zone
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const midnight = new Date(easternNow);
  midnight.setHours(24, 0, 0, 0); // Set to midnight

  const diff = midnight - easternNow; // Difference in milliseconds

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to update time display every second
function updateFooter() {
  const now = new Date();

  // Get current Eastern Time
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  // Update current time display
  document.getElementById(
    "currentTime"
  ).textContent = `Current Eastern Time: ${formatTime(easternNow)}`;

  // Update countdown to midnight
  document.getElementById(
    "countdownToMidnight"
  ).textContent = `Countdown to Midnight: ${getTimeUntilMidnightEastern()}`;
}

// Start the clock
setInterval(updateFooter, 1000);
updateFooter(); // Initial call
