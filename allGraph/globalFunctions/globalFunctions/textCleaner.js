const censorshipMap = {
  ninja: "karate",
  man: "aliens",
  hi: "fuck",
  there: "off",
};

function cleanText(text) {
  let cleaned = text;
  for (const [badWord, replacement] of Object.entries(censorshipMap)) {
    const regex = new RegExp(badWord, "gi");
    cleaned = cleaned.replace(regex, (match) => {
      return match[0] === match[0].toUpperCase()
        ? replacement[0].toUpperCase() + replacement.slice(1)
        : replacement;
    });
  }
  return cleaned;
}

// Store original text content in a Map
const originalTextMap = new Map();

function toggleCleanText(node, enableCleaner) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (enableCleaner) {
      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, node.textContent); // Save original
      }
      node.textContent = cleanText(originalTextMap.get(node));
    } else if (originalTextMap.has(node)) {
      node.textContent = originalTextMap.get(node); // Restore original
    }
  } else {
    node.childNodes.forEach((child) => toggleCleanText(child, enableCleaner));
  }
}

let cleanerEnabled = false;

document.getElementById("toggleCleanerBtn").addEventListener("click", () => {
  cleanerEnabled = !cleanerEnabled;
  document.getElementById("toggleCleanerBtn").textContent = `Text Cleaner: ${
    cleanerEnabled ? "ON" : "OFF"
  }`;
  toggleCleanText(document.body, cleanerEnabled);
});
