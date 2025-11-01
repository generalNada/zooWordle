let s = "Ok man";
console.log(s)
import { fixedWordsLarge } from '/theWholeEnchilada.js';

// Filter words by letter and position
function filterWordsByLetterAndPosition(letter, position) {
    const positionIndex = position - 1; // Convert position to zero-based index
    return fixedWordsLarge.filter(word => word[positionIndex] === letter.toUpperCase());
}

// Display filtered words and their count based on letter and position
function displayWordsByLetterAndPosition() {
    const letter = document.getElementById("letterInput").value.trim().toUpperCase();
    const position = parseInt(document.getElementById("positionInput").value.trim(), 10);
    const resultDiv = document.getElementById("letterPositionOutput");

    // Validate inputs
    if (!letter || letter.length !== 1 || !/[A-Z]/.test(letter)) {
        resultDiv.innerHTML = "Please enter a valid single letter (A-Z).";
        return;
    }
    if (isNaN(position) || position <= 0) {
        resultDiv.innerHTML = "Please enter a valid position (greater than 0).";
        return;
    }

    // Filter and display words
    const words = filterWordsByLetterAndPosition(letter, position);
    const wordCount = words.length;

    resultDiv.innerHTML = wordCount > 0
        ? `<strong>Letter:</strong> ${letter}<br><strong>Position:</strong> ${position}<br><strong>Word Count:</strong> ${wordCount}<br><br>${words.join(', ')}`
        : `No words found with "${letter}" in position ${position}.`;
}

// Attach event listener for the button
document.getElementById("filterByLetterAndPosition").addEventListener("click", displayWordsByLetterAndPosition);


console.log(fixedWordsLarge);
