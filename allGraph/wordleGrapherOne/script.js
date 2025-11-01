// script.js
import { wordleWords } from '/theWholeEnchilada.js';

const ctx = document.getElementById('wordleChart').getContext('2d');
let chart;

document.getElementById('updateChart').addEventListener('click', updateChart);

function updateChart() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
        alert('Please select a valid date range.');
        return;
    }

    // Filter data within selected date range
    const filteredData = wordleWords.filter(entry => {
        const entryDate = new Date(entry.gameDate);
        return entryDate >= startDate && entryDate <= endDate;
    });
    
    // Group by month and calculate average score
    const monthlyAverages = {};
    filteredData.forEach(entry => {
        const monthKey = getMonthYear(entry.gameDate);
        if (!monthlyAverages[monthKey]) {
            monthlyAverages[monthKey] = { sum: 0, count: 0 };
        }
        monthlyAverages[monthKey].sum += entry.myScore;
        monthlyAverages[monthKey].count++;
    });
    
    const labels = Object.keys(monthlyAverages).sort();
    const scores = labels.map(month => (monthlyAverages[month].sum / monthlyAverages[month].count).toFixed(2));

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar', // Change to bar chart for vertical bars
        data: {
            labels,
            datasets: [{
                label: 'Average Wordle Score (Monthly)',
                data: scores,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Month-Year' },
                    grid: { drawOnChartArea: false } // Remove grid clutter
                },
                y: {
                    title: { display: true, text: 'Average Score' },
                    min: 2, max: 5,
                    grid: { drawBorder: false }
                }
            }
        }
    });
}

function getMonthYear(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}





