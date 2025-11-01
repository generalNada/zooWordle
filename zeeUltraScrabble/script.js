
import { fixedWordsLarge, letterValues  } from './theWholeEnchilada.js';



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

function calculateScore() {
    const input = document.getElementById("inputText").value.toUpperCase();
    const outputDiv = document.getElementById("output");
    const totalScoreEl = document.getElementById("totalScore");
    const scoreMessageEl = document.getElementById("output2");
    const secretWord = "CORAL"; // Replace this with your desired secret word
    const secretWordTwo = "MORAL"; // Replace this with your desired secret word
    const secretWordThree = "AURAL"; // Replace this with your desired secret word
    const body = document.body; // Access the page body

    outputDiv.innerHTML = ""; // Clear previous results
    totalScoreEl.innerText = ""; // Clear total score
    scoreMessageEl.innerText = ""; // Clear message

    // Check if the secret word was entered
    if (input === secretWord) {
        body.style.backgroundColor = "red"; // Turn the page red
        return; // Skip the rest of the scoring logic
    }

    if (input === secretWordTwo) {
        body.style.backgroundColor = "black"; // Turn the page red
        return; // Skip the rest of the scoring logic
    }

    if (input === secretWordThree) {
        
        body.style.backgroundColor = "green"; // Turn the page green
        body.style.color = "blue";  //Turn the font blue
        body.style.fontSize = "5rem"; //Turn the font HUGE
        return; // Skip the rest of the scoring logic
    }






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
    if (totalScore === 5) return "That's the minimum score for a 5 point word according to Scrabble. It’s an embarrassment.";
    if (totalScore === 6) return "This is the score of like an 7 year old. 6 points is weak.";
    if (totalScore === 7) return "Choosing high value words should be left to others. You are not good at it. 7 points, hahaha!";
    if (totalScore === 8) return "Eight point Scrabble words are frequent and most adults can come up with bigger and better.";
    if (totalScore === 9) return "You're trying and that’s good. 9 points. That's worth something, or so they say.";
    if (totalScore === 10) return "10 points, 2 per letter. Much better.";
    if (totalScore === 11) return "Good. You could be in 7th grade Scrabble competitions using 11 point words.";
    if (totalScore === 12) return "Very nice. Twelve. You must play a lot";
    if (totalScore === 13) return "13’s getting goddamn solid! It’s evil and bad luck and you could die, but nice!";
    if (totalScore === 14) return "You're pushing it now, pally. 14 is tight stuff. Are you stashing tiles?";
    if (totalScore === 15) return "If you want to treat your fellow Scrabblers with disrespect, keep it up. They know how rare 15 point words are. Ima call you Squid";
    if (totalScore === 16) return "Do you know who I am? I am the guy who doesn’t like being bullshitted. Your 16 is too good.";
    if (totalScore === 17) return "When you’ve been around Scrabble long enough, you know how rare words valued at 17 points are. As dumbo Susan Collins might say: 'That raises concerns.'";
    if (totalScore === 18) return "No one will believe you pulled an 18 point word. They’ll be like Go take another Viagara, faker.";
    if (totalScore === 19) return "How about you come clean Mr. Mondor? You’ve got big problems with your 19s.";
    if (totalScore === 20) return "Your balls are big brah. You come here with your scores of 20 is gonna get you piped";
    if (totalScore === 21) return "You've got big old balls coming around here with that shit. Don't think dropping Q's and Z's and J's goes unnoticed.";
    if (totalScore === 22) return "Cheating is highly frowned upon in Scrabble. It’s supposed to be a friendly game. People are skeptical when they see a 22 point 5 letter word.";
    if (totalScore === 23) return "23, you fuck? Bullshit.";
    if (totalScore === 24) return "If you come off with a 24, most people know it’s bunch of crap. I agree with those people.";
    if (totalScore === 25) return "Maybe you need to be taught a lesson because 25 points is a big time word. There aren’t many of them.";
    if (totalScore === 26) return "No one likes or wants to be around people who are so insecure they need to lie about getting 26 point words.";
    if (totalScore === 27) return "If you are a 27 point scorer, most people know it’s bunch of bullshit. I agree with them.";
    if (totalScore === 28) return "You gonna get beaten down, essay! 28? You trying to keep us down, make us look uneducated!";
    if (totalScore === 29) return "You're dead to me, fuckface. 29 is next to impossible. You're ruined around here.";
    if (totalScore === 30) return "You will be reported for this score of 30 if you don't fuck off right this moment!";
    return "Consider the authorities called. You need to hide out, bitch-ass!";
}



// Filter words by Scrabble score
function filterWordsByScore(score) {
    const wordsWithScore = fixedWordsLarge.filter(word => {
        let totalScore = 0;
        for (let char of word) {
            if (letterValues[char.toUpperCase()]) {
                totalScore += letterValues[char.toUpperCase()];
            }
        }
        return totalScore === score;
    });
    return wordsWithScore;
}

