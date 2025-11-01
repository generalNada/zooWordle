import { dailyWordsLarge } from "/theWholeEnchilada.js"; // Ensure correct import

// Debugging check
console.log("Is position.js running?");
console.log("Word list loaded:", dailyWordsLarge);

// Ensure DOM is loaded before execution
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded!"); // Debugging

    const inputFields = document.querySelectorAll(".letter-input");

    // Attach event listeners to each input
    inputFields.forEach(input => {
        input.addEventListener("input", filterWords);
    });

    console.log("Event listeners added to inputs:", inputFields.length);
});

// Function to filter words based on input
function filterWords() {
    console.log("filterWords() is running!"); // Debugging

    const inputs = document.querySelectorAll(".letter-input");
    const enteredLetters = Array.from(inputs).map(input => input.value.toLowerCase());

    console.log("Entered letters:", enteredLetters); // Debugging

    const filteredWords = dailyWordsLarge.filter(word => {
        if (word.length !== 5) return false; // Ensure word is 5 letters

        // Only check non-empty letters
        return enteredLetters.every((letter, index) => {
            return letter === "" || word[index].toLowerCase() === letter; // Ensure case insensitivity
        });
    });

    console.log("Filtered words:", filteredWords); // Debugging
    displayResults(filteredWords, enteredLetters);
}

function displayResults(filteredWords, enteredLetters) {
    const resultsDiv = document.getElementById("wordResults");
    const statsDiv = document.getElementById("stats");

    if (!resultsDiv) {
        console.error("Error: #wordResults div is missing from position.html");
        return;
    }

    if (!statsDiv) {
        console.error("Error: #stats div is missing from position.html");
        return;
    }

    resultsDiv.innerHTML = ""; // Clear previous results
    statsDiv.innerHTML = ""; // Clear stats

    // Display word count at the top of stats
    const wordCountParagraph = document.createElement("p");
    wordCountParagraph.innerHTML = `<strong>Matching Words:</strong> ${filteredWords.length}`;
    statsDiv.appendChild(wordCountParagraph); // Add to stats section

    if (filteredWords.length === 0) {
        resultsDiv.innerHTML = "<p>No words found</p>";
        return;
    }

    // Format words into a single paragraph, comma-separated
    const wordsParagraph = document.createElement("p");
    wordsParagraph.innerHTML = filteredWords
        .map(word =>
            word
                .split("")
                .map((char, i) => enteredLetters[i] ? `<span class="highlight">${char}</span>` : char)
                .join("")
        )
        .join(", "); // Joins words with comma + space
    resultsDiv.appendChild(wordsParagraph);

    // Compute letter frequency
    const letterCounts = {};
    enteredLetters.forEach(letter => {
        if (letter) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }
    });

    // Display stats only if `statsDiv` exists
    Object.entries(letterCounts).forEach(([letter, count]) => {
        const percent = ((count / filteredWords.length) * 100).toFixed(2);
        statsDiv.innerHTML += `<p>${letter.toUpperCase()}: ${count} times (${percent}%)</p>`;
    });
}

