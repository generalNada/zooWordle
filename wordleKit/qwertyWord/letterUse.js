import { wordleWords } from "../../theWholeEnchilada.js";

function parseGameDate(str) {
  if (!str) return null;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseInputDate(iso) {
  if (!iso) return null;
  const parts = iso.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d);
}

function startOfLocalDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDateForInput(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function entryInDateRange(gameDateStr, startIso, endIso) {
  const gd = parseGameDate(gameDateStr);
  if (!gd) return false;
  const g = startOfLocalDay(gd).getTime();
  if (startIso) {
    const s = startOfLocalDay(parseInputDate(startIso));
    if (s && g < s.getTime()) return false;
  }
  if (endIso) {
    const e = startOfLocalDay(parseInputDate(endIso));
    if (e && g > e.getTime()) return false;
  }
  return true;
}

function getWordleDateBounds() {
  let minT = Infinity;
  let maxT = -Infinity;
  for (const entry of wordleWords) {
    const d = parseGameDate(entry.gameDate);
    if (!d) continue;
    const t = startOfLocalDay(d).getTime();
    if (t < minT) minT = t;
    if (t > maxT) maxT = t;
  }
  if (minT === Infinity) return { min: null, max: null };
  return {
    min: new Date(minT),
    max: new Date(maxT),
  };
}

function analyzeLetterInRange(letter, startIso, endIso) {
  const L = letter.toUpperCase();
  const byPosition = [0, 0, 0, 0, 0];
  let totalOccurrences = 0;
  let puzzleCount = 0;

  for (const entry of wordleWords) {
    if (!entryInDateRange(entry.gameDate, startIso, endIso)) continue;
    const w = (entry.word || "").toUpperCase();
    if (w.length !== 5) continue;
    puzzleCount++;
    for (let i = 0; i < 5; i++) {
      if (w[i] === L) {
        byPosition[i]++;
        totalOccurrences++;
      }
    }
  }

  return { byPosition, totalOccurrences, puzzleCount, letter: L };
}

function renderResults(data) {
  const el = document.getElementById("letterUseResults");
  if (!el) return;

  const { letter, totalOccurrences, byPosition, puzzleCount } = data;
  if (puzzleCount === 0) {
    el.innerHTML =
      '<p class="letter-use-empty">No puzzles in that date range.</p>';
    return;
  }

  const rows = byPosition
    .map((count, i) => {
      const pctPuzzles =
        puzzleCount > 0 ? ((count / puzzleCount) * 100).toFixed(2) : "0.00";
      const pctOfLetter =
        totalOccurrences > 0
          ? ((count / totalOccurrences) * 100).toFixed(2)
          : "0.00";
      return `<tr>
        <td>${i + 1}</td>
        <td>${count}</td>
        <td>${pctPuzzles}%</td>
        <td>${pctOfLetter}%</td>
      </tr>`;
    })
    .join("");

  el.innerHTML = `
    <p class="letter-use-summary">
      Puzzles in range: <strong>${puzzleCount.toLocaleString()}</strong><br />
      Total <strong>${letter}</strong> occurrences (doubles count twice):
      <strong>${totalOccurrences.toLocaleString()}</strong>
    </p>
    <table class="letter-use-table">
      <thead>
        <tr>
          <th>Position</th>
          <th>Count</th>
          <th>% of puzzles</th>
          <th>% of letter hits</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function openModal(modal) {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function initLetterUse() {
  const modal = document.getElementById("letterUseModal");
  const openBtn = document.getElementById("letterUseButton");
  const closeX = document.getElementById("letterUseClose");
  const dismissBtn = document.getElementById("letterUseDismiss");
  const runBtn = document.getElementById("letterUseRun");
  const letterSel = document.getElementById("letterUseLetter");
  const startIn = document.getElementById("letterUseStart");
  const endIn = document.getElementById("letterUseEnd");
  const backdrop = modal?.querySelector(".letter-use-backdrop");

  if (!modal || !openBtn || !letterSel || !startIn || !endIn) return;

  const bounds = getWordleDateBounds();
  if (bounds.min && bounds.max) {
    const minStr = formatDateForInput(bounds.min);
    const maxStr = formatDateForInput(bounds.max);
    startIn.min = minStr;
    startIn.max = maxStr;
    endIn.min = minStr;
    endIn.max = maxStr;
    startIn.value = minStr;
    endIn.value = maxStr;
  }

  openBtn.addEventListener("click", () => {
    const results = document.getElementById("letterUseResults");
    if (results) results.innerHTML = "";
    openModal(modal);
    letterSel.focus();
  });

  const doClose = () => closeModal(modal);
  closeX?.addEventListener("click", doClose);
  dismissBtn?.addEventListener("click", doClose);
  backdrop?.addEventListener("click", doClose);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) doClose();
  });

  runBtn?.addEventListener("click", () => {
    const letter = letterSel.value;
    if (!letter) return;
    const data = analyzeLetterInRange(letter, startIn.value, endIn.value);
    renderResults(data);
  });
}

document.addEventListener("DOMContentLoaded", initLetterUse);