// Display words by score
function displayWordsByScore() {
    const scoreInput = parseInt(document.getElementById("scoreInput").value.trim(), 10);
    const resultDiv = document.getElementById("scoreOutput");

    if (isNaN(scoreInput) || scoreInput <= 0) {
        resultDiv.innerHTML = "Please enter a valid score.";
        return;
    }

    const words = filterWordsByScore(scoreInput);
    const wordCount = words.length;

    resultDiv.innerHTML = wordCount > 0
        ? `<strong>Score:</strong> ${scoreInput}<br><strong>Word Count:</strong> ${wordCount}<br><br>${words.join(', ')}`
        : `No words found with the score of ${scoreInput}.`;
}






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
}


function analyzeLetterFrequency() {
    const letterStats = {};
    const positionTotals = [0, 0, 0, 0, 0]; // Tracks the number of words with each position available

    // Loop through each word in the word list
    fixedWordsLarge.forEach((word) => {
        [...word.toUpperCase()].forEach((letter, index) => {
            // Increment position availability
            if (index < 5) positionTotals[index]++;

            // Initialize stats for the letter if not already added
            if (!letterStats[letter]) {
                letterStats[letter] = { counts: [0, 0, 0, 0, 0], total: 0 };
            }

            // Increment the position-specific count and total count for the letter
            letterStats[letter].counts[index] = (letterStats[letter].counts[index] || 0) + 1;
            letterStats[letter].total++;
        });
    });

    // Calculate percentages and add position totals
    Object.keys(letterStats).forEach((letter) => {
        letterStats[letter].percentages = letterStats[letter].counts.map((count, index) => {
            const possibleOccurrences = positionTotals[index]; // Total words long enough for this position
            return {
                count,
                percentage: ((count / possibleOccurrences) * 100).toFixed(2),
                possibleOccurrences
            };
        });
    });

    return letterStats;
}

function displayLetterFrequencyStats() {
    const resultDiv = document.getElementById("letterFrequencyOutput");
    const letterStats = analyzeLetterFrequency();

    // Clear any existing content
    resultDiv.innerHTML = "<strong>Letter Frequency Analysis:</strong><br><br>";

    // Create clickable links for each letter
    Object.keys(letterStats).forEach((letter) => {
        const letterLink = document.createElement("a");
        letterLink.href = "#";
        letterLink.textContent = `${letter} (${letterStats[letter].total})`;
        letterLink.style.marginRight = "10px";
        letterLink.style.textDecoration = "underline";
        letterLink.style.cursor = "pointer";

        // Create a div to show/hide stats for this letter
        const statsDiv = document.createElement("div");
        statsDiv.id = `stats-${letter}`;
        statsDiv.style.display = "none"; // Initially hidden

        const { percentages } = letterStats[letter];
        let statsHtml = "";
        percentages.forEach(({ count, percentage, possibleOccurrences }, index) => {
            statsHtml += `Position ${index + 1}: ${count} occurrences (${percentage}%) out of ${possibleOccurrences} possible occurrences<br>`;
        });
        statsDiv.innerHTML = statsHtml;

        // Add click event to toggle stats visibility
        letterLink.addEventListener("click", (event) => {
            event.preventDefault();
            statsDiv.style.display = statsDiv.style.display === "none" ? "block" : "none";
        });

        // Append the letter link and stats div to the output container
        resultDiv.appendChild(letterLink);
        resultDiv.appendChild(statsDiv);
    });
}



// Attach filtering and scoring functionality on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("filterButton").addEventListener("click", () => {
        const prefix = document.getElementById("filterInput").value.trim();
        displayFilteredWords(prefix);
    });

    document.getElementById("scoreButton").addEventListener("click", calculateScore);
    document.getElementById("filterByScore").addEventListener("click", displayWordsByScore);
    document.getElementById("analyzeLetterFrequency").addEventListener("click", displayLetterFrequencyStats);
    document.getElementById("analyzeVowelUsage").addEventListener("click", displayVowelStats);
    document.getElementById("pageHeader").addEventListener("click", () => {
        document.body.style.backgroundColor = ""; // Reset to default background color
        document.body.style.color = ""; // Reset to default color
        document.body.style.fontSize = ""; // Reset to default background fontSize
    });
});

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


document.getElementById("footerClocks").style.border = "1px solid #ccc"; // Example of targeting the new ID 
// Function to format time in the "HH:MM:SS" format
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to calculate time remaining until midnight in the Eastern Time Zone
function getTimeUntilMidnightEastern() {
  const now = new Date();

  // Convert current time to Eastern Time Zone
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const midnight = new Date(easternNow);
  midnight.setHours(24, 0, 0, 0); // Set to midnight

  const diff = midnight - easternNow; // Difference in milliseconds

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to update time display every second
function updateFooter() {
  const now = new Date();

  // Get current Eastern Time
  const easternNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  // Update current time display
  document.getElementById("currentTime").textContent = `Current Eastern Time: ${formatTime(
    easternNow
  )}`;

  // Update countdown to midnight
  document.getElementById("countdownToMidnight").textContent = `Countdown to, er, Midnight: ${getTimeUntilMidnightEastern()}`;
}

// Start the clock
setInterval(updateFooter, 1000);
updateFooter(); // Initial call



