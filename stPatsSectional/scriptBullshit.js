// Retrieve sections from localStorage or initialize
let sections = JSON.parse(localStorage.getItem("sectionsThree")) || {};

// References
const container = document.getElementById("sectionsContainer");
let selectedSection = null;

// Render all sections on page load
document.addEventListener("DOMContentLoaded", function () {
    renderSections();
    populateFontDropdown();
});



// // Render sections
function renderSections() {
    container.innerHTML = "";

    Object.keys(sections).forEach(sectionName => {
        const sectionData = sections[sectionName];

        const section = document.createElement("div");
        section.className = "section";
        section.id = `section-${sectionName.replace(/\s+/g, "")}`;

        // Apply saved styles
        section.style.fontFamily = sectionData.fontFamily || "Arial";
        section.style.fontSize = sectionData.fontSize ? `${sectionData.fontSize}px` : "16px";
        section.style.color = sectionData.color || "#000000";
        section.style.backgroundColor = sectionData.backgroundColor || "#ffffff";

        // By default, sections start hidden unless shown
        section.style.display = sectionData.hidden ? "none" : "flex";




        const title = document.createElement("span");
        title.className = "section-title";
        title.textContent = sectionName;
        title.addEventListener("click", () => editSectionName(sectionName));

        // Hamburger + Buttons
        const menuBtn = document.createElement("button");
        menuBtn.textContent = "☰";
        menuBtn.className = "menu-btn";

        const dropdown = document.createElement("div");
        dropdown.className = "dropdown-menu";

        const styleBtn = document.createElement("button");
        styleBtn.textContent = "🎨 Style";
        styleBtn.addEventListener("click", () => openStyleModal(sectionName));

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = sectionData.hidden ? "👁 Show" : "👁 Hide";
        toggleBtn.addEventListener("click", () => toggleContent(section, toggleBtn));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑 Delete";
        deleteBtn.addEventListener("click", () => deleteSection(sectionName));

        const showInputBtn = document.createElement("button");
        showInputBtn.textContent = "➕ Add Task";

        // Section Content
        const content = document.createElement("div");
        content.className = "section-content";

        const list = document.createElement("ul");
        list.id = `${sectionName.replace(/\s+/g, "")}List`;

        const inputContainer = document.createElement("div");
        inputContainer.style.display = "none";
        inputContainer.className = "task-input-container";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add task...";
        input.id = `${sectionName.replace(/\s+/g, "")}Task`;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.addEventListener("click", () => addTask(sectionName));

        inputContainer.appendChild(input);
        inputContainer.appendChild(addBtn);

        showInputBtn.addEventListener("click", () => {
            inputContainer.style.display = inputContainer.style.display === "flex" ? "none" : "flex";
        });

        dropdown.appendChild(styleBtn);
        dropdown.appendChild(toggleBtn);
        dropdown.appendChild(deleteBtn);
        dropdown.appendChild(showInputBtn);

        menuBtn.addEventListener("click", () => {
            dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
        });

        content.appendChild(list);
        content.appendChild(inputContainer);

        section.appendChild(title);
        section.appendChild(menuBtn);
        section.appendChild(dropdown);
        section.appendChild(content);

        container.appendChild(section);

        renderTasks(sectionName);
    });
   
    saveSections();
}



function saveSections() {
    localStorage.setItem("sectionsThree", JSON.stringify(sections));
}


// Save sections
function addSection() {
    const sectionInput = document.getElementById("newSection");
    const rawName = sectionInput.value.trim();

    if (rawName === "") {
        alert("Section name cannot be empty.");
        return;
    }

    const sectionName = rawName.toLowerCase(); // Normalize
    if (sections[sectionName]) {
        alert(`Section "${rawName}" already exists.`);
        return;
    }

    // New section → default visible
    sections[sectionName] = {
        tasks: [],
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000",
        backgroundColor: "#ffffff",
        completedColor: "#888888",
        completedBg: "#f0f0f0",
        completedFontStyle: "none",
        hidden: false // 🟢 Visible when created
    };

    saveSections();
    renderSections();

    sectionInput.value = ""; // Clear input
}
// Edit section name
function editSectionName(oldName) {
    const newName = prompt("Enter new name:", oldName);
    if (newName && newName.trim() !== "" && newName !== oldName) {
        if (sections[newName]) {
            alert("A section with that name already exists.");
            return;
        }
        // Copy old data to new key
        sections[newName] = { ...sections[oldName] };
        delete sections[oldName];
        saveSections(); // Save the updated structure
        renderSections(); // Refresh UI
    }
}





