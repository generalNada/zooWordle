import { myPeople } from "./myPeople.js";
const inputs = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  group: document.getElementById("group"),
  birthMonth: document.getElementById("birthMonth"),
  birthDay: document.getElementById("birthDay"),
  birthYear: document.getElementById("birthYear"),
};

const resultsDiv = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");
const showAllBtn = document.getElementById("showAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
let allNamesVisible = false;

function getSortedNames(arr) {
  return [...arr].sort((a, b) => {
    const nameA = a.lastName?.toLowerCase() || "";
    const nameB = b.lastName?.toLowerCase() || "";
    const lastNameComparison = nameA.localeCompare(nameB);
    if (lastNameComparison !== 0) {
      return lastNameComparison;
    }
    // If last names are the same, sort by first name
    const firstNameA = a.firstName?.toLowerCase() || "";
    const firstNameB = b.firstName?.toLowerCase() || "";
    return firstNameA.localeCompare(firstNameB);
  });
}

function filterNames() {
  const query = {
    firstName: inputs.firstName.value.trim().toLowerCase(),
    lastName: inputs.lastName.value.trim().toLowerCase(),
    group: inputs.group.value.trim(),
    birthMonth: inputs.birthMonth.value.trim().toLowerCase(),
    birthDay: inputs.birthDay.value.trim(),
    birthYear: inputs.birthYear.value.trim(),
  };

  const results = myPeople.filter((aHuman) => {
    return (
      (!query.firstName ||
        aHuman.firstName.toLowerCase().startsWith(query.firstName)) &&
      (!query.lastName ||
        aHuman.lastName.toLowerCase().startsWith(query.lastName)) &&
      (!query.group ||
        (aHuman.groups && aHuman.groups.includes(query.group))) &&
      (!query.birthMonth ||
        query.birthMonth === "all" ||
        (aHuman.birthMonth &&
          aHuman.birthMonth.toLowerCase() === query.birthMonth)) &&
      (!query.birthDay || aHuman.birthDay == query.birthDay) &&
      (!query.birthYear || aHuman.birthYear == query.birthYear)
    );
  });

  let heading = `Filtered Birthdays (${results.length})`;
  if (
    query.birthMonth === "all" &&
    !query.firstName &&
    !query.lastName &&
    !query.group &&
    !query.birthDay &&
    !query.birthYear
  ) {
    heading = `All Birthdays (${results.length})`;
  } else if (
    query.birthMonth &&
    query.birthMonth !== "all" &&
    !query.firstName &&
    !query.lastName &&
    !query.group &&
    !query.birthDay &&
    !query.birthYear
  ) {
    // Capitalize month
    const monthName =
      query.birthMonth.charAt(0).toUpperCase() + query.birthMonth.slice(1);
    heading = `${monthName} Birthdays (${results.length})`;
  } else if (
    query.group &&
    !query.firstName &&
    !query.lastName &&
    !query.birthMonth &&
    !query.birthDay &&
    !query.birthYear
  ) {
    heading = `${query.group} Group (${results.length})`;
  }
  displayResults(getSortedNames(results), heading);
  allNamesVisible = false;
}

function displayResults(results, heading = "") {
  resultsDiv.innerHTML = "";
  if (heading) {
    const headingDiv = document.createElement("div");
    headingDiv.className = "results-heading";
    headingDiv.style.fontWeight = "bold";
    headingDiv.style.marginBottom = "0.5em";
    headingDiv.textContent = heading;
    resultsDiv.appendChild(headingDiv);
  }
  if (results.length === 0) {
    resultsDiv.innerHTML += "<p>No matches found.</p>";
    return;
  }

  results.forEach((aHuman) => {
    const div = document.createElement("div");
    div.className = "result";
    let birthday = "";
    if (aHuman.birthMonth) {
      birthday = aHuman.birthMonth;
      if (aHuman.birthDay) {
        birthday += ` ${aHuman.birthDay}`;
        if (aHuman.birthYear) {
          birthday += `, ${aHuman.birthYear}`;
        }
      } else if (aHuman.birthYear) {
        birthday += `, ${aHuman.birthYear}`;
      }
    } else if (aHuman.birthDay) {
      birthday = aHuman.birthDay;
      if (aHuman.birthYear) {
        birthday += `, ${aHuman.birthYear}`;
      }
    } else if (aHuman.birthYear) {
      birthday = aHuman.birthYear;
    }
    let line = `<strong>${aHuman.firstName} ${aHuman.lastName}</strong>`;
    if (aHuman.passedAway) {
      line += " ---";
      if (birthday) {
        line += ` Born: <span class='date-info'>${birthday}</span> -`;
      }
      line += ` Passed Away: <span class='date-info'>${aHuman.passedAway}</span>, RIP ${aHuman.firstName} ${aHuman.lastName}`;
    } else if (birthday) {
      line += `: <span class='date-info'>${birthday}</span>`;
    }
    if (aHuman.comment) {
      line += ` --- '${aHuman.comment}'`;
    }
    div.innerHTML = line;
    resultsDiv.appendChild(div);
  });
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", filterNames);
});

clearBtn.addEventListener("click", () => {
  console.log("Clear All button works,");

  Object.values(inputs).forEach((input) => {
    if (input.tagName === "SELECT") {
      if (input.id === "group") {
        input.selectedIndex = 0; // Reset to "-- Group --"
      } else if (input.id === "birthMonth") {
        input.selectedIndex = 0; // Reset to "-- Month --"
      } else {
        input.selectedIndex = 0;
      }
    } else {
      input.value = "";
    }
  });
  resultsDiv.innerHTML = "";
  allNamesVisible = false;
});

showAllBtn.addEventListener("click", () => {
  console.log("Show All button works");
  const sortedNames = getSortedNames(myPeople);
  displayResults(sortedNames, `All Birthdays (${sortedNames.length})`);
  allNamesVisible = true;
});

clearAllBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
  allNamesVisible = false;
});

// Hide all data on page load
resultsDiv.innerHTML = "";

// Function to populate group dropdown
function populateGroupDropdown() {
  const groupSelect = document.getElementById("group");
  const allGroups = myPeople.flatMap((person) => person.groups || []);
  const uniqueGroups = [...new Set(allGroups)].filter(
    (group) => group !== null
  );

  groupSelect.innerHTML = '<option value="">-- Group --</option>';
  uniqueGroups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    groupSelect.appendChild(option);
  });
}

// Function to count birthdays by month and update dropdown
function updateDropdownWithCounts() {
  const monthCounts = {};
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize counts
  months.forEach((month) => (monthCounts[month] = 0));

  // Count birthdays by month
  let totalWithBirthdays = 0;
  myPeople.forEach((person) => {
    if (person.birthMonth && months.includes(person.birthMonth)) {
      monthCounts[person.birthMonth]++;
      totalWithBirthdays++;
    }
  });

  // Update dropdown options
  const monthSelect = document.getElementById("birthMonth");
  monthSelect.innerHTML = `
    <option value="">-- Month --</option>
    <option value="all">All Months (${totalWithBirthdays})</option>
    ${months
      .map(
        (month) =>
          `<option value="${month.toLowerCase()}">${month} (${
            monthCounts[month]
          })</option>`
      )
      .join("")}
  `;
}

// Call on page load
populateGroupDropdown();
updateDropdownWithCounts();
