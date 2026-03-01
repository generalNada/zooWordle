// import { wordleWords, combinedWords, fixedWordsLarge } from './theWholeEnchilada.js';
import { wordleWords, dailyWordsSmall, dailyWordsLarge } from '../theWholeEnchilada.js';

// Create a Set of wordleWords for fast lookup (uppercase for comparison)
// wordleWords is an array of objects with a 'word' property
let wordleWordsSet;
try {
  wordleWordsSet = new Set(wordleWords.map(item => item.word.toUpperCase()));
  console.log('wordleWordsSet created with', wordleWordsSet.size, 'words');
} catch (error) {
  console.error('Error creating wordleWordsSet:', error);
  wordleWordsSet = new Set();
}

// Create a Map to count occurrences of each word in wordleWords
const wordleWordsCount = new Map();
wordleWords.forEach(item => {
  const word = item.word.toUpperCase();
  wordleWordsCount.set(word, (wordleWordsCount.get(word) || 0) + 1);
});

// Create a Map to store all wordleWords entries by word (for quick lookup of details)
const wordleWordsDetails = new Map();
wordleWords.forEach(item => {
  const word = item.word.toUpperCase();
  if (!wordleWordsDetails.has(word)) {
    wordleWordsDetails.set(word, []);
  }
  wordleWordsDetails.get(word).push(item);
});

// Track if highlighting is active
let isWordleHighlightActive = false;

// Initialize the highlight functionality
// Use both DOMContentLoaded and a direct check since modules might load differently
function initializeWordleFeatures() {
  // VISIBLE TEST - add a test element to page to confirm script is running
  const testDiv = document.createElement('div');
  testDiv.id = 'wordle-script-test';
  testDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: red; color: white; padding: 5px; z-index: 99999; font-size: 12px;';
  testDiv.textContent = 'Wordle Script Loaded';
  document.body.appendChild(testDiv);
  setTimeout(() => testDiv.remove(), 3000); // Remove after 3 seconds
  
  console.log('preWordReset.js initializing...'); // Debug
  console.log('wordleWords available:', wordleWords ? wordleWords.length : 'NO');
  console.log('wordleWordsSet size:', wordleWordsSet ? wordleWordsSet.size : 'NO SET');
  
  try {
    initWordleHighlight();
    // Watch for when words are re-rendered
    observeWordRendering();
    // Add duplicate indicators after a short delay to ensure words are rendered
    setTimeout(() => {
      addDuplicateIndicators();
    }, 500);
    // Initialize click handler for Wordle words - try multiple times to ensure it's attached
    initWordleWordClickHandler();
    // Also try after a delay in case DOM isn't ready
    setTimeout(() => {
      initWordleWordClickHandler();
    }, 1000);
  } catch (error) {
    console.error('Error initializing wordle features:', error);
    testDiv.textContent = 'ERROR: ' + error.message;
    testDiv.style.background = 'darkred';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWordleFeatures);
} else {
  // DOM is already loaded
  initializeWordleFeatures();
}

function initWordleHighlight() {
  // Wait for the button to exist
  const button = document.getElementById('highlightWordleButton');
  if (!button) {
    // If button doesn't exist yet, try again after a short delay
    setTimeout(initWordleHighlight, 100);
    return;
  }

  // Add click handler to the button
  button.addEventListener('click', toggleWordleHighlight);

  // Add CSS styles for the highlight
  addHighlightStyles();
}

function toggleWordleHighlight() {
  isWordleHighlightActive = !isWordleHighlightActive;
  applyWordleHighlight();
  
  // Update button appearance
  const button = document.getElementById('highlightWordleButton');
  if (button) {
    button.classList.toggle('active', isWordleHighlightActive);
  }
  
  // Update count display
  if (!isWordleHighlightActive) {
    updateHighlightCount(0);
  }
}

function getWordText(chip) {
  // Get the word text excluding any duplicate indicators
  // The word is the first text node in the chip
  let wordText = '';
  for (const node of chip.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      wordText += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE && 
               (!node.classList || !node.classList.contains('duplicate-indicator'))) {
      // Include text from other elements but not the duplicate indicator
      wordText += node.textContent;
    }
  }
  return wordText.trim().toUpperCase();
}

