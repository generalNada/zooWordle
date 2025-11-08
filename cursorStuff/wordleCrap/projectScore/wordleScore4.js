import { fixedWordsLarge, wordleWords } from "../../../theWholeEnchilada.js";
//INCLUDES ZEROES

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

// Day of Week Search Elements
const daySearchContainer = document.getElementById("daySearchContainer");
const dayOfWeekDropdown = document.getElementById("dayOfWeekDropdown");
const daySearchResults = document.getElementById("daySearchResults");

// Day Number Search Elements
const dayNumberSearchContainer = document.getElementById(
  "dayNumberSearchContainer"
);
const dayNumberDropdown = document.getElementById("dayNumberDropdown");
const dayNumberSearchResults = document.getElementById(
  "dayNumberSearchResults"
);

// Month/Day Search Elements
const monthDaySearchContainer = document.getElementById(
  "monthDaySearchContainer"
);
const monthDropdown = document.getElementById("monthDropdown");
const monthDayDropdown = document.getElementById("monthDayDropdown");
const monthDaySearchResults = document.getElementById("monthDaySearchResults");

// Close buttons for search sections
const closeDaySearchButton = document.getElementById("closeDaySearchButton");
const closeDayNumberSearchButton = document.getElementById(
  "closeDayNumberSearchButton"
);
const closeMonthDaySearchButton = document.getElementById(
  "closeMonthDaySearchButton"
);

// Toggle the display of the dropdown menu
toggleButton.addEventListener("click", () => {
  const isVisible = scoreDropdown.style.display === "block";
  scoreDropdown.style.display = isVisible ? "none" : "block";
  monthYearDropdown.style.display = isVisible ? "none" : "block";
  yearDropdown.style.display = isVisible ? "none" : "block";
  daySearchContainer.style.display = isVisible ? "none" : "block";
  dayNumberSearchContainer.style.display = isVisible ? "none" : "block";
  monthDaySearchContainer.style.display = isVisible ? "none" : "block";

  // Populate dropdowns if showing
  if (!isVisible) {
    populateMonthYearDropdown();
    populateYearDropdown();
    populateDayNumberDropdown();
    populateMonthDayDropdown();
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

closeDayNumberSearchButton.addEventListener("click", () => {
  clearDayNumberSearch();
});

closeMonthDaySearchButton.addEventListener("click", () => {
  clearMonthDaySearch();
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
      showWordDetails(entry);
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
      showWordDetails(entry);
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
}

function hideWordDetails() {
  wordDetailsContainer.style.display = "none";
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

  // Clear previous results
  daySearchResults.innerHTML = "";

  if (wordsOnDay.length === 0) {
    daySearchResults.innerHTML = `<div class="day-search-summary">No words found for ${dayName}</div>`;
    closeDaySearchButton.style.display = "block";
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

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "day-search-summary";
  summaryDiv.innerHTML = `
    <strong>${dayName}s:</strong> ${wordsOnDay.length} total words | 
    ${playedWords.length} played | 
    Average Score: ${averageScore}
  `;
  daySearchResults.appendChild(summaryDiv);

  // Show close button
  closeDaySearchButton.style.display = "block";

  // Sort words by date (newest first)
  wordsOnDay.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));

  // Create word buttons
  wordsOnDay.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "day-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;

    wordButton.innerHTML = `
      <div class="word-text">${entry.word}</div>
      <div class="word-date">${entry.gameDate}</div>
      <div class="word-date">${scoreText}</div>
    `;

    wordButton.addEventListener("click", () => {
      showWordDetailsFromDay(entry);
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

  // Clear previous results
  dayNumberSearchResults.innerHTML = "";

  if (wordsOnDay.length === 0) {
    dayNumberSearchResults.innerHTML = `<div class="day-number-search-summary">No words found for day ${dayNumber} of any month</div>`;
    closeDayNumberSearchButton.style.display = "block";
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

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "day-number-search-summary";
  summaryDiv.innerHTML = `
    <strong>Day ${dayNumber}:</strong> ${wordsOnDay.length} total words | 
    ${playedWords.length} played | 
    Average Score: ${averageScore}
  `;
  dayNumberSearchResults.appendChild(summaryDiv);

  // Show close button
  closeDayNumberSearchButton.style.display = "block";

  // Sort words by date (newest first)
  wordsOnDay.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));

  // Create word buttons
  wordsOnDay.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "day-number-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;

    wordButton.innerHTML = `
      <div class="word-text">${entry.word}</div>
      <div class="word-date">${entry.gameDate}</div>
      <div class="word-date">${scoreText}</div>
    `;

    wordButton.addEventListener("click", () => {
      showWordDetailsFromSearch(entry);
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

  // Add summary
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "month-day-search-summary";
  summaryDiv.innerHTML = `
    <strong>${monthName} ${dayNumber}:</strong> ${wordsOnMonthDay.length} total words | 
    ${playedWords.length} played | 
    Average Score: ${averageScore}
  `;
  monthDaySearchResults.appendChild(summaryDiv);

  // Show close button
  closeMonthDaySearchButton.style.display = "block";

  // Sort words by year (newest first)
  wordsOnMonthDay.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));

  // Create word buttons
  wordsOnMonthDay.forEach((entry) => {
    const wordButton = document.createElement("button");
    wordButton.className = "month-day-word-button";

    const scoreText =
      entry.myScore === 0 ? "Not Played" : `Score: ${entry.myScore}`;
    const date = new Date(entry.gameDate);
    const year = date.getFullYear();

    wordButton.innerHTML = `
      <div class="word-text">${entry.word}</div>
      <div class="word-date">${year}</div>
      <div class="word-date">${scoreText}</div>
    `;

    wordButton.addEventListener("click", () => {
      showWordDetailsFromSearch(entry);
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
}
// Clear functions for search sections
function clearDaySearch() {
  dayOfWeekDropdown.value = "";
  daySearchResults.innerHTML = "";
  closeDaySearchButton.style.display = "none";
}

function clearDayNumberSearch() {
  dayNumberDropdown.value = "";
  dayNumberSearchResults.innerHTML = "";
  closeDayNumberSearchButton.style.display = "none";
}

function clearMonthDaySearch() {
  monthDropdown.value = "";
  monthDayDropdown.innerHTML = '<option value="">Select Day</option>';
  monthDaySearchResults.innerHTML = "";
  closeMonthDaySearchButton.style.display = "none";
}
