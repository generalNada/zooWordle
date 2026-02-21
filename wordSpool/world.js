import {
  fixedWordsLarge,
  wordleWords,
  combinedWords,
  letterValues,
} from "../theWholeEnchilada.js";
//INCLUDES ZEROES

// Helper function to calculate Scrabble points for a word
function calculateScrabblePoints(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((total, letter) => total + (letterValues[letter] || 0), 0);
}

// Helper function to calculate average score up to and including a specific word entry
function calculateAverageScoreUpToWord(entry) {
  // Get all words up to and including this word's date
  const entryDate = new Date(entry.gameDate);
  const wordsUpToDate = wordleWords.filter((word) => {
    const wordDate = new Date(word.gameDate);
    return wordDate <= entryDate;
  });

  // Filter to only played games (score > 0)
  const playedWords = wordsUpToDate.filter((word) => word.myScore > 0);

  if (playedWords.length === 0) {
    return "N/A";
  }

  const totalScore = playedWords.reduce((sum, word) => sum + word.myScore, 0);
  return (totalScore / playedWords.length).toFixed(8);
}

// Helper function to calculate days since the last word with the same first letter
function calculateDaysSinceLastSameFirstLetter(entry) {
  const currentFirstLetter = entry.word.toUpperCase().charAt(0);
  const currentDate = new Date(entry.gameDate);

  // Find all words before the current word's date that start with the same letter
  const previousWords = wordleWords.filter((word) => {
    const wordDate = new Date(word.gameDate);
    return (
      wordDate < currentDate &&
      word.word.toUpperCase().charAt(0) === currentFirstLetter
    );
  });

  if (previousWords.length === 0) {
    return { days: "N/A", word: null };
  }

  // Find the most recent previous word with the same first letter
  const mostRecentPrevious = previousWords.reduce((latest, word) => {
    const latestDate = new Date(latest.gameDate);
    const wordDate = new Date(word.gameDate);
    return wordDate > latestDate ? word : latest;
  });

  const previousDate = new Date(mostRecentPrevious.gameDate);
  const daysDiff = Math.floor(
    (currentDate - previousDate) / (1000 * 60 * 60 * 24),
  );

  return { days: daysDiff, word: mostRecentPrevious.word };
}

const scoreCounts = {};
let totalNonZeroScores = 0;
let totalScores = 0;
let currentSelectedScore = null;

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
const scoreAverageFiltersContainer = document.getElementById(
  "scoreAverageFiltersContainer",
);
const scoreAverageFiltersToggle = document.getElementById(
  "scoreAverageFiltersToggle",
);
const scoreAverageFiltersContent = document.getElementById(
  "scoreAverageFiltersContent",
);
const scoreStreaksContainer = document.getElementById("scoreStreaksContainer");
const scoreStreaksToggle = document.getElementById("scoreStreaksToggle");
const scoreStreaksContent = document.getElementById("scoreStreaksContent");
const scoreStreaksMode = document.getElementById("scoreStreaksMode");
const scoreStreaksDropdown = document.getElementById("scoreStreaksDropdown");
const scoreStreaksResults = document.getElementById("scoreStreaksResults");
const scoreStreaksWordsContainer = document.getElementById(
  "scoreStreaksWordsContainer",
);
const scoreStreaksWordsHeader = document.getElementById(
  "scoreStreaksWordsHeader",
);
const scoreStreaksWordsTitle = document.getElementById(
  "scoreStreaksWordsTitle",
);
const closeScoreStreaksWordsButton = document.getElementById(
  "closeScoreStreaksWordsButton",
);
const scoreStreaksWordsList = document.getElementById("scoreStreaksWordsList");
const monthYearDropdown = document.getElementById("monthYearDropdown");
const yearDropdown = document.getElementById("yearDropdown");
const scoreField = document.getElementById("scoreField");
const dateToggleContainer = document.getElementById("dateToggleContainer");
const showDatesButton = document.getElementById("showDatesButton");
const hideDatesButton = document.getElementById("hideDatesButton");
const showWordsButton = document.getElementById("showWordsButton");
const hideWordsButton = document.getElementById("hideWordsButton");
const datesContainer = document.getElementById("datesContainer");
const closeDatesButton = document.getElementById("closeDatesButton");
const datesTitle = document.getElementById("datesTitle");
const datesList = document.getElementById("datesList");
const wordsContainer = document.getElementById("wordsContainer");
const closeWordsButton = document.getElementById("closeWordsButton");
const wordsTitle = document.getElementById("wordsTitle");
const wordsList = document.getElementById("wordsList");
const wordDetailsContainer = document.getElementById("wordDetailsContainer");
const closeWordDetailsButton = document.getElementById(
  "closeWordDetailsButton",
);
const wordDetailsContent = document.getElementById("wordDetailsContent");
let currentlyShownWordNumber = null;

// Day of Week Search Elements
const daySearchContainer = document.getElementById("daySearchContainer");
const dayOfWeekDropdown = document.getElementById("dayOfWeekDropdown");
const daySearchResults = document.getElementById("daySearchResults");
const daySearchSortButton = document.getElementById("daySearchSortButton");

// Day search sort state
let daySearchSortMode = "date"; // "date" or "alphabetical"
let currentDaySearchWords = [];
let currentDaySearchSummary = null;

// Month Search Elements
const monthSearchContainer = document.getElementById("monthSearchContainer");
const monthSearchMonthDropdown = document.getElementById(
  "monthSearchMonthDropdown",
);
const monthSearchYearDropdown = document.getElementById(
  "monthSearchYearDropdown",
);
const monthSearchResults = document.getElementById("monthSearchResults");
const monthSearchSortButton = document.getElementById("monthSearchSortButton");

// Month search sort state
let monthSearchSortMode = "date"; // "date" or "alphabetical"
let currentMonthSearchWords = [];
let currentMonthSearchSummary = null;

// Day Number Search Elements
const dayNumberSearchContainer = document.getElementById(
  "dayNumberSearchContainer",
);
const dayNumberDropdown = document.getElementById("dayNumberDropdown");
const dayNumberSearchResults = document.getElementById(
  "dayNumberSearchResults",
);
const dayNumberSearchSortButton = document.getElementById(
  "dayNumberSearchSortButton",
);

// Day number search sort state
let dayNumberSearchSortMode = "date"; // "date" or "alphabetical"
let currentDayNumberSearchWords = [];
let currentDayNumberSearchSummary = null;

// Month/Day Search Elements
const monthDaySearchContainer = document.getElementById(
  "monthDaySearchContainer",
);
const monthDropdown = document.getElementById("monthDropdown");
const monthDayDropdown = document.getElementById("monthDayDropdown");
const monthDaySearchResults = document.getElementById("monthDaySearchResults");
const monthDaySearchSortButton = document.getElementById(
  "monthDaySearchSortButton",
);

// Month/Day search sort state
let monthDaySearchSortMode = "date"; // "date" or "alphabetical"
let currentMonthDaySearchWords = [];
let currentMonthDaySearchSummary = null;

// Letter Search Elements
const letterSearchContainer = document.getElementById("letterSearchContainer");
const letterSearchMode = document.getElementById("letterSearchMode");
const singleLetterDropdown = document.getElementById("singleLetterDropdown");
const letterRangeControls = document.getElementById("letterRangeControls");
const letterRangeStart = document.getElementById("letterRangeStart");
const letterRangeEnd = document.getElementById("letterRangeEnd");
const letterSearchResults = document.getElementById("letterSearchResults");
const letterSearchSortButton = document.getElementById(
  "letterSearchSortButton",
);

// Letter search sort state
let letterSearchSortMode = "alphabetical"; // "alphabetical" or "date"
let currentLetterSearchWords = [];
let currentLetterSearchSummary = null;

// Contain Letter(s) Search Elements
const containLetterSearchContainer = document.getElementById(
  "containLetterSearchContainer",
);
const containLetterDropdown = document.getElementById("containLetterDropdown");
const containOccurrencesDropdown = document.getElementById(
  "containOccurrencesDropdown",
);
const containLetterSearchResults = document.getElementById(
  "containLetterSearchResults",
);
const containLetterSearchSortButton = document.getElementById(
  "containLetterSearchSortButton",
);

// Contain letter search sort state
let containLetterSearchSortMode = "alphabetical"; // "alphabetical" or "date"
let currentContainLetterSearchWords = [];
let currentContainLetterSearchSummary = null;

// Daily Words Search Elements
const dailyWordsSearchContainer = document.getElementById(
  "dailyWordsSearchContainer",
);
const dailyWordsListType = document.getElementById("dailyWordsListType");
const dailyWordsSearchMode = document.getElementById("dailyWordsSearchMode");
const dailyWordsSingleLetterDropdown = document.getElementById(
  "dailyWordsSingleLetterDropdown",
);
const dailyWordsRangeControls = document.getElementById(
  "dailyWordsRangeControls",
);
const dailyWordsRangeStart = document.getElementById("dailyWordsRangeStart");
const dailyWordsRangeEnd = document.getElementById("dailyWordsRangeEnd");
const dailyWordsContainsControls = document.getElementById(
  "dailyWordsContainsControls",
);
const dailyWordsContainsInput = document.getElementById(
  "dailyWordsContainsInput",
);
const dailyWordsSearchResults = document.getElementById(
  "dailyWordsSearchResults",
);
const dailyWordsWordleToggleContainer = document.getElementById(
  "dailyWordsWordleToggleContainer",
);
const dailyWordsWordleHighlightToggle = document.getElementById(
  "dailyWordsWordleHighlightToggle",
);

// Map: uppercase word -> array of wordleWords entries (all entries; score 0 or any score)
const wordlePlayedDetailsByWord = new Map();
wordleWords.forEach((entry) => {
  const key = entry.word.toUpperCase();
  if (!wordlePlayedDetailsByWord.has(key)) {
    wordlePlayedDetailsByWord.set(key, []);
  }
  wordlePlayedDetailsByWord.get(key).push(entry);
});

// Position Pattern Search Elements
const positionSearchContainer = document.getElementById(
  "positionSearchContainer",
);
const positionPatternInput = document.getElementById("positionPatternInput");
const positionSearchResults = document.getElementById("positionSearchResults");
const positionSearchSortButton = document.getElementById(
  "positionSearchSortButton",
);

// Position search sort state
let positionSearchSortMode = "alphabetical"; // "alphabetical" or "date"
let currentPositionSearchWords = [];
let currentPositionSearchSummary = null;

// Close buttons for search sections
const closeDaySearchButton = document.getElementById("closeDaySearchButton");
const closeMonthSearchButton = document.getElementById(
  "closeMonthSearchButton",
);
const closeDayNumberSearchButton = document.getElementById(
  "closeDayNumberSearchButton",
);
const closeMonthDaySearchButton = document.getElementById(
  "closeMonthDaySearchButton",
);
const closeLetterSearchButton = document.getElementById(
  "closeLetterSearchButton",
);
const closeContainLetterSearchButton = document.getElementById(
  "closeContainLetterSearchButton",
);
const closeDailyWordsSearchButton = document.getElementById(
  "closeDailyWordsSearchButton",
);
const closePositionSearchButton = document.getElementById(
  "closePositionSearchButton",
);

// Toggle dark theme when clicking the theme toggle (p tag)
const themeToggle = document.getElementById("themeToggle");
let isDarkTheme = false;

// Check for saved theme preference
const savedTheme = localStorage.getItem("darkTheme");
if (savedTheme === "true") {
  isDarkTheme = true;
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "🌑";
}

themeToggle.addEventListener("click", () => {
  // Toggle dark theme
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("darkTheme", "true");
    themeToggle.textContent = "🌙";
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("darkTheme", "false");
    themeToggle.textContent = "🌑";
  }
});

// Toggle border animations on/off when clicking the h1 header
const headerTitle = document.querySelector("h1");
let bordersAnimated = true;