// Delete section
function deleteSection(sectionName) {
    if (!confirm(`❌ Are you sure you want to delete the entire "${sectionName}" section?`)) return;
    if (!confirm("🔥 Final warning: This section and all its tasks will be permanently deleted!")) return;
    if (!confirm("🔥 Fine: This section is history!")) return;

    delete sections[sectionName];
    saveSections(); // Save after deleting
    renderSections(); // Refresh UI
}

// Toggle
function toggleContent(section, toggleBtn) {
    const sectionName = section.querySelector(".section-title").textContent;
    const content = section.querySelector(".section-content");

    if (sections[sectionName].hidden) {
        content.style.display = "block";
        toggleBtn.textContent = "👁 Hide";
        sections[sectionName].hidden = false;
    } else {
        content.style.display = "none";
        toggleBtn.textContent = "👁 Show";
        sections[sectionName].hidden = true;
    }

    saveSections();
}

// Add task
function addTask(sectionName) {
    const taskInput = document.getElementById(`${sectionName.replace(/\s+/g, "")}Task`);
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty.");
        return;
    }

    sections[sectionName].tasks.push({
        text: taskText,
        checked: false
    });

    taskInput.value = "";
    renderTasks(sectionName);
    saveSections();
}

// Render tasks
function renderTasks(sectionName) {
    const list = document.getElementById(`${sectionName.replace(/\s+/g, "")}List`);
    list.innerHTML = "";

    const sectionData = sections[sectionName];
    const bgColor = sectionData.backgroundColor || "#ffffff"; // Section background
    const textColor = sectionData.color || "#000000";         // Section text color
    const completedColor = sectionData.completedColor || "#888888"; // Completed text color
    const completedBg = sectionData.completedBg || "#f0f0f0";       // Completed bg color
    const completedFontStyle = sectionData.completedFontStyle || "none"; // Completed font style

    sectionData.tasks.forEach((taskObj, index) => {
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskObj.checked;
        checkbox.id = `${sectionName.replace(/\s+/g, "")}Task${index}`;

        // Apply checked/unchecked styles
        function applyTaskStyle() {
            if (taskObj.checked) {
                listItem.classList.add("completed");
                listItem.style.color = completedColor;
                listItem.style.backgroundColor = completedBg;
                listItem.style.fontStyle = completedFontStyle.includes("italic") ? "italic" : "normal";
                listItem.style.fontWeight = completedFontStyle.includes("bold") ? "bold" : "normal";
            } else {
                listItem.classList.remove("completed");
                listItem.style.color = textColor;
                listItem.style.backgroundColor = bgColor;
                listItem.style.fontStyle = "normal";
                listItem.style.fontWeight = "normal";
            }
        }

        applyTaskStyle();

        checkbox.addEventListener("change", () => {
            sections[sectionName].tasks[index].checked = checkbox.checked;
            applyTaskStyle();
            saveSections();
        });

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;

        // Handle URL link
        if (taskObj.text.startsWith("http://") || taskObj.text.startsWith("https://")) {
            const link = document.createElement("a");
            link.href = taskObj.text;
            link.textContent = taskObj.text;
            link.target = "_blank";
            link.style.color = "#ffeb3b";
            label.appendChild(link);
        } else {
            label.textContent = taskObj.text;
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => {
            deleteTask(sectionName, index);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });

    saveSections();
}

// Delete task
function deleteTask(sectionName, taskIndex) {
    if (!confirm("⚠️ Are you sure you want to delete this task?")) return;
    if (!confirm("🔥 Final warning: This task will be gone forever!")) return;

    sections[sectionName].tasks.splice(taskIndex, 1);
    saveSections(); // 🟢 Add this to save immediately
    renderTasks(sectionName);
}

// Open style modal
function openStyleModal(sectionName) {
    selectedSection = sectionName;
    const sectionData = sections[sectionName];

    // Populate modal fields
    document.getElementById("sectionColor").value = sectionData.backgroundColor || "#ffffff";
    document.getElementById("sectionTextColor").value = sectionData.color || "#000000";

    // ✅ Completed styling fields
    document.getElementById("completedTextColor").value = sectionData.completedColor || "#888888";
    document.getElementById("completedBgColor").value = sectionData.completedBg || "#f0f0f0";
    document.getElementById("completedFontStyle").value = sectionData.completedFontStyle || "none";

    // Show modal
    document.getElementById("styleModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block"; // Optional overlay
}

// Apply style
function applyStyle() {
    if (!selectedSection) return;
    const sectionData = sections[selectedSection];

    // Standard Section Styles
    sectionData.backgroundColor = document.getElementById("sectionColor").value;
    sectionData.color = document.getElementById("sectionTextColor").value;

    // ✅ COMPLETED Styles
    sectionData.completedColor = document.getElementById("completedTextColor").value;
    sectionData.completedBg = document.getElementById("completedBgColor").value;
    sectionData.completedFontStyle = document.getElementById("completedFontStyle").value;

    saveSections();
    renderSections();  // Re-render sections to apply updated styles
    closeStyleModal();
}



// Close modal
function closeStyleModal() {
    document.getElementById("styleModal").style.display = "none";
    selectedSection = null;
}

// Export
function exportData() {

    const fileName = prompt("Save entire checklist as:", "sections.json");
    if (!fileName) return;


    const dataStr = JSON.stringify(sections, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    a.download = fileName.endsWith('.json') ? fileName : fileName + ".json";
    // a.download = "sections.json";
    a.click();

    URL.revokeObjectURL(url);
}

// Import
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            sections = JSON.parse(e.target.result);
            saveSections();
            renderSections();
        } catch (err) {
            alert("Import failed.");
        }
    };
    reader.readAsText(file);
}

function exportSection(sectionName) {
    const sectionData = sections[sectionName];
    const fileName = prompt(`Save "${sectionName}" as:`, `${sectionName}.json`);
    if (!fileName) return;

    const dataStr = JSON.stringify({ [sectionName]: sectionData }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.endsWith('.json') ? fileName : fileName + ".json";
    a.click();

    URL.revokeObjectURL(url);
}

function importSection(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);
            const importedSectionName = Object.keys(importedData)[0];

            if (sections[importedSectionName]) {
                if (!confirm(`"${importedSectionName}" exists. Overwrite?`)) return;
            }

            sections[importedSectionName] = importedData[importedSectionName];
            saveSections();
            renderSections();
            alert(`"${importedSectionName}" imported!`);
        } catch (err) {
            alert("Import failed.");
        }
    };
    reader.readAsText(file);
}




