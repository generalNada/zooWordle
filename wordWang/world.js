import {
  fixedWordsLarge,
  wordleWords,
  dailyWordsSmall,
  dailyWordsLarge,
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
  "scoreAverageFiltersContainer"
);
const scoreAverageFiltersToggle = document.getElementById(
  "scoreAverageFiltersToggle"
);
const scoreAverageFiltersContent = document.getElementById(
  "scoreAverageFiltersContent"
);
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
  "closeWordDetailsButton"
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
  "monthSearchMonthDropdown"
);
const monthSearchYearDropdown = document.getElementById(
  "monthSearchYearDropdown"
);
const monthSearchResults = document.getElementById("monthSearchResults");
const monthSearchSortButton = document.getElementById("monthSearchSortButton");

// Month search sort state
let monthSearchSortMode = "date"; // "date" or "alphabetical"
let currentMonthSearchWords = [];
let currentMonthSearchSummary = null;

// Day Number Search Elements
const dayNumberSearchContainer = document.getElementById(
  "dayNumberSearchContainer"
);
const dayNumberDropdown = document.getElementById("dayNumberDropdown");
const dayNumberSearchResults = document.getElementById(
  "dayNumberSearchResults"
);
const dayNumberSearchSortButton = document.getElementById(
  "dayNumberSearchSortButton"
);

// Day number search sort state
let dayNumberSearchSortMode = "date"; // "date" or "alphabetical"
let currentDayNumberSearchWords = [];
let currentDayNumberSearchSummary = null;

// Month/Day Search Elements
const monthDaySearchContainer = document.getElementById(
  "monthDaySearchContainer"
);
const monthDropdown = document.getElementById("monthDropdown");
const monthDayDropdown = document.getElementById("monthDayDropdown");
const monthDaySearchResults = document.getElementById("monthDaySearchResults");
const monthDaySearchSortButton = document.getElementById(
  "monthDaySearchSortButton"
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
  "letterSearchSortButton"
);

// Letter search sort state
let letterSearchSortMode = "alphabetical"; // "alphabetical" or "date"
let currentLetterSearchWords = [];
let currentLetterSearchSummary = null;

// Contain Letter(s) Search Elements
const containLetterSearchContainer = document.getElementById(
  "containLetterSearchContainer"
);
const containLetterDropdown = document.getElementById("containLetterDropdown");
const containOccurrencesDropdown = document.getElementById(
  "containOccurrencesDropdown"
);
const containLetterSearchResults = document.getElementById(
  "containLetterSearchResults"
);
const containLetterSearchSortButton = document.getElementById(
  "containLetterSearchSortButton"
);

// Contain letter search sort state
let containLetterSearchSortMode = "alphabetical"; // "alphabetical" or "date"
let currentContainLetterSearchWords = [];
let currentContainLetterSearchSummary = null;

// Daily Words Search Elements
const dailyWordsSearchContainer = document.getElementById(
  "dailyWordsSearchContainer"
);
const dailyWordsListType = document.getElementById("dailyWordsListType");
const dailyWordsSearchMode = document.getElementById("dailyWordsSearchMode");
const dailyWordsSingleLetterDropdown = document.getElementById(
  "dailyWordsSingleLetterDropdown"
);
const dailyWordsRangeControls = document.getElementById(
  "dailyWordsRangeControls"
);
const dailyWordsRangeStart = document.getElementById("dailyWordsRangeStart");
const dailyWordsRangeEnd = document.getElementById("dailyWordsRangeEnd");
const dailyWordsSearchResults = document.getElementById(
  "dailyWordsSearchResults"
);

// Close buttons for search sections
const closeDaySearchButton = document.getElementById("closeDaySearchButton");
const closeMonthSearchButton = document.getElementById(
  "closeMonthSearchButton"
);
const closeDayNumberSearchButton = document.getElementById(
  "closeDayNumberSearchButton"
);
const closeMonthDaySearchButton = document.getElementById(
  "closeMonthDaySearchButton"
);
const closeLetterSearchButton = document.getElementById(
  "closeLetterSearchButton"
);
const closeContainLetterSearchButton = document.getElementById(
  "closeContainLetterSearchButton"
);
const closeDailyWordsSearchButton = document.getElementById(
  "closeDailyWordsSearchButton"
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
  "containLetterSearchTitle"
);
const dailyWordsSearchTitle = document.getElementById("dailyWordsSearchTitle");

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