headerTitle.addEventListener("click", () => {
  bordersAnimated = !bordersAnimated;
  const containers = [
    daySearchContainer,
    monthSearchContainer,
    dayNumberSearchContainer,
    monthDaySearchContainer,
    letterSearchContainer,
    containLetterSearchContainer,
    dailyWordsSearchContainer,
    positionSearchContainer,
  ];

  containers.forEach((container) => {
    if (container) {
      if (bordersAnimated) {
        container.classList.remove("borders-off");
      } else {
        container.classList.add("borders-off");
      }
    }
  });
});

// Toggle controls visibility when clicking section headers
const daySearchTitle = document.getElementById("daySearchTitle");
const monthSearchTitle = document.getElementById("monthSearchTitle");
const dayNumberSearchTitle = document.getElementById("dayNumberSearchTitle");
const monthDaySearchTitle = document.getElementById("monthDaySearchTitle");
const letterSearchTitle = document.getElementById("letterSearchTitle");
const containLetterSearchTitle = document.getElementById(
  "containLetterSearchTitle",
);
const dailyWordsSearchTitle = document.getElementById("dailyWordsSearchTitle");
const positionSearchTitle = document.getElementById("positionSearchTitle");

daySearchTitle.addEventListener("click", () => {
  daySearchContainer.classList.toggle("show-controls");
});

monthSearchTitle.addEventListener("click", () => {
  monthSearchContainer.classList.toggle("show-controls");
});

dayNumberSearchTitle.addEventListener("click", () => {
  dayNumberSearchContainer.classList.toggle("show-controls");
});

monthDaySearchTitle.addEventListener("click", () => {
  monthDaySearchContainer.classList.toggle("show-controls");
});

letterSearchTitle.addEventListener("click", () => {
  letterSearchContainer.classList.toggle("show-controls");
});

containLetterSearchTitle.addEventListener("click", () => {
  containLetterSearchContainer.classList.toggle("show-controls");
});

dailyWordsSearchTitle.addEventListener("click", () => {
  dailyWordsSearchContainer.classList.toggle("show-controls");
  console.log("Clicked daily words title, guy");
});

positionSearchTitle.addEventListener("click", () => {
  positionSearchContainer.classList.toggle("show-controls");
});

toggleButton.addEventListener("click", () => {
  const isVisible = scoreDropdown.style.display === "block";
  scoreDropdown.style.display = isVisible ? "none" : "block";
  scoreAverageFiltersContainer.style.display = isVisible ? "none" : "block";
  scoreStreaksContainer.style.display = isVisible ? "none" : "block";
  repeatingWordsContainer.style.display = isVisible ? "none" : "block";
  daySearchContainer.style.display = isVisible ? "none" : "block";
  monthSearchContainer.style.display = isVisible ? "none" : "block";
  dayNumberSearchContainer.style.display = isVisible ? "none" : "block";
  monthDaySearchContainer.style.display = isVisible ? "none" : "block";
  letterSearchContainer.style.display = isVisible ? "none" : "block";
  containLetterSearchContainer.style.display = isVisible ? "none" : "block";
  dailyWordsSearchContainer.style.display = isVisible ? "none" : "block";
  positionSearchContainer.style.display = isVisible ? "none" : "block";

  // If hiding the main section, also hide the score average filters, streaks, and repeating words
  if (isVisible) {
    scoreAverageFiltersContent.style.display = "none";
    scoreStreaksContent.style.display = "none";
    repeatingWordsContent.style.display = "none";
  }

  // Populate dropdowns if showing
  if (!isVisible) {
    populateMonthSearchYearDropdown();
    populateDayNumberDropdown();
    populateMonthDayDropdown();
    populateLetterDropdowns();
    populateContainLetterDropdown();
    populateDailyWordsDropdowns();
  }
});

// Toggle the Score Average Filters section
scoreAverageFiltersToggle.addEventListener("click", () => {
  const isVisible = scoreAverageFiltersContent.style.display === "block";
  scoreAverageFiltersContent.style.display = isVisible ? "none" : "block";

  // Populate dropdowns if showing
  if (!isVisible) {
    populateMonthYearDropdown();
    populateYearDropdown();
  }
});

// Toggle the Score Streaks section
scoreStreaksToggle.addEventListener("click", () => {
  const isVisible = scoreStreaksContent.style.display === "block";
  scoreStreaksContent.style.display = isVisible ? "none" : "block";
});

// Function to calculate streaks for a given score
function calculateStreaks(score, mode) {
  // Sort words by date to ensure chronological order
  const sortedWords = [...wordleWords].sort((a, b) => {
    return new Date(a.gameDate) - new Date(b.gameDate);
  });

  const allStreaks = [];
  let currentStreak = [];

  // Helper function to check if an entry matches the streak criteria
  const matchesCriteria = (entry) => {
    if (mode === "exact") {
      return entry.myScore === score;
    } else if (mode === "below") {
      return entry.myScore > 0 && entry.myScore < score;
    }
    return false;
  };

  for (let i = 0; i < sortedWords.length; i++) {
    const entry = sortedWords[i];
    const entryDate = new Date(entry.gameDate);

    if (matchesCriteria(entry)) {
      // Check if this is a continuation of the current streak
      if (currentStreak.length === 0) {
        // Starting a new streak
        currentStreak.push(entry);
      } else {
        // Check if this entry is consecutive (next day)
        const lastDate = new Date(
          currentStreak[currentStreak.length - 1].gameDate,
        );
        const daysDiff = Math.floor(
          (entryDate - lastDate) / (1000 * 60 * 60 * 24),
        );

        if (daysDiff === 1) {
          // Consecutive day, continue streak
          currentStreak.push(entry);
        } else {
          // Not consecutive, save current streak and start new one
          if (currentStreak.length > 0) {
            allStreaks.push([...currentStreak]);
          }
          currentStreak = [entry];
        }
      }
    } else {
      // Score doesn't match, end current streak if exists
      if (currentStreak.length > 0) {
        allStreaks.push([...currentStreak]);
        currentStreak = [];
      }
    }
  }

  // Check final streak
  if (currentStreak.length > 0) {
    allStreaks.push([...currentStreak]);
  }

  // Sort streaks by length (longest first), then by start date
  allStreaks.sort((a, b) => {
    if (b.length !== a.length) {
      return b.length - a.length; // Sort by length descending
    }
    // If same length, sort by start date ascending
    return new Date(a[0].gameDate) - new Date(b[0].gameDate);
  });

  const maxLength = allStreaks.length > 0 ? allStreaks[0].length : 0;

  return {
    maxLength: maxLength,
    streaks: allStreaks,
  };
}

// Function to update score streaks display
function updateScoreStreaksDisplay() {
  const selectedScore = scoreStreaksDropdown.value;
  const mode = scoreStreaksMode.value;

  if (!selectedScore) {
    scoreStreaksResults.innerHTML = "";
    return;
  }

  const score = Number(selectedScore);
  const streakData = calculateStreaks(score, mode);

  if (streakData.maxLength === 0) {
    const modeText =
      mode === "exact" ? `score ${score}` : `scores below ${score}`;
    scoreStreaksResults.innerHTML = `<div class="score-streaks-summary">No streaks found for ${modeText}</div>`;
    return;
  }

  const modeText =
    mode === "exact" ? `Score ${score}` : `Scores Below ${score}`;
  let htmlContent = `<div class="score-streaks-summary">
    <strong>Longest Streak for ${modeText}:</strong> ${streakData.maxLength} consecutive game(s)
  </div>`;

  // Group streaks by length to determine rank
  const streaksByLength = {};
  streakData.streaks.forEach((streak) => {
    const length = streak.length;
    if (!streaksByLength[length]) {
      streaksByLength[length] = [];
    }
    streaksByLength[length].push(streak);
  });

  // Get sorted lengths (descending)
  const sortedLengths = Object.keys(streaksByLength)
    .map(Number)
    .sort((a, b) => b - a);

  let streakIndex = 0;

  // Display all streaks grouped by rank with headers
  sortedLengths.forEach((length, lengthIndex) => {
    const streaksOfThisLength = streaksByLength[length];
    const rankLabel =
      lengthIndex === 0
        ? "Longest"
        : lengthIndex === 1
          ? "2nd Longest"
          : lengthIndex === 2
            ? "3rd Longest"
            : `${lengthIndex + 1}th Longest`;
    const occurrenceCount = streaksOfThisLength.length;

    const headerId = `streak-header-${score}-${mode}-${lengthIndex}`;
    const streaksGroupId = `streaks-group-${score}-${mode}-${lengthIndex}`;

    // Build tooltip content with date ranges
    let tooltipLines = [];
    streaksOfThisLength.forEach((streak) => {
      const startDate = streak[0].gameDate;
      const endDate = streak[streak.length - 1].gameDate;
      let line = `${startDate} to ${endDate}`;
      if (mode === "below") {
        const totalScore = streak.reduce(
          (sum, entry) => sum + entry.myScore,
          0,
        );
        const averageScore = (totalScore / streak.length).toFixed(2);
        line += ` (Avg: ${averageScore})`;
      }
      tooltipLines.push(line);
    });

    // Add header for this rank (clickable toggle)
    const tooltipData = JSON.stringify(tooltipLines);
    htmlContent += `<div class="streak-rank-header" data-header-id="${headerId}" data-group-id="${streaksGroupId}" data-tooltip='${tooltipData}'>
      <strong>${rankLabel} Streaks (${length} games) - ${occurrenceCount} occurrence${occurrenceCount !== 1 ? "s" : ""}</strong>
    </div>`;

    // Add container for streaks (hidden initially)
    htmlContent += `<div class="streaks-group" id="${streaksGroupId}" style="display: none;">`;

    streaksOfThisLength.forEach((streak) => {
      const startDate = streak[0].gameDate;
      const endDate = streak[streak.length - 1].gameDate;
      const streakId = `streak-${score}-${mode}-${streakIndex}`;

      // Calculate average score for "below" mode
      let streakInfo = `${startDate} to ${endDate} (${streak.length} games)`;

      if (mode === "below") {
        const totalScore = streak.reduce(
          (sum, entry) => sum + entry.myScore,
          0,
        );
        const averageScore = (totalScore / streak.length).toFixed(2);
        streakInfo += ` - Average Score: ${averageScore}`;
      }

      htmlContent += `<div class="streak-item">
        <div class="streak-info">
          ${streakInfo}
        </div>
        <button class="view-streak-button" data-streak-id="${streakId}" data-score="${score}" data-mode="${mode}" data-index="${streakIndex}">
          View the Streak
        </button>
      </div>`;

      streakIndex++;
    });

    htmlContent += `</div>`;
  });

  scoreStreaksResults.innerHTML = htmlContent;

  // Hide words container when new results are displayed
  scoreStreaksWordsContainer.style.display = "none";

  // Add event listeners to streak rank headers for toggling and tooltip
  document.querySelectorAll(".streak-rank-header").forEach((header) => {
    let tooltipElement = null;

    header.addEventListener("click", (e) => {
      const groupId = header.getAttribute("data-group-id");
      const streaksGroup = document.getElementById(groupId);
      if (streaksGroup) {
        const isVisible = streaksGroup.style.display === "block";
        streaksGroup.style.display = isVisible ? "none" : "block";
      }
    });

    // Create tooltip on hover
    header.addEventListener("mouseenter", () => {
      const tooltipData = header.getAttribute("data-tooltip");
      if (tooltipData && !tooltipElement) {
        try {
          const tooltipLines = JSON.parse(tooltipData);
          tooltipElement = document.createElement("div");
          tooltipElement.className = "streak-tooltip";
          tooltipElement.innerHTML = tooltipLines.join("<br>");
          document.body.appendChild(tooltipElement);

          // Position tooltip
          const rect = header.getBoundingClientRect();
          tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
          tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 8}px`;
          tooltipElement.style.transform = "translateX(-50%)";
        } catch (e) {
          console.error("Error parsing tooltip data:", e);
        }
      }
    });

    header.addEventListener("mouseleave", () => {
      if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
      }
    });

    header.addEventListener("mousemove", (e) => {
      if (tooltipElement) {
        const rect = header.getBoundingClientRect();
        tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 8}px`;
      }
    });
  });

  // Add event listeners to view streak buttons
  document.querySelectorAll(".view-streak-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent header toggle when clicking button
      const score = Number(button.getAttribute("data-score"));
      const mode = button.getAttribute("data-mode");
      const index = Number(button.getAttribute("data-index"));
      const streakData = calculateStreaks(score, mode);
      showScoreStreakWords(score, streakData.streaks[index], mode);

      // Scroll to the words container after showing it
      setTimeout(() => {
        scoreStreaksWordsContainer.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    });
  });
}