function getCountEmoji(count) {
  // Return the appropriate emoji based on the count
  const emojiMap = {
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
  };
  // For counts 10+, use 🔟 or show the number
  if (count >= 10) {
    return '🔟';
  }
  return emojiMap[count] || '';
}

function applyWordleHighlight() {
  // Get all word chips
  const wordChips = document.querySelectorAll('.word-chip');
  let highlightedCount = 0;
  
  wordChips.forEach(chip => {
    // Get word text without the duplicate indicator
    const word = getWordText(chip);
    const isWordleWord = wordleWordsSet.has(word);
    const wordCount = wordleWordsCount.get(word) || 0;
    
    if (isWordleWord) {
      if (isWordleHighlightActive) {
        chip.classList.add('highlight-wordle');
        highlightedCount++;
      } else {
        chip.classList.remove('highlight-wordle');
      }
    }
    
    // Always add/update duplicate indicator if word appears multiple times (regardless of highlighting state)
    const existingIndicator = chip.querySelector('.duplicate-indicator');
    if (wordCount >= 2) {
      const emoji = getCountEmoji(wordCount);
      if (existingIndicator) {
        // Update existing indicator with correct emoji
        existingIndicator.textContent = emoji;
      } else {
        // Create new indicator
        const indicator = document.createElement('span');
        indicator.className = 'duplicate-indicator';
        indicator.textContent = emoji;
        chip.appendChild(indicator);
      }
    } else if (existingIndicator) {
      existingIndicator.remove();
    }
  });
  
  // Update the count display
  updateHighlightCount(highlightedCount);
}

function updateHighlightCount(count) {
  // Find or create the count display element
  let countDisplay = document.getElementById('wordle-highlight-count');
  
  if (!countDisplay) {
    // Create the count display element
    const button = document.getElementById('highlightWordleButton');
    if (button && button.parentElement) {
      countDisplay = document.createElement('span');
      countDisplay.id = 'wordle-highlight-count';
      countDisplay.className = 'highlight-count';
      countDisplay.style.marginLeft = '8px';
      countDisplay.style.fontSize = '0.9em';
      countDisplay.style.opacity = '0.8';
      button.parentElement.appendChild(countDisplay);
    }
  }
  
  if (countDisplay) {
    if (isWordleHighlightActive && count > 0) {
      countDisplay.textContent = `(${count} highlighted)`;
      countDisplay.style.display = 'inline';
    } else {
      countDisplay.style.display = 'none';
    }
  }
}

function observeWordRendering() {
  // Watch for changes to the filteredWords container
  const resultsContainer = document.getElementById('filteredWords');
  if (!resultsContainer) {
    setTimeout(observeWordRendering, 100);
    return;
  }

  // Use MutationObserver to detect when words are re-rendered
  const observer = new MutationObserver(() => {
    // If highlighting is active, reapply it after words are rendered
    if (isWordleHighlightActive) {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        applyWordleHighlight();
      }, 10);
    } else {
      // Even if highlighting is off, we should add duplicate indicators
      // when words are re-rendered
      setTimeout(() => {
        addDuplicateIndicators();
      }, 10);
    }
  });

  // Observe changes to child elements
  observer.observe(resultsContainer, {
    childList: true,
    subtree: true
  });
}

