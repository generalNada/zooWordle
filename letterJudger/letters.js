// script.js

const dbName = "letterVotesDB";
const storeName = "entries";
let db;

// Populate dropdowns with A–Z
const favoriteSelect = document.getElementById("favorite");
const leastSelect = document.getElementById("least");

// Add default option
const defaultFav = new Option("Choose your favorite letter...", "");
const defaultLeast = new Option("Choose your least favorite letter...", "");
defaultFav.disabled = true;
defaultLeast.disabled = true;
favoriteSelect.add(defaultFav);
leastSelect.add(defaultLeast);

for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const optionFav = new Option(
    `${letter} - ${getLetterPersonality(letter, false)}`,
    letter
  );
  const optionLeast = new Option(
    `${letter} - ${getLetterPersonality(letter, true)}`,
    letter
  );
  favoriteSelect.add(optionFav);
  leastSelect.add(optionLeast);
}

// Fun letter personalities
function getLetterPersonality(letter, isLeastFavorite = false) {
  if (isLeastFavorite) {
    const negativePersonalities = {
      A: "The Annoying 😤",
      B: "The Boring 😴",
      C: "The Cheater 🤥",
      D: "The Dull 🥱",
      E: "The Egotistical 🙄",
      F: "The Fake 🎭",
      G: "The Grumpy 😠",
      H: "The Harsh 😡",
      I: "The Irritating 😬",
      J: "The Jealous 😒",
      K: "The Killjoy 💀",
      L: "The Lazy 🛌",
      M: "The Mean 👿",
      N: "The Nasty 🤢",
      O: "The Obnoxious 🙃",
      P: "The Petty 😤",
      Q: "The Quarrelsome ⚔️",
      R: "The Rude 🤨",
      S: "The Selfish 💸",
      T: "The Toxic ☠️",
      U: "The Ugly 🤮",
      V: "The Vain 🪞",
      W: "The Wicked 👹",
      X: "The Xenophobic 🚫",
      Y: "The Yucky 🤧",
      Z: "The Zany 🤡",
    };
    return negativePersonalities[letter] || "The Awful";
  } else {
    const positivePersonalities = {
      A: "The Achiever ⭐",
      B: "The Bold 💪",
      C: "The Creative 🎨",
      D: "The Determined 🎯",
      E: "The Energetic ⚡",
      F: "The Friendly 🤝",
      G: "The Gentle 🌸",
      H: "The Happy 😊",
      I: "The Intelligent 🧠",
      J: "The Joyful 🎉",
      K: "The Kind 💕",
      L: "The Lovely 💖",
      M: "The Magical ✨",
      N: "The Noble 👑",
      O: "The Optimistic 🌞",
      P: "The Passionate 🔥",
      Q: "The Quirky 🤪",
      R: "The Radiant 🌟",
      S: "The Strong 💎",
      T: "The Thoughtful 💭",
      U: "The Unique 🦄",
      V: "The Vibrant 🌈",
      W: "The Wise 🦉",
      X: "The Mysterious 🔮",
      Y: "The Youthful 🌱",
      Z: "The Zealous 🚀",
    };
    return positivePersonalities[letter] || "The Awesome";
  }
}

// Open IndexedDB
const request = indexedDB.open(dbName, 1);
request.onerror = () => console.error("DB open error");
request.onsuccess = (e) => {
  db = e.target.result;
  loadStats();
  populateEditSelects();
};
request.onupgradeneeded = (e) => {
  db = e.target.result;
  db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
};

// Save new entry
document.getElementById("letterForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Add visual feedback
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "✨ Saving...";
  submitBtn.disabled = true;

  const entry = {
    name: document.getElementById("name").value.trim(),
    date: document.getElementById("date").value,
    favorite: document.getElementById("favorite").value,
    least: document.getElementById("least").value,
    timestamp: new Date().toISOString(),
  };

  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.add(entry);
  tx.oncomplete = () => {
    // Success animation
    submitBtn.textContent = "🎉 Saved!";
    submitBtn.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
      e.target.reset();
      loadStats();

      // Add pulse animation to results
      const results = document.querySelector(".results");
      results.classList.add("pulse");
      setTimeout(() => results.classList.remove("pulse"), 2000);
    }, 1500);
  };

  tx.onerror = () => {
    submitBtn.textContent = "❌ Error";
    submitBtn.style.background = "linear-gradient(45deg, #f5576c, #f093fb)";
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
    }, 2000);
  };
});

