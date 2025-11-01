import { fixedWordsLarge } from '/theWholeEnchilada.js';
// Filter words by prefix
function filterWordsByPrefix(prefix) {
    return fixedWordsLarge.filter(word => word.startsWith(prefix.toUpperCase()));
}


// Display filtered words and word count
function displayFilteredWords(prefix) {
    const resultDiv = document.getElementById('wordListOutput');
    const words = filterWordsByPrefix(prefix);
    const wordCount = words.length; // Calculate the word count

    resultDiv.innerHTML = words.length > 0
        ? `<strong>Word Count:</strong> ${wordCount}<br><br>${words.join(', ')}`
        : 'No words found.';

    // Make sure the result is visible when displaying filtered words
    resultDiv.style.display = "block";
}

// Hide Filtered Words
function hideFilteredWords() {
    const resultDiv = document.getElementById('wordListOutput');
    // Toggle visibility using CSS display property
    resultDiv.style.display = resultDiv.style.display === "none" ? "block" : "none";
}

// Attach filtering and hiding functionality on page load
window.addEventListener('DOMContentLoaded', () => {
    // Filter Words by Prefix
    document.getElementById("filterButton").addEventListener("click", () => {
        const prefix = document.getElementById("filterInput").value.trim();
        displayFilteredWords(prefix);
    });

    // Hide Filtered Words
    document.getElementById("hideWordOutput").addEventListener("click", hideFilteredWords);
});
