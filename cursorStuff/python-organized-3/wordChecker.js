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
      let dataReady = false;

      const sanitizeWord = (word) =>
        word
          .toUpperCase()
          .normalize("NFD")
          .replace(/[^A-Z]/g, "");

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
        negativeDetails
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
          const [availableData, unavailableData] = await Promise.all([
            fetchWordSet(AVAILABLE_PATH),
            fetchWordSet(UNAVAILABLE_PATH),
          ]);

          availableWords.clear();
          unavailableWords.clear();
          for (const word of availableData) {
            availableWords.add(word);
          }
          for (const word of unavailableData) {
            unavailableWords.add(word);
          }

          availableCountEl.textContent = availableWords.size.toLocaleString();
          unavailableCountEl.textContent =
            unavailableWords.size.toLocaleString();
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
        availableWords,
        unavailableWords,
        availableForm,
        availableInput,
        availableMessage,
        (word) => `${word} is in the available list. Give it a shot!`,
        (word) =>
          `${word} is marked as unavailable. It has likely been used already.`
      );

      handleSubmit(
        unavailableWords,
        availableWords,
        unavailableForm,
        unavailableInput,
        unavailableMessage,
        (word) => `${word} is on the unavailable list. Steer clear!`,
        (word) =>
          `${word} is not marked as unavailable. It might still be available.`
      );

      initialise();