function checkAllTasks(sectionName) {
    sections[sectionName].tasks.forEach(task => {
        task.checked = true;
    });

    saveSections();
    renderTasks(sectionName);
}

function uncheckAllTasks(sectionName) {
    sections[sectionName].tasks.forEach(task => {
        task.checked = false;
    });

    saveSections();
    renderTasks(sectionName);
}
let allSectionsHidden = true;

function toggleAllSections() {
    const allSections = document.querySelectorAll(".section");
    const btn = document.getElementById("toggleAllBtn");

    allSections.forEach(section => {
        section.style.display = allSectionsHidden ? "flex" : "none";

        // Update hidden state in data
        const sectionName = section.querySelector(".section-title").textContent;
        if (sections[sectionName]) {
            sections[sectionName].hidden = !allSectionsHidden;
        }
    });

    btn.textContent = allSectionsHidden ? "👁 Hide All Sections" : "👁 Show All Sections";
    allSectionsHidden = !allSectionsHidden;
    saveSections();
}

// Header Controls toggle
let headerControlsVisible = false;

function toggleHeaderControls() {
    const controls = document.getElementById("controls");
    const btn = document.getElementById("headerToggleBtn");

    if (headerControlsVisible) {
        controls.style.display = "none";
        btn.textContent = "➕ Show Controls";
    } else {
        controls.style.display = "flex";
        btn.textContent = "➖ Hide Controls";
    }

    headerControlsVisible = !headerControlsVisible;
}

// On page load: hide controls, render sections, populate fonts
document.addEventListener("DOMContentLoaded", () => {
    renderSections();
    populateFontDropdown();

    // Set header controls hidden
    document.getElementById("controls").style.display = "none";
    document.getElementById("headerToggleBtn").textContent = "➕ Show Controls";
});






// Populate fonts dropdown (from fonts.js)
function populateFontDropdown() {
    const fontSelect = document.getElementById("fontSelect");
    googleFonts.forEach(font => {
        const option = document.createElement("option");
        option.value = font;
        option.textContent = font;
        option.style.fontFamily = font;
        fontSelect.appendChild(option);
    });
}