import { fixedWordsLarge } from '/theWholeEnchilada.js';

function analyzeVowelUsage() {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const vowelStats = {};

    vowels.forEach(vowel => {
        vowelStats[vowel] = { count: 0, positions: [0, 0, 0, 0, 0] };
    });

    fixedWordsLarge.forEach(word => {
        [...word.toUpperCase()].forEach((char, index) => {
            if (vowels.includes(char)) {
                vowelStats[char].count++;
                if (index < 5) vowelStats[char].positions[index]++;
            }
        });
    });

    return vowelStats;
}

function displayVowelStats() {
    const vowelStats = analyzeVowelUsage();
    const resultDiv = document.getElementById("vowelUsageOutput");

    let output = '<strong>Vowel Usage Analysis:</strong><br>';
    for (const [vowel, stats] of Object.entries(vowelStats)) {
        output += `<strong>${vowel}:</strong> Total Count: ${stats.count}, Positions: ${stats.positions.join(', ')}<br>`;
    }

    resultDiv.innerHTML = output;
    resultDiv.style.display = "block";  // Ensure it's visible when displaying analysis
}

function hideVowelStats() {
    const resultDiv = document.getElementById("vowelUsageOutput");
    // Toggle visibility using CSS display property
    resultDiv.style.display = resultDiv.style.display === "none" ? "block" : "none";
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("analyzeVowelUsage").addEventListener("click", displayVowelStats);
    document.getElementById("hideVowelUsage").addEventListener("click", hideVowelStats);
});