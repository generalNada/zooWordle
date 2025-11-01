import { fixedWordsLarge } from "../../theWholeEnchilada.js";

// Analyze letter frequency in fixedWordsLarge
function analyzeLetterFrequency() {
  const letterStats = {};
  const positionTotals = Array(5).fill(0); // Tracks number of words long enough for each position

  fixedWordsLarge.forEach((word) => {
    [...word.toUpperCase()].forEach((letter, index) => {
      if (index < 5) positionTotals[index]++;

      if (!letterStats[letter]) {
        letterStats[letter] = { total: 0, positions: [0, 0, 0, 0, 0] };
      }
      letterStats[letter].total++;
      letterStats[letter].positions[index]++;
    });
  });

  return { letterStats, positionTotals };
}

// Display clickable letters with their occurrence count
function displayLetterDropdown() {
  const { letterStats } = analyzeLetterFrequency();
  const dropdown = document.getElementById("letterDropdown");

  dropdown.innerHTML = '<option value="">-- Select a letter --</option>'; // Default option

  Object.keys(letterStats).forEach((letter) => {
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = `${letter} (${letterStats[letter].total})`;
    dropdown.appendChild(option);
  });

  console.log("✅ Dropdown populated with letters.");
}
// function displayLetterFrequency() {
//     const { letterStats } = analyzeLetterFrequency();
//     const outputDiv = document.getElementById("letterFrequencyOutput");

//     outputDiv.innerHTML = "<strong>Click a letter:</strong><br>";
//     Object.keys(letterStats).forEach(letter => {
//         const letterLink = document.createElement("a");
//         letterLink.href = "#";
//         letterLink.textContent = `${letter} (${letterStats[letter].total})`;
//         letterLink.setAttribute("data-letter", letter);
//         outputDiv.appendChild(letterLink);
//         outputDiv.appendChild(document.createTextNode(" "));
//         outputDiv.style.color = "rgb(5, 20, 86)";
//     });
// }

// Display words containing selected letter
function displayWordsByLetter(letter) {
  const resultDiv = document.getElementById("letterSearchResults");
  const filteredWords = fixedWordsLarge.filter((word) =>
    word.toUpperCase().includes(letter)
  );

  if (filteredWords.length === 0) {
    resultDiv.innerHTML = `No words found containing "${letter}".`;
    return;
  }

  let outputHtml = `<strong>Words containing ${letter}:</strong><br>`;
  outputHtml += filteredWords
    .map((word) => {
      return `<span class="word-item" data-word="${word}" data-letter="${letter}">${word}</span>`;
    })
    .join(", ");

  resultDiv.innerHTML = outputHtml;
}

// Highlight letter occurrences at the given position
function highlightLetterAtPosition() {
  const position = parseInt(document.getElementById("positionInput").value, 10);
  if (isNaN(position) || position < 1 || position > 5) {
    alert("Enter a valid position between 1 and 5.");
    return;
  }

  const words = document.querySelectorAll(".word-item");
  let letter = null;
  let matchCount = 0;

  words.forEach((wordSpan) => {
    let word = wordSpan.getAttribute("data-word");
    letter = wordSpan.getAttribute("data-letter");

    let highlightedWord = [...word]
      .map((char, index) =>
        char.toUpperCase() === letter.toUpperCase() && index + 1 === position
          ? `<span class="highlight">${char}</span>` // Highlight in red italic
          : char
      )
      .join("");

    wordSpan.innerHTML = highlightedWord;
    if (word[position - 1].toUpperCase() === letter.toUpperCase()) {
      matchCount++;
    }
  });

  // Show stats on letter occurrence at the selected position
  if (letter) {
    const { letterStats, positionTotals } = analyzeLetterFrequency();
    const totalPossible = positionTotals[position - 1]; // Words long enough for this position
    const percentage = ((matchCount / totalPossible) * 100).toFixed(2);

    document.getElementById("letterSearchResults").innerHTML += `
            <br><strong>${letter} at position ${position}:</strong> ${matchCount} occurrences 
            (${percentage}% of ${totalPossible} possible occurrences)
        `;
  }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  displayLetterDropdown();
  // displayLetterFrequency();

  document
    .getElementById("letterDropdown")
    .addEventListener("change", function () {
      const letter = this.value;
      if (letter) {
        displayWordsByLetter(letter);
      }
    });

  // document.getElementById("letterFrequencyOutput").addEventListener("click", event => {
  //     if (event.target.tagName === "A") {
  //         const letter = event.target.getAttribute("data-letter");
  //         displayWordsByLetter(letter);
  //     }
  // });

  document
    .getElementById("highlightButton")
    .addEventListener("click", highlightLetterAtPosition);

  console.log("✅ JavaScript is running!");

  const buttonShow = document.querySelector(".toggleShow");
  const linkBlock = document.querySelector("#hidden");

  if (buttonShow && linkBlock) {
    buttonShow.addEventListener("click", () => {
      linkBlock.classList.toggle("show");
      console.log("🔄 Toggled linkBlock visibility");

      // Delay execution to ensure elements are visible before modifying them
      setTimeout(highlightLinks, 100);
    });
  } else {
    console.warn("⚠️ Could not find .toggleShow or #hidden elements!");
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("✅ JavaScript is running!");

//     const buttonShow = document.querySelector(".toggleShow");
//     const linkBlock = document.querySelector("#hidden");

//     if (buttonShow && linkBlock) {
//         buttonShow.addEventListener("click", () => {
//             linkBlock.classList.toggle("show");
//             console.log("🔄 Toggled linkBlock visibility");

//             // Delay execution to ensure elements are visible before modifying them
//             setTimeout(highlightLinks, 100);
//         });
//     } else {
//         console.warn("⚠️ Could not find .toggleShow or #hidden elements!");
//     }
