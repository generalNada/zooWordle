document.addEventListener("DOMContentLoaded", () => {
  // IndexedDB Variables
  let db;
  let currentId = null; // Tracks the currently selected ID

  // Open (or create) the database
  const request = indexedDB.open("scheduleOneDB", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore("days", { keyPath: "id" });
    store.createIndex("date", "date", { unique: false });
    console.log("IndexedDB setup complete!");
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database connected!");
  };

  request.onerror = (event) => {
    console.error("Error connecting to IndexedDB:", event.target.errorCode);
  };

  // UI Element References
  const addDayBtn = document.getElementById("addDayBtn");
  const viewDaysBtn = document.getElementById("viewDaysBtn");
  const searchNotesBtn = document.getElementById("searchNotesBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const addDaySection = document.getElementById("addDaySection");
  const viewDaysSection = document.getElementById("viewDaysSection");
  const searchNotesSection = document.getElementById("searchNotesSection");
  const closeButtons = document.querySelectorAll(".close");
  const addDayForm = document.getElementById("addDayForm");
  const daysList = document.getElementById("daysList");
  const notesSection = document.getElementById("notesSection");
  const notesList = document.getElementById("notesList");
  const currentIdDisplay = document.getElementById("currentId");
  const addNoteForm = document.getElementById("addNoteForm");

  // Show/Hide Sections
  addDayBtn.addEventListener("click", () => toggleSection(addDaySection));
  viewDaysBtn.addEventListener("click", () => toggleSection(viewDaysSection));
  searchNotesBtn.addEventListener("click", () =>
    toggleSection(searchNotesSection)
  );
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.add("hidden");
    });
  });

  function toggleSection(section) {
    section.classList.toggle("hidden");
  }


  viewDaysBtn.addEventListener("click", () => {
    daysList.innerHTML = ""; // Clear the list before fetching data

    const transaction = db.transaction(["days"], "readonly");
    const store = transaction.objectStore("days");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const days = getAllRequest.result;

      if (days.length === 0) {
        daysList.innerHTML =
          "<li>No days found. Add a day to get started!</li>";
        return;
      }

      days.forEach((day) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${day.id}, Date: ${day.date}`;
        listItem.classList.add("day-item");

        // "Manage Notes" click functionality
        listItem.addEventListener("click", () => {
          showNotesForId(day.id);
        });

        // Add Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent triggering "Manage Notes"
          deleteId(day.id);
        });

        listItem.appendChild(deleteBtn);
        daysList.appendChild(listItem);
      });
    };

    getAllRequest.onerror = () => {
      console.error("Error fetching days from IndexedDB");
    };
  });

  // Delete ID/Date Functionality
  function deleteId(id) {
    if (
      confirm(
        `Are you sure you want to delete ID: ${id}? This will remove all associated notes.`
      )
    ) {
      const transaction = db.transaction(["days"], "readwrite");
      const store = transaction.objectStore("days");

      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = () => {
        alert(`ID: ${id} has been deleted successfully.`);
        viewDaysBtn.click(); // Refresh the list
      };

      deleteRequest.onerror = () => {
        console.error(`Error deleting ID: ${id}`);
      };
    }
  }

  function showNotesForId(id) {
    currentId = id;
    currentIdDisplay.textContent = id;
    notesList.innerHTML = ""; // Clear previous notes

    const transaction = db.transaction(["days"], "readonly");
    const store = transaction.objectStore("days");
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const day = getRequest.result;

      if (day && day.notes.length > 0) {
        day.notes.forEach((note, index) => {
          const listItem = document.createElement("li");
          listItem.classList.add("note-item");
          listItem.dataset.noteIndex = index;

          // Create the note content container
          const noteContent = document.createElement("span");
          noteContent.classList.add("note-content");

          // Check if the note is a URL
          if (note.startsWith("http://") || note.startsWith("https://")) {
            const link = document.createElement("a");
            link.href = note;
            link.textContent = note;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            noteContent.appendChild(link);
          } else {
            // Plain text note
            noteContent.textContent = note;
          }

          // Make note content editable on click
          noteContent.addEventListener("dblclick", () => {
            editNote(index, noteContent);
          });

          listItem.appendChild(noteContent);

          // Add edit button for each note
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.classList.add("edit-btn");
          editBtn.addEventListener("click", () => editNote(index, noteContent));

          // Add delete button for each note
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.classList.add("delete-btn");
          deleteBtn.addEventListener("click", () => deleteNote(index));

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("note-buttons");
          buttonContainer.appendChild(editBtn);
          buttonContainer.appendChild(deleteBtn);

          listItem.appendChild(buttonContainer);
          notesList.appendChild(listItem);
        });
      } else {
        notesList.innerHTML = "<li>No notes found for this ID.</li>";
      }
      notesSection.classList.remove("hidden");
    };

    getRequest.onerror = () => {
      console.error("Error fetching notes for ID:", id);
    };
  }

  // Add a Note
  addNoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const noteContent = document.getElementById("noteContent").value.trim();
    if (!noteContent) return;

    const transaction = db.transaction(["days"], "readwrite");
    const store = transaction.objectStore("days");
    const getRequest = store.get(currentId);

    getRequest.onsuccess = () => {
      const day = getRequest.result;
      day.notes.push(noteContent);

      const updateRequest = store.put(day);

      updateRequest.onsuccess = () => {
        alert("Note added successfully!");
        document.getElementById("noteContent").value = "";
        showNotesForId(currentId);
      };

      updateRequest.onerror = () => {
        console.error("Error updating notes for ID:", currentId);
      };
    };

    getRequest.onerror = () => {
      console.error("Error fetching day for adding a note:", currentId);
    };
  });

  // Delete a Note
  function deleteNote(noteIndex) {
    const transaction = db.transaction(["days"], "readwrite");
    const store = transaction.objectStore("days");
    const getRequest = store.get(currentId);

    getRequest.onsuccess = () => {
      const day = getRequest.result;
      day.notes.splice(noteIndex, 1);

      const updateRequest = store.put(day);

      updateRequest.onsuccess = () => {
        alert("Note deleted successfully!");
        showNotesForId(currentId);
      };

      updateRequest.onerror = () => {
        console.error("Error updating notes for deletion:", currentId);
      };
    };

    getRequest.onerror = () => {
      console.error("Error fetching day for deleting a note:", currentId);
    };
  }

  // Edit a Note
  function editNote(noteIndex, noteElement) {
    // Get the current note text
    const currentNote =
      noteElement.textContent || noteElement.querySelector("a")?.textContent;

    // Create an input field
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentNote;
    input.classList.add("edit-input");

    // Replace the note content with input field
    const parent = noteElement.parentElement;
    parent.replaceChild(input, noteElement);
    input.focus();
    input.select();

    // Save on Enter or blur
    const saveEdit = () => {
      const newNoteContent = input.value.trim();

      if (newNoteContent && newNoteContent !== currentNote) {
        const transaction = db.transaction(["days"], "readwrite");
        const store = transaction.objectStore("days");
        const getRequest = store.get(currentId);

        getRequest.onsuccess = () => {
          const day = getRequest.result;
          day.notes[noteIndex] = newNoteContent;

          const updateRequest = store.put(day);

          updateRequest.onsuccess = () => {
            alert("Note updated successfully!");
            showNotesForId(currentId);
          };

          updateRequest.onerror = () => {
            console.error("Error updating note:", currentId);
          };
        };

        getRequest.onerror = () => {
          console.error("Error fetching day for editing a note:", currentId);
        };
      } else {
        // If no changes or empty, just reload to show original
        showNotesForId(currentId);
      }
    };

    // Cancel on Escape
    const cancelEdit = () => {
      showNotesForId(currentId);
    };

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      }
    });
  }

  // Close the Notes Section
  document
    .querySelector("#notesSection .close")
    .addEventListener("click", () => {
      notesSection.classList.add("hidden");
    });

  // Search Notes Functionality
  const searchBar = document.getElementById("searchBar");
  const searchResults = document.getElementById("searchResults");

  searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm === "") {
      searchResults.innerHTML = "";
      return;
    }

    const transaction = db.transaction(["days"], "readonly");
    const store = transaction.objectStore("days");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const days = getAllRequest.result;
      const results = [];

      // Search through all notes
      days.forEach((day) => {
        day.notes.forEach((note, index) => {
          if (note.toLowerCase().includes(searchTerm)) {
            results.push({
              id: day.id,
              date: day.date,
              note: note,
              noteIndex: index,
            });
          }
        });
      });

      // Display results
      searchResults.innerHTML = "";
      if (results.length === 0) {
        searchResults.innerHTML = "<li>No matching notes found.</li>";
      } else {
        results.forEach((result) => {
          const listItem = document.createElement("li");
          listItem.style.marginBottom = "15px";
          listItem.style.padding = "10px";
          listItem.style.border = "1px solid #ccc";
          listItem.style.borderRadius = "5px";
          listItem.style.backgroundColor = "#f9f9f9";

          const dateLabel = document.createElement("div");
          dateLabel.style.fontWeight = "bold";
          dateLabel.style.color = "#4caf50";
          dateLabel.textContent = `Date: ${result.date}`;

          const noteContent = document.createElement("div");
          noteContent.style.marginTop = "5px";

          // Check if note is a URL
          if (
            result.note.startsWith("http://") ||
            result.note.startsWith("https://")
          ) {
            const link = document.createElement("a");
            link.href = result.note;
            link.textContent = result.note;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            noteContent.appendChild(link);
          } else {
            noteContent.textContent = result.note;
          }

          listItem.appendChild(dateLabel);
          listItem.appendChild(noteContent);
          searchResults.appendChild(listItem);
        });
      }
    };

    getAllRequest.onerror = () => {
      console.error("Error searching notes");
    };
  });

  // Improve ID generation to handle legacy timestamp IDs better
  function getNextSequentialId(days) {
    if (days.length === 0) return 1;

    const ids = days
      .map((day) => {
        const idStr = day.id.toString();
        // Try to extract just the numeric part
        const match = idStr.match(/^\d+$/);
        if (match) {
          return parseInt(match[0]);
        }
        // If it contains day_ prefix or timestamp, try to extract number
        const numberMatch = idStr.match(/\d+/);
        return numberMatch ? parseInt(numberMatch[0]) : 0;
      })
      .filter((num) => num > 0); // Filter out invalid numbers

    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  // Add a Day with improved ID generation
  addDayForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("date").value.trim();

    if (!date) {
      alert("Date is required!");
      return;
    }

    const transaction = db.transaction(["days"], "readwrite");
    const store = transaction.objectStore("days");

    // Get all existing days to find the next sequential ID
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const days = getAllRequest.result;
      const id = getNextSequentialId(days).toString();
      const newDay = { id, date, notes: [] };

      const addRequest = store.add(newDay);

      addRequest.onsuccess = () => {
        alert(`Day added: Date = ${date}`);
        addDayForm.reset();
      };

      addRequest.onerror = (event) => {
        console.error("Error adding day:", event.target.error);
      };
    };

    getAllRequest.onerror = () => {
      console.error("Error fetching days to generate ID");
    };
  });

  // Clear All Data Functionality
  clearAllBtn.addEventListener("click", () => {
    // First confirmation
    if (!confirm("⚠️ WARNING: This will delete ALL your data!\n\nAre you sure you want to proceed?")) {
      return;
    }

    // Second confirmation with different wording
    if (!confirm("This action cannot be undone!\n\nType OK to confirm deletion:")) {
      return;
    }

    // Actually clear the database
    const transaction = db.transaction(["days"], "readwrite");
    const store = transaction.objectStore("days");
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      alert("✅ All data has been cleared successfully!");
      // Clear any UI that might be showing data
      daysList.innerHTML = "";
      notesList.innerHTML = "";
      searchResults.innerHTML = "";
      if (!notesSection.classList.contains("hidden")) {
        notesSection.classList.add("hidden");
      }
    };

    clearRequest.onerror = () => {
      console.error("Error clearing database");
      alert("❌ Error clearing data. Please try again.");
    };
  });
});