function addDuplicateIndicators() {
  // Get all word chips
  const wordChips = document.querySelectorAll('.word-chip');
  
  wordChips.forEach(chip => {
    // Remove any existing duplicate indicator
    const existingIndicator = chip.querySelector('.duplicate-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    // Get word text without the duplicate indicator
    const word = getWordText(chip);
    const wordCount = wordleWordsCount.get(word) || 0;
    
    // Add appropriate emoji if word appears multiple times in wordleWords (even if highlighting is off)
    if (wordCount >= 2) {
      const emoji = getCountEmoji(wordCount);
      const indicator = document.createElement('span');
      indicator.className = 'duplicate-indicator';
      indicator.textContent = emoji;
      chip.appendChild(indicator);
    }
  });
}

function initWordleWordClickHandler() {
  // Wait for the results container to exist
  const resultsContainer = document.getElementById('filteredWords');
  if (!resultsContainer) {
    console.log('filteredWords container not found, retrying...');
    setTimeout(initWordleWordClickHandler, 100);
    return;
  }

  // Check if handler already attached (avoid duplicates)
  if (resultsContainer.hasAttribute('data-wordle-handler-attached')) {
    console.log('Wordle handler already attached, skipping');
    return;
  }
  resultsContainer.setAttribute('data-wordle-handler-attached', 'true');

  console.log('Wordle word click handler initialized on:', resultsContainer); // Debug
  console.log('wordleWordsSet size:', wordleWordsSet ? wordleWordsSet.size : 'UNDEFINED'); // Debug
  console.log('wordleWordsSet sample:', wordleWordsSet ? Array.from(wordleWordsSet).slice(0, 5) : 'UNDEFINED'); // Debug

  // Listen for clicks on word chips, specifically highlighted Wordle words
  // Use capture phase to intercept before other handlers
  resultsContainer.addEventListener('click', (e) => {
    // ALERT for testing - remove after debugging
    // alert('Click detected on: ' + e.target.tagName);
    // Check if clicking on duplicate indicator - ignore those clicks
    if (e.target.classList && e.target.classList.contains('duplicate-indicator')) {
      return;
    }
    
    // Don't do anything if clicking inside a modal (including close button)
    if (e.target.closest('.word-stats-modal')) {
      return;
    }
    
    const wordChip = e.target.closest('.word-chip');
    if (!wordChip) {
      return;
    }
    
    // TEST: Log ALL word chip clicks to see if handler is working
    console.log('Word chip clicked:', wordChip.textContent, 'Classes:', wordChip.className);
    
    // Extract word text - try multiple methods to be robust
    let cleanWord = '';
    // First try the data attribute or textContent (for simple spans)
    if (wordChip.textContent) {
      cleanWord = wordChip.textContent.trim().toUpperCase();
      // Remove any emoji indicators (duplicate indicators) - be more aggressive
      cleanWord = cleanWord.replace(/[0-9️⃣🔟]/g, '').replace(/\s+/g, '').trim();
    }
    // Fallback to getWordText if needed
    if (!cleanWord || cleanWord.length === 0) {
      cleanWord = getWordText(wordChip);
    }
    
    // Check if it's a wordle word - prioritize data attribute and class, then set lookup
    const hasDataAttr = wordChip.dataset.wordleWord === 'true';
    const hasClass = wordChip.classList.contains('highlight-wordle');
    const inSet = cleanWord && wordleWordsSet && wordleWordsSet.has(cleanWord);
    
    console.log('Word chip clicked:', cleanWord);
    console.log('  - Has data-wordle-word:', hasDataAttr);
    console.log('  - Has highlight-wordle class:', hasClass);
    console.log('  - In wordleWordsSet:', inSet);
    
    const isWordleWord = hasDataAttr || hasClass || (cleanWord && cleanWord.length >= 4 && inSet);
    
    if (isWordleWord) {
      console.log('WORDLE WORD DETECTED! Showing modal...');
      // Check if the modal for this word is already open
      const existingModal = document.getElementById('wordleWordDetailsModal');
      if (existingModal && existingModal.classList.contains('active')) {
        // Modal is already open, don't do anything
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      
      e.stopPropagation(); // Prevent event from reaching other handlers
      e.preventDefault(); // Prevent default behavior
      
      console.log('Wordle word clicked:', cleanWord); // Debug
      showWordleWordDetailsModal(cleanWord);
      return false; // Additional prevention
    }
  }, true); // Use capture phase to run before other handlers
}

function showWordleWordDetailsModal(word) {
  console.log('showWordleWordDetailsModal called with word:', word); // Debug
  
  // Close any existing modals first
  const existingModals = ['wordStatsModal', 'wordleWordDetailsModal', 'letterPositionStatsModal'];
  existingModals.forEach(modalId => {
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
      existingModal.classList.remove('active');
    }
  });

  // Get Wordle word details - ensure word is uppercase and matches map format
  const upperWord = word.toUpperCase().trim();
  const wordDetails = wordleWordsDetails.get(upperWord) || [];
  
  console.log('Looking up word:', upperWord, 'Found details:', wordDetails.length); // Debug
  
  if (wordDetails.length === 0) {
    // Fallback to regular word stats if not found (shouldn't happen for highlighted words)
    console.warn('Wordle word not found in details:', upperWord, 'Available keys sample:', Array.from(wordleWordsDetails.keys()).slice(0, 5));
    return;
  }

  // Ensure we only analyze the first 5 characters (Wordle words are always 5 letters)
  const cleanWord = word.substring(0, 5).toUpperCase();

  // Get all current words from the DOM for letter analysis
  const wordChips = document.querySelectorAll('.word-chip');
  const allWords = Array.from(wordChips).map(chip => {
    const chipWord = getWordText(chip);
    // Also ensure we only use first 5 characters for comparison
    return chipWord.substring(0, 5).toUpperCase();
  });
  const totalWords = allWords.length;

  // Calculate statistics for each position (letter analysis)
  const stats = [];
  for (let pos = 0; pos < 5; pos++) {  // Fixed: always analyze exactly 5 positions
    const letter = cleanWord[pos];
    const wordsWithLetterAtPos = allWords.filter(w => w[pos] === letter);
    const count = wordsWithLetterAtPos.length;
    const percentage = totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : '0.00';

    stats.push({
      position: pos + 1,
      letter: letter,
      count: count,
      percentage: percentage
    });
  }

  // Create or update modal
  let modal = document.getElementById('wordleWordDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wordleWordDetailsModal';
    modal.className = 'word-stats-modal';
    // Ensure modal is visible with inline styles as backup
    modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 99999; justify-content: center; align-items: center;';
    document.body.appendChild(modal);
  }

  // Build Wordle details section
  const wordleDetailsRows = wordDetails.map((detail, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${detail.gameDate || 'N/A'}</td>
      <td>${detail.wordNumber !== undefined ? detail.wordNumber : 'N/A'}</td>
      <td>${detail.myScore !== undefined ? detail.myScore : 'N/A'}</td>
    </tr>
  `).join('');

  // Build letter analysis table rows
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
        <div class="word-stats-title">${cleanWord}</div>
        <button class="word-stats-close">&times;</button>
      </div>
      
      <div style="color: #fff; margin-bottom: 1.5rem;">
        <h3 style="color: rgb(255, 255, 255); margin-bottom: 0.5rem; font-size: 1.2rem;">Wordle Word Details</h3>
        <table class="word-stats-table" style="margin-bottom: 1.5rem;">
          <thead>
            <tr>
              <th>#</th>
              <th>Game Date</th>
              <th>Word #</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${wordleDetailsRows}
          </tbody>
        </table>
      </div>

      <div style="color: #fff; margin-bottom: 1rem;">
        <h3 style="color: rgb(255, 255, 255); margin-bottom: 0.5rem; font-size: 1.2rem;">Letter Analysis</h3>
          <div style="margin-bottom: 0.5rem;">
            Total words in filtered list: <strong style="color: rgb(255, 255, 255);">${totalWords}</strong>
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
    </div>
  `;

  // Ensure modal CSS is available (add it if not already present)
  if (!document.getElementById('wordle-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'wordle-modal-styles';
    style.textContent = `
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
        display: flex !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Show modal - use both class and inline style to ensure visibility
  console.log('Adding active class to modal:', modal); // Debug
  modal.classList.add('active');
  modal.style.display = 'flex'; // Force display with inline style
  console.log('Modal classes after adding active:', modal.className); // Debug
  console.log('Modal inline display:', modal.style.display); // Debug
  console.log('Modal computed display:', window.getComputedStyle(modal).display); // Debug
  console.log('Modal in DOM:', document.body.contains(modal)); // Debug

  // Close button handler
  const closeBtn = modal.querySelector('.word-stats-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      modal.classList.remove('active');
      modal.style.display = 'none'; // Also remove inline style
    });
  }
  
  // Also close modal when clicking outside the content area
  modal.addEventListener('click', (e) => {
    // Only close if clicking the modal background, not the content
    if (e.target === modal || e.target.classList.contains('word-stats-modal')) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  });

  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      modal.style.display = 'none'; // Also remove inline style
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
}

function addHighlightStyles() {
  // Check if styles already added
  if (document.getElementById('wordle-highlight-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'wordle-highlight-styles';
  style.textContent = `
    .word-chip {
      position: relative;
    }
    .word-chip.highlight-wordle {
      background: rgb(80, 80, 80) !important;
      border-color: rgb(100, 100, 100) !important;
      box-shadow: none !important;
      color: rgb(255, 255, 255) !important;
      font-weight: normal;
    }
    .word-chip .duplicate-indicator {
      position: absolute;
      top: -2px;
      right: -2px;
      font-size: 0.7em;
      line-height: 1;
      margin: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}