let y = "What a Day!";
console.log(y);

import { fixedWordsLarge, letterValues } from '/theWholeEnchilada.js';
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


window.addEventListener('DOMContentLoaded', () => {
    // Only test the Calculate Score button
    document.getElementById("scoreButton").addEventListener("click", calculateScore);
});