toggleButton.addEventListener("click", () => {
  const isVisible = scoreDropdown.style.display === "block";
  scoreDropdown.style.display = isVisible ? "none" : "block";
  scoreAverageFiltersContainer.style.display = isVisible ? "none" : "block";
  daySearchContainer.style.display = isVisible ? "none" : "block";
  monthSearchContainer.style.display = isVisible ? "none" : "block";
  dayNumberSearchContainer.style.display = isVisible ? "none" : "block";
  monthDaySearchContainer.style.display = isVisible ? "none" : "block";
  letterSearchContainer.style.display = isVisible ? "none" : "block";
  containLetterSearchContainer.style.display = isVisible ? "none" : "block";
  dailyWordsSearchContainer.style.display = isVisible ? "none" : "block";

  // If hiding the main section, also hide the score average filters
  if (isVisible) {
    scoreAverageFiltersContent.style.display = "none";
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
        0
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(5);
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
        0
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(5);
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
    (entry) => entry.myScore === currentSelectedScore
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
    (entry) => entry.myScore === currentSelectedScore
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
        0
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(5);
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
        0
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(5);
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
    0
  );
  const averageScore = (totalScore / gamesInMonth.length).toFixed(5);

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
        0
      );
      const averageScore = (totalScore / gamesInYear.length).toFixed(5);
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
  const averageScore = (totalScore / gamesInYear.length).toFixed(5);

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
        0
      );
      const averageScore = (totalScore / gamesInMonth.length).toFixed(5);
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
      parseInt(containOccurrencesDropdown.value)
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
      parseInt(containOccurrencesDropdown.value)
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
    (entry) => entry.myScore > 0
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
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${entry.word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
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
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
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
    dailyWordsRangeStart.value = "";
    dailyWordsRangeEnd.value = "";
  } else {
    dailyWordsSingleLetterDropdown.style.display = "none";
    dailyWordsRangeControls.style.display = "flex";
    dailyWordsSingleLetterDropdown.value = "";
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
      dailyWordsRangeEnd.value
    );
  }
});

dailyWordsRangeEnd.addEventListener("change", () => {
  if (dailyWordsRangeStart.value && dailyWordsRangeEnd.value) {
    searchDailyWordsByRange(
      dailyWordsRangeStart.value,
      dailyWordsRangeEnd.value
    );
  }
});

// Update search when list type changes
dailyWordsListType.addEventListener("change", () => {
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
      dailyWordsRangeEnd.value
    );
  }
});

function searchDailyWordsByLetter(letter) {
  // Get the selected list type
  const listType = dailyWordsListType.value;
  const wordList = listType === "small" ? dailyWordsSmall : dailyWordsLarge;
  const listName =
    listType === "small" ? "Daily Words Small" : "Daily Words Large";

  // Filter words that start with the selected letter
  const wordsWithLetter = wordList.filter((word) => {
    return word.toUpperCase().startsWith(letter);
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

  // Sort words alphabetically
  wordsWithLetter.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  wordsWithLetter.forEach((word) => {
    const wordButton = document.createElement("button");
    wordButton.className = "daily-words-button";

    const scrabblePoints = calculateScrabblePoints(word);
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
        wordButton.innerHTML = `
          <div class="word-text">${word}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
    });

    dailyWordsSearchResults.appendChild(wordButton);
  });
}

function searchDailyWordsByRange(startLetter, endLetter) {
  // Get the selected list type
  const listType = dailyWordsListType.value;
  const wordList = listType === "small" ? dailyWordsSmall : dailyWordsLarge;
  const listName =
    listType === "small" ? "Daily Words Small" : "Daily Words Large";

  // Convert letters to character codes
  const startCode = startLetter.charCodeAt(0);
  const endCode = endLetter.charCodeAt(0);

  // Ensure start is before end
  const actualStart = Math.min(startCode, endCode);
  const actualEnd = Math.max(startCode, endCode);

  // Filter words that start with letters in the range
  const wordsInRange = wordList.filter((word) => {
    const firstLetter = word.toUpperCase().charCodeAt(0);
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

  // Sort words alphabetically
  wordsInRange.sort((a, b) => a.localeCompare(b));

  // Create word buttons
  wordsInRange.forEach((word) => {
    const wordButton = document.createElement("button");
    wordButton.className = "daily-words-button";

    const scrabblePoints = calculateScrabblePoints(word);
    let scrabbleDisplayVisible = false;

    const updateButtonContent = () => {
      if (scrabbleDisplayVisible) {
        wordButton.innerHTML = `
          <div class="word-text">${word}</div>
          <div class="word-date">Value In Scrabble Points : '${scrabblePoints}'</div>
        `;
      } else {
        wordButton.innerHTML = `
          <div class="word-text">${word}</div>
        `;
      }
    };

    updateButtonContent();

    wordButton.addEventListener("click", () => {
      scrabbleDisplayVisible = !scrabbleDisplayVisible;
      updateButtonContent();
    });

    dailyWordsSearchResults.appendChild(wordButton);
  });
}

function clearDailyWordsSearch() {
  dailyWordsListType.value = "small";
  dailyWordsSearchMode.value = "single";
  dailyWordsSingleLetterDropdown.value = "";
  dailyWordsRangeStart.value = "";
  dailyWordsRangeEnd.value = "";
  dailyWordsSingleLetterDropdown.style.display = "block";
  dailyWordsRangeControls.style.display = "none";
  dailyWordsSearchResults.innerHTML = "";
  closeDailyWordsSearchButton.style.display = "none";
}
