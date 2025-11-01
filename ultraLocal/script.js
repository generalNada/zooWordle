// DOM Elements
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");
const searchInput = document.getElementById("searchInput");
const dateInput = document.getElementById("dateInput");
const toggleNotesBtn = document.getElementById("toggleNotesBtn");

// Load notes when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
  // Hide notes by default
  noteList.style.display = "none";
  toggleNotesBtn.textContent = "Show Notes";
});

// Toggle notes visibility
// Ensure that when showing, we also re-render from storage so notes are retrievable
if (toggleNotesBtn) {
  toggleNotesBtn.addEventListener("click", () => {
    if (noteList.style.display === "none") {
      // Always render from storage when showing
      const notes = getNotesFromStorage();
      renderNotes(notes);
      noteList.style.display = "block";
      toggleNotesBtn.textContent = "Hide Notes";
    } else {
      noteList.style.display = "none";
      toggleNotesBtn.textContent = "Show Notes";
    }
  });
}

// Helper function to check if a string is a URL
function isURL(str) {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlPattern.test(str);
}

// Helper function to find URLs in text (including URLs with text before/after)
function findURLsInText(text) {
  // Match URLs that might have @ prefix or be part of text
  // Pattern matches: http://, https://, www., or URLs starting with domain
  const urlPattern =
    /(?:^|[^@])(?:@)?(https?:\/\/[^\s]+|www\.[^\s]+\.[^\s]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+[^\s]*)/gi;
  return text.match(urlPattern) || [];
}