// Load and display stats
function loadStats() {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    const entries = request.result;
    const total = entries.length;

    const countLetters = (key) => {
      return entries.reduce((acc, entry) => {
        acc[entry[key]] = (acc[entry[key]] || 0) + 1;
        return acc;
      }, {});
    };

    const displayStats = (counts, targetId) => {
      const list = document.getElementById(targetId);
      list.innerHTML = "";

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      sorted.forEach(([letter, count], index) => {
        const percent = ((count / total) * 100).toFixed(1);
        const li = document.createElement("li");

        // Add rank emoji for top 3
        let rankEmoji = "";
        if (index === 0) rankEmoji = "🥇 ";
        else if (index === 1) rankEmoji = "🥈 ";
        else if (index === 2) rankEmoji = "🥉 ";

        li.innerHTML = `
          <span class="letter-rank">${rankEmoji}</span>
          <span class="letter-name">${letter}</span>
          <span class="letter-stats">${count}/${total} (${percent}%)</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${percent}%"></div>
          </div>
        `;

        // Add staggered animation delay
        li.style.animationDelay = `${index * 0.1}s`;
        li.addEventListener("mouseenter", () => {
          li.style.transform = "translateX(15px) scale(1.02)";
        });
        li.addEventListener("mouseleave", () => {
          li.style.transform = "translateX(0) scale(1)";
        });

        list.appendChild(li);
      });
    };

    displayStats(countLetters("favorite"), "favoriteStats");
    displayStats(countLetters("least"), "leastStats");
  };
}

// QUICK SAVE DATA (auto-filename)
document.getElementById("saveBtn").addEventListener("click", () => {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    const entries = request.result;

    if (entries.length === 0) {
      alert("📭 No data to save! Add some entries first.");
      return;
    }

    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });

    // Auto-generate filename with timestamp
    const now = new Date();
    const timestamp = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const fileName = `letterVotes_${timestamp}`;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(a.href);

    // Visual feedback
    const saveBtn = document.getElementById("saveBtn");
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "✅ Saved!";
    saveBtn.style.background = "linear-gradient(45deg, #00c9ff, #92fe9d)";

    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";
    }, 2000);
  };
});

// CUSTOM EXPORT DATA
document.getElementById("exportBtn").addEventListener("click", () => {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    const entries = request.result;

    if (entries.length === 0) {
      alert("📭 No data to export! Add some entries first.");
      return;
    }

    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });

    const fileName = prompt(
      "Enter filename for export (no extension):",
      "letterVotes"
    );
    if (!fileName) return;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(a.href);

    // Visual feedback
    const exportBtn = document.getElementById("exportBtn");
    const originalText = exportBtn.textContent;
    exportBtn.textContent = "✅ Exported!";
    exportBtn.style.background = "linear-gradient(45deg, #00c9ff, #92fe9d)";

    setTimeout(() => {
      exportBtn.textContent = originalText;
      exportBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
    }, 2000);
  };
});

// IMPORT DATA
// document.getElementById("importInput").addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = function (e) {
//     try {
//       const importedEntries = JSON.parse(e.target.result);

//       const tx = db.transaction(storeName, "readwrite");
//       const store = tx.objectStore(storeName);
//       importedEntries.forEach((entry) => {
//         delete entry.id; // Let IndexedDB reassign new keys
//         store.add(entry);
//       });

//       tx.oncomplete = () => {
//         alert("Data imported successfully.");
//         loadStats();
//       };
//     } catch (err) {
//       alert("Invalid file format. Please make sure it's a valid export JSON.");
//     }
//   };
//   reader.readAsText(file);
// });
document.getElementById("importInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedEntries = JSON.parse(e.target.result);

      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);

      // Clear existing data first
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        importedEntries.forEach((entry) => {
          delete entry.id; // Let IndexedDB reassign new keys
          store.add(entry);
        });

        tx.oncomplete = () => {
          alert("Data imported and existing entries overwritten successfully.");
          loadStats();
        };
      };

      clearRequest.onerror = () => {
        alert("Failed to clear existing data before import.");
      };
    } catch (err) {
      alert("Invalid file format. Please make sure it's a valid export JSON.");
    }
  };
  reader.readAsText(file);
});

// Entries Management Functionality

