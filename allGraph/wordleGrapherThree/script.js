import { wordleWords } from "../../theWholeEnchilada.js";

// Ensure Chart.js is loaded before proceeding
if (typeof Chart === "undefined") {
  console.error(
    "Chart.js is not loaded. Ensure you have included the library."
  );
}

// Get the chart canvas
const ctx = document.getElementById("wordleChart")?.getContext("2d");
if (!ctx) {
  console.error('Canvas element with id "wordleChart" not found.');
}
let chart;

// Add event listener for updating the chart
document.getElementById("updateChart")?.addEventListener("click", updateChart);

function updateChart() {
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;

  if (!startDateInput || !endDateInput) {
    alert("Please select both start and end dates.");
    return;
  }

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
    alert("Please select a valid date range.");
    return;
  }

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Total Entries in Dataset:", wordleWords.length);

  // Filter entries within the date range
  const filteredData = wordleWords
    .filter((entry) => {
      // Parse date in M/D/YY format
      const [month, day, year] = entry.gameDate.split("/");
      const entryDate = new Date(
        2000 + parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      return (
        !isNaN(entryDate) && entryDate >= startDate && entryDate <= endDate
      );
    })
    .sort((a, b) => {
      const [monthA, dayA, yearA] = a.gameDate.split("/");
      const [monthB, dayB, yearB] = b.gameDate.split("/");
      const dateA = new Date(
        2000 + parseInt(yearA),
        parseInt(monthA) - 1,
        parseInt(dayA)
      );
      const dateB = new Date(
        2000 + parseInt(yearB),
        parseInt(monthB) - 1,
        parseInt(dayB)
      );
      return dateA - dateB;
    });

  console.log("Filtered Data Count:", filteredData.length);
  if (filteredData.length === 0) {
    alert("No data found for the selected range.");
    return;
  }

  let cumulativeSum = 0;
  let cumulativeCount = 0;
  const progressionLabels = [];
  const progressionScores = [];

  filteredData.forEach((entry) => {
    // Only include non-zero scores in the average
    if (entry.myScore > 0) {
      cumulativeSum += entry.myScore;
      cumulativeCount++;
    }
    progressionLabels.push(entry.gameDate);
    progressionScores.push(
      cumulativeCount > 0 ? (cumulativeSum / cumulativeCount).toFixed(5) : null
    );
    // console.log(
    //   "Cumulative Average Score:",
    //   (cumulativeSum / cumulativeCount).toFixed(5)
    // );
  });

  // Remove any null values from the beginning of the array
  while (progressionScores[0] === null) {
    progressionScores.shift();
    progressionLabels.shift();
  }

  console.log("Final Data Points:", progressionLabels.length);

  if (chart) chart.destroy();

  // Calculate trend line
  const trendLine = calculateTrendLine(progressionScores);

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: progressionLabels,
      datasets: [
        {
          label: "Cumulative Score Average",
          data: progressionScores,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.3,
          borderWidth: 2,
        },
        {
          label: "Trend Line",
          data: trendLine,
          borderColor: "rgba(255, 99, 132, 0.8)",
          borderDash: [5, 5],
          fill: false,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Cumulative Average Score Over Time (Excluding Failed Attempts)",
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.parsed.y.toFixed(5);
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          title: {
            display: true,
            text: "Cumulative Average Score",
          },
          min:
            Math.min(...progressionScores.filter((score) => score !== null)) -
            0.2,
          max:
            Math.max(...progressionScores.filter((score) => score !== null)) +
            0.2,
          ticks: {
            callback: function (value) {
              return value.toFixed(5);
            },
          },
        },
      },
    },
  });
}

// Helper function to calculate trend line
function calculateTrendLine(data) {
  // Filter out null values for trend line calculation
  const validData = data.filter((score) => score !== null);
  const n = validData.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const y = validData.map(Number);

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumXX = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Return trend line values for all data points, using null for skipped points
  return data.map((score, i) =>
    score === null ? null : slope * i + intercept
  );
}