// Helper function to convert text with URLs into HTML with clickable links
function convertTextToLinks(text) {
  // Pattern to match URLs (including those prefixed with @)
  // Matches: @https://..., https://..., http://..., or domain-like patterns
  const urlPattern =
    /(@)?(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+\.[^\s<>"']+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?::[0-9]+)?(?:\/[^\s<>"']*)?)/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    // Extract the URL (remove @ prefix if present)
    const urlPrefix = match[1] || ""; // @ symbol if present
    const urlString = match[2]; // The actual URL

    // Normalize URL - trim and clean up
    let href = urlString.trim();
    // Remove trailing punctuation that might not be part of URL (except /)
    href = href.replace(/[.,;:!?]+$/, "");

    if (!href.startsWith("http://") && !href.startsWith("https://")) {
      href = "https://" + href;
    }

    parts.push({
      type: "link",
      href: href,
      displayText: urlPrefix + urlString,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last URL
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  // If no URLs found, return original text
  if (parts.length === 0) {
    return [{ type: "text", content: text }];
  }

  return parts;
}

function loadNotes() {
  const notes = getNotesFromStorage();
  renderNotes(notes);
}

function getNotesFromStorage() {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : []; // Parse stored notes or return an empty array
}

function saveNotesToStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes)); // Save notes array as a JSON string
}

// Add a note
addNoteBtn.addEventListener("click", () => {
  const content = noteInput.value.trim();
  if (!content) return alert("Note content cannot be empty.");

  const notes = getNotesFromStorage();
  const now = new Date();
  const newNote = {
    id: Date.now(), // Unique ID based on timestamp
    content,
    created_at: now.toISOString().split("T")[0], // Save current date
    created_time: now.toTimeString().split(" ")[0], // Save current time (HH:MM:SS)
    timestamp: now.getTime(), // Full timestamp for sorting
  };

  notes.push(newNote);
  saveNotesToStorage(notes);
  addNoteToUI(newNote);

  noteInput.value = ""; // Clear the input
});

// Render all notes with month headers
function renderNotes(notes) {
  noteList.innerHTML = ""; // Clear existing notes

  if (notes.length === 0) return;

  // Sort notes by timestamp (newest first)
  const sortedNotes = notes.sort(
    (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
  );

  // Group notes by month
  const notesByMonth = {};
  sortedNotes.forEach((note) => {
    const date = new Date(note.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!notesByMonth[monthKey]) {
      notesByMonth[monthKey] = {
        monthName,
        notes: [],
      };
    }
    notesByMonth[monthKey].notes.push(note);
  });

  // Render each month section
  Object.keys(notesByMonth).forEach((monthKey) => {
    const monthData = notesByMonth[monthKey];

    // Create month header
    const monthHeader = document.createElement("h2");
    monthHeader.className = "month-header";
    monthHeader.textContent = monthData.monthName;
    noteList.appendChild(monthHeader);

    // Render notes for this month
    monthData.notes.forEach((note) => addNoteToUI(note));
  });
}

// Add a single note to the UI
function addNoteToUI(note) {
  const li = document.createElement("li");
  li.dataset.id = note.id;
  li.className = "note-item";

  // Create note content container
  const noteContent = document.createElement("div");
  noteContent.className = "note-content";

  // Create a span for the note text with embedded links
  const noteText = document.createElement("span");
  noteText.className = "note-text";

  // Convert text with URLs into HTML elements
  const textParts = convertTextToLinks(note.content);
  const links = [];

  textParts.forEach((part) => {
    if (part.type === "link") {
      const link = document.createElement("a");
      link.href = part.href;
      link.textContent = part.displayText;
      link.target = "_blank"; // Open in new tab
      link.rel = "noopener noreferrer"; // Security best practice
      link.className = "note-link";
      noteText.appendChild(link);
      links.push(link);
    } else {
      const textNode = document.createTextNode(part.content);
      noteText.appendChild(textNode);
    }
  });

  // Create date/time display
  const noteDate = document.createElement("div");
  noteDate.className = "note-date";

  const date = new Date(note.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });

  const time = note.created_time || "12:00:00";
  const formattedTime = time.split(":").slice(0, 2).join(":"); // Show HH:MM only

  noteDate.innerHTML = `
    <span class="date">${formattedDate}</span>
    <span class="time">${formattedTime}</span>
  `;

  noteContent.appendChild(noteText);
  noteContent.appendChild(noteDate);

  // Create a container for controls
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "note-controls";
  controlsContainer.style.display = "none"; // Hidden by default

  // Set up link click handlers now that controlsContainer exists
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Allow navigation with Ctrl/Cmd+click
      if (e.ctrlKey || e.metaKey) {
        return; // Let default behavior happen
      }

      // If controls are visible, allow navigation
      if (controlsContainer.style.display !== "none") {
        return; // Let default behavior happen
      }

      // Otherwise, prevent navigation and show controls
      e.preventDefault();
      e.stopPropagation();

      // Show controls
      document.querySelectorAll(".note-controls").forEach((controls) => {
        if (controls !== controlsContainer) {
          controls.style.display = "none";
        }
      });

      controlsContainer.style.display = "inline";
    });
  });

  // Create Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const input = document.createElement("input");
    input.type = "text";
    input.value = note.content;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    li.innerHTML = ""; // Clear current content
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const newContent = input.value.trim();
      if (!newContent) return alert("Note content cannot be empty.");

      const notes = getNotesFromStorage();
      const noteToUpdate = notes.find((n) => n.id === note.id);
      noteToUpdate.content = newContent;

      saveNotesToStorage(notes);
      renderNotes(notes);
    });
  });

  // Create Delete button with two confirmations (no timeout)
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  let deleteClickCount = 0;
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    deleteClickCount++;

    if (deleteClickCount === 1) {
      deleteBtn.textContent = "Click again to confirm";
    } else if (deleteClickCount === 2) {
      deleteBtn.textContent = "Click once more to delete";
    } else if (deleteClickCount >= 3) {
      const notes = getNotesFromStorage();
      const updatedNotes = notes.filter((n) => n.id !== note.id);
      saveNotesToStorage(updatedNotes);
      renderNotes(updatedNotes);
    }
  });

  // Create Save and Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Save and Remove";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    li.remove(); // Remove the note from the UI only
  });

  // Add controls to container
  controlsContainer.appendChild(editBtn);
  controlsContainer.appendChild(deleteBtn);
  controlsContainer.appendChild(removeBtn);

  // Prevent any clicks on controls from bubbling up
  controlsContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Add click event to the list item (bullet area) to toggle controls
  li.addEventListener("click", (e) => {
    // Don't toggle if clicking on buttons or controls container
    if (
      e.target.tagName === "BUTTON" ||
      e.target.closest(".note-controls") ||
      e.target.closest("button")
    ) {
      return;
    }

    // For links, the link's own click handler will manage showing controls
    if (e.target.tagName === "A") {
      return;
    }

    // Only toggle if clicking on the li itself or note-text span
    if (
      e.target === li ||
      e.target === noteText ||
      e.target.closest(".note-content")
    ) {
      // Hide all other controls first
      document.querySelectorAll(".note-controls").forEach((controls) => {
        if (controls !== controlsContainer) {
          controls.style.display = "none";
        }
      });

      // Toggle current controls
      if (controlsContainer.style.display === "none") {
        controlsContainer.style.display = "inline";
      } else {
        controlsContainer.style.display = "none";
      }
    }
  });

  li.appendChild(noteContent);
  li.appendChild(controlsContainer);
  noteList.appendChild(li);
}

// Filter notes by text
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const notes = getNotesFromStorage();
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchText)
  );
  renderNotes(filteredNotes);
  // Show notes when searching
  if (searchText.length > 0) {
    noteList.style.display = "block";
    toggleNotesBtn.textContent = "Hide Notes";
  }
});

// Filter notes by date
dateInput.addEventListener("change", () => {
  const selectedDate = dateInput.value;
  const notes = getNotesFromStorage();
  const filteredNotes = notes.filter(
    (note) => note.created_at === selectedDate
  );
  renderNotes(filteredNotes);
  // Show notes when filtering by date
  if (selectedDate) {
    noteList.style.display = "block";
    toggleNotesBtn.textContent = "Hide Notes";
  }
});