// Populate edit form selects and search selects
function populateEditSelects() {
  const editFavoriteSelect = document.getElementById("editFavorite");
  const editLeastSelect = document.getElementById("editLeast");

  // Clear existing options
  editFavoriteSelect.innerHTML = "";
  editLeastSelect.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const optionFav = new Option(
      `${letter} - ${getLetterPersonality(letter, false)}`,
      letter
    );
    const optionLeast = new Option(
      `${letter} - ${getLetterPersonality(letter, true)}`,
      letter
    );
    editFavoriteSelect.add(optionFav);
    editLeastSelect.add(optionLeast);
  }
}

// Populate search filter selects
function populateSearchSelects() {
  const searchFavoriteSelect = document.getElementById("searchFavorite");
  const searchLeastSelect = document.getElementById("searchLeast");

  // Clear existing options (keep the "All letters" option)
  searchFavoriteSelect.innerHTML = '<option value="">All letters</option>';
  searchLeastSelect.innerHTML = '<option value="">All letters</option>';

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    // For search filters, just show the letter without personality descriptions for cleaner UI
    const optionFav = new Option(letter, letter);
    const optionLeast = new Option(letter, letter);
    searchFavoriteSelect.add(optionFav);
    searchLeastSelect.add(optionLeast);
  }
}

// Toggle form visibility
let formVisible = false;
document.getElementById("toggleFormBtn").addEventListener("click", () => {
  const container = document.getElementById("formContainer");
  const btn = document.getElementById("toggleFormBtn");

  formVisible = !formVisible;

  if (formVisible) {
    container.classList.remove("hidden");
    btn.textContent = "➕ Hide Form";
  } else {
    container.classList.add("hidden");
    btn.textContent = "➕ Show Form";
  }
});

// Toggle entries visibility
let entriesVisible = false;
document.getElementById("toggleEntriesBtn").addEventListener("click", () => {
  const container = document.getElementById("entriesContainer");
  const btn = document.getElementById("toggleEntriesBtn");

  entriesVisible = !entriesVisible;

  if (entriesVisible) {
    container.classList.remove("hidden");
    btn.textContent = "👁️ Hide Entries";
    populateSearchSelects();
    setupSearchListeners();
    loadEntries();
  } else {
    container.classList.add("hidden");
    btn.textContent = "👁️ Show Entries";
  }
});

// Toggle data management visibility
let dataMgmtVisible = false;
document.getElementById("toggleDataMgmtBtn").addEventListener("click", () => {
  const container = document.getElementById("dataMgmtContainer");
  const btn = document.getElementById("toggleDataMgmtBtn");

  dataMgmtVisible = !dataMgmtVisible;

  if (dataMgmtVisible) {
    container.classList.remove("hidden");
    btn.textContent = "⚙️ Hide Data Management";
  } else {
    container.classList.add("hidden");
    btn.textContent = "⚙️ Show Data Management";
  }
});

// Toggle favorite stats visibility
let favoriteStatsVisible = false;
document
  .getElementById("toggleFavoriteStatsBtn")
  .addEventListener("click", () => {
    const container = document.getElementById("favoriteStatsContainer");
    const btn = document.getElementById("toggleFavoriteStatsBtn");

    favoriteStatsVisible = !favoriteStatsVisible;

    if (favoriteStatsVisible) {
      container.classList.remove("hidden");
      btn.textContent = "📊 Hide Stats";
    } else {
      container.classList.add("hidden");
      btn.textContent = "📊 Show Stats";
    }
  });

// Toggle least stats visibility
let leastStatsVisible = false;
document.getElementById("toggleLeastStatsBtn").addEventListener("click", () => {
  const container = document.getElementById("leastStatsContainer");
  const btn = document.getElementById("toggleLeastStatsBtn");

  leastStatsVisible = !leastStatsVisible;

  if (leastStatsVisible) {
    container.classList.remove("hidden");
    btn.textContent = "📊 Hide Stats";
  } else {
    container.classList.add("hidden");
    btn.textContent = "📊 Show Stats";
  }
});

// Toggle charts visibility
let chartsVisible = false;
document.getElementById("toggleChartsBtn").addEventListener("click", () => {
  const container = document.getElementById("chartsContainer");
  const btn = document.getElementById("toggleChartsBtn");

  chartsVisible = !chartsVisible;

  if (chartsVisible) {
    container.classList.remove("hidden");
    btn.textContent = "📊 Hide Charts";
    loadCharts();
  } else {
    container.classList.add("hidden");
    btn.textContent = "📊 Show Charts";
  }
});