// Handle score streaks mode change
scoreStreaksMode.addEventListener("change", () => {
  updateScoreStreaksDisplay();
});

// Handle score streaks dropdown change
scoreStreaksDropdown.addEventListener("change", () => {
  updateScoreStreaksDisplay();
});

// Function to show words in a streak
function showScoreStreakWords(score, streak, mode) {
  if (!streak || streak.length === 0) return;

  const startDate = streak[0].gameDate;
  const endDate = streak[streak.length - 1].gameDate;
  const modeText =
    mode === "exact" ? `Score ${score}` : `Scores Below ${score}`;

  scoreStreaksWordsTitle.textContent = `${modeText} Streak: ${startDate} to ${endDate} (${streak.length} games)`;

  scoreStreaksWordsList.innerHTML = "";

  streak.forEach((entry) => {
    const wordItem = document.createElement("div");
    wordItem.className = "word-item";
    wordItem.textContent = `${entry.word} - Date: ${entry.gameDate} - Score: ${entry.myScore} - Word#: ${entry.wordNumber}`;
    wordItem.addEventListener("click", () => {
      toggleWordDetails(entry);
    });
    scoreStreaksWordsList.appendChild(wordItem);
  });

  scoreStreaksWordsContainer.style.display = "block";
}

// Close score streaks words container
closeScoreStreaksWordsButton.addEventListener("click", () => {
  scoreStreaksWordsContainer.style.display = "none";
});

// Display the count of games for the selected score and the percentage
scoreDropdown.addEventListener("change", (event) => {
  const selectedScore = Number(event.target.value);
  currentSelectedScore = selectedScore;
  const count = scoreCounts[selectedScore] || 0;
  const percentageNonZero =
    selectedScore !== 0 && totalNonZeroScores > 0
      ? ((count / totalNonZeroScores) * 100).toFixed(5)
      : 0;
  const percentageZero =
    selectedScore === 0 && totalScores > 0
      ? ((count / totalScores) * 100).toFixed(5)
      : 0;

  let message = `The # of games you played with the score of ${selectedScore} is ${count}. `;
  if (selectedScore !== 0) {
    message += `The % of games you played with the score of ${selectedScore} is ${percentageNonZero}%.`;
  } else {
    message += `The % of all games not played is ${percentageZero}%.`;
  }

  // Combine with other dropdown results if they exist
  const monthYearValue = monthYearDropdown.value;
  const yearValue = yearDropdown.value;

  let htmlContent = `<div class="score-result">${message}</div>`;

  if (monthYearValue) {
    const [year, month] = monthYearValue.split("-").map(Number);
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    const gamesInMonth = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === year && date.getMonth() === month;
    });
    if (gamesInMonth.length > 0) {
      const totalScore = gamesInMonth.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(8);
      htmlContent += `<div class="month-year-result">Month/Year Average: ${monthName} ${year}: ${averageScore} (${gamesInMonth.length} games)</div>`;
    }
  }

  if (yearValue) {
    const selectedYear = Number(yearValue);
    const gamesInYear = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === selectedYear;
    });
    if (gamesInYear.length > 0) {
      const totalScore = gamesInYear.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(8);
      htmlContent += `<div class="year-result">Year Average: ${selectedYear}: ${averageScore} (${gamesInYear.length} games)</div>`;
    }
  }

  scoreField.innerHTML = htmlContent;

  // Show the date toggle container if there are games for this score
  if (count > 0) {
    dateToggleContainer.style.display = "flex";
    showDatesButton.textContent = `Show All Dates (${count})`;
    showWordsButton.textContent = `Show All Words (${count})`;
  } else {
    dateToggleContainer.style.display = "none";
  }

  // Hide other containers when new score is selected
  hideDatesList();
  hideWordsList();
  hideWordDetails();
});

// Show dates functionality
showDatesButton.addEventListener("click", () => {
  showDatesList();
  console.log("These dates are great!");
});

hideDatesButton.addEventListener("click", () => {
  hideDatesList();
});

closeDatesButton.addEventListener("click", () => {
  hideDatesList();
});

// Show words functionality
showWordsButton.addEventListener("click", () => {
  showWordsList();
});

hideWordsButton.addEventListener("click", () => {
  hideWordsList();
});

closeWordsButton.addEventListener("click", () => {
  hideWordsList();
});

closeWordDetailsButton.addEventListener("click", () => {
  hideWordDetails();
});

// Close button event listeners for search sections
closeDaySearchButton.addEventListener("click", () => {
  clearDaySearch();
});

// Day search sort button event listener
daySearchSortButton.addEventListener("click", () => {
  // Toggle between date and alphabetical sort
  if (daySearchSortMode === "date") {
    daySearchSortMode = "alphabetical";
    daySearchSortButton.textContent = "Sort by Date";
  } else {
    daySearchSortMode = "date";
    daySearchSortButton.textContent = "Sort Alphabetically";
  }
  // Re-render words with new sort mode
  renderDaySearchWords();
});

// Month search sort button event listener
monthSearchSortButton.addEventListener("click", () => {
  // Toggle between date and alphabetical sort
  if (monthSearchSortMode === "date") {
    monthSearchSortMode = "alphabetical";
    monthSearchSortButton.textContent = "Sort by Date";
  } else {
    monthSearchSortMode = "date";
    monthSearchSortButton.textContent = "Sort Alphabetically";
  }
  // Re-render words with new sort mode
  renderMonthSearchWords();
});

closeMonthSearchButton.addEventListener("click", () => {
  clearMonthSearch();
});

// Day number search sort button event listener
dayNumberSearchSortButton.addEventListener("click", () => {
  // Toggle between date and alphabetical sort
  if (dayNumberSearchSortMode === "date") {
    dayNumberSearchSortMode = "alphabetical";
    dayNumberSearchSortButton.textContent = "Sort by Date";
  } else {
    dayNumberSearchSortMode = "date";
    dayNumberSearchSortButton.textContent = "Sort Alphabetically";
  }
  // Re-render words with new sort mode
  renderDayNumberSearchWords();
});

closeDayNumberSearchButton.addEventListener("click", () => {
  clearDayNumberSearch();
});

// Month/Day search sort button event listener
monthDaySearchSortButton.addEventListener("click", () => {
  // Toggle between date and alphabetical sort
  if (monthDaySearchSortMode === "date") {
    monthDaySearchSortMode = "alphabetical";
    monthDaySearchSortButton.textContent = "Sort by Date";
  } else {
    monthDaySearchSortMode = "date";
    monthDaySearchSortButton.textContent = "Sort Alphabetically";
  }
  // Re-render words with new sort mode
  renderMonthDaySearchWords();
});

closeMonthDaySearchButton.addEventListener("click", () => {
  clearMonthDaySearch();
});

// Letter search sort button event listener
letterSearchSortButton.addEventListener("click", () => {
  // Toggle between alphabetical and date sort
  if (letterSearchSortMode === "alphabetical") {
    letterSearchSortMode = "date";
    letterSearchSortButton.textContent = "Sort Alphabetically";
  } else {
    letterSearchSortMode = "alphabetical";
    letterSearchSortButton.textContent = "Sort by Date";
  }
  // Re-render words with new sort mode
  renderLetterSearchWords();
});

closeLetterSearchButton.addEventListener("click", () => {
  clearLetterSearch();
});

// Contain letter search sort button event listener
containLetterSearchSortButton.addEventListener("click", () => {
  // Toggle between alphabetical and date sort
  if (containLetterSearchSortMode === "alphabetical") {
    containLetterSearchSortMode = "date";
    containLetterSearchSortButton.textContent = "Sort Alphabetically";
  } else {
    containLetterSearchSortMode = "alphabetical";
    containLetterSearchSortButton.textContent = "Sort by Date";
  }
  // Re-render words with new sort mode
  renderContainLetterSearchWords();
});

closeContainLetterSearchButton.addEventListener("click", () => {
  clearContainLetterSearch();
});

closeDailyWordsSearchButton.addEventListener("click", () => {
  clearDailyWordsSearch();
});

function showDatesList() {
  if (currentSelectedScore === null) return;

  // Filter words by the current selected score
  const wordsWithScore = wordleWords.filter(
    (entry) => entry.myScore === currentSelectedScore,
  );

  // Update title
  datesTitle.textContent = `All dates with score ${currentSelectedScore}`;

  // Clear previous dates
  datesList.innerHTML = "";

  // Create date buttons
  wordsWithScore.forEach((entry) => {
    const dateButton = document.createElement("button");
    dateButton.className = "date-button";
    dateButton.textContent = entry.gameDate;
    dateButton.addEventListener("click", () => {
      toggleWordDetails(entry);
    });
    datesList.appendChild(dateButton);
  });

  // Show containers and update buttons
  datesContainer.style.display = "block";
  showDatesButton.style.display = "none";
  hideDatesButton.style.display = "block";
}

function hideDatesList() {
  datesContainer.style.display = "none";
  showDatesButton.style.display = "block";
  hideDatesButton.style.display = "none";
  hideWordDetails(); // Also hide word details when hiding dates
  console.log("Hiding thangs!"); // Not exactly sure where this is supposed to go, but we'll check it out!
}

function showWordsList() {
  if (currentSelectedScore === null) return;

  // Filter words by the current selected score
  const wordsWithScore = wordleWords.filter(
    (entry) => entry.myScore === currentSelectedScore,
  );

  // Update title
  wordsTitle.textContent = `All words with score ${currentSelectedScore}`;

  // Clear previous words
  wordsList.innerHTML = "";

  // Create word items in the specified format: WORD - Date: YYYY-MM-DD - Word#: ###
  wordsWithScore.forEach((entry) => {
    const wordItem = document.createElement("div");
    wordItem.className = "word-item";
    wordItem.textContent = `${entry.word} - Date: ${entry.gameDate} - Word#: ${entry.wordNumber}`;
    wordItem.addEventListener("click", () => {
      toggleWordDetails(entry);
    });
    wordsList.appendChild(wordItem);
  });

  // Show containers and update buttons
  wordsContainer.style.display = "block";
  showWordsButton.style.display = "none";
  hideWordsButton.style.display = "block";
}

function hideWordsList() {
  wordsContainer.style.display = "none";
  showWordsButton.style.display = "block";
  hideWordsButton.style.display = "none";
  hideWordDetails(); // Also hide word details when hiding words
}

function showWordDetails(entry) {
  wordDetailsContent.innerHTML = `
      <div class="detail-item">
        <span class="detail-label">Word:</span>
        <span class="detail-value">${entry.word}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Date:</span>
        <span class="detail-value">${entry.gameDate}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Word Number:</span>
        <span class="detail-value">#${entry.wordNumber}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Score:</span>
        <span class="detail-value">${
          entry.myScore === 0 ? "Not Played" : entry.myScore
        }</span>
      </div>
    `;

  wordDetailsContainer.style.display = "block";
  currentlyShownWordNumber = entry.wordNumber;
}

function hideWordDetails() {
  wordDetailsContainer.style.display = "none";
  currentlyShownWordNumber = null;
}

// Toggle details: show on first click, hide on second click of same item
function toggleWordDetails(entry, options = {}) {
  const isVisible = wordDetailsContainer.style.display === "block";
  const isSame = currentlyShownWordNumber === entry.wordNumber;
  if (isVisible && isSame) {
    hideWordDetails();
    return;
  }
  if (options.includeDayOfWeek) {
    showWordDetailsFromDay(entry);
    return;
  }
  if (options.includeMonthDayYear) {
    showWordDetailsFromSearch(entry);
    return;
  }
  showWordDetails(entry);
}

// Initialize the dropdown to be hidden
scoreDropdown.style.display = "none";

