import { wordleWords } from "../../theWholeEnchilada.js";

class WordleScoreTracker {
  constructor() {
    this.currentDate = new Date(2021, 5, 19); // June 19, 2021
    this.selectedDate = null;
    this.wordleData = this.processWordleData(wordleWords);
    this.scoreChangeInfo = null;
    this.init();
  }

  processWordleData(data) {
    // Convert the wordle data into a more usable format
    const processedData = {};

    data.forEach((item, index) => {
      const date = new Date(item.gameDate);
      const dateKey = this.formatDateKey(date);

      // Calculate average score up to this date
      const scoresUpToDate = data
        .slice(0, index + 1)
        .filter((d) => d.myScore > 0)
        .map((d) => d.myScore);

      const averageScore =
        scoresUpToDate.length > 0
          ? (
              scoresUpToDate.reduce((sum, score) => sum + score, 0) /
              scoresUpToDate.length
            ).toFixed(7)
          : 0;

      processedData[dateKey] = {
        word: item.word,
        score: item.myScore,
        wordNumber: item.wordNumber,
        gameDate: item.gameDate,
        averageScore: parseFloat(averageScore),
        totalGames: scoresUpToDate.length,
      };
    });

    return processedData;
  }

  formatDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  formatDateForDisplay(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  init() {
    this.setupEventListeners();
    this.initializeYearSelector();
    this.renderCalendar();
    this.setDefaultEndDate();
    this.updateLowestScores();
  }

  setupEventListeners() {
    // Calendar navigation
    document.getElementById("prevMonth").addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateYearSelector();
      this.renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updateYearSelector();
      this.renderCalendar();
    });

    // Year selector change event
    document.getElementById("yearSelect").addEventListener("change", (e) => {
      const selectedYear = parseInt(e.target.value);
      this.currentDate.setFullYear(selectedYear);
      this.renderCalendar();
    });

    // Score count slider
    const scoreCountSlider = document.getElementById("scoreCount");
    const scoreCountValue = document.getElementById("scoreCountValue");

    scoreCountSlider.addEventListener("input", (e) => {
      scoreCountValue.textContent = e.target.value;
    });

    // Update lowest scores button
    document
      .getElementById("updateLowestScores")
      .addEventListener("click", () => {
        this.updateLowestScores();
      });