// Global variable to store all entries for filtering
let allEntries = [];

// Load and display all entries
function loadEntries() {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    allEntries = request.result;
    applyFilters();
  };
}

// Apply current filter criteria
function applyFilters() {
  const nameFilter = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  const dateFilter = document.getElementById("searchDate").value;
  const favoriteFilter = document.getElementById("searchFavorite").value;
  const leastFilter = document.getElementById("searchLeast").value;

  let filteredEntries = allEntries.filter((entry) => {
    // Name filter (partial match, case insensitive)
    const nameMatch =
      !nameFilter || entry.name.toLowerCase().includes(nameFilter);

    // Date filter (exact match)
    const dateMatch = !dateFilter || entry.date === dateFilter;

    // Favorite letter filter (exact match)
    const favoriteMatch = !favoriteFilter || entry.favorite === favoriteFilter;

    // Least favorite letter filter (exact match)
    const leastMatch = !leastFilter || entry.least === leastFilter;

    return nameMatch && dateMatch && favoriteMatch && leastMatch;
  });
  displayEntries(filteredEntries);
  updateResultsCount(filteredEntries.length, allEntries.length);
  updateClearButtonState();
}

// Display entries in cards
function displayEntries(entries) {
  const entriesList = document.getElementById("entriesList");
  entriesList.innerHTML = "";

  if (allEntries.length === 0) {
    entriesList.innerHTML = `
      <div class="no-entries">
        <p style="text-align: center; color: #666; font-style: italic;">
          📭 No entries yet. Add some data to see it here!
        </p>
      </div>
    `;
    return;
  }

  if (entries.length === 0) {
    entriesList.innerHTML = `
      <div class="no-entries">
        <p style="text-align: center; color: #666; font-style: italic;">
          🔍 No entries match your search criteria. Try adjusting your filters.
        </p>
      </div>
    `;
    return;
  }

  // Sort by date (newest first)
  entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  entries.forEach((entry, index) => {
    const entryCard = document.createElement("div");
    entryCard.className = "entry-card";
    entryCard.style.animationDelay = `${index * 0.1}s`;

    // Parse date safely to avoid timezone issues
    const dateParts = entry.date.split("-"); // "2024-09-06" -> ["2024", "09", "06"]
    const date = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    entryCard.innerHTML = `
      <div class="entry-header">
        <div class="entry-name">👤 ${entry.name}</div>
        <div class="entry-date">🗓️${formattedDate}</div>
      </div>
      <div class="entry-details">
        <div class="entry-letter favorite-letter">
          <div>💖 Favorite</div>
          <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">
            ${entry.favorite}
          </div>
        </div>
        <div class="entry-letter least-letter">
          <div>💔 Least Favorite</div>
          <div style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">
            ${entry.least}
          </div>
        </div>
      </div>
      <div class="entry-actions">
        <button class="edit-btn" onclick="editEntry(${entry.id})">
          ✏️ Edit
        </button>
        <button class="delete-btn" onclick="deleteEntry(${entry.id})">
          🗑️ Delete
        </button>
      </div>
    `;

    entriesList.appendChild(entryCard);
  });
}

// Update results count display
function updateResultsCount(filtered, total) {
  const resultsCount = document.getElementById("resultsCount");
  if (filtered === total) {
    resultsCount.textContent = `${total} entries found`;
  } else {
    resultsCount.textContent = `${filtered} of ${total} entries found`;
  }
}

// Update clear button state
function updateClearButtonState() {
  const clearBtn = document.getElementById("clearFilters");
  const hasFilters =
    document.getElementById("searchName").value ||
    document.getElementById("searchDate").value ||
    document.getElementById("searchFavorite").value ||
    document.getElementById("searchLeast").value;

  clearBtn.disabled = !hasFilters;
}

// Setup search event listeners
function setupSearchListeners() {
  // Real-time search as you type
  document.getElementById("searchName").addEventListener("input", applyFilters);
  document
    .getElementById("searchDate")
    .addEventListener("change", applyFilters);
  document
    .getElementById("searchFavorite")
    .addEventListener("change", applyFilters);
  document
    .getElementById("searchLeast")
    .addEventListener("change", applyFilters);

  // Clear filters button
  document
    .getElementById("clearFilters")
    .addEventListener("click", clearAllFilters);
}

