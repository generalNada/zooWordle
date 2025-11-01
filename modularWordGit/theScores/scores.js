import { wordleWords } from '/theWholeEnchilada.js';

      document.addEventListener("DOMContentLoaded", () => {
      console.log("Script loaded. Initializing...");
    
        const toggleButton = document.getElementById("toggleButton");
        const scoreDropdown = document.getElementById("scoreDropdown");
        const scoreField = document.getElementById("scoreField");
        const monthDropdown = document.getElementById("monthDropdown");
        const yearDropdown = document.getElementById("yearDropdown");
        const calculateStatsButton = document.getElementById("calculateStatsButton");
        const statsResults = document.getElementById("statsResults");
        const exportButton = document.getElementById("exportButton");
    
        // ✅ Ensure dropdown starts hidden
        scoreDropdown.style.display = "none";
    
        // ✅ Fix: Ensure dropdown reappears when toggled
        if (toggleButton && scoreDropdown) {
            toggleButton.addEventListener("click", () => {
                if (scoreDropdown.style.display === "none" || scoreDropdown.style.display === "") {
                    scoreDropdown.style.display = "block";
                    console.log("Dropdown shown.");
                } else {
                    scoreDropdown.style.display = "block"; // ✅ Fix: Ensure it stays visible
                    console.log("Dropdown reappeared.");
                }
            });
            console.log("Toggle button attached.");
        } else {
            console.error("Toggle button or dropdown not found.");
        }
    
        // ✅ Fix: Ensure score dropdown works correctly
        if (scoreDropdown && scoreField) {
            scoreDropdown.addEventListener("change", (event) => {
                const selectedScore = Number(event.target.value);
                let scoreCounts = {};
                let totalGames = wordleWords.length;
    
                wordleWords.forEach(entry => {
                    scoreCounts[entry.myScore] = (scoreCounts[entry.myScore] || 0) + 1;
                });
    
                const count = scoreCounts[selectedScore] || 0;
                const percentage = ((count / totalGames) * 100).toFixed(2);
    
                scoreField.textContent = `Games with Score ${selectedScore}: ${count} (${percentage}%)`;
            });
    
            console.log("Score dropdown event listener attached.");
        }
 
        

        
//         THIS DEALS WITH DATE FORMATS PROPERLY   ⬇️
// // ✅ Fix: Prevent duplicate entries in dropdowns
function populateDropdowns() {
    let uniqueMonths = new Set();
    let uniqueYears = new Set();

    wordleWords.forEach(entry => {
        // Normalize date format
        let [month, , year] = entry.gameDate.split("/");
        month = month.padStart(2, "0");
        year = year.length === 2 ? "20" + year : year;

        uniqueMonths.add(month);
        uniqueYears.add(year);
    });

    // Clear previous options before adding new ones
    monthDropdown.innerHTML = `<option value="" disabled selected>Select Month</option>`;
    yearDropdown.innerHTML = `<option value="" disabled selected>Select Year</option>`;

    // Sort and populate dropdowns
    [...uniqueMonths].sort((a, b) => a - b).forEach(month => {
        let option = document.createElement("option");
        option.value = month;
        option.textContent = getMonthName(month);
        monthDropdown.appendChild(option);
    });

    [...uniqueYears].sort((a, b) => a - b).forEach(year => {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });

    console.log("Dropdowns populated.");
}




function calculateStats() {
    let selectedMonth = monthDropdown.value;
    let selectedYear = yearDropdown.value;

    if (!selectedMonth || !selectedYear) {
        statsResults.innerHTML = "Please select both a month and a year.";
        return;
    }

    // 1️⃣ Filter games for the selected month/year
    let filteredData = wordleWords.filter(entry => {
        // Normalize date format
        let [month, , year] = entry.gameDate.split("/");
        month = month.padStart(2, "0");
        year = year.length === 2 ? "20" + year : year;

        return month === selectedMonth && year === selectedYear;
    });

    // 2️⃣ Filter games from the start through the selected month/year (EXCLUDING `myScore === 0`)
    let cumulativeData = wordleWords.filter(entry => {
        // Normalize date format
        let [month, , year] = entry.gameDate.split("/");
        month = month.padStart(2, "0");
        year = year.length === 2 ? "20" + year : year;

        return ((year < selectedYear) || (year === selectedYear && month <= selectedMonth)) && entry.myScore > 0;
    });

    // 3️⃣ Handle cases where no data exists
    if (filteredData.length === 0) {
        statsResults.innerHTML = `No data available for ${getMonthName(selectedMonth)}/${selectedYear}.`;
        return;
    }

    // 4️⃣ Calculate the average score for the selected month/year (INCLUDING `myScore === 0`)
    let totalMonthScore = filteredData.reduce((sum, entry) => sum + entry.myScore, 0);
    let avgMonthScore = (totalMonthScore / filteredData.length).toFixed(6);

    // 5️⃣ Calculate the total average score through the selected month/year (EXCLUDING `myScore === 0`)
    if (cumulativeData.length === 0) {
        statsResults.innerHTML = `
            <p>Games in ${getMonthName(selectedMonth)}/${selectedYear}: <strong>${filteredData.length}</strong></p>
            <p>Avg Score for Selected Month: <strong>${avgMonthScore}</strong></p>
            <p>No valid scores for cumulative average (All past games were unplayed).</p>
        `;
        return;
    }

    let totalCumulativeScore = cumulativeData.reduce((sum, entry) => sum + entry.myScore, 0);
    let avgTotalScore = (totalCumulativeScore / cumulativeData.length).toFixed(6);

    // 6️⃣ Display the results
    // statsResults.innerHTML = `
    //     <p>Games in ${getMonthName(selectedMonth)}/${selectedYear}: <strong>${filteredData.length}</strong></p>
    //     <p>Avg Score for Selected Month: <strong>${avgMonthScore}</strong></p>
    //     <p>Avg Score from Start to ${getMonthName(selectedMonth)}/${selectedYear} (Excluding 0s): <strong>${avgTotalScore}</strong></p>
    // `;

    statsResults.innerHTML = `
        <p>You have played <strong>${filteredData.length}</strong> games in ${getMonthName(selectedMonth)},  ${selectedYear} ! </p>
        <p>Your average score for ${getMonthName(selectedMonth)},  ${selectedYear}: <strong>${avgMonthScore}</strong> !</p>
        <p>Your average score from Day 1 to ${getMonthName(selectedMonth)},  ${selectedYear}: <strong>${avgTotalScore}</strong> !</p>
    `;
}




//     REPLACED THIS --- THE ABOVE HANDLES ALL DATE FORMATS I'VE USED!
//         function populateDropdowns() {
//             let uniqueMonths = new Set();
//             let uniqueYears = new Set();
    
//             oldWords.forEach(entry => {
// // let parts = entry.gameDate.split("/");
// // let month = parts[0].padStart(2, "0"); // Ensure "1" becomes "01"
// // let year = parts[2].length === 2 ? "20" + parts[2] : parts[2]; // Convert "24" to "2024"
//                 let [month, , year] = entry.gameDate.split("/");
//                 uniqueMonths.add(month);
//                 uniqueYears.add(year);
//             });
    
//             // ✅ Clear previous options before adding new ones
//             monthDropdown.innerHTML = `<option value="" disabled selected>Select Month</option>`;
//             yearDropdown.innerHTML = `<option value="" disabled selected>Select Year</option>`;
    
//             // ✅ Sort and populate dropdowns
//             [...uniqueMonths].sort((a, b) => a - b).forEach(month => {
//                 let option = document.createElement("option");
//                 option.value = month;
//                 option.textContent = getMonthName(month);
//                 monthDropdown.appendChild(option);
//             });
    
//             [...uniqueYears].sort((a, b) => a - b).forEach(year => {
//                 let option = document.createElement("option");
//                 option.value = year;
//                 option.textContent = "20" + year;
//                 yearDropdown.appendChild(option);
//             });
    
//             console.log("Dropdowns populated.");
//         }
    
//         // ✅ Fix: Calculate stats properly
//         function calculateStats() {
//           let selectedMonth = monthDropdown.value;
//           let selectedYear = yearDropdown.value;
      
//           if (!selectedMonth || !selectedYear) {
//               statsResults.innerHTML = "Please select both a month and a year.";
//               return;
//           }
      
//           // ✅ 1️⃣ Filter games for the selected month/year
//           let filteredData = oldWords.filter(entry => {
// // let parts = entry.gameDate.split("/");
// // let month = parts[0].padStart(2, "0"); // Ensure "1" becomes "01"
// // let year = parts[2].length === 2 ? "20" + parts[2] : parts[2]; // Convert "24" to "2024"
//               let [month, , year] = entry.gameDate.split("/");
//               return month === selectedMonth && year === selectedYear;
//           });
      
//           // ✅ 2️⃣ Filter games from the start through the selected month/year (EXCLUDING `myScore === 0`)
//           let cumulativeData = oldWords.filter(entry => {
//               let [month, , year] = entry.gameDate.split("/");
//               return ((year < selectedYear) || (year === selectedYear && month <= selectedMonth)) && entry.myScore > 0;
//           });
      
//           // ✅ 3️⃣ Handle cases where no data exists
//           if (filteredData.length === 0) {
//               statsResults.innerHTML = `No data available for ${getMonthName(selectedMonth)}/20${selectedYear}.`;
//               return;
//           }
      
//           // ✅ 4️⃣ Calculate the average score for the selected month/year (INCLUDING `myScore === 0`)
//           let totalMonthScore = filteredData.reduce((sum, entry) => sum + entry.myScore, 0);
//           let avgMonthScore = (totalMonthScore / filteredData.length).toFixed(6);
      
//           // ✅ 5️⃣ Calculate the total average score through the selected month/year (EXCLUDING `myScore === 0`)
//           if (cumulativeData.length === 0) {
//               statsResults.innerHTML = `
//                   <p>Games in ${getMonthName(selectedMonth)}/20${selectedYear}: <strong>${filteredData.length}</strong></p>
//                   <p>Avg Score for Selected Month: <strong>${avgMonthScore}</strong></p>
//                   <p>No valid scores for cumulative average (All past games were unplayed).</p>
//               `;
//               return;
//           }
      
//           let totalCumulativeScore = cumulativeData.reduce((sum, entry) => sum + entry.myScore, 0);
//           let avgTotalScore = (totalCumulativeScore / cumulativeData.length).toFixed(6);
      
//           // ✅ 6️⃣ Display the results
//           statsResults.innerHTML = `
//               <p>Games in ${getMonthName(selectedMonth)}/20${selectedYear}: <strong>${filteredData.length}</strong></p>
//               <p>Avg Score for Selected Month: <strong>${avgMonthScore}</strong></p>
//               <p>Avg Score from Start to ${getMonthName(selectedMonth)}/20${selectedYear} (Excluding 0s): <strong>${avgTotalScore}</strong></p>
//           `;
//       }

        // ✅ Fix: Export data to a file
        function exportData() {
            let text = statsResults.innerText || "No stats available.";
            let blob = new Blob([text], { type: "text/plain" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "WordleStats.txt";
            link.click();
        }
    
        function getMonthName(monthNum) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
            return months[parseInt(monthNum) - 1] || "Unknown";
        }
    
        calculateStatsButton.addEventListener("click", calculateStats);
        exportButton.addEventListener("click", exportData);
        populateDropdowns();
    });







//✅ This function can be placed BELOW the other functions in the same file. All letter uses

function displayLetterScoreStats(letter) {
    if (letter.length !== 1) {
        document.getElementById("scoreDisplay").innerHTML = "Type a single letter.";
        return;
    }

    letter = letter.toUpperCase();
    let scoreCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let totalWords = 0;
    let wordList = [];

    wordleWords.forEach(entry => {
        if (entry.word.includes(letter)) {
            scoreCounts[entry.myScore] = (scoreCounts[entry.myScore] || 0) + 1;
            totalWords++;
            wordList.push(`<p>${entry.word} - Score: ${entry.myScore} (Date: ${entry.gameDate})</p>`);
        }
    });

    document.getElementById("scoreDisplay").innerHTML = `
        <p>Total words with '${letter}': ${totalWords}</p>
        <p>Score 1: ${scoreCounts[1]}</p>
        <p>Score 2: ${scoreCounts[2]}</p>
        <p>Score 3: ${scoreCounts[3]}</p>
        <p>Score 4: ${scoreCounts[4]}</p>
        <p>Score 5: ${scoreCounts[5]}</p>
        <p>Score 6: ${scoreCounts[6]}</p>
        <hr>
        <p><strong>Words Found:</strong></p>
        ${wordList.join("")}
    `;
}

//✅ Attach event listener below everything
document.addEventListener("DOMContentLoaded", () => {
    const letterInput = document.getElementById("letterInput");
    letterInput.addEventListener("input", () => displayLetterScoreStats(letterInput.value));
});






document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM Loaded - Script is Running");

    const letterInputOne = document.getElementById("letterInputOne");
    const scoreDisplayOne = document.getElementById("scoreDisplayOne");

    if (!letterInputOne) {
        console.error("❌ ERROR: `letterInput` field NOT found in HTML.");
        return;
    }
    if (!scoreDisplayOne) {
        console.error("❌ ERROR: `scoreDisplay` element NOT found in HTML.");
        return;
    }

    // ✅ Attach event listener to update when typing
    letterInputOne.addEventListener("input", () => {
        displayLetterScoreStatsOne(letterInputOne.value);
    });

    console.log("✅ Event Listener Attached");
});

