import { fixedWordsLarge, letterValues } from "../theWholeEnchilada.js";

// Filter words by prefix
function filterWordsByPrefix(prefix) {
  return fixedWordsLarge.filter((word) =>
    word.startsWith(prefix.toUpperCase())
  );
}

// Display filtered words and word count
function displayFilteredWords(prefix) {
  const resultDiv = document.getElementById("wordListOutput");
  const words = filterWordsByPrefix(prefix);
  const wordCount = words.length; // Calculate the word count

  resultDiv.innerHTML =
    words.length > 0
      ? `<strong>Word Count:</strong> ${wordCount}<br><br>${words.join(", ")}`
      : "No words found.";
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

  if (!fixedWordsLarge.includes(input)) {
    totalScoreEl.innerText = "That's not a valid word!";
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
  const messages = {
    5: "That's the minimum score for a 5 point word according to Scrabble. It’s an embarrassment. AND YOU ARE HATED, ALL VANCES!!!",
    6: "This is the score of like an 7 year old. 6 points is weak.",
    7: "Choosing high value words should be left to others. You are not good at it. 7 points, hahaha!",
    8: "Eight point Scrabble words are frequent and most adults can come up with bigger and better.",
    9: "You're trying and that’s good. 9 points. That's worth something, or so they say.",
    10: "10 points, 2 per letter. Much better.",
    11: "Good. You could be in 7th grade Scrabble competitions using 11 point words.",
    12: "Very nice. Twelve. You must play a lot.",
    13: "13’s getting goddamn solid! It’s evil and bad luck and you could die, but nice!",
    14: "You're pushing it now, pally. 14 is tight stuff. Are you stashing tiles?",
    15: "If you want to treat your fellow Scrabblers with disrespect, keep it up. They know how rare 15 point words are. Ima call you Squid",
    16: "Do you know who I am? I am the guy who doesn’t like being bullshitted. Your 16 is too good.",
    17: "When you’ve been around Scrabble long enough, you know how rare words valued at 17 points are. As dumbo Susan Collins might say: 'That raises concerns.'",
    18: "No one will believe you pulled an 18 point word. They’ll be like Go take another Viagara, faker.",
    19: "How about you come clean Mr. Mondor? You’ve got big problems with your 19s.",
    20: "Your balls are big brah. You come here with your scores of 20 is gonna get you piped",
    21: "You've got big old balls coming around here with that shit. Don't think dropping Q's and Z's and J's goes unnoticed.",
    22: "Cheating is highly frowned upon in Scrabble. It’s supposed to be a friendly game. People are skeptical when they see a 22 point 5 letter word.",
    23: "23, you fuck? Bullshit.",
    24: "If you come off with a 24, most people know it’s bunch of crap. I agree with those people.",
    25: "Maybe you need to be taught a lesson because 25 points is a big time word. There aren’t many of them.",
    26: "No one likes or wants to be around people who are so insecure they need to lie about getting 26 point words.",
    27: "If you are a 27 point scorer, most people know it’s bunch of bullshit. I agree with them.",
    28: "You gonna get beaten down, essay! 28? You trying to keep us down, make us look uneducated!",
    29: "You're dead to me, fuckface. 29 is next to impossible. You're ruined around here.",
    30: "You will be reported for this score of 30 if you don't fuck off right this moment!",
    31: "Consider the authorities called. You need to hide out, bitchAss!",
  };
  return (
    messages[totalScore] ||
    "Get fucked. This is you being ghosted. You are totally Fucking unloved."
  );
}

let score = 60;
console.log(getScoreMessage(score));

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

// Filter words by letter and position
function filterWordsByLetterAndPosition(letter, position) {
  const positionIndex = position - 1; // Convert position to zero-based index
  return fixedWordsLarge.filter(
    (word) => word[positionIndex] === letter.toUpperCase()
  );
}

// Display filtered words and their count based on letter and position
function displayWordsByLetterAndPosition() {
  const letter = document
    .getElementById("letterInput")
    .value.trim()
    .toUpperCase();
  const position = parseInt(
    document.getElementById("positionInput").value.trim(),
    10
  );
  const resultDiv = document.getElementById("letterPositionOutput");

  // Validate inputs
  if (!letter || letter.length !== 1 || !/[A-Z]/.test(letter)) {
    resultDiv.innerHTML = "Please enter a valid single letter (A-Z).";
    return;
  }
  if (isNaN(position) || position <= 0) {
    resultDiv.innerHTML = "Please enter a valid position (greater than 0).";
    return;
  }

  // Filter and display words
  const words = filterWordsByLetterAndPosition(letter, position);
  const wordCount = words.length;

  resultDiv.innerHTML =
    wordCount > 0
      ? `<strong>Letter:</strong> ${letter}<br><strong>Position:</strong> ${position}<br><strong>Word Count:</strong> ${wordCount}<br><br>${words.join(
          ", "
        )}`
      : `No words found with "${letter}" in position ${position}.`;
}

// Attach event listener for the button
document
  .getElementById("filterByLetterAndPosition")
  .addEventListener("click", displayWordsByLetterAndPosition);

console.log(fixedWordsLarge[322]);