// Clear all filters
function clearAllFilters() {
  document.getElementById("searchName").value = "";
  document.getElementById("searchDate").value = "";
  document.getElementById("searchFavorite").value = "";
  document.getElementById("searchLeast").value = "";

  // Apply filters to refresh the display
  applyFilters();

  // Add visual feedback
  const clearBtn = document.getElementById("clearFilters");
  const originalText = clearBtn.textContent;
  clearBtn.textContent = "✨ Cleared!";
  clearBtn.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";

  setTimeout(() => {
    clearBtn.textContent = originalText;
    clearBtn.style.background = "linear-gradient(45deg, #f093fb, #f5576c)";
  }, 1500);
}

// Edit entry function
function editEntry(entryId) {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.get(entryId);

  request.onsuccess = () => {
    const entry = request.result;
    if (entry) {
      // Populate edit form
      document.getElementById("editId").value = entry.id;
      document.getElementById("editName").value = entry.name;
      document.getElementById("editDate").value = entry.date;
      document.getElementById("editFavorite").value = entry.favorite;
      document.getElementById("editLeast").value = entry.least;

      // Show modal
      document.getElementById("editModal").classList.remove("hidden");
    }
  };
}

// Delete entry function
function deleteEntry(entryId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this entry? This action cannot be undone."
  );

  if (confirmDelete) {
    // Second confirmation - more emphatic
    const finalConfirm = confirm(
      "🚨 REALLY? FINE. YOUR DATA WILL BE AFFECTED!\n\n" +
        "This entry will be permanently deleted.\n\n" +
        "Are you absolutely sure?\n\n" +
        "Click OK to DELETE THIS ENTRY\n" +
        "Click Cancel to go back"
    );

    if (!finalConfirm) {
      return; // User changed their mind
    }
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(entryId);

    request.onsuccess = () => {
      // Success feedback
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = "✅ Deleted!";
      btn.disabled = true;

      setTimeout(() => {
        loadEntries(); // This will now maintain current filters
        loadStats();

        // Show success message briefly
        const container = document.getElementById("entriesContainer");
        const successMsg = document.createElement("div");
        successMsg.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          color: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 500;
          z-index: 100;
          animation: fadeInUp 0.3s ease-out;
        `;
        successMsg.textContent = "🎉 Entry deleted successfully!";
        container.style.position = "relative";
        container.appendChild(successMsg);

        setTimeout(() => {
          if (successMsg.parentNode) {
            successMsg.remove();
          }
        }, 2000);
      }, 500);
    };

    request.onerror = () => {
      alert("Error deleting entry. Please try again.");
    };
  }
}

// Modal controls
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
});

// Click outside modal to close
document.getElementById("editModal").addEventListener("click", (e) => {
  if (e.target.id === "editModal") {
    document.getElementById("editModal").classList.add("hidden");
  }
});

// Edit form submission
document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const entryId = parseInt(document.getElementById("editId").value);
  const updatedEntry = {
    id: entryId,
    name: document.getElementById("editName").value.trim(),
    date: document.getElementById("editDate").value,
    favorite: document.getElementById("editFavorite").value,
    least: document.getElementById("editLeast").value,
    timestamp: new Date().toISOString(), // Update timestamp
  };

  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  const request = store.put(updatedEntry);

  request.onsuccess = () => {
    // Close modal
    document.getElementById("editModal").classList.add("hidden");

    // Refresh data (maintains current filters)
    loadEntries();
    loadStats();

    // Show success feedback
    const saveBtn = document.querySelector(".save-btn");
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "✅ Saved!";
    saveBtn.style.background = "linear-gradient(45deg, #4facfe, #00f2fe)";

    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
    }, 2000);
  };

  request.onerror = () => {
    alert("Error updating entry. Please try again.");
  };
});

// DELETE ALL DATA
document.getElementById("deleteAllBtn").addEventListener("click", () => {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const countRequest = store.count();

  countRequest.onsuccess = () => {
    const count = countRequest.result;

    if (count === 0) {
      alert("📭 No data to delete! The database is already empty.");
      return;
    }

    // First confirmation with save option
    const firstConfirm = confirm(
      `⚠️ DELETE ALL DATA\n\n` +
        `You have ${count} entries that will be PERMANENTLY DELETED!\n\n` +
        "💡 TIP: Consider using 'Quick Save' first to backup your data.\n\n" +
        "This action CANNOT be undone!\n\n" +
        "Do you want to proceed with deleting all data?"
    );

    if (firstConfirm) {
      // Second confirmation - more emphatic
      const finalConfirm = confirm(
        "Good. Screw your data. Hopefully it's backed up!\n\n" +
          `This will permanently delete all ${count} entries.\n\n` +
          "You really wanna do this?\n\n" +
          "Do it then. Click OK to DELETE ALL DATA.\n" +
          "Click Cancel to go back"
      );

      if (finalConfirm) {
        const deleteTx = db.transaction(storeName, "readwrite");
        const deleteStore = deleteTx.objectStore(storeName);
        const deleteRequest = deleteStore.clear();

        deleteRequest.onsuccess = () => {
          // Visual feedback
          const deleteBtn = document.getElementById("deleteAllBtn");
          const originalText = deleteBtn.textContent;
          deleteBtn.textContent = "✅ All Deleted!";
          deleteBtn.style.background =
            "linear-gradient(45deg, #ff6b6b, #ffa500)";

          // Refresh all displays
          loadStats();
          if (entriesVisible) {
            loadEntries();
          }

          setTimeout(() => {
            deleteBtn.textContent = originalText;
            deleteBtn.style.background =
              "linear-gradient(45deg, #f5576c, #f093fb)";
            alert("🗑️ All data has been permanently deleted!");
          }, 2000);
        };

        deleteRequest.onerror = () => {
          alert("❌ Error deleting data. Please try again.");
        };
      }
    }
  };
});

// Charts functionality
function loadCharts() {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    const entries = request.result;
    generateCharts(entries);
  };
}

function generateCharts(entries) {
  if (entries.length === 0) {
    document.getElementById("favoriteBars").innerHTML = `
      <div style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
        📭 No data available for charts yet!<br>Add some entries to see beautiful visualizations.
      </div>
    `;
    document.getElementById("leastBars").innerHTML = `
      <div style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
        📭 No data available for charts yet!<br>Add some entries to see beautiful visualizations.
      </div>
    `;
    return;
  }

  const total = entries.length;

  // Count letters
  const favoriteCounts = entries.reduce((acc, entry) => {
    acc[entry.favorite] = (acc[entry.favorite] || 0) + 1;
    return acc;
  }, {});

  const leastCounts = entries.reduce((acc, entry) => {
    acc[entry.least] = (acc[entry.least] || 0) + 1;
    return acc;
  }, {});

  // Generate charts
  createChart(favoriteCounts, total, "favoriteBars", "favorite");
  createChart(leastCounts, total, "leastBars", "least");

  // Generate count-based charts
  createCountChart(favoriteCounts, total, "favoriteCountBars", "favorite");
  createCountChart(leastCounts, total, "leastCountBars", "least");
}

function createChart(counts, total, containerId, chartType) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Create data for all letters A-Z
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const allLetterData = allLetters.map((letter) => [
    letter,
    counts[letter] || 0,
  ]);

  // Sort by count (highest to lowest), but keep all letters
  const sortedData = allLetterData.sort((a, b) => b[1] - a[1]);

  if (sortedData.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
        📊 No data for this chart yet!
      </div>
    `;
    return;
  }

  const maxCount = sortedData[0][1];

  sortedData.forEach(([letter, count], index) => {
    const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
    const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

    const barElement = document.createElement("div");
    barElement.className = `chart-bar ${chartType}-bar`;

    // Create gradient based on count value (all letters with same count get same color)
    const gradientVariation = getVerticalGradient(chartType, count, maxCount);

    // Get personality descriptor
    const isLeastFavorite = chartType === "least";
    const personality = getLetterPersonality(letter, isLeastFavorite);

    barElement.innerHTML = `
      <div class="chart-letter">
        ${letter}
        <div class="letter-personality">${personality}</div>
      </div>
      <div class="chart-bar-fill" style="width: 0%; background: ${gradientVariation};"></div>
      <div class="chart-value">
        ${count}/${total}
        <span class="chart-percentage">(${percentage}%)</span>
      </div>
    `;

    container.appendChild(barElement);

    // Animate bar width after a delay
    setTimeout(() => {
      const fillElement = barElement.querySelector(".chart-bar-fill");
      fillElement.style.width = `${barWidth}%`;
    }, 100 + index * 100);
  });
}

// Create count-based charts showing vote progression
function createCountChart(counts, total, containerId, chartType) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Get unique count values and sort them
  const uniqueCounts = [...new Set(Object.values(counts))].sort(
    (a, b) => b - a
  );

  if (
    uniqueCounts.length === 0 ||
    (uniqueCounts.length === 1 && uniqueCounts[0] === 0)
  ) {
    container.innerHTML = `
      <div style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
        📊 No vote data available yet!
      </div>
    `;
    return;
  }

  const maxCount = Math.max(...uniqueCounts);

  uniqueCounts.forEach((count, index) => {
    // Get all letters with this count
    const lettersWithCount = Object.entries(counts)
      .filter(([letter, letterCount]) => letterCount === count)
      .map(([letter]) => letter)
      .sort();

    const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
    const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

    const barElement = document.createElement("div");
    barElement.className = `chart-bar count-bar ${chartType}-bar`;

    // Create gradient based on count value
    const gradientVariation = getVerticalGradient(chartType, count, maxCount);

    // Get count descriptor
    const countDescriptor = getCountDescriptor(count, chartType);

    barElement.innerHTML = `
      <div class="chart-letter">
        <div class="count-value">${count}</div>
        <div class="count-descriptor">${countDescriptor}</div>
        <div class="letters-list">${lettersWithCount.join(", ")}</div>
      </div>
      <div class="chart-bar-fill" style="width: 0%; background: ${gradientVariation};"></div>
      <div class="chart-value">
        ${lettersWithCount.length} letter${
      lettersWithCount.length !== 1 ? "s" : ""
    }
        <span class="chart-percentage">(${percentage}% each)</span>
      </div>
    `;

    container.appendChild(barElement);

    // Animate bar width after a delay
    setTimeout(() => {
      const fillElement = barElement.querySelector(".chart-bar-fill");
      fillElement.style.width = `${barWidth}%`;
    }, 100 + index * 100);
  });
}

// Get descriptive text for count values
function getCountDescriptor(count, chartType) {
  const favoriteDescriptors = {
    0: "The Overlooked",
    1: "The Singleton",
    2: "The Paired",
    3: "The Trilogy",
    4: "The Quartet",
    5: "The Celebrated",
    6: "The Popular",
    7: "The Beloved",
    8: "The Adored",
    9: "The Treasured",
    10: "The Perfect Ten",
  };

  const leastDescriptors = {
    0: "The Spared",
    1: "The Disliked",
    2: "The Twice Shunned",
    3: "The Thrice Rejected",
    4: "The Quadruple Trouble",
    5: "The Unwanted",
    6: "The Despised",
    7: "The Reviled",
    8: "The Detested",
    9: "The Abhorred",
    10: "The Most Hated",
  };

  const descriptors =
    chartType === "favorite" ? favoriteDescriptors : leastDescriptors;
  return (
    descriptors[count] ||
    (chartType === "favorite"
      ? `The ${count}-Time Favorite`
      : `The ${count}-Time Reject`)
  );
}

// Generate vertical gradient based on count value (letters with same count get same color)
function getVerticalGradient(chartType, count, maxCount) {
  // Calculate position percentage based on count (0 = least popular, 1 = most popular)
  const position = maxCount > 0 ? 1 - count / maxCount : 0;

  if (chartType === "favorite") {
    // Blue theme: very bright blue at top, very dark blue at bottom (high contrast)
    const startColor = interpolateColor("#00d4ff", "#1a237e", position); // Bright cyan to very dark blue
    const endColor = interpolateColor("#40e0d0", "#0d47a1", position); // Turquoise to deep blue
    return `linear-gradient(90deg, ${startColor}, ${endColor})`;
  } else {
    // Red theme: very bright pink at top, very dark red at bottom (high contrast)
    const startColor = interpolateColor("#ff1744", "#4a0e0e", position); // Bright red to very dark red
    const endColor = interpolateColor("#ff4081", "#8e0000", position); // Bright pink to dark crimson
    return `linear-gradient(90deg, ${startColor}, ${endColor})`;
  }
}

// Helper function to interpolate between two hex colors
function interpolateColor(color1, color2, factor) {
  // Convert hex to RGB
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Update charts when stats are updated
const originalLoadStats = loadStats;
loadStats = function () {
  originalLoadStats.call(this);
  if (chartsVisible) {
    loadCharts();
  }
};
