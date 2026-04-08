import { wordleWords } from "../../theWholeEnchilada.js";
const AVAILABLE_PATH = "./available.py";
const UNAVAILABLE_PATH = "./unavailable.py";

const availableCountEl = document.getElementById("available-count");
const unavailableCountEl = document.getElementById("unavailable-count");
const dataStatusEl = document.getElementById("data-status");

const availableForm = document.getElementById("available-form");
const unavailableForm = document.getElementById("unavailable-form");
const availableInput = document.getElementById("available-input");
const unavailableInput = document.getElementById("unavailable-input");
const availableMessage = document.getElementById("available-message");
const unavailableMessage = document.getElementById("unavailable-message");
const messageTemplate = document.getElementById("message-template");

const availableWords = new Set();
const unavailableWords = new Set();
const unavailableWordCounts = new Map(); // Track count of each word in unavailable list
let dataReady = false;

const sanitizeWord = (word) =>
  word
    .toUpperCase()
    .normalize("NFD")
    .replace(/[^A-Z]/g, "");

const wordleWordDetails = new Map();
for (const entry of wordleWords) {
  const key = sanitizeWord(entry.word);
  const existing = wordleWordDetails.get(key) || [];
  existing.push(entry);
  wordleWordDetails.set(key, existing);
}

function getScoreMessage(score) {
  switch (score) {
    case 0:
      return "You missed that game.";
    case 1:
      return "Legendary solve. First-try brilliance.";
    case 2:
      return "Excellent work. You were dialed in.";
    case 3:
      return "Great solve. Strong control of the board.";
    case 4:
      return "Solid game. Nice, steady solving.";
    case 5:
      return "You got there. Good grit to close it out.";
    case 6:
      return "Close call, but you still pulled it off.";
    case 7:
      return "That one got you - this round was a loss.";
    default:
      return "Score unavailable.";
  }
}

function getSingleUseMessage(word, details) {
  if (details.myScore === 0) {
    return `${word} was unplayed on ${details.gameDate}.`;
  }
  return `${word} was used on ${details.gameDate}. You scored ${details.myScore}. ${getScoreMessage(details.myScore)}`;
}

function getWordleUsageAppendix(word) {
  const detailsList = wordleWordDetails.get(word);
  if (!detailsList || detailsList.length === 0) {
    return "";
  }

  if (detailsList.length === 1) {
    return ` Yeah, ${getSingleUseMessage(word, detailsList[0])}`;
  }

  const allUses = detailsList
    .map((entry) => getSingleUseMessage(word, entry))
    .join(" ");
  return ` Yeah, ${word} has been used ${detailsList.length} times. ${allUses}`;
}

async function fetchWordSet(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  const text = await response.text();

  // Extract content between first [ or { and matching ] or }
  // This isolates only the list/set content, excluding variable assignments
  const listMatch = text.match(/[\[{]([\s\S]*?)[\]}]/);
  if (!listMatch) {
    return new Set();
  }
  const listContent = listMatch[1];

  // Match quoted strings within the list/set content only
  // Pattern matches: "word" or 'word' followed by comma or end of content
  const pattern = /["']([^"']+)["']\s*(?:,|$)/g;
  const matches = listContent.matchAll(pattern);
  const words = new Set();
  for (const match of matches) {
    const cleaned = sanitizeWord(match[1]);
    if (cleaned.length === 5) {
      words.add(cleaned);
    }
  }
  return words;
}

// Function to fetch word counts from unavailable.py
async function fetchWordCounts(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  const text = await response.text();

  // Extract content between first [ or { and matching ] or }
  const listMatch = text.match(/[\[{]([\s\S]*?)[\]}]/);
  if (!listMatch) {
    return new Map();
  }
  const listContent = listMatch[1];

  // Match quoted strings and count occurrences
  const pattern = /["']([^"']+)["']\s*(?:,|$)/g;
  const matches = listContent.matchAll(pattern);
  const wordCounts = new Map();
  for (const match of matches) {
    const cleaned = sanitizeWord(match[1]);
    if (cleaned.length === 5) {
      wordCounts.set(cleaned, (wordCounts.get(cleaned) || 0) + 1);
    }
  }
  return wordCounts;
}

function renderMessage(target, { word, status, details }) {
  const clone = messageTemplate.content.cloneNode(true);
  const wordEl = clone.querySelector(".word");
  const detailsEl = clone.querySelector(".details");

  wordEl.textContent = word;
  detailsEl.textContent = details;

  target.className = `message ${status}`;
  target.replaceChildren(clone);
}

function handleSubmit(
  primarySet,
  secondarySet,
  form,
  input,
  targetMessage,
  positiveDetails,
  negativeDetails,
) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!dataReady) {
      renderMessage(targetMessage, {
        word: "Loading",
        status: "info",
        details: "Please wait for the word lists to finish loading.",
      });
      return;
    }

    const rawValue = sanitizeWord(input.value);
    if (!rawValue || rawValue.length !== 5) {
      renderMessage(targetMessage, {
        word: "Invalid",
        status: "warning",
        details: "Please Enter A Valid Word",
      });
      return;
    }

    if (primarySet.has(rawValue)) {
      renderMessage(targetMessage, {
        word: rawValue,
        status: "success",
        details: positiveDetails(rawValue),
      });
    } else {
      // If not in primary set, it's unavailable (whether explicitly in secondary set or not)
      renderMessage(targetMessage, {
        word: rawValue,
        status: "warning",
        details: negativeDetails(rawValue),
      });
    }
  });
}

async function initialise() {
  try {
    const [availableData, unavailableData, unavailableCountsData] =
      await Promise.all([
        fetchWordSet(AVAILABLE_PATH),
        fetchWordSet(UNAVAILABLE_PATH),
        fetchWordCounts(UNAVAILABLE_PATH),
      ]);

    availableWords.clear();
    unavailableWords.clear();
    unavailableWordCounts.clear();

    for (const word of availableData) {
      availableWords.add(word);
    }
    for (const word of unavailableData) {
      unavailableWords.add(word);
    }
    for (const [word, count] of unavailableCountsData) {
      unavailableWordCounts.set(word, count);
    }

    availableCountEl.textContent = availableWords.size.toLocaleString();
    unavailableCountEl.textContent = unavailableWords.size.toLocaleString();
    dataStatusEl.textContent = "Loaded";
    dataStatusEl.classList.add("loaded");
    dataReady = true;
  } catch (error) {
    console.error(error);
    dataStatusEl.textContent = "Error loading lists";
    dataStatusEl.classList.add("error");
  }
}

handleSubmit(
  unavailableWords,
  availableWords,
  availableForm,
  availableInput,
  availableMessage,
  (word) => {
    const count = unavailableWordCounts.get(word) || 0;
    const usageAppendix = getWordleUsageAppendix(word);
    if (count > 1) {
      return `${word} appears in prior Wordle data ${count} times, but feel free to try it again.${usageAppendix}`;
    }
    return `${word} appears in prior Wordle data, but feel free to try it again.${usageAppendix}`;
  },
  (word) =>
    `${word} is not marked as unavailable, however, it might still be available. Wordle began repeating words on February 2, 2026 - a historical day in the game!!`,
);

handleSubmit(
  availableWords,
  unavailableWords,
  unavailableForm,
  unavailableInput,
  unavailableMessage,
  (word) =>
    `${word} has never been used by Wordle so it's in the Available list. Feel free to guess ${word}!`,
  (word) =>
    `${word} was not found in the Available list so it's been used by Wordle.${getWordleUsageAppendix(word)}`,
);

initialise();