    // Calculate score change button
    document
      .getElementById("calculateScoreChange")
      .addEventListener("click", () => {
        this.calculateScoreChange();
      });
  }

  calculateScoreChange() {
    const startDate = document.getElementById("startCompareDate").value;
    const endDate = document.getElementById("endCompareDate").value;

    if (!startDate || !endDate) {
      alert("Please select both start and end dates for comparison.");
      return;
    }

    const startKey = this.formatDateForComparison(startDate);
    const endKey = this.formatDateForComparison(endDate);

    const startData = this.wordleData[startKey];
    const endData = this.wordleData[endKey];

    if (!startData || !endData) {
      alert(
        "One or both dates do not have data. Please select dates with available data."
      );
      return;
    }

    const scoreChange = endData.averageScore - startData.averageScore;
    const gamesChange = endData.totalGames - startData.totalGames;

    this.scoreChangeInfo = {
      startDate: startDate,
      endDate: endDate,
      startScore: startData.averageScore,
      endScore: endData.averageScore,
      startDailyScore: startData.score,
      endDailyScore: endData.score,
      change: scoreChange,
      gamesChange: gamesChange,
      startWord: startData.word,
      endWord: endData.word,
    };

    // Parse startDate as local date to avoid timezone issues
    const selectedDateKey = this.selectedDate
      ? this.formatDateKey(this.selectedDate)
      : this.formatDateForComparison(startDate);
    this.displayWordDetails(selectedDateKey);
  }

  formatDateForComparison(dateString) {
    // Convert YYYY-MM-DD to the format used in wordleData
    // Parse as local date to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return this.formatDateKey(date);
  }

  setDefaultEndDate() {
    const endDateInput = document.getElementById("endDate");
    const today = new Date();
    endDateInput.value = today.toISOString().split("T")[0];
  }

  initializeYearSelector() {
    const yearSelect = document.getElementById("yearSelect");

    // Determine the year range from the data
    const dates = Object.keys(this.wordleData).map((dateKey) => {
      return new Date(dateKey);
    });

    const years = [...new Set(dates.map((date) => date.getFullYear()))].sort();

    // Populate year dropdown
    yearSelect.innerHTML = years
      .map((year) => {
        return `<option value="${year}">${year}</option>`;
      })
      .join("");

    // Set current year
    yearSelect.value = this.currentDate.getFullYear();
  }

  updateYearSelector() {
    const yearSelect = document.getElementById("yearSelect");
    yearSelect.value = this.currentDate.getFullYear();
  }

  renderCalendar() {
    const calendar = document.getElementById("calendar");
    const currentMonth = document.getElementById("currentMonth");

    // Update month display
    currentMonth.textContent = this.currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    // Clear calendar
    calendar.innerHTML = "";

    // Add day headers
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayHeaders.forEach((day) => {
      const header = document.createElement("div");
      header.className = "calendar-header";
      header.textContent = day;
      calendar.appendChild(header);
    });

    // Get first day of month and number of days
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "calendar-day other-month";
      calendar.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "calendar-day";
      dayElement.textContent = day;

      const currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      const dateKey = this.formatDateKey(currentDate);

      // Check if this date has wordle data
      if (this.wordleData[dateKey]) {
        dayElement.classList.add("has-data");
        dayElement.addEventListener("click", () =>
          this.selectDate(currentDate, dateKey)
        );
      }

      // Check if this is the selected date
      if (
        this.selectedDate &&
        this.formatDateKey(this.selectedDate) === dateKey
      ) {
        dayElement.classList.add("selected");
      }

      calendar.appendChild(dayElement);
    }

    // Add empty cells for days after the last day of the month
    const totalCells = calendar.children.length - 7; // Subtract header row
    const remainingCells = 42 - totalCells; // 6 rows * 7 days = 42 total cells
    for (let i = 0; i < remainingCells; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "calendar-day other-month";
      calendar.appendChild(emptyDay);
    }
  }

  selectDate(date, dateKey) {
    this.selectedDate = date;
    this.renderCalendar(); // Re-render to show selection
    this.displayWordDetails(dateKey);
  }

  displayWordDetails(dateKey) {
    const wordDetails = document.getElementById("wordDetails");
    const data = this.wordleData[dateKey];

    if (!data) {
      wordDetails.innerHTML = "<p>No data available for this date.</p>";
      return;
    }

    let scoreChangeHTML = "";
    if (this.scoreChangeInfo) {
      const change = this.scoreChangeInfo.change;
      const changeColor =
        change > 0 ? "#ef4444" : change < 0 ? "#10b981" : "#6b7280";
      const changeSymbol = change > 0 ? "↑" : change < 0 ? "↓" : "→";

      // Parse dates in local time to avoid timezone issues
      const parseDateString = (dateString) => {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
      };

      scoreChangeHTML = `
        <div class="word-info" style="background: #fef3c7; border-left: 5px solid ${changeColor}; padding: 15px; margin-top: 15px; border-radius: 8px;">
          <h4 style="color: #92400e; margin-bottom: 10px;">Average Score Change: ${this.formatDateForDisplay(
            parseDateString(this.scoreChangeInfo.startDate)
          )} <span style="color: #3b82f6;">(${
        this.scoreChangeInfo.startDailyScore
      })</span> → ${this.formatDateForDisplay(
        parseDateString(this.scoreChangeInfo.endDate)
      )} <span style="color: #3b82f6;">(${
        this.scoreChangeInfo.endDailyScore
      })</span></h4>
          <div class="word-info">
            <div class="word-detail-item">
              <h4>Start Score</h4>
              <p>${this.scoreChangeInfo.startScore.toFixed(7)}</p>
            </div>
            <div class="word-detail-item">
              <h4>End Score</h4>
              <p>${this.scoreChangeInfo.endScore.toFixed(7)}</p>
            </div>
            <div class="word-detail-item">
              <h4>Change ${changeSymbol}</h4>
              <p style="color: ${changeColor}; font-weight: bold; font-size: 1.4rem;">${
        change > 0 ? "+" : ""
      }${change.toFixed(7)}</p>
            </div>
            <div class="word-detail-item">
              <h4>Games Added</h4>
              <p>${this.scoreChangeInfo.gamesChange}</p>
            </div>
          </div>
        </div>
      `;
    }

    wordDetails.innerHTML = `
            <div class="word-info">
                <div class="word-detail-item">
                    <h4>Word</h4>
                    <p>${data.word}</p>
                </div>
                <div class="word-detail-item">
                    <h4>Word #</h4>
                    <p>${data.wordNumber}</p>
                </div>
                <div class="word-detail-item">
                    <h4>Score</h4>
                    <p>${data.score || "Not played"}</p>
                </div>
                <div class="word-detail-item">
                    <h4>Average Score</h4>
                    <p>${data.averageScore.toFixed(7)}</p>
                </div>
            </div>
            <div class="word-info">
                <div class="word-detail-item">
                    <h4>Games Played</h4>
                    <p>${data.totalGames}</p>
                </div>
                <div class="word-detail-item">
                    <h4>Date</h4>
                    <p>${this.formatDateForDisplay(new Date(data.gameDate))}</p>
                </div>
            </div>
            ${scoreChangeHTML}
        `;
  }

  updateLowestScores() {
    const startValue = document.getElementById("startDate").value;
    const endValue = document.getElementById("endDate").value;
    const scoreCount = parseInt(document.getElementById("scoreCount").value);

    // Parse YYYY-MM-DD as local dates to avoid timezone issues
    const parseLocalDate = (value) => {
      if (!value) return null;
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d);
    };

    const startDate = parseLocalDate(startValue);
    const endDate = parseLocalDate(endValue);
    if (!startDate || !endDate) return;

    // Include the entire end day by setting time to 23:59:59.999
    endDate.setHours(23, 59, 59, 999);

    // Filter data within date range
    const filteredData = Object.entries(this.wordleData)
      .filter(([dateKey, data]) => {
        const dataDate = new Date(data.gameDate);
        return (
          dataDate >= startDate && dataDate <= endDate && data.averageScore > 0
        );
      })
      .map(([dateKey, data]) => ({
        dateKey,
        ...data,
        date: new Date(data.gameDate),
      }));

    // Sort by average score (lowest first)
    filteredData.sort((a, b) => a.averageScore - b.averageScore);

    // Take only the requested number of lowest scores
    const lowestScores = filteredData.slice(0, scoreCount);

    this.displayLowestScores(lowestScores);
  }

  getScoreComparison(currentDate, daysBack) {
    // Get the date N days before the current date
    const compareDate = new Date(currentDate);
    compareDate.setDate(compareDate.getDate() - daysBack);
    const compareDateKey = this.formatDateKey(compareDate);

    const compareData = this.wordleData[compareDateKey];

    if (!compareData || !compareData.averageScore) {
      return null;
    }

    return compareData;
  }

  displayLowestScores(scores) {
    const lowestScoresContainer = document.getElementById("lowestScores");

    if (scores.length === 0) {
      lowestScoresContainer.innerHTML =
        "<p>No scores found in the selected date range.</p>";
      return;
    }

    lowestScoresContainer.innerHTML = scores
      .map((score, index) => {
        // Calculate comparisons
        const dayBefore = this.getScoreComparison(score.date, 1);
        const weekBefore = this.getScoreComparison(score.date, 7);
        const twoWeeksBefore = this.getScoreComparison(score.date, 14);
        const monthBefore = this.getScoreComparison(score.date, 30);

        // Helper function to format difference
        const formatDiff = (compareData) => {
          if (!compareData) return '<span class="no-data">N/A</span>';

          const diff = score.averageScore - compareData.averageScore;
          const isPositive = diff > 0;
          const symbol = isPositive ? "+" : "";
          const colorClass = isPositive ? "diff-up" : "diff-down";

          return `<span class="${colorClass}">${symbol}${diff.toFixed(
            7
          )}</span>`;
        };

        return `
            <div class="score-card">
                <div class="card-main">
                    <h4>#${index + 1} Lowest</h4>
                    <div class="score-value">${score.averageScore.toFixed(
                      7
                    )}</div>
                    <div class="score-date">${this.formatDateForDisplay(
                      score.date
                    )}</div>
                    <div class="word">${score.word}</div>
                    <div class="daily-score-info">
                        Daily Score: ${score.score} (${score.totalGames} games)
                    </div>
                </div>
                <div class="card-expanded">
                    <div class="comparison-title">📊 Average Score Changes</div>
                    <div class="comparison-item">
                        <span class="comparison-label">vs. Day Before:</span>
                        ${formatDiff(dayBefore)}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">vs. Week Before:</span>
                        ${formatDiff(weekBefore)}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">vs. 2 Weeks Before:</span>
                        ${formatDiff(twoWeeksBefore)}
                    </div>
                    <div class="comparison-item">
                        <span class="comparison-label">vs. Month Before:</span>
                        ${formatDiff(monthBefore)}
                    </div>
                </div>
            </div>
        `;
      })
      .join("");
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WordleScoreTracker();
});
