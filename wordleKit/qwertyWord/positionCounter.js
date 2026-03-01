


// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initWordClickHandler();
    initLetterFrequencyClickHandler();
  });
  
  function initWordClickHandler() {
    // Use event delegation on the results container
    const resultsContainer = document.getElementById('filteredWords');
    if (!resultsContainer) {
      // If not ready yet, wait a bit and try again
      setTimeout(initWordClickHandler, 100);
      return;
    }
  
    // Listen for clicks on word chips
    resultsContainer.addEventListener('click', (e) => {
      const wordChip = e.target.closest('.word-chip');
      if (wordChip) {
        // Skip Wordle words - they have their own handler (check both class and data attribute)
        if (wordChip.classList.contains('highlight-wordle') || wordChip.dataset.wordleWord === 'true') {
          return;
        }
        const word = wordChip.textContent.trim().toUpperCase();
        showWordStatsModal(word);
      }
    });
  
    // Make word chips visually indicate they're clickable
    const style = document.createElement('style');
    style.textContent = `
      .word-chip {
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .word-chip:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(255, 0, 255, 0.6);
      }
      .letter-frequency-bar th,
      .letter-frequency-bar td {
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .letter-frequency-bar th:hover,
      .letter-frequency-bar td:hover {
        background: rgba(255, 0, 255, 0.3) !important;
        transform: scale(1.1);
      }
      .word-stats-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
      }
      .word-stats-modal.active {
        display: flex;
      }
      .word-stats-content {
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #ff00ff;
        border-radius: 15px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
        position: relative;
      }
      .word-stats-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 0, 255, 0.3);
        padding-bottom: 1rem;
      }
      .word-stats-title {
        font-size: 2rem;
        color: #ff00ff;
        text-shadow: 0 0 10px #ff00ff;
        font-weight: bold;
      }
      .word-stats-close {
        background: #ff00ff;
        color: #000;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s ease;
      }
      .word-stats-close:hover {
        background: #00ffff;
        transform: scale(1.1);
      }
      .word-stats-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      .word-stats-table th,
      .word-stats-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .word-stats-table th {
        background: rgba(255, 0, 255, 0.2);
        color: #00ffff;
        font-weight: bold;
      }
      .word-stats-table td {
        color: #fff;
      }
      .word-stats-table tr:hover {
        background: rgba(255, 0, 255, 0.1);
      }
      .position-letter {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ff00ff;
        text-shadow: 0 0 5px #ff00ff;
      }
      .stat-count {
        color: #00ffff;
        font-weight: bold;
      }
      .stat-percentage {
        color: #ffff00;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }
  
  function initLetterFrequencyClickHandler() {
    // Use event delegation on the results container for letter frequency clicks
    const resultsContainer = document.getElementById('filteredWords');
    if (!resultsContainer) {
      setTimeout(initLetterFrequencyClickHandler, 100);
      return;
    }
  
    // Listen for clicks on letter frequency table
    resultsContainer.addEventListener('click', (e) => {
      const letterFreqTable = e.target.closest('.letter-frequency-bar');
      if (letterFreqTable) {
        // Check if clicked on a letter header (th) or count (td)
        let letter = null;
        let clickedElement = e.target;
  
        // If clicked on th (letter), get the letter
        if (clickedElement.tagName === 'TH') {
          letter = clickedElement.textContent.trim().toUpperCase();
        }
        // If clicked on td (count), get the letter from corresponding th
        else if (clickedElement.tagName === 'TD') {
          const row = clickedElement.parentElement;
          const ths = letterFreqTable.querySelectorAll('th');
          const tds = letterFreqTable.querySelectorAll('td');
          const tdIndex = Array.from(row.querySelectorAll('td')).indexOf(clickedElement);
          if (tdIndex >= 0 && ths[tdIndex]) {
            letter = ths[tdIndex].textContent.trim().toUpperCase();
          }
        }
  
        if (letter && /^[A-Z]$/.test(letter)) {
          showLetterPositionStatsModal(letter);
        }
      }
    });
  }
  
  function showLetterPositionStatsModal(letter) {
    // Get all current words from the DOM
    const wordChips = document.querySelectorAll('.word-chip');
    const allWords = Array.from(wordChips).map(chip => chip.textContent.trim().toUpperCase());
    const totalWords = allWords.length;
  
    if (totalWords === 0) {
      alert('No words available to analyze');
      return;
    }
  
    // Calculate how many words have this letter at each position (1-5)
    const stats = [];
    for (let pos = 0; pos < 5; pos++) {
      const wordsWithLetterAtPos = allWords.filter(w => w[pos] === letter);
      const count = wordsWithLetterAtPos.length;
      const percentage = totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : '0.00';
  
      stats.push({
        position: pos + 1,
        count: count,
        percentage: percentage
      });
    }
  
    // Calculate total occurrences (sum of all positions)
    const totalOccurrences = stats.reduce((sum, stat) => sum + stat.count, 0);
  
    // Create or update modal
    let modal = document.getElementById('letterPositionStatsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'letterPositionStatsModal';
      modal.className = 'word-stats-modal';
      document.body.appendChild(modal);
    }
  
    // Build table rows
    const tableRows = stats.map(stat => `
      <tr>
        <td><span class="position-letter">${stat.position}</span></td>
        <td><span class="stat-count">${stat.count}</span></td>
        <td><span class="stat-percentage">${stat.percentage}%</span></td>
      </tr>
    `).join('');
  
    modal.innerHTML = `
      <div class="word-stats-content">
        <div class="word-stats-header">
          <div class="word-stats-title">Letter: ${letter}</div>
          <button class="word-stats-close">&times;</button>
        </div>
        <div style="color: #fff; margin-bottom: 1rem;">
          Total words in filtered list: <strong style="color: #00ffff;">${totalWords}</strong><br>
          Total occurrences of "${letter}": <strong style="color: #00ffff;">${totalOccurrences}</strong>
        </div>
        <table class="word-stats-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Count</th>
              <th>% of Remaining</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  
    // Show modal
    modal.classList.add('active');
  
    // Close button handler
    const closeBtn = modal.querySelector('.word-stats-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.classList.remove('active');
    });
  
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  }
  
  function showWordStatsModal(word) {
    // Get all current words from the DOM
    const wordChips = document.querySelectorAll('.word-chip');
    const allWords = Array.from(wordChips).map(chip => chip.textContent.trim().toUpperCase());
    const totalWords = allWords.length;
  
    if (totalWords === 0) {
      alert('No words available to analyze');
      return;
    }
  
    // Calculate statistics for each position
    const stats = [];
    for (let pos = 0; pos < word.length; pos++) {
      const letter = word[pos];
      const wordsWithLetterAtPos = allWords.filter(w => w[pos] === letter);
      const count = wordsWithLetterAtPos.length;
      const percentage = ((count / totalWords) * 100).toFixed(2);
  
      stats.push({
        position: pos + 1,
        letter: letter,
        count: count,
        percentage: percentage
      });
    }
  
    // Create or update modal
    let modal = document.getElementById('wordStatsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wordStatsModal';
      modal.className = 'word-stats-modal';
      document.body.appendChild(modal);
    }
  
    // Build table rows
    const tableRows = stats.map(stat => `
      <tr>
        <td><span class="position-letter">${stat.position}</span></td>
        <td><span class="position-letter">${stat.letter}</span></td>
        <td><span class="stat-count">${stat.count}</span></td>
        <td><span class="stat-percentage">${stat.percentage}%</span></td>
      </tr>
    `).join('');
  
    modal.innerHTML = `
      <div class="word-stats-content">
        <div class="word-stats-header">
          <div class="word-stats-title">${word}</div>
          <button class="word-stats-close">&times;</button>
        </div>
        <div style="color: #fff; margin-bottom: 1rem;">
          Total words in filtered list: <strong style="color: #00ffff;">${totalWords}</strong>
        </div>
        <table class="word-stats-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Letter</th>
              <th>Count</th>
              <th>% of Remaining</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  
    // Show modal
    modal.classList.add('active');
  
    // Close button handler
    const closeBtn = modal.querySelector('.word-stats-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.classList.remove('active');
    });
  
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  }