// Function to update display based on current dropdown selections
function updateCombinedDisplay() {
  const scoreValue = scoreDropdown.value;
  const monthYearValue = monthYearDropdown.value;
  const yearValue = yearDropdown.value;

  let htmlContent = "";
  let hasContent = false;

  if (scoreValue) {
    const selectedScore = Number(scoreValue);
    const count = scoreCounts[selectedScore] || 0;
    const percentageNonZero =
      selectedScore !== 0 && totalNonZeroScores > 0
        ? ((count / totalNonZeroScores) * 100).toFixed(5)
        : 0;
    const percentageZero =
      selectedScore === 0 && totalScores > 0
        ? ((count / totalScores) * 100).toFixed(5)
        : 0;

    htmlContent += `<div class="score-result">Score ${selectedScore}: ${count} games. `;
    if (selectedScore !== 0) {
      htmlContent += `${percentageNonZero}% of non-zero games.</div>`;
    } else {
      htmlContent += `${percentageZero}% of all games.</div>`;
    }
    hasContent = true;
  }

  if (monthYearValue) {
    const [year, month] = monthYearValue.split("-").map(Number);
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    const gamesInMonth = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === year && date.getMonth() === month;
    });
    if (gamesInMonth.length > 0) {
      const totalScore = gamesInMonth.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(8);
      htmlContent += `<div class="month-year-result">Month/Year Average: ${monthName} ${year}: ${averageScore} (${gamesInMonth.length} games)</div>`;
      hasContent = true;
    }
  }

  if (yearValue) {
    const selectedYear = Number(yearValue);
    const gamesInYear = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === selectedYear;
    });
    if (gamesInYear.length > 0) {
      const totalScore = gamesInYear.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(8);
      htmlContent += `<div class="year-result">Year Average: ${selectedYear}: ${averageScore} (${gamesInYear.length} games)</div>`;
      hasContent = true;
    }
  }

  if (!hasContent) {
    htmlContent = `<div class="default-message">Select from any dropdown to see statistics.</div>`;
  }

  scoreField.innerHTML = htmlContent;
}

// Populate month/year dropdown
function populateMonthYearDropdown() {
  monthYearDropdown.innerHTML = '<option value="">Select Month/Year</option>';

  // Get unique month/year combinations from played games
  const monthYearMap = new Map();

  wordleWords.forEach((entry) => {
    if (entry.myScore !== 0) {
      // Only include played games
      const date = new Date(entry.gameDate);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      if (!monthYearMap.has(key)) {
        monthYearMap.set(key, {
          display: monthYear,
          year: date.getFullYear(),
          month: date.getMonth(),
        });
      }
    }
  });

  // Sort by year and month
  const sortedEntries = Array.from(monthYearMap.values()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  sortedEntries.forEach((entry) => {
    const option = document.createElement("option");
    option.value = `${entry.year}-${entry.month}`;
    option.textContent = entry.display;
    monthYearDropdown.appendChild(option);
  });
}

// Populate year dropdown
function populateYearDropdown() {
  yearDropdown.innerHTML = '<option value="">Select Year</option>';

  // Get unique years from played games
  const yearSet = new Set();

  wordleWords.forEach((entry) => {
    if (entry.myScore !== 0) {
      // Only include played games
      const date = new Date(entry.gameDate);
      yearSet.add(date.getFullYear());
    }
  });

  // Sort years
  const sortedYears = Array.from(yearSet).sort();

  sortedYears.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  });
}

// Handle month/year dropdown change
monthYearDropdown.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  if (!selectedValue) {
    // If clearing the dropdown, update display based on other selections
    updateCombinedDisplay();
    return;
  }

  const [year, month] = selectedValue.split("-").map(Number);
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  // Filter games for this month/year
  const gamesInMonth = wordleWords.filter((entry) => {
    if (entry.myScore === 0) return false;
    const date = new Date(entry.gameDate);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  if (gamesInMonth.length === 0) {
    scoreField.innerHTML = `<div class="default-message">No games played in ${monthName} ${year}</div>`;
    return;
  }

  // Calculate average score
  const totalScore = gamesInMonth.reduce(
    (sum, entry) => sum + entry.myScore,
    0,
  );
  const averageScore = (totalScore / gamesInMonth.length).toFixed(8);

  let htmlContent = `<div class="month-year-result">Month/Year Average: ${monthName} ${year}: ${averageScore} (${gamesInMonth.length} games)</div>`;

  // Combine with other dropdown results
  const scoreValue = scoreDropdown.value;
  const yearValue = yearDropdown.value;

  if (scoreValue) {
    const selectedScore = Number(scoreValue);
    const count = scoreCounts[selectedScore] || 0;
    const percentageNonZero =
      selectedScore !== 0 && totalNonZeroScores > 0
        ? ((count / totalNonZeroScores) * 100).toFixed(5)
        : 0;
    const percentageZero =
      selectedScore === 0 && totalScores > 0
        ? ((count / totalScores) * 100).toFixed(5)
        : 0;

    htmlContent = `<div class="score-result">Score ${selectedScore}: ${count} games. `;
    if (selectedScore !== 0) {
      htmlContent += `${percentageNonZero}% of non-zero games.</div>`;
    } else {
      htmlContent += `${percentageZero}% of all games.</div>`;
    }
    htmlContent += `<div class="month-year-result">Month/Year Average: ${monthName} ${year}: ${averageScore} (${gamesInMonth.length} games)</div>`;
  }

  if (yearValue) {
    const selectedYear = Number(yearValue);
    const gamesInYear = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === selectedYear;
    });
    if (gamesInYear.length > 0) {
      const totalScore = gamesInYear.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(8);
      htmlContent += `<div class="year-result">Year Average: ${selectedYear}: ${averageScore} (${gamesInYear.length} games)</div>`;
    }
  }

  scoreField.innerHTML = htmlContent;

  // Hide other containers
  dateToggleContainer.style.display = "none";
  hideDatesList();
  hideWordsList();
  hideWordDetails();
});

