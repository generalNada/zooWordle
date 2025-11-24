// QWERTY keyboard layout (top row, middle row, bottom row)
const QWERTY_LAYOUT = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",  // Top row
  "A", "S", "D", "F", "G", "H", "J", "K", "L",        // Middle row
  "Z", "X", "C", "V", "B", "N", "M"                    // Bottom row
];

// All letters for state management (alphabetical order)
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function createKeyElement(letter, isSpecialKey = false) {
  const key = document.createElement("div");
  key.className = "key";
  key.dataset.letter = letter;

  if (!isSpecialKey) {
    // Create position indicators for corners and middle (only for letter keys)
    const pos1 = document.createElement("span");
    pos1.className = "key-position pos-1";
    pos1.textContent = "1";

    const pos2 = document.createElement("span");
    pos2.className = "key-position pos-2";
    pos2.textContent = "2";

    const pos3 = document.createElement("span");
    pos3.className = "key-position pos-3";
    pos3.textContent = "3";

    const pos4 = document.createElement("span");
    pos4.className = "key-position pos-4";
    pos4.textContent = "4";

    const pos5 = document.createElement("span");
    pos5.className = "key-position pos-5";
    pos5.textContent = "5";

    key.appendChild(pos1);
    key.appendChild(pos2);
    key.appendChild(pos3);
    key.appendChild(pos4);
    key.appendChild(pos5);
  }

  const letterSpan = document.createElement("span");
  letterSpan.className = "key-letter";
  letterSpan.textContent = letter;
  key.appendChild(letterSpan);

  return key;
}

function formatPositions(prefix, positions) {
  if (!positions.size) return "";
  const sorted = Array.from(positions).sort((a, b) => a - b);
  return `${prefix}${sorted.join(",")}`;
}

export function initKeyboard(containerId, onKeyClick) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Keyboard container "${containerId}" not found.`);
    return {
      applyFeedback: () => {},
      reset: () => {},
    };
  }

  container.classList.add("virtual-keyboard");
  container.innerHTML = "";

  const state = new Map(
    LETTERS.map((letter) => [
      letter,
      {
        status: null,
        greenPositions: new Set(),
        orangePositions: new Set(),
      },
    ])
  );

  // Add keys in QWERTY layout order
  QWERTY_LAYOUT.forEach((letter) => {
    const keyElement = createKeyElement(letter);
    // Make keys clickable to input letters
    if (onKeyClick) {
      keyElement.style.cursor = "pointer";
      keyElement.addEventListener("click", () => {
        onKeyClick(letter);
      });
    }
    container.appendChild(keyElement);
  });

  // Add Backspace key at the end
  if (onKeyClick) {
    const backspaceKey = createKeyElement("⌫", true);
    backspaceKey.classList.add("backspace-key");
    backspaceKey.style.cursor = "pointer";
    backspaceKey.style.width = "80px"; // Make it wider
    backspaceKey.addEventListener("click", () => {
      onKeyClick("Backspace");
    });
    container.appendChild(backspaceKey);
  }

  function renderKey(letter) {
    const key = container.querySelector(`[data-letter="${letter}"]`);
    if (!key) return;

    const { status, greenPositions, orangePositions } = state.get(letter);
    key.classList.remove("green", "orange", "gray");
    if (status) {
      key.classList.add(status);
    }

    // Update position indicators
    for (let pos = 1; pos <= 5; pos++) {
      const posElement = key.querySelector(`.pos-${pos}`);
      if (!posElement) continue;

      posElement.classList.remove(
        "green",
        "orange",
        "gray",
        "active",
        "in-middle"
      );
      posElement.style.opacity = ""; // Reset inline opacity

      // If there are green positions, only show green positions in the middle
      if (greenPositions.size > 0) {
        if (greenPositions.has(pos)) {
          posElement.classList.add("green", "active", "in-middle");
        } else {
          // Hide all other positions when green exists
          posElement.style.opacity = "0";
        }
      } else if (orangePositions.has(pos)) {
        if (pos === 5) {
          posElement.classList.add("orange", "active", "in-middle");
        } else {
          posElement.classList.add("orange", "active");
        }
      } else if (status === "gray") {
        posElement.classList.add("gray", "active");
      }
    }
  }

  function reset() {
    state.forEach((entry, letter) => {
      entry.status = null;
      entry.greenPositions.clear();
      entry.orangePositions.clear();
      renderKey(letter);
    });
  }

  function applyFeedback(guess, feedback) {
    guess.split("").forEach((char, index) => {
      const letter = char.toUpperCase();
      if (!state.has(letter)) return;

      const entry = state.get(letter);
      const position = index + 1;
      const color = feedback[index];

      if (color === "green") {
        entry.status = "green";
        entry.greenPositions.add(position);
        entry.orangePositions.delete(position);
      } else if (color === "orange") {
        if (entry.status !== "green") {
          entry.status = "orange";
        }
        entry.orangePositions.add(position);
      } else if (color === "gray") {
        if (entry.status !== "green" && entry.status !== "orange") {
          entry.status = "gray";
        }
      }

      renderKey(letter);
    });
  }

  reset();

  return {
    applyFeedback,
    reset,
  };
}
