import { wordleWords } from "../../theWholeEnchilada.js";
let wordleChart;

document.getElementById("updateChart")?.addEventListener("click", () => {
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (isNaN(startDate) || isNaN(endDate)) {
    alert("Please select both start and end dates.");
    return;
  }

  if (startDate > endDate) {
    alert("Start date must be before end date.");
    return;
  }

  // Filter valid entries (date in range + score > 0)
  const filtered = wordleWords
    .filter(entry => {
      const entryDate = new Date(entry.gameDate);
      return (
        !isNaN(entryDate) &&
        entryDate >= startDate &&
        entryDate <= endDate &&
        entry.myScore > 0
      );
    })
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));

  if (filtered.length === 0) {
    alert("No valid scores found in selected range.");
    return;
  }

  // Determine interval
  const rangeDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  let interval = 1;
  if (rangeDays > 90) interval = 3;
  else if (rangeDays > 30) interval = 2;

  // Cumulative average at intervals
  const labels = [];
  const dataPoints = [];

  let sum = 0;
  let count = 0;

  filtered.forEach((entry, index) => {
    sum += entry.myScore;
    count++;

    const entryDate = new Date(entry.gameDate).toISOString().split("T")[0];

    if (index % interval === 0 || index === filtered.length - 1) {
      labels.push(entryDate);
      dataPoints.push(Number((sum / count).toFixed(7)));
    }
  });

  if (wordleChart) wordleChart.destroy();

  const ctx = document.getElementById("wordleChart")?.getContext("2d");
  if (!ctx) {
    console.error("Canvas with ID 'wordleChart' not found.");
    return;
  }

  wordleChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Cumulative Avg Score Over Time",
        data: dataPoints,
        borderColor: "rgb(0, 166, 255)",
        backgroundColor: "rgba(0, 166, 255, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          min: Math.floor(Math.min(...dataPoints)) - 0.5,
          max: Math.ceil(Math.max(...dataPoints)) + 0.5,
          ticks: {
            stepSize: 0.5
          },
          title: {
            display: true,
            text: 'Avg Score'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: "top"
        },
        tooltip: {
          callbacks: {
            label: context => `Avg: ${context.raw}`
          }
        }
      }
    }
  });
});