// Handle year dropdown change
yearDropdown.addEventListener("change", (event) => {
  const selectedYear = Number(event.target.value);
  if (!selectedYear) {
    // If clearing the dropdown, update display based on other selections
    updateCombinedDisplay();
    return;
  }

  // Filter games for this year
  const gamesInYear = wordleWords.filter((entry) => {
    if (entry.myScore === 0) return false;
    const date = new Date(entry.gameDate);
    return date.getFullYear() === selectedYear;
  });

  if (gamesInYear.length === 0) {
    scoreField.innerHTML = `<div class="default-message">No games played in ${selectedYear}</div>`;
    return;
  }

  // Calculate average score
  const totalScore = gamesInYear.reduce((sum, entry) => sum + entry.myScore, 0);
  const averageScore = (totalScore / gamesInYear.length).toFixed(8);

  let htmlContent = `<div class="year-result">Year Average: ${selectedYear}: ${averageScore} (${gamesInYear.length} games)</div>`;

  // Combine with other dropdown results
  const scoreValue = scoreDropdown.value;
  const monthYearValue = monthYearDropdown.value;

  if (scoreValue) {
    const selectedScore = Number(scoreValue);
    const count = scoreCounts[selectedScore] || 0;
    const percentageNonZero =
      selectedScore !== 0 && totalNonZeroScores > 0
        ? ((count / totalNonZeroScores) * 100).toFixed(5)
        : 0;
    const percentageZero =
      selectedScore === 0 && totalScores > 0
        ? ((count / totalScores) * 100).toFixed(5)
        : 0;

    htmlContent = `<div class="score-result">Score ${selectedScore}: ${count} games. `;
    if (selectedScore !== 0) {
      htmlContent += `${percentageNonZero}% of non-zero games.</div>`;
    } else {
      htmlContent += `${percentageZero}% of all games.</div>`;
    }
    htmlContent += `<div class="year-result">Year Average: ${selectedYear}: ${averageScore} (${gamesInYear.length} games)</div>`;
  }

  if (monthYearValue) {
    const [year, month] = monthYearValue.split("-").map(Number);
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    const gamesInMonth = wordleWords.filter((entry) => {
      if (entry.myScore === 0) return false;
      const date = new Date(entry.gameDate);
      return date.getFullYear() === year && date.getMonth() === month;
    });
    if (gamesInMonth.length > 0) {
      const totalScore = gamesInMonth.reduce(
        (sum, entry) => sum + entry.myScore,
        0,
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(8);
      htmlContent += `<div class="month-year-result">Month/Year Average: ${monthName} ${year}: ${averageScore} (${gamesInMonth.length} games)</div>`;
    }
  }

  scoreField.innerHTML = htmlContent;

  // Hide other containers
  dateToggleContainer.style.display = "none";
  hideDatesList();
  hideWordsList();
  hideWordDetails();
});

// Day of Week Search Functionality
dayOfWeekDropdown.addEventListener("change", (event) => {
  const selectedDay = event.target.value;

  if (!selectedDay) {
    daySearchResults.innerHTML = "";
    return;
  }

  searchWordsByDayOfWeek(selectedDay);
});

function searchWordsByDayOfWeek(dayName) {
  // Filter words by day of week
  const wordsOnDay = wordleWords.filter((entry) => {
    // Parse the date and get day of week
    const date = new Date(entry.gameDate);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayOfWeek === dayName;
  });

  // Store filtered words for sorting
  currentDaySearchWords = [...wordsOnDay];

  // Reset to date sort mode for new searches
  daySearchSortMode = "date";

  // Clear previous results
  daySearchResults.innerHTML = "";

  if (wordsOnDay.length === 0) {
    daySearchResults.innerHTML = `<div class="day-search-summary">No words found for ${dayName}</div>`;
    closeDaySearchButton.style.display = "block";
    daySearchSortButton.style.display = "none";
    currentDaySearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsOnDay.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary for rendering
  // (Summary will be rendered in renderDaySearchWords)

  // Show close button
  closeDaySearchButton.style.display = "block";

  // Store summary
  currentDaySearchSummary = {
    dayName: dayName,
    totalWords: wordsOnDay.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeDaySearchButton.style.display = "block";
  daySearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderDaySearchWords();
}

function renderDaySearchWords() {
  if (!currentDaySearchSummary || currentDaySearchWords.length === 0) {
    return;
  }

  // Clear previous results but keep structure
  daySearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "day-search-summary";
  summaryDiv.innerHTML = `
    <strong>${currentDaySearchSummary.dayName}s:</strong> ${currentDaySearchSummary.totalWords} total words | 
    ${currentDaySearchSummary.playedWords} played | 
    Average Score: ${currentDaySearchSummary.averageScore}
  `;
  daySearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentDaySearchWords];

  // Sort based on current mode
  if (daySearchSortMode === "alphabetical") {
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  } else {
    // Sort by date (newest first) - default
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "day-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromDay(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    daySearchResults.appendChild(wordButton);
  });
}

function showWordDetailsFromDay(entry) {
  // Get the day of week for the entry
  const date = new Date(entry.gameDate);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  wordDetailsContent.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Word:</span>
      <span class="detail-value">${entry.word}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Full Date:</span>
      <span class="detail-value">${entry.gameDate} (${dayOfWeek})</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Word Number:</span>
      <span class="detail-value">#${entry.wordNumber}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Score:</span>
      <span class="detail-value">${
        entry.myScore === 0 ? "Not Played" : entry.myScore
      }</span>
    </div>
  `;

  wordDetailsContainer.style.display = "block";
  currentlyShownWordNumber = entry.wordNumber;
}

// Month Search Functionality
monthSearchMonthDropdown.addEventListener("change", () => {
  const selectedMonth = monthSearchMonthDropdown.value;
  const selectedYear = monthSearchYearDropdown.value;

  if (!selectedMonth || !selectedYear) {
    monthSearchResults.innerHTML = "";
    return;
  }

  searchWordsByMonth(selectedMonth, selectedYear);
});

monthSearchYearDropdown.addEventListener("change", () => {
  const selectedMonth = monthSearchMonthDropdown.value;
  const selectedYear = monthSearchYearDropdown.value;

  if (!selectedMonth || !selectedYear) {
    monthSearchResults.innerHTML = "";
    return;
  }

  searchWordsByMonth(selectedMonth, selectedYear);
});

function populateMonthSearchYearDropdown() {
  // Clear existing options except the first two
  monthSearchYearDropdown.innerHTML =
    '<option value="">Select Year</option><option value="all">All Years</option>';

  // Get unique years from all words (not just played games)
  const yearSet = new Set();

  wordleWords.forEach((entry) => {
    const date = new Date(entry.gameDate);
    yearSet.add(date.getFullYear());
  });

  // Sort years
  const sortedYears = Array.from(yearSet).sort();

  sortedYears.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    monthSearchYearDropdown.appendChild(option);
  });
}

function searchWordsByMonth(selectedMonth, selectedYear) {
  // Filter words based on month and year selections
  let wordsFiltered = wordleWords;

  if (selectedMonth !== "all") {
    const monthNumber = parseInt(selectedMonth);
    wordsFiltered = wordsFiltered.filter((entry) => {
      const date = new Date(entry.gameDate);
      return date.getMonth() === monthNumber;
    });
  }

  if (selectedYear !== "all") {
    const yearNumber = parseInt(selectedYear);
    wordsFiltered = wordsFiltered.filter((entry) => {
      const date = new Date(entry.gameDate);
      return date.getFullYear() === yearNumber;
    });
  }

  // Store filtered words for sorting
  currentMonthSearchWords = [...wordsFiltered];

  // Reset to date sort mode for new searches
  monthSearchSortMode = "date";

  // Clear previous results
  monthSearchResults.innerHTML = "";

  if (wordsFiltered.length === 0) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName =
      selectedMonth === "all"
        ? "All Months"
        : monthNames[parseInt(selectedMonth)];
    const yearText = selectedYear === "all" ? "All Years" : selectedYear;
    monthSearchResults.innerHTML = `<div class="month-search-summary">No words found for ${monthName} ${yearText}</div>`;
    closeMonthSearchButton.style.display = "block";
    monthSearchSortButton.style.display = "none";
    currentMonthSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsFiltered.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Add summary
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName =
    selectedMonth === "all"
      ? "All Months"
      : monthNames[parseInt(selectedMonth)];
  const yearText = selectedYear === "all" ? "All Years" : selectedYear;

  // Store summary
  currentMonthSearchSummary = {
    monthName: monthName,
    yearText: yearText,
    totalWords: wordsFiltered.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeMonthSearchButton.style.display = "block";
  monthSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderMonthSearchWords();
}

function renderMonthSearchWords() {
  if (!currentMonthSearchSummary || currentMonthSearchWords.length === 0) {
    return;
  }

  // Clear previous results but keep structure
  monthSearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "month-search-summary";
  summaryDiv.innerHTML = `
    <strong>${currentMonthSearchSummary.monthName} ${currentMonthSearchSummary.yearText}:</strong> ${currentMonthSearchSummary.totalWords} total words | 
    ${currentMonthSearchSummary.playedWords} played | 
    Average Score: ${currentMonthSearchSummary.averageScore}
  `;
  monthSearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentMonthSearchWords];

  // Sort based on current mode
  if (monthSearchSortMode === "alphabetical") {
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  } else {
    // Sort by date (newest first) - default
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "month-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    monthSearchResults.appendChild(wordButton);
  });
}

// Day Number Search Functionality
dayNumberDropdown.addEventListener("change", (event) => {
  const selectedDayNumber = event.target.value;

  if (!selectedDayNumber) {
    dayNumberSearchResults.innerHTML = "";
    return;
  }

  searchWordsByDayNumber(parseInt(selectedDayNumber));
});

function populateDayNumberDropdown() {
  // Clear existing options except the first one
  dayNumberDropdown.innerHTML = '<option value="">Select Day (1-31)</option>';

  // Add options for days 1-31
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    dayNumberDropdown.appendChild(option);
  }
}

function searchWordsByDayNumber(dayNumber) {
  // Filter words by day of month
  const wordsOnDay = wordleWords.filter((entry) => {
    const date = new Date(entry.gameDate);
    return date.getDate() === dayNumber;
  });

  // Store filtered words for sorting
  currentDayNumberSearchWords = [...wordsOnDay];

  // Reset to date sort mode for new searches
  dayNumberSearchSortMode = "date";

  // Clear previous results
  dayNumberSearchResults.innerHTML = "";

  if (wordsOnDay.length === 0) {
    dayNumberSearchResults.innerHTML = `<div class="day-number-search-summary">No words found for day ${dayNumber} of any month</div>`;
    closeDayNumberSearchButton.style.display = "block";
    dayNumberSearchSortButton.style.display = "none";
    currentDayNumberSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsOnDay.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary
  currentDayNumberSearchSummary = {
    dayNumber: dayNumber,
    totalWords: wordsOnDay.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeDayNumberSearchButton.style.display = "block";
  dayNumberSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderDayNumberSearchWords();
}

function renderDayNumberSearchWords() {
  if (
    !currentDayNumberSearchSummary ||
    currentDayNumberSearchWords.length === 0
  ) {
    return;
  }

  // Clear previous results but keep structure
  dayNumberSearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "day-number-search-summary";
  summaryDiv.innerHTML = `
    <strong>Day ${currentDayNumberSearchSummary.dayNumber}:</strong> ${currentDayNumberSearchSummary.totalWords} total words | 
    ${currentDayNumberSearchSummary.playedWords} played | 
    Average Score: ${currentDayNumberSearchSummary.averageScore}
  `;
  dayNumberSearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentDayNumberSearchWords];

  // Sort based on current mode
  if (dayNumberSearchSortMode === "alphabetical") {
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  } else {
    // Sort by date (newest first) - default
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "day-number-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    dayNumberSearchResults.appendChild(wordButton);
  });
}

// Month/Day Search Functionality
monthDropdown.addEventListener("change", (event) => {
  const selectedMonth = event.target.value;

  if (!selectedMonth) {
    monthDayDropdown.innerHTML = '<option value="">Select Day</option>';
    monthDaySearchResults.innerHTML = "";
    return;
  }

  populateMonthDayDropdown();
});

monthDayDropdown.addEventListener("change", (event) => {
  const selectedDay = event.target.value;
  const selectedMonth = monthDropdown.value;

  if (!selectedDay || !selectedMonth) {
    monthDaySearchResults.innerHTML = "";
    return;
  }

  searchWordsByMonthDay(parseInt(selectedMonth), parseInt(selectedDay));
});

function populateMonthDayDropdown() {
  // Clear existing options
  monthDayDropdown.innerHTML = '<option value="">Select Day</option>';

  // Add options for days 1-31
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    monthDayDropdown.appendChild(option);
  }
}

function searchWordsByMonthDay(monthNumber, dayNumber) {
  // Filter words by specific month and day
  const wordsOnMonthDay = wordleWords.filter((entry) => {
    const date = new Date(entry.gameDate);
    return date.getMonth() === monthNumber && date.getDate() === dayNumber;
  });

  // Store filtered words for sorting
  currentMonthDaySearchWords = [...wordsOnMonthDay];

  // Reset to date sort mode for new searches
  monthDaySearchSortMode = "date";

  // Clear previous results
  monthDaySearchResults.innerHTML = "";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[monthNumber];

  if (wordsOnMonthDay.length === 0) {
    monthDaySearchResults.innerHTML = `<div class="month-day-search-summary">No words found for ${monthName} ${dayNumber}</div>`;
    closeMonthDaySearchButton.style.display = "block";
    monthDaySearchSortButton.style.display = "none";
    currentMonthDaySearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsOnMonthDay.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary
  currentMonthDaySearchSummary = {
    monthName: monthName,
    dayNumber: dayNumber,
    totalWords: wordsOnMonthDay.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeMonthDaySearchButton.style.display = "block";
  monthDaySearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderMonthDaySearchWords();
}

function renderMonthDaySearchWords() {
  if (
    !currentMonthDaySearchSummary ||
    currentMonthDaySearchWords.length === 0
  ) {
    return;
  }

  // Clear previous results but keep structure
  monthDaySearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "month-day-search-summary";
  summaryDiv.innerHTML = `
    <strong>${currentMonthDaySearchSummary.monthName} ${currentMonthDaySearchSummary.dayNumber}:</strong> ${currentMonthDaySearchSummary.totalWords} total words | 
    ${currentMonthDaySearchSummary.playedWords} played | 
    Average Score: ${currentMonthDaySearchSummary.averageScore}
  `;
  monthDaySearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentMonthDaySearchWords];

  // Sort based on current mode
  if (monthDaySearchSortMode === "alphabetical") {
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  } else {
    // Sort by date (newest first) - default
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "month-day-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const date = new Date(entry.gameDate);
    const year = date.getFullYear();
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${year}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    monthDaySearchResults.appendChild(wordButton);
  });
}

function showWordDetailsFromSearch(entry) {
  // Get additional date information
  const date = new Date(entry.gameDate);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  wordDetailsContent.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Word:</span>
      <span class="detail-value">${entry.word}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Complete Date:</span>
      <span class="detail-value">${entry.gameDate} (${dayOfWeek})</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Month/Day:</span>
      <span class="detail-value">${monthName} ${dayNumber}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Year:</span>
      <span class="detail-value">${year}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Word Number:</span>
      <span class="detail-value">#${entry.wordNumber}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Score:</span>
      <span class="detail-value">${
        entry.myScore === 0 ? "Not Played" : entry.myScore
      }</span>
    </div>
  `;

  wordDetailsContainer.style.display = "block";
  currentlyShownWordNumber = entry.wordNumber;
}
// Clear functions for search sections
function clearDaySearch() {
  dayOfWeekDropdown.value = "";
  daySearchResults.innerHTML = "";
  closeDaySearchButton.style.display = "none";
  daySearchSortButton.style.display = "none";
  daySearchSortMode = "date";
  currentDaySearchWords = [];
  currentDaySearchSummary = null;
  daySearchSortButton.textContent = "Sort Alphabetically";
}

function clearMonthSearch() {
  monthSearchMonthDropdown.value = "";
  monthSearchYearDropdown.value = "";
  monthSearchResults.innerHTML = "";
  closeMonthSearchButton.style.display = "none";
  monthSearchSortButton.style.display = "none";
  monthSearchSortMode = "date";
  currentMonthSearchWords = [];
  currentMonthSearchSummary = null;
  monthSearchSortButton.textContent = "Sort Alphabetically";
}

function clearDayNumberSearch() {
  dayNumberDropdown.value = "";
  dayNumberSearchResults.innerHTML = "";
  closeDayNumberSearchButton.style.display = "none";
  dayNumberSearchSortButton.style.display = "none";
  dayNumberSearchSortMode = "date";
  currentDayNumberSearchWords = [];
  currentDayNumberSearchSummary = null;
  dayNumberSearchSortButton.textContent = "Sort Alphabetically";
}

function clearMonthDaySearch() {
  monthDropdown.value = "";
  monthDayDropdown.innerHTML = '<option value="">Select Day</option>';
  monthDaySearchResults.innerHTML = "";
  closeMonthDaySearchButton.style.display = "none";
  monthDaySearchSortButton.style.display = "none";
  monthDaySearchSortMode = "date";
  currentMonthDaySearchWords = [];
  currentMonthDaySearchSummary = null;
  monthDaySearchSortButton.textContent = "Sort Alphabetically";
}

// Letter Search Functionality
function populateLetterDropdowns() {
  // Populate single letter dropdown
  singleLetterDropdown.innerHTML = '<option value="">Select Letter</option>';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    singleLetterDropdown.appendChild(option);
  }

  // Populate range start and end dropdowns
  letterRangeStart.innerHTML = '<option value="">Start Letter</option>';
  letterRangeEnd.innerHTML = '<option value="">End Letter</option>';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);

    const startOption = document.createElement("option");
    startOption.value = letter;
    startOption.textContent = letter;
    letterRangeStart.appendChild(startOption);

    const endOption = document.createElement("option");
    endOption.value = letter;
    endOption.textContent = letter;
    letterRangeEnd.appendChild(endOption);
  }
}