// ✅ Function to Display Stats for Words That Start with the Letter
function displayLetterScoreStatsOne(letter) {
    if (letter.length !== 1) {
        document.getElementById("scoreDisplayOne").innerHTML = "Type a single letter.";
        return;
    }

    letter = letter.toUpperCase();
    let scoreCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    let totalWords = 0;
    let wordGroups = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };

    // ✅ Filter only words that START with the letter
    wordleWords.forEach(entry => {
        if (entry.word.startsWith(letter)) {
            let score = entry.myScore || 0;
            scoreCounts[score]++;
            totalWords++;
            wordGroups[score].push(`${entry.word} (Date: ${entry.gameDate})`);
        }
    });

    // ✅ Generate Display Output
    let outputHTML = `
        <p><strong>Total words starting with '${letter}': ${totalWords}</strong></p>
        <p>Score 0: ${scoreCounts[0]}</p>
        <p>Score 1: ${scoreCounts[1]}</p>
        <p>Score 2: ${scoreCounts[2]}</p>
        <p>Score 3: ${scoreCounts[3]}</p>
        <p>Score 4: ${scoreCounts[4]}</p>
        <p>Score 5: ${scoreCounts[5]}</p>
        <p>Score 6: ${scoreCounts[6]}</p>
        <p>Score 7: ${scoreCounts[7]}</p>
        <hr>
    `;

    // ✅ Append word lists under each score category
    for (let i = 0; i <= 7; i++) {
        if (wordGroups[i].length > 0) {
            outputHTML += `<p><strong>Words with Score ${i}:</strong></p><p>${wordGroups[i].join("<br>")}</p>`;
        }
    }

    document.getElementById("scoreDisplayOne").innerHTML = outputHTML;
}

















