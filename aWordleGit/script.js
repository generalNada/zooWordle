import { wordleWords, dailyWordsSmall } from "../theWholeEnchilada.js";

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
  const toggleAverageScoreButton = document.getElementById(
    "toggleAverageScoreButton"
  );
  const averageScoreSection = document.getElementById("averageScoreSection");

  const useLessElements = document.querySelectorAll(".useLess");

  useLessElements.forEach((el) => {
    el.addEventListener("click", () => {
      alert("Hello Useless");
    });
  });

  // Ensure all sections are hidden by default
  groupOneSection.classList.add("hidden");
  groupTwoSection.classList.add("hidden");
  instructions.classList.add("hidden");
  lookupSection.classList.add("hidden");
  averageScoreSection.classList.add("hidden");

  resetButton1.addEventListener("click", resetGroupOne);
  resetButton2.addEventListener("click", resetFilteredWords);
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleWordInput();
  });

  // Add Enter key functionality for word input
  const wordInput = document.getElementById("wordInput");
  wordInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleWordInput();
    }
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
  toggleAverageScoreButton.addEventListener("click", function () {
    averageScoreSection.classList.toggle("hidden");
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

function handleWordInput() {
  const inputWord = document.getElementById("wordInput").value.toLowerCase();
  const foundWord = wordleWords.find(
    (wordObj) => wordObj.word.toLowerCase() === inputWord
  );

  if (foundWord) {
    const averageScoreUpToDate = calculateAverageScoreUpToDate(
      foundWord.gameDate
    );
    const resultString = `'${foundWord.word}': That, ah, um, uh, fuuuu..., fuck off, you, ahh, get it, most, ah, wellll, er, uh, well, mmmm, errr, retardally, er, ah, ahem, gaa, um, idiotical, er, um, WORD was so abso-fuckin-um-lutely fuckin' ALREADY Goddamn FUCKING em-fuckin'-ployed by this Pissing Ass Wordle affair (as I've said! Repeatedly! Listen!) on ${foundWord.gameDate}. Goddamn you Ace! <br> It was word #${foundWord.wordNumber}, 
          and ye had ye a score of '${foundWord.myScore}'!<br> Your, um, Score, ahhh, um, Average, er, thru this here stupid ass lousy, um, fuckin' date: ${averageScoreUpToDate}!<br> Do NOT guess '${foundWord.word}', and do not waste our time!`;
    document.querySelector(".field-one").innerHTML = resultString;
  } else {
    const notFoundString = `The fockin word "${inputWord}", which, ah, er, ahh, gaaaaa, ahh, errrr, ahhh, is, gaaaa, um, er, an innocent, ah, but extremely foolosh bystander †‡ †‡ †‡ , was notteth found, oh wretched Whores and Assfucks, making Rand Paul that rapist. Hit that fuck again neighbor. Shut up, but<br> feel free, feel obligated, to guess the word "${inputWord}", Fuckface! You're <span><em>all</em></span> fuckfaces.`;
    document.querySelector(".field-one").innerHTML = notFoundString;
  }
}

function displayResults(results) {
  const resultsDiv = document.getElementById("filteredWords");
  const wordsList = results.join(", ");
  const totalWords = results.length;
  const listWithTotal = `${wordsList} (${totalWords}, um, er, ehhhh, ahhhhh, ahh, grrr, mmm, er, grrr..., ahhhh, errrr, oh, uh, grrr, ah, Christing, er, jahhh, er, ah, well, um, †‡ and, gaaahh, ah, well, ah, dick, well, um, yeah, um, oh ho, gagging, um, grossly, um, outwardly, blatantly, fantastically, errrr, idiotical, eh, and, um, goddamn, ahem, cunting †‡ stupid ass frickin' fuckin' AssHole 🧌 🧌 🧌  Fuckin' Words stupidestly exist stupidly and Parasitically, um, in this here unlit motherfrickin' list, assholes!! It's steadily shrinking, dickLicks, like my sanity, DICKLORD!)`;
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
    wordDetailsDiv.innerHTML = `Word # ${wordNumber} not goddamn found.`;
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
      alert(
        "Please select, ah, a valid, gerrr, function, ahhh, you, er, um, ahhh, errr, goddamn, ohhh, gaaaa, ahhh, er, ahhhhh, um, stupid, duhhh, ah, stupid, um, er, asshole."
      );
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

const calculateAverageButton = document.getElementById(
  "calculateAverageButton"
);
const averageScoreResult = document.getElementById("averageScoreResult");

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

  const totalScore = filteredWords.reduce((sum, word) => sum + word.myScore, 0);
  const averageScore = totalScore / filteredWords.length;

  averageScoreResult.textContent = `Your Average Score - (You, ah, smell, er, really, ahhhh, mmm, er, er, um, much, grrr, ahem, ah, er, and, ah, y'know, um, continuously, um, like cockshit, Cocklick! Um, Cocklord! Cumlick!) - betweeneth words #${start} & #${end} = a gd, a-f-ing 'damn crisp-ass, um, dick-shitting ${averageScore.toFixed(
    6
  )}, You Cocksucker! Anything good in your life is luck. You fuck. Thx Coral on 8-7-25`;
});


    const censorshipMap = {
    "pig": "COCHON",
    "people": "aliens",
    "cum": "Rum",
    "shit": "crud!",
    "repu": "Nazi",
    "fuck": "drill",
    "ass": "back-side"
  };

  function cleanText(text) {
    let cleaned = text;
    for (const [badWord, replacement] of Object.entries(censorshipMap)) {
      const regex = new RegExp(`${badWord}`, 'gi');
      cleaned = cleaned.replace(regex, (match) => {
        // Preserve casing
        return match[0] === match[0].toUpperCase()
          ? replacement[0].toUpperCase() + replacement.slice(1)
          : replacement;
      });
    }
    return cleaned;
  }

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = cleanText(node.textContent);
    } else {
      node.childNodes.forEach(child => cleanNode(child));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    cleanNode(document.body);
  });