// Toggle between single letter and range mode
letterSearchMode.addEventListener("change", (event) => {
  const mode = event.target.value;
  if (mode === "single") {
    singleLetterDropdown.style.display = "block";
    letterRangeControls.style.display = "none";
    letterRangeStart.value = "";
    letterRangeEnd.value = "";
  } else {
    singleLetterDropdown.style.display = "none";
    letterRangeControls.style.display = "flex";
    singleLetterDropdown.value = "";
  }
  letterSearchResults.innerHTML = "";
  closeLetterSearchButton.style.display = "none";
});

// Single letter search
singleLetterDropdown.addEventListener("change", (event) => {
  const selectedLetter = event.target.value;
  if (!selectedLetter) {
    letterSearchResults.innerHTML = "";
    closeLetterSearchButton.style.display = "none";
    return;
  }
  searchWordsByLetter(selectedLetter);
});

// Letter range search
letterRangeStart.addEventListener("change", () => {
  if (letterRangeStart.value && letterRangeEnd.value) {
    searchWordsByLetterRange(letterRangeStart.value, letterRangeEnd.value);
  }
});

letterRangeEnd.addEventListener("change", () => {
  if (letterRangeStart.value && letterRangeEnd.value) {
    searchWordsByLetterRange(letterRangeStart.value, letterRangeEnd.value);
  }
});

function searchWordsByLetter(letter) {
  // Filter words that start with the selected letter
  const wordsWithLetter = wordleWords.filter((entry) => {
    return entry.word.toUpperCase().startsWith(letter);
  });

  // Store filtered words for sorting
  currentLetterSearchWords = [...wordsWithLetter];

  // Reset to alphabetical sort mode for new searches (default for letter search)
  letterSearchSortMode = "alphabetical";

  // Clear previous results
  letterSearchResults.innerHTML = "";

  if (wordsWithLetter.length === 0) {
    letterSearchResults.innerHTML = `<div class="letter-search-summary">No words found starting with "${letter}"</div>`;
    closeLetterSearchButton.style.display = "block";
    letterSearchSortButton.style.display = "none";
    currentLetterSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsWithLetter.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary
  currentLetterSearchSummary = {
    searchType: "letter",
    searchValue: letter,
    totalWords: wordsWithLetter.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeLetterSearchButton.style.display = "block";
  letterSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderLetterSearchWords();
}

function searchWordsByLetterRange(startLetter, endLetter) {
  // Convert letters to character codes
  const startCode = startLetter.charCodeAt(0);
  const endCode = endLetter.charCodeAt(0);

  // Ensure start is before end
  const actualStart = Math.min(startCode, endCode);
  const actualEnd = Math.max(startCode, endCode);

  // Filter words that start with letters in the range
  const wordsInRange = wordleWords.filter((entry) => {
    const firstLetter = entry.word.toUpperCase().charCodeAt(0);
    return firstLetter >= actualStart && firstLetter <= actualEnd;
  });

  // Store filtered words for sorting
  currentLetterSearchWords = [...wordsInRange];

  // Reset to alphabetical sort mode for new searches (default for letter search)
  letterSearchSortMode = "alphabetical";

  // Clear previous results
  letterSearchResults.innerHTML = "";

  if (wordsInRange.length === 0) {
    letterSearchResults.innerHTML = `<div class="letter-search-summary">No words found in range "${startLetter}-${endLetter}"</div>`;
    closeLetterSearchButton.style.display = "block";
    letterSearchSortButton.style.display = "none";
    currentLetterSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsInRange.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary
  currentLetterSearchSummary = {
    searchType: "range",
    searchValue: `${startLetter}-${endLetter}`,
    totalWords: wordsInRange.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeLetterSearchButton.style.display = "block";
  letterSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderLetterSearchWords();
}

function renderLetterSearchWords() {
  if (!currentLetterSearchSummary || currentLetterSearchWords.length === 0) {
    return;
  }

  // Clear previous results but keep structure
  letterSearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "letter-search-summary";
  if (currentLetterSearchSummary.searchType === "letter") {
    summaryDiv.innerHTML = `
      <strong>Letter "${currentLetterSearchSummary.searchValue}":</strong> ${currentLetterSearchSummary.totalWords} total words | 
      ${currentLetterSearchSummary.playedWords} played | 
      Average Score: ${currentLetterSearchSummary.averageScore}
    `;
  } else {
    summaryDiv.innerHTML = `
      <strong>Range "${currentLetterSearchSummary.searchValue}":</strong> ${currentLetterSearchSummary.totalWords} total words | 
      ${currentLetterSearchSummary.playedWords} played | 
      Average Score: ${currentLetterSearchSummary.averageScore}
    `;
  }
  letterSearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentLetterSearchWords];

  // Sort based on current mode
  if (letterSearchSortMode === "date") {
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  } else {
    // Sort alphabetically by word - default
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "letter-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    letterSearchResults.appendChild(wordButton);
  });
}

function clearLetterSearch() {
  letterSearchMode.value = "single";
  singleLetterDropdown.value = "";
  letterRangeStart.value = "";
  letterRangeEnd.value = "";
  singleLetterDropdown.style.display = "block";
  letterRangeControls.style.display = "none";
  letterSearchResults.innerHTML = "";
  closeLetterSearchButton.style.display = "none";
  letterSearchSortButton.style.display = "none";
  letterSearchSortMode = "alphabetical";
  currentLetterSearchWords = [];
  currentLetterSearchSummary = null;
  letterSearchSortButton.textContent = "Sort by Date";
}

// Contain Letter(s) Search Functionality
function populateContainLetterDropdown() {
  containLetterDropdown.innerHTML = '<option value="">Select Letter</option>';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    containLetterDropdown.appendChild(option);
  }
}

containLetterDropdown.addEventListener("change", () => {
  if (containLetterDropdown.value && containOccurrencesDropdown.value) {
    searchWordsByContainLetters(
      containLetterDropdown.value,
      parseInt(containOccurrencesDropdown.value),
    );
  } else {
    containLetterSearchResults.innerHTML = "";
    closeContainLetterSearchButton.style.display = "none";
  }
});

containOccurrencesDropdown.addEventListener("change", () => {
  if (containLetterDropdown.value && containOccurrencesDropdown.value) {
    searchWordsByContainLetters(
      containLetterDropdown.value,
      parseInt(containOccurrencesDropdown.value),
    );
  } else {
    containLetterSearchResults.innerHTML = "";
    closeContainLetterSearchButton.style.display = "none";
  }
});

function searchWordsByContainLetters(letter, exactOccurrences) {
  // Filter words that contain the specified letter exactly exactOccurrences times
  const wordsContainingLetters = wordleWords.filter((entry) => {
    const wordUpper = entry.word.toUpperCase();
    const occurrences = (wordUpper.match(new RegExp(letter, "g")) || []).length;
    return occurrences === exactOccurrences;
  });

  // Store filtered words for sorting
  currentContainLetterSearchWords = [...wordsContainingLetters];

  // Reset to alphabetical sort mode for new searches (default for contain letter search)
  containLetterSearchSortMode = "alphabetical";

  // Clear previous results
  containLetterSearchResults.innerHTML = "";

  if (wordsContainingLetters.length === 0) {
    containLetterSearchResults.innerHTML = `<div class="contain-letter-search-summary">No words found containing "${letter}" exactly ${exactOccurrences} time${
      exactOccurrences !== 1 ? "s" : ""
    }</div>`;
    closeContainLetterSearchButton.style.display = "block";
    containLetterSearchSortButton.style.display = "none";
    currentContainLetterSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = wordsContainingLetters.filter(
    (entry) => entry.myScore > 0,
  );
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary
  currentContainLetterSearchSummary = {
    letter: letter,
    exactOccurrences: exactOccurrences,
    totalWords: wordsContainingLetters.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closeContainLetterSearchButton.style.display = "block";
  containLetterSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderContainLetterSearchWords();
}

function renderContainLetterSearchWords() {
  if (
    !currentContainLetterSearchSummary ||
    currentContainLetterSearchWords.length === 0
  ) {
    return;
  }

  // Clear previous results but keep structure
  containLetterSearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "contain-letter-search-summary";
  summaryDiv.innerHTML = `
    <strong>Contains "${currentContainLetterSearchSummary.letter}" exactly ${
      currentContainLetterSearchSummary.exactOccurrences
    } time${
      currentContainLetterSearchSummary.exactOccurrences !== 1 ? "s" : ""
    }:</strong> ${currentContainLetterSearchSummary.totalWords} total words | 
    ${currentContainLetterSearchSummary.playedWords} played | 
    Average Score: ${currentContainLetterSearchSummary.averageScore}
  `;
  containLetterSearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentContainLetterSearchWords];

  // Sort based on current mode
  if (containLetterSearchSortMode === "date") {
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  } else {
    // Sort alphabetically by word - default
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "contain-letter-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    containLetterSearchResults.appendChild(wordButton);
  });
}

function clearContainLetterSearch() {
  containLetterDropdown.value = "";
  containOccurrencesDropdown.value = "";
  containLetterSearchResults.innerHTML = "";
  closeContainLetterSearchButton.style.display = "none";
  containLetterSearchSortButton.style.display = "none";
  containLetterSearchSortMode = "alphabetical";
  currentContainLetterSearchWords = [];
  currentContainLetterSearchSummary = null;
  containLetterSearchSortButton.textContent = "Sort by Date";
}

// Daily Words Search Functionality
function populateDailyWordsDropdowns() {
  // Populate single letter dropdown
  dailyWordsSingleLetterDropdown.innerHTML =
    '<option value="">Select Letter</option>';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    dailyWordsSingleLetterDropdown.appendChild(option);
  }

  // Populate range start and end dropdowns
  dailyWordsRangeStart.innerHTML = '<option value="">Start Letter</option>';
  dailyWordsRangeEnd.innerHTML = '<option value="">End Letter</option>';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);

    const startOption = document.createElement("option");
    startOption.value = letter;
    startOption.textContent = letter;
    dailyWordsRangeStart.appendChild(startOption);

    const endOption = document.createElement("option");
    endOption.value = letter;
    endOption.textContent = letter;
    dailyWordsRangeEnd.appendChild(endOption);
  }
}

// Toggle between single letter and range mode for daily words
dailyWordsSearchMode.addEventListener("change", (event) => {
  const mode = event.target.value;
  if (mode === "single") {
    dailyWordsSingleLetterDropdown.style.display = "block";
    dailyWordsRangeControls.style.display = "none";
    dailyWordsContainsControls.style.display = "none";
    dailyWordsRangeStart.value = "";
    dailyWordsRangeEnd.value = "";
    dailyWordsContainsInput.value = "";
  } else if (mode === "range") {
    dailyWordsSingleLetterDropdown.style.display = "none";
    dailyWordsRangeControls.style.display = "flex";
    dailyWordsContainsControls.style.display = "none";
    dailyWordsSingleLetterDropdown.value = "";
    dailyWordsContainsInput.value = "";
  } else if (mode === "contains") {
    dailyWordsSingleLetterDropdown.style.display = "none";
    dailyWordsRangeControls.style.display = "none";
    dailyWordsContainsControls.style.display = "block";
    dailyWordsSingleLetterDropdown.value = "";
    dailyWordsRangeStart.value = "";
    dailyWordsRangeEnd.value = "";
  }
  dailyWordsSearchResults.innerHTML = "";
  closeDailyWordsSearchButton.style.display = "none";
});

// Single letter search for daily words
dailyWordsSingleLetterDropdown.addEventListener("change", (event) => {
  const selectedLetter = event.target.value;
  if (!selectedLetter) {
    dailyWordsSearchResults.innerHTML = "";
    closeDailyWordsSearchButton.style.display = "none";
    return;
  }
  searchDailyWordsByLetter(selectedLetter);
});

// Letter range search for daily words
dailyWordsRangeStart.addEventListener("change", () => {
  if (dailyWordsRangeStart.value && dailyWordsRangeEnd.value) {
    searchDailyWordsByRange(
      dailyWordsRangeStart.value,
      dailyWordsRangeEnd.value,
    );
  }
});

