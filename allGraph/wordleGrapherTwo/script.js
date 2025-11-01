import { wordleWords } from '/theWholeEnchilada.js';

// Ensure Chart.js is loaded before proceeding
if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded. Ensure you have included the library.');
}

// Get the chart canvas
const ctx = document.getElementById('wordleChart')?.getContext('2d');
if (!ctx) {
    console.error('Canvas element with id "wordleChart" not found.');
}
let chart;

// Add event listener for updating the chart
document.getElementById('updateChart')?.addEventListener('click', updateChart);

function updateChart() {
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    
    if (!startDateInput || !endDateInput) {
        alert('Please select both start and end dates.');
        return;
    }

    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
        alert('Please select a valid date range.');
        return;
    }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Total Entries in Dataset:", wordleWords.length);

    // Filter entries within the date range
    const filteredData = wordleWords.filter(entry => {
        const entryDate = new Date(entry.gameDate);
        return !isNaN(entryDate) && entryDate >= startDate && entryDate <= endDate;
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

    filteredData.forEach(entry => {
        cumulativeSum += entry.myScore;
        cumulativeCount++;
        progressionLabels.push(entry.gameDate);
        progressionScores.push((cumulativeSum / cumulativeCount).toFixed(2));
    });

    console.log("Final Data Points:", progressionLabels.length);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: progressionLabels,
            datasets: [{
                label: 'Cumulative Score Average',
                data: progressionScores,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Cumulative Average Score' }, min: 3.5, max: 4 }
            }
        }
    });
}