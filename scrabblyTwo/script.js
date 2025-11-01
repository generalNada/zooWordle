import { fixedWordsLarge, letterValues} from '/theWholeEnchilada.js';


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
}

// Calculate and display Scrabble score
function calculateScore() {
    const input = document.getElementById("inputText").value.toUpperCase();
    const outputDiv = document.getElementById("output");
    const totalScoreEl = document.getElementById("totalScore");
    const scoreMessageEl = document.getElementById("output2");

    outputDiv.innerHTML = ""; // Clear previous results
    totalScoreEl.innerText = ""; // Clear total score
    scoreMessageEl.innerText = ""; // Clear message

    if (!fixedWordsLarge.includes(input)) {
        totalScoreEl.innerText = "That's not a valid word!";
        return;
    }

    let totalScore = 0;
    let delay = 0;

    for (let char of input) {
        if (letterValues[char]) {
            totalScore += letterValues[char];
            const letterBox = document.createElement("div");
            letterBox.classList.add("letter-box");
            
            // Create letter and value elements
            const letterEl = document.createElement("div");
            letterEl.classList.add("letter");
            letterEl.innerText = char;
            
            const valueEl = document.createElement("div");
            valueEl.classList.add("value");
            valueEl.innerText = letterValues[char];
            
            letterBox.appendChild(letterEl);
            letterBox.appendChild(valueEl);

            setTimeout(() => {
                outputDiv.appendChild(letterBox);
            }, delay);

            delay += 200;
        }
    }

    setTimeout(() => {
        totalScoreEl.innerText = `Total Scrabble Score: ${totalScore}`;
        scoreMessageEl.innerText = getScoreMessage(totalScore);
    }, delay);
}

// Generate message based on score
function getScoreMessage(totalScore) {
    if (totalScore <= 5) return "That's a terrible score.";
    if (totalScore <= 9) return "Better than that 5-point crap, but you are not good at this.";
    if (totalScore <= 11) return "Very weak, but you're trying. That's worth something they say.";
    if (totalScore <= 13) return "Now you're playing some scrabble. Not.";
    if (totalScore <= 15) return "Ok, real points. Much better.";
    if (totalScore <= 17) return "Pretty good. You are not wasting your time.";
    if (totalScore <= 19) return "Very nice. You must play a lot";
    if (totalScore <= 21) return "Okay! Now you're talking! That's really nice!";
    if (totalScore <= 23) return "Now you're pushing it, pally. Are you stashing tiles?";
    if (totalScore <= 25) return "You've got big old balls coming around here with that shit. Don't think dropping Q's and Z's and J's goes unnoticed...";
    if (totalScore <= 27) return "Maybe someone needs to teach you a little lesson, essay! We don't deal too well with cheaters around here. We are the BEST!! You were warned and now it's too late!";
    if (totalScore <= 29) return "You're dead to me, fuckface. You're ruined around here.";
    if (totalScore <= 30) return "You will be reported if you don't fuck off right this moment!";

    return "Get fucked. This is you being ghosted. You are totally unloved.";
}

// Attach filtering and scoring functionality on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("filterButton").addEventListener("click", () => {
        const prefix = document.getElementById("filterInput").value.trim();
        displayFilteredWords(prefix);
    });

    document.getElementById("scoreButton").addEventListener("click", calculateScore);
});