dailyWordsRangeEnd.addEventListener("change", () => {
  if (dailyWordsRangeStart.value && dailyWordsRangeEnd.value) {
    searchDailyWordsByRange(
      dailyWordsRangeStart.value,
      dailyWordsRangeEnd.value,
    );
  }
});

// Contains letters search for daily words
dailyWordsContainsInput.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toUpperCase();
  if (!inputValue) {
    dailyWordsSearchResults.innerHTML = "";
    closeDailyWordsSearchButton.style.display = "none";
    return;
  }
  searchDailyWordsByContains(inputValue);
});

// Wordle highlight toggle is always visible (both Regular and Massive support it)
function updateDailyWordsWordleToggleVisibility() {
  dailyWordsWordleToggleContainer.style.display = "block";
}

// Update search when list type changes
dailyWordsListType.addEventListener("change", () => {
  updateDailyWordsWordleToggleVisibility();
  // Re-run current search if there is one
  if (
    dailyWordsSearchMode.value === "single" &&
    dailyWordsSingleLetterDropdown.value
  ) {
    searchDailyWordsByLetter(dailyWordsSingleLetterDropdown.value);
  } else if (
    dailyWordsSearchMode.value === "range" &&
    dailyWordsRangeStart.value &&
    dailyWordsRangeEnd.value
  ) {
    searchDailyWordsByRange(
      dailyWordsRangeStart.value,
      dailyWordsRangeEnd.value,
    );
  } else if (
    dailyWordsSearchMode.value === "contains" &&
    dailyWordsContainsInput.value.trim()
  ) {
    searchDailyWordsByContains(
      dailyWordsContainsInput.value.trim().toUpperCase(),
    );
  }
});

// Re-run search when wordle highlight toggle changes
dailyWordsWordleHighlightToggle.addEventListener("change", () => {
  if (
    dailyWordsSearchMode.value === "single" &&
    dailyWordsSingleLetterDropdown.value
  ) {
    searchDailyWordsByLetter(dailyWordsSingleLetterDropdown.value);
  } else if (
    dailyWordsSearchMode.value === "range" &&
    dailyWordsRangeStart.value &&
    dailyWordsRangeEnd.value
  ) {
    searchDailyWordsByRange(
      dailyWordsRangeStart.value,
      dailyWordsRangeEnd.value,
    );
  } else if (
    dailyWordsSearchMode.value === "contains" &&
    dailyWordsContainsInput.value.trim()
  ) {
    searchDailyWordsByContains(
      dailyWordsContainsInput.value.trim().toUpperCase(),
    );
  }
});

function getDailyWordsListAndName() {
  const listType = dailyWordsListType.value;
  return {
    wordList: listType === "small" ? combinedWords : fixedWordsLarge,
    listName: listType === "small" ? "Regular List" : "Massive List",
  };
}

function isWordUpperCaseList(listType) {
  return listType === "small" || listType === "large";
}

function renderDailyWordButton(word, listType, listName) {
  const wordUpper = isWordUpperCaseList(listType) ? word : word.toUpperCase();
  const displayWord = isWordUpperCaseList(listType) ? word : word;
  const playedDetailsList = wordlePlayedDetailsByWord.get(wordUpper) || [];
  const hasPlayedDetails = playedDetailsList.length > 0;
  const highlightPlayed =
    dailyWordsWordleHighlightToggle && dailyWordsWordleHighlightToggle.checked;

  const wordButton = document.createElement("button");
  wordButton.className = "daily-words-button";
  if (hasPlayedDetails) wordButton.classList.add("has-played-details");
  if (hasPlayedDetails && highlightPlayed)
    wordButton.classList.add("has-played-details-highlight");

  const scrabblePoints = calculateScrabblePoints(displayWord);
  let scrabbleDisplayVisible = false;
  let detailsDisplayVisible = false;

  const formatDetailsHtml = () => {
    return playedDetailsList
      .map((entry) => {
        const scrabble = calculateScrabblePoints(entry.word);
        return `<div class="word-date-line">Word #${entry.wordNumber} | Date: ${entry.gameDate} | Score: ${entry.myScore} | Scrabble: ${scrabble}</div>`;
      })
      .join("");
  };

  const updateButtonContent = () => {
    if (detailsDisplayVisible && hasPlayedDetails) {
      wordButton.innerHTML = `
        <div class="word-text">${displayWord}</div>
        <div class="word-date word-date-multi">${formatDetailsHtml()}</div>
      `;
    } else if (scrabbleDisplayVisible) {
      wordButton.innerHTML = `
        <div class="word-text">${displayWord}</div>
        <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
      `;
    } else {
      wordButton.innerHTML = `
        <div class="word-text">${displayWord}</div>
      `;
    }
  };

  updateButtonContent();

  wordButton.addEventListener("click", () => {
    if (hasPlayedDetails) {
      detailsDisplayVisible = !detailsDisplayVisible;
      if (detailsDisplayVisible) scrabbleDisplayVisible = false;
    } else {
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
    }
    updateButtonContent();
  });

  return wordButton;
}

function searchDailyWordsByLetter(letter) {
  const { wordList, listName } = getDailyWordsListAndName();
  const listType = dailyWordsListType.value;

  // Filter words that start with the selected letter
  const wordsWithLetter = wordList.filter((word) => {
    const w = isWordUpperCaseList(listType) ? word : word.toUpperCase();
    return w.startsWith(letter);
  });

  // Clear previous results
  dailyWordsSearchResults.innerHTML = "";

  if (wordsWithLetter.length === 0) {
    dailyWordsSearchResults.innerHTML = `<div class="daily-words-search-summary">No words found starting with "${letter}" in ${listName}</div>`;
    closeDailyWordsSearchButton.style.display = "block";
    return;
  }

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "daily-words-search-summary";
  summaryDiv.innerHTML = `
    <strong>${listName} - Letter "${letter}":</strong> ${wordsWithLetter.length} words
  `;
  dailyWordsSearchResults.appendChild(summaryDiv);

  // Show close button
  closeDailyWordsSearchButton.style.display = "block";
  updateDailyWordsWordleToggleVisibility();

  // Sort words alphabetically
  wordsWithLetter.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  wordsWithLetter.forEach((word) => {
    dailyWordsSearchResults.appendChild(
      renderDailyWordButton(word, listType, listName),
    );
  });
}

function searchDailyWordsByRange(startLetter, endLetter) {
  const { wordList, listName } = getDailyWordsListAndName();
  const listType = dailyWordsListType.value;

  // Convert letters to character codes
  const startCode = startLetter.charCodeAt(0);
  const endCode = endLetter.charCodeAt(0);

  // Ensure start is before end
  const actualStart = Math.min(startCode, endCode);
  const actualEnd = Math.max(startCode, endCode);

  // Filter words that start with letters in the range
  const wordsInRange = wordList.filter((word) => {
    const firstLetter = (
      isWordUpperCaseList(listType) ? word : word.toUpperCase()
    ).charCodeAt(0);
    return firstLetter >= actualStart && firstLetter <= actualEnd;
  });

  // Clear previous results
  dailyWordsSearchResults.innerHTML = "";

  if (wordsInRange.length === 0) {
    dailyWordsSearchResults.innerHTML = `<div class="daily-words-search-summary">No words found in range "${startLetter}-${endLetter}" in ${listName}</div>`;
    closeDailyWordsSearchButton.style.display = "block";
    return;
  }

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "daily-words-search-summary";
  summaryDiv.innerHTML = `
    <strong>${listName} - Range "${startLetter}-${endLetter}":</strong> ${wordsInRange.length} words
  `;
  dailyWordsSearchResults.appendChild(summaryDiv);

  // Show close button
  closeDailyWordsSearchButton.style.display = "block";
  updateDailyWordsWordleToggleVisibility();

  // Sort words alphabetically
  wordsInRange.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  wordsInRange.forEach((word) => {
    dailyWordsSearchResults.appendChild(
      renderDailyWordButton(word, listType, listName),
    );
  });
}

function searchDailyWordsByContains(inputLetters) {
  const { wordList, listName } = getDailyWordsListAndName();
  const listType = dailyWordsListType.value;

  // Parse input: remove spaces and non-letter characters, convert to uppercase
  const cleanedInput = inputLetters.replace(/[^A-Z]/g, "");

  if (cleanedInput.length === 0) {
    dailyWordsSearchResults.innerHTML = "";
    closeDailyWordsSearchButton.style.display = "none";
    return;
  }

  // Count occurrences of each letter in the input
  const requiredLetterCounts = {};
  for (const letter of cleanedInput) {
    requiredLetterCounts[letter] = (requiredLetterCounts[letter] || 0) + 1;
  }

  // Filter words that contain at least the required count of each letter
  const matchingWords = wordList.filter((word) => {
    const wordUpper = isWordUpperCaseList(listType) ? word : word.toUpperCase();
    // Count occurrences of each letter in the word
    const wordLetterCounts = {};
    for (const letter of wordUpper) {
      wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
    }

    // Check if word contains at least the required count of each letter
    for (const [letter, requiredCount] of Object.entries(
      requiredLetterCounts,
    )) {
      const wordCount = wordLetterCounts[letter] || 0;
      if (wordCount < requiredCount) {
        return false;
      }
    }
    return true;
  });

  // Clear previous results
  dailyWordsSearchResults.innerHTML = "";

  if (matchingWords.length === 0) {
    dailyWordsSearchResults.innerHTML = `<div class="daily-words-search-summary">No words found containing "${inputLetters}" in ${listName}</div>`;
    closeDailyWordsSearchButton.style.display = "block";
    return;
  }

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "daily-words-search-summary";
  summaryDiv.innerHTML = `
    <strong>${listName} - Contains "${inputLetters}":</strong> ${matchingWords.length} words
  `;
  dailyWordsSearchResults.appendChild(summaryDiv);

  // Show close button
  closeDailyWordsSearchButton.style.display = "block";
  updateDailyWordsWordleToggleVisibility();

  // Sort words alphabetically
  matchingWords.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  matchingWords.forEach((word) => {
    dailyWordsSearchResults.appendChild(
      renderDailyWordButton(word, listType, listName),
    );
  });
}

function clearDailyWordsSearch() {
  dailyWordsListType.value = "small";
  dailyWordsSearchMode.value = "single";
  dailyWordsSingleLetterDropdown.value = "";
  dailyWordsRangeStart.value = "";
  dailyWordsRangeEnd.value = "";
  dailyWordsContainsInput.value = "";
  dailyWordsSingleLetterDropdown.style.display = "block";
  dailyWordsRangeControls.style.display = "none";
  dailyWordsContainsControls.style.display = "none";
  dailyWordsSearchResults.innerHTML = "";
  closeDailyWordsSearchButton.style.display = "none";
  updateDailyWordsWordleToggleVisibility();
  if (dailyWordsWordleHighlightToggle)
    dailyWordsWordleHighlightToggle.checked = false;
}

// Position Pattern Search Functionality
positionPatternInput.addEventListener("input", (event) => {
  let pattern = event.target.value.toUpperCase();

  // Allow spaces, letters, and underscores only
  pattern = pattern.replace(/[^A-Z_\s]/g, "");

  // Limit to 9 characters (for pattern like "A _ _ A _")
  if (pattern.length > 9) {
    pattern = pattern.slice(0, 9);
  }

  // Update the input field to reflect the cleaned pattern
  if (event.target.value.toUpperCase() !== pattern) {
    event.target.value = pattern;
  }

  if (!pattern || pattern.trim().length === 0) {
    positionSearchResults.innerHTML = "";
    closePositionSearchButton.style.display = "none";
    positionSearchSortButton.style.display = "none";
    currentPositionSearchWords = [];
    currentPositionSearchSummary = null;
    return;
  }

  searchWordsByPositionPattern(pattern);
});

// Position search sort button event listener
positionSearchSortButton.addEventListener("click", () => {
  // Toggle between alphabetical and date sort
  if (positionSearchSortMode === "alphabetical") {
    positionSearchSortMode = "date";
    positionSearchSortButton.textContent = "Sort Alphabetically";
  } else {
    positionSearchSortMode = "alphabetical";
    positionSearchSortButton.textContent = "Sort by Date";
  }
  // Re-render words with new sort mode
  renderPositionSearchWords();
});

closePositionSearchButton.addEventListener("click", () => {
  clearPositionSearch();
});

function searchWordsByPositionPattern(pattern) {
  // Normalize pattern: convert to uppercase, replace spaces with underscores, keep only letters and underscores
  const normalizedPattern = pattern
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z_]/g, "")
    .slice(0, 5);

  // Pad pattern to 5 characters with underscores if needed
  const paddedPattern = normalizedPattern.padEnd(5, "_");

  if (!paddedPattern || paddedPattern === "_____") {
    positionSearchResults.innerHTML = "";
    closePositionSearchButton.style.display = "none";
    positionSearchSortButton.style.display = "none";
    currentPositionSearchWords = [];
    currentPositionSearchSummary = null;
    return;
  }

  // Filter words that match the pattern
  // Each position can be a letter or underscore (wildcard)
  const matchingWords = wordleWords.filter((entry) => {
    const word = entry.word.toUpperCase();

    // Word must be exactly 5 letters
    if (word.length !== 5) return false;

    // Check each position
    for (let i = 0; i < 5; i++) {
      const patternChar = paddedPattern[i];

      // If pattern position is not underscore and doesn't match word position, skip
      if (patternChar !== "_" && patternChar !== word[i]) {
        return false;
      }
    }

    return true;
  });

  // Store filtered words for sorting
  currentPositionSearchWords = [...matchingWords];

  // Reset to alphabetical sort mode for new searches
  positionSearchSortMode = "alphabetical";

  // Clear previous results
  positionSearchResults.innerHTML = "";

  if (matchingWords.length === 0) {
    const displayPattern = paddedPattern
      .split("")
      .map((c) => (c === "_" ? "_" : c))
      .join(" ");
    positionSearchResults.innerHTML = `<div class="position-search-summary">No words found matching pattern "${displayPattern}"</div>`;
    closePositionSearchButton.style.display = "block";
    positionSearchSortButton.style.display = "none";
    currentPositionSearchSummary = null;
    return;
  }

  // Calculate statistics
  const playedWords = matchingWords.filter((entry) => entry.myScore > 0);
  const averageScore =
    playedWords.length > 0
      ? (
          playedWords.reduce((sum, entry) => sum + entry.myScore, 0) /
          playedWords.length
        ).toFixed(2)
      : "N/A";

  // Store summary - display pattern with spaces between characters
  const displayPattern = paddedPattern.split("").join(" ");
  currentPositionSearchSummary = {
    pattern: displayPattern,
    totalWords: matchingWords.length,
    playedWords: playedWords.length,
    averageScore: averageScore,
  };

  // Show close button and sort button
  closePositionSearchButton.style.display = "block";
  positionSearchSortButton.style.display = "block";

  // Render words based on current sort mode
  renderPositionSearchWords();
}

function renderPositionSearchWords() {
  if (
    !currentPositionSearchSummary ||
    currentPositionSearchWords.length === 0
  ) {
    return;
  }

  // Clear previous results but keep structure
  positionSearchResults.innerHTML = "";

  // Re-add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "position-search-summary";
  summaryDiv.innerHTML = `
    <strong>Pattern "${currentPositionSearchSummary.pattern}":</strong> ${currentPositionSearchSummary.totalWords} total words | 
    ${currentPositionSearchSummary.playedWords} played | 
    Average Score: ${currentPositionSearchSummary.averageScore}
  `;
  positionSearchResults.appendChild(summaryDiv);

  // Create a copy for sorting
  const sortedWords = [...currentPositionSearchWords];

  // Sort based on current mode
  if (positionSearchSortMode === "date") {
    sortedWords.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
  } else {
    // Sort alphabetically by word - default
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  }

  // Create word buttons
  sortedWords.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "position-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const scrabblePoints = calculateScrabblePoints(entry.word);
    const averageScore = calculateAverageScoreUpToWord(entry);
    const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
    const firstLetter = entry.word.toUpperCase().charAt(0);
    let displayState = 0; // 0: normal, 1: scrabble+average, 2: details shown

    const updateButtonContent = () => {
      if (displayState === 1) {
        // Scrabble + Average Score view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
          <div class="word-date">Your average score upon the completion of this word: ${averageScore}</div>
          <div class="word-date">Days Since The Last ${firstLetter}: ${
            daysSinceLast.days
          }${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}</div>
        `;
      } else {
        // Normal view
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Word#: ${entry.wordNumber}</div>
          <div class="word-date">${entry.gameDate}</div>
          <div class="word-date">${scoreText}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      // Check if details are currently shown for this entry
      const detailsShown =
        wordDetailsContainer.style.display === "block" &&
        currentlyShownWordNumber === entry.wordNumber;

      if (displayState === 0) {
        // First click: Show scrabble + average
        displayState = 1;
        updateButtonContent();
        hideWordDetails(); // Hide details if shown
      } else if (displayState === 1) {
        // Second click: Show word details
        displayState = 2;
        showWordDetailsFromSearch(entry);
      } else if (displayState === 2 || detailsShown) {
        // Return to normal immediately if details are shown
        displayState = 0;
        updateButtonContent();
        hideWordDetails();
      }
    });

    positionSearchResults.appendChild(wordButton);
  });
}

function clearPositionSearch() {
  positionPatternInput.value = "";
  positionSearchResults.innerHTML = "";
  closePositionSearchButton.style.display = "none";
  positionSearchSortButton.style.display = "none";
  positionSearchSortMode = "alphabetical";
  currentPositionSearchWords = [];
  currentPositionSearchSummary = null;
  positionSearchSortButton.textContent = "Sort by Date";
}

// Repeating Words Section
const repeatingWordsContainer = document.getElementById(
  "repeatingWordsContainer",
);
const repeatingWordsToggle = document.getElementById("repeatingWordsToggle");
const repeatingWordsContent = document.getElementById("repeatingWordsContent");
const repeatingWordsList = document.getElementById("repeatingWordsList");

// Function to find all repeating words
function findRepeatingWords() {
  const wordCounts = {};
  const wordOccurrences = {};

  // Count occurrences of each word
  wordleWords.forEach((entry) => {
    const word = entry.word.toUpperCase();
    if (!wordCounts[word]) {
      wordCounts[word] = 0;
      wordOccurrences[word] = [];
    }
    wordCounts[word]++;
    wordOccurrences[word].push(entry);
  });

  // Filter to only words that appear more than once
  const repeatingWords = Object.keys(wordCounts).filter(
    (word) => wordCounts[word] > 1,
  );

  // Sort alphabetically
  repeatingWords.sort();

  return repeatingWords.map((word) => ({
    word: word,
    occurrences: wordOccurrences[word],
    count: wordCounts[word],
  }));
}

// Function to render repeating words
function renderRepeatingWords() {
  const repeatingWords = findRepeatingWords();
  repeatingWordsList.innerHTML = "";

  if (repeatingWords.length === 0) {
    repeatingWordsList.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: rgba(200, 200, 200, 0.9); padding: 20px;">
        No repeating words found.
      </div>
    `;
    return;
  }

  repeatingWords.forEach((wordData) => {
    const wordButton = document.createElement("button");
    wordButton.className = "repeating-word-button";
    wordButton.innerHTML = `
      <div class="word-text">${wordData.word}</div>
      <div class="word-date">Appears ${wordData.count} times</div>
    `;

    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "repeating-word-tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);

    // Build tooltip content (sorted by date, most recent first)
    const sortedOccurrences = [...wordData.occurrences].sort((a, b) => {
      return new Date(b.gameDate) - new Date(a.gameDate);
    });
    const tooltipContent = sortedOccurrences
      .map((entry) => {
        const scoreText =
          entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
        return `
          <div class="repeating-word-occasion">
            <strong>${entry.word}</strong><br>
            Date: ${entry.gameDate}<br>
            Word#: ${entry.wordNumber}<br>
            ${scoreText}
          </div>
        `;
      })
      .join("");

    // Hover functionality
    wordButton.addEventListener("mouseenter", (e) => {
      tooltip.innerHTML = tooltipContent;
      tooltip.style.display = "block";
      updateTooltipPosition(e, tooltip);
    });

    wordButton.addEventListener("mousemove", (e) => {
      updateTooltipPosition(e, tooltip);
    });

    wordButton.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    // Click functionality - show secondary details for the most recent occurrence
    wordButton.addEventListener("click", () => {
      tooltip.style.display = "none"; // Hide tooltip when clicking
      const mostRecentOccurrence = sortedOccurrences[0];
      showRepeatingWordDetails(mostRecentOccurrence, wordData);
    });

    repeatingWordsList.appendChild(wordButton);
  });
}

// Function to update tooltip position
function updateTooltipPosition(event, tooltip) {
  // Force a reflow to get accurate dimensions
  tooltip.style.visibility = "hidden";
  tooltip.style.display = "block";

  const rect = event.target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  let y = rect.top - tooltipRect.height - 10;

  // Adjust if tooltip goes off top of screen
  if (y < 10) {
    y = rect.bottom + 10;
  }

  // Adjust horizontal position if tooltip goes off screen
  let leftPos = x;
  const tooltipLeft = x - tooltipRect.width / 2;
  const tooltipRight = x + tooltipRect.width / 2;

  if (tooltipLeft < 10) {
    leftPos = 10 + tooltipRect.width / 2;
  } else if (tooltipRight > window.innerWidth - 10) {
    leftPos = window.innerWidth - 10 - tooltipRect.width / 2;
  }

  tooltip.style.left = `${leftPos}px`;
  tooltip.style.top = `${y}px`;
  tooltip.style.transform = "translateX(-50%)";
  tooltip.style.visibility = "visible";
}

// Function to show secondary details for a repeating word
function showRepeatingWordDetails(entry, wordData) {
  const scrabblePoints = calculateScrabblePoints(entry.word);
  const averageScore = calculateAverageScoreUpToWord(entry);
  const daysSinceLast = calculateDaysSinceLastSameFirstLetter(entry);
  const firstLetter = entry.word.toUpperCase().charAt(0);

  wordDetailsContent.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Word:</span>
      <span class="detail-value">${entry.word}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Date:</span>
      <span class="detail-value">${entry.gameDate}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Word Number:</span>
      <span class="detail-value">#${entry.wordNumber}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Score:</span>
      <span class="detail-value">${
        entry.myScore === 0 ? "Not Played" : entry.myScore
      }</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Scrabble Value:</span>
      <span class="detail-value">${scrabblePoints}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Average Score Up To This Point:</span>
      <span class="detail-value">${averageScore}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Last Time Letter ${firstLetter} Was Used:</span>
      <span class="detail-value">${
        daysSinceLast.days === "N/A"
          ? "N/A"
          : `${daysSinceLast.days} days ago${daysSinceLast.word ? ` (${daysSinceLast.word})` : ""}`
      }</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Total Occurrences:</span>
      <span class="detail-value">${wordData.count}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">All Occurrences:</span>
      <span class="detail-value">
        ${[...wordData.occurrences]
          .sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate))
          .map(
            (occ) =>
              `${occ.word} - ${occ.gameDate} (Word#: ${occ.wordNumber}, Score: ${
                occ.myScore === 0 ? "Not Played" : occ.myScore
              })`,
          )
          .join("; ")}
      </span>
    </div>
  `;

  wordDetailsContainer.style.display = "block";
  currentlyShownWordNumber = entry.wordNumber;

  // Scroll to details container
  setTimeout(() => {
    wordDetailsContainer.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, 100);
}

// Toggle the Repeating Words section
repeatingWordsToggle.addEventListener("click", () => {
  const isVisible = repeatingWordsContent.style.display === "block";
  repeatingWordsContent.style.display = isVisible ? "none" : "block";

  // Render words if showing for the first time
  if (!isVisible && repeatingWordsList.innerHTML === "") {
    renderRepeatingWords();
  }
});
