// Letter explosion animation system
class LetterExplosion {
  constructor() {
    this.colorPalettes = [
      ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"],
      ["#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43"],
      ["#ff6348", "#2ed573", "#3742fa", "#f368e0", "#ffa502"],
      ["#ff4757", "#2ed573", "#1e90ff", "#ff6348", "#ffa502"],
      ["#ff3838", "#2ecc71", "#3498db", "#9b59b6", "#f39c12"],
    ];
    this.dragState = {
      isDragging: false,
      element: null,
      startX: 0,
      startY: 0,
      elementStartX: 0,
      elementStartY: 0,
      hasMoved: false,
    };
    this.matchingState = {
      selectedElement: null,
      matchedPairs: new Set(),
      totalPairs: 0,
    };
    // Game mode: 'emoji' or 'color'
    this.currentMode = localStorage.getItem("gameMode") || "emoji";
    // Custom messages for each emoji match
    this.customMatchMessages = {
      planet: [
        "Outta This World!",
        "Planetary Perfection",
        "Sweet Orbit!",
        "Life On Mars!!",
      ],
      dog: [
        "A Barking Success!",
        "Ruff Ruff!",
        "Good Doggy!",
        "Woof Woof!",
        "Doggone Nice!",
      ],
      moon: [
        "Success Phased!",
        "Lunar Luck!",
        "Moonstruck!",
        "Full Moon Fever!",
      ],
      sun: [
        "Blazing Hot!",
        "Very Bright!",
        "Solar Flares!",
        "Sunny Side Up!!",
        "Blind With Envy!",
      ],
      sparkle: [
        "Dazzling!",
        "Sparkly Work!",
        "Shining Superstar!",
        "Starstruck!",
        "Where Be My Shades!",
      ],
      rocket: [
        "Perfect Launch!",
        "Mission Accomplished!",
        "Stellar Speed!",
        "Climb Aboard!!!",
      ],
      clown: [
        "True Trickster!",
        "You Don't Clown Around!",
        "Goofy But Great!",
        "Join The Circus!!",
      ],
      alien: [
        "Good Alien!",
        "For My People!",
        "Alien Instincts!",
        "Alien Independence!",
      ],
      fish: [
        "You reeled that one in!",
        "Swimming in success!",
        "That was  Fin-tastic!",
        "You're Gilling This!!",
      ],
      octopus: [
        "Eight arms, infinite skills!",
        "Wrapped tight!",
        "Nice Grab!",
        "Tentacle Triumph!!",
      ],
      giraffe: [
        "Neck and neck!",
        "Tall win!",
        "Sky-high score!",
        "You stand tall!",
        "Towering success!",
      ],
      tennis: [
        "Too Good!",
        "Racket Clap!",
        "No Bagels For You!",
        "Ad In!",
        "Ad Out!",
        "Forty Love!",
        "Ace!",
      ],
    };

    // Fallback messages for any emojis without custom messages
    this.defaultMatchMessages = [
      "You found a match! ✨",
      "Perfect pair! 🌟",
      "Great job! 💫",
      "Match made! ⭐",
      "Brilliant! 🎯",
      "Awesome! 🔥",
    ];

    // Custom messages for color matches
    this.colorMatchMessages = {
      red: [
        "Red Hot!",
        "Seeing Red... Success!",
        "Ruby Perfect!",
        "Fire Engine Found!",
      ],
      orange: [
        "Orange You Glad!",
        "Citrus Success!",
        "Sunset Match!",
        "Peachy Keen!",
      ],
      yellow: [
        "Golden Match!",
        "Sunshine Success!",
        "Mellow Yellow!",
        "Brilliant as Gold!",
      ],
      green: [
        "Green with Success!",
        "Emerald Excellence!",
        "Fresh Match!",
        "Nature's Perfect Pair!",
      ],
      blue: [
        "True Blue Match!",
        "Ocean of Success!",
        "Sky High Victory!",
        "Cool as Blue!",
      ],
      purple: [
        "Royal Match!",
        "Purple Perfection!",
        "Majestic Success!",
        "Violet Victory!",
      ],
      pink: [
        "Pretty in Pink!",
        "Rosy Success!",
        "Pink Perfection!",
        "Tickled Pink!",
      ],
      brown: [
        "Earthy Excellence!",
        "Chocolate Champion!",
        "Your're a True Fudge-Packer!",
        "Brown and Beautiful!",
        "Steaming Skidmark!",
        "Mud Lover!",
      ],
      gray: [
        "Shades of Success!",
        "Silver Lining!",
        "Gray-t Match!",
        "Perfectly Neutral!",
      ],
      black: [
        "Nothingness found!",
        "Awake and Opaque!",
        "Black Beauty!",
        "Pitch Perfect!",
        "Dark Destroyer!",
      ],
    };

    // Custom messages for each number match
    this.numberMatchMessages = {
      1: [
        "Number One Match!",
        "First Place Victory!",
        "Top of the Charts!",
        "Lucky Number One!",
        "Prime Time Match!",
      ],
      2: [
        "Double Trouble Success!",
        "Two for Two!",
        "Dynamic Duo!",
        "Perfect Pair!",
        "Twice as Nice!",
      ],
      3: [
        "Three's Company!",
        "Third Time's the Charm!",
        "Triple Threat!",
        "Lucky Number Three!",
        "Three Cheers for You!",
      ],
      4: [
        "Four Score and Perfect!",
        "Four-Leaf Clover Luck!",
        "Square Deal!",
        "Four-Star Match!",
        "Quarter Pounder Success!",
      ],
      5: [
        "High Five!",
        "Five-Star Rating!",
        "Quintessential Success!",
        "Five Alive!",
        "Perfect Five!",
      ],
      6: [
        "Six Pack of Success!",
        "Rolling Sixes!",
        "Sixth Sense Victory!",
        "Half Dozen Perfect!",
        "Six String Hero!",
      ],
      7: [
        "Lucky Number Seven!",
        "Seven Heaven!",
        "Lucky Seven!",
        "Seven Wonders Match!",
        "Seventh Heaven!",
      ],
      8: [
        "Eight is Great!",
        "Infinity Symbol!",
        "Figure Eight Victory!",
        "Eight Ball Success!",
        "Octagon of Excellence!",
      ],
      9: [
        "Cloud Nine Match!",
        "Ninth Wonder!",
        "Dressed to the Nines!",
        "Nine Lives Lucky!",
        "Nine Yards Success!",
      ],
      10: [
        "Perfect Ten!",
        "Ten Out of Ten!",
        "Top Ten Victory!",
        "Ten Commandments of Success!",
        "Tennis Anyone?",
      ],
    };

    // Color definitions for Color Mode
    this.colorDefinitions = {
      red: "#E53935",
      orange: "#FB8C00",
      yellow: "#FDD835",
      green: "#43A047",
      blue: "#1E88E5",
      purple: "#8E24AA",
      pink: "#EC407A",
      brown: "#6D4C41",
      gray: "#757575",
      black: "#212121",
    };

    // Number definitions for Number Mode
    this.numberDefinitions = {
      1: "One",
      2: "Two",
      3: "Three",
      4: "Four",
      5: "Five",
      6: "Six",
      7: "Seven",
      8: "Eight",
      9: "Nine",
      10: "Ten",
    };
    this.victoryMessages = [
      "🎉 You matched them all! 🎉",
      "🏆 Victory! Amazing work! 🏆",
      "⭐ Perfect! All pairs found! ⭐",
      "🌟 Incredible! You're a star! 🌟",
    ];

    this.numberVictoryMessages = [
      "🔢 Number Master! You counted them all! 🔢",
      "🎯 Perfect counting! All numbers matched! 🎯",
      "🧮 Math wizard! You've mastered the numbers! 🧮",
      "💯 Fantastic! Every digit found its word! 💯",
      "🔟 Ten out of ten! You're a number genius! 🔟",
      "📊 Counting champion! All pairs connected! 📊",
    ];

    // Settings for sound and speech
    this.settings = {
      soundEnabled: localStorage.getItem("soundEnabled") !== "false", // Default true
      speechEnabled: localStorage.getItem("speechEnabled") !== "false", // Default true
      darkModeEnabled: localStorage.getItem("darkModeEnabled") === "true", // Default false
      selectedFont: localStorage.getItem("selectedFont") || "Bree Serif", // Default font
      selectedVoice: localStorage.getItem("selectedVoice") || "auto", // Default auto-select
    };

    // Available fonts for selection
    this.availableFonts = [
      { name: "Bree Serif", displayName: "Bree Serif", category: "Serif" },
      { name: "Roboto Slab", displayName: "Roboto Slab", category: "Serif" },
      { name: "Spicy Rice", displayName: "Spicy Rice", category: "Display" },
      { name: "Bangers", displayName: "Bangers", category: "Display" },
      { name: "Comic Neue", displayName: "Comic Neue", category: "Fun" },
      { name: "Fredoka One", displayName: "Fredoka One", category: "Fun" },
      { name: "Righteous", displayName: "Righteous", category: "Display" },
      { name: "Luckiest Guy", displayName: "Luckiest Guy", category: "Fun" },
      { name: "Chewy", displayName: "Chewy", category: "Fun" },
      { name: "Boogaloo", displayName: "Boogaloo", category: "Fun" },
      { name: "Creepster", displayName: "Creepster", category: "Spooky" },
      { name: "Butcherman", displayName: "Butcherman", category: "Spooky" },
      { name: "Nosifer", displayName: "Nosifer", category: "Spooky" },
      { name: "Griffy", displayName: "Griffy", category: "Spooky" },
      { name: "Creepy", displayName: "Creepy", category: "Spooky" },
      { name: "Chiller", displayName: "Chiller", category: "Spooky" },
      { name: "Jolly Lodger", displayName: "Jolly Lodger", category: "Spooky" },
      { name: "Rubik Glitch", displayName: "Rubik Glitch", category: "Modern" },
      {
        name: "Rubik Wet Paint",
        displayName: "Rubik Wet Paint",
        category: "Modern",
      },
      {
        name: "Rubik Moonrocks",
        displayName: "Rubik Moonrocks",
        category: "Modern",
      },
      {
        name: "Rubik Beastly",
        displayName: "Rubik Beastly",
        category: "Modern",
      },
      {
        name: "Rubik Marker Hatch",
        displayName: "Rubik Marker Hatch",
        category: "Modern",
      },
      {
        name: "Rubik Distressed",
        displayName: "Rubik Distressed",
        category: "Modern",
      },
      { name: "Rubik Vinyl", displayName: "Rubik Vinyl", category: "Modern" },
      {
        name: "Rubik Microbe",
        displayName: "Rubik Microbe",
        category: "Modern",
      },
      {
        name: "Rubik 80s Fade",
        displayName: "Rubik 80s Fade",
        category: "Retro",
      },
      { name: "Rubik Maze", displayName: "Rubik Maze", category: "Modern" },
      { name: "Rubik Storm", displayName: "Rubik Storm", category: "Modern" },
      {
        name: "Rubik Gemstones",
        displayName: "Rubik Gemstones",
        category: "Modern",
      },
      { name: "Rubik Burned", displayName: "Rubik Burned", category: "Modern" },
      {
        name: "Rubik Glitch Pop",
        displayName: "Rubik Glitch Pop",
        category: "Modern",
      },
    ];

    // Available voices for text-to-speech with better diversity
    this.availableVoices = [
      {
        name: "auto",
        displayName: "🎯 Auto-Select Best Voice",
        description: "Automatically picks the highest quality voice available",
        searchTerms: ["auto", "best", "default"],
        voiceIndex: null, // Will be set dynamically
      },
      {
        name: "Samantha",
        displayName: "👩 Samantha (Female)",
        description: "Natural female voice - friendly and clear",
        searchTerms: ["samantha"],
        voiceIndex: 0,
      },
      {
        name: "Alex",
        displayName: "👨 Alex (Male)",
        description: "Natural male voice - warm and expressive",
        searchTerms: ["alex"],
        voiceIndex: 1,
      },
      {
        name: "Google US English",
        displayName: "👩 Google US English",
        description: "High-quality web-based voice",
        searchTerms: ["google us english"],
        voiceIndex: 2,
      },
      {
        name: "Daniel",
        displayName: "👨 Daniel (Male)",
        description: "Natural male voice with British accent",
        searchTerms: ["daniel"],
        voiceIndex: 3,
      },
      {
        name: "Moira",
        displayName: "👩 Moira (Female)",
        description: "Natural female voice with Irish accent",
        searchTerms: ["moira"],
        voiceIndex: 4,
      },
      {
        name: "Karen",
        displayName: "👨 Karen (Male)",
        description: "Natural male voice - clear and friendly",
        searchTerms: ["karen"],
        voiceIndex: 5,
      },
      {
        name: "Tessa",
        displayName: "👩 Tessa (Female)",
        description: "Clear female voice with South African accent",
        searchTerms: ["tessa"],
        voiceIndex: 6,
      },
      {
        name: "Rishi",
        displayName: "👨 Rishi (Male)",
        description: "Natural male voice with Indian accent",
        searchTerms: ["rishi"],
        voiceIndex: 7,
      },
      {
        name: "Microsoft Zira",
        displayName: "🌐 Microsoft Zira",
        description: "Natural Windows female voice",
        searchTerms: ["microsoft zira"],
        voiceIndex: 8,
      },
    ];

    // Create shared audio context for better iOS compatibility
    this.audioContext = null;
    this.audioUnlocked = false;
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    } catch (e) {
      console.log("Audio not available:", e);
    }

    // Store original HTML for both game modes
    this.originalEmojiHTML = null;
    this.originalColorHTML = null;

    // Speech synthesis for reading messages
    this.speechSynthesis = window.speechSynthesis;

    // Track positioned elements to prevent overlap
    this.positionedElements = [];

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupElements());
    } else {
      this.setupElements();
    }

    // Apply iPad-specific scaling as fallback
    this.applyIPadScaling();

    // Apply selected font
    this.applySelectedFont();

    // Update font menu item after a short delay to ensure it's created
    setTimeout(() => {
      this.updateFontMenuItem();
    }, 100);
  }

  setupElements() {
    // Store original emoji HTML on first setup (before any modifications)
    if (!this.originalEmojiHTML) {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      this.originalEmojiHTML = Array.from(headings).map((h) =>
        h.cloneNode(true)
      );
    }

    // Create color HTML if it doesn't exist
    if (!this.originalColorHTML) {
      this.createColorModeHTML();
    }

    // Create number HTML if it doesn't exist
    if (!this.originalNumberHTML) {
      this.createNumberModeHTML();
    }

    // Load the appropriate mode
    if (this.currentMode === "color") {
      this.loadColorMode();
    } else if (this.currentMode === "number") {
      this.loadNumberMode();
    } else {
      this.loadEmojiMode();
    }

    // Find all game elements (headings, color elements, or number elements)
    let gameElements;
    if (this.currentMode === "emoji") {
      gameElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    } else if (this.currentMode === "color") {
      gameElements = document.querySelectorAll(".color-block, .color-label");
    } else if (this.currentMode === "number") {
      gameElements = document.querySelectorAll(
        ".number-container, .number-label"
      );
    }

    // Count unique match IDs for total pairs
    const matchIds = new Set();
    gameElements.forEach((element) => {
      if (element.dataset.matchId) {
        matchIds.add(element.dataset.matchId);
      }
    });
    this.matchingState.totalPairs = matchIds.size;

    gameElements.forEach((element) => {
      // Split text into individual letter spans (for emojis and labels)
      if (
        this.currentMode === "emoji" ||
        element.classList.contains("color-label") ||
        element.classList.contains("number-label")
      ) {
        this.wrapLetters(element);
      }

      // Position randomly on initial page load
      this.positionRandomlyOnLoad(element);

      // Add drag and click event listeners
      this.setupDragAndClick(element);
    });

    // Add document-level event listeners for dragging
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    document.addEventListener("mouseup", (e) => this.handleMouseUp(e));

    // Touch support for mobile
    document.addEventListener("touchmove", (e) => this.handleTouchMove(e), {
      passive: false,
    });
    document.addEventListener("touchend", (e) => this.handleTouchEnd(e));

    // Start subtle background animations
    this.startSubtleAnimations();

    // Create hamburger menu
    this.createHamburgerMenu();

    // Unlock audio on first user interaction (iOS requirement)
    this.setupAudioUnlock();
  }

  setupAudioUnlock() {
    const unlockAudio = async () => {
      if (this.audioUnlocked || !this.audioContext) return;

      try {
        // Resume audio context on first interaction
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }

        // Play a silent tone to unlock audio on iOS
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0; // Silent
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.start(0);
        oscillator.stop(0.01);

        this.audioUnlocked = true;
        console.log("✓ Audio unlocked for iOS");

        // Remove listeners after unlocking
        document.removeEventListener("touchstart", unlockAudio);
        document.removeEventListener("touchend", unlockAudio);
        document.removeEventListener("click", unlockAudio);
      } catch (e) {
        console.log("Audio unlock failed:", e);
      }
    };

    // Try to unlock on any of these events
    document.addEventListener("touchstart", unlockAudio, {
      once: true,
      passive: true,
    });
    document.addEventListener("touchend", unlockAudio, {
      once: true,
      passive: true,
    });
    document.addEventListener("click", unlockAudio, { once: true });
  }

  createColorModeHTML() {
    // Create color mode elements programmatically
    const colors = Object.keys(this.colorDefinitions);
    this.originalColorHTML = [];

    colors.forEach((colorName) => {
      // Create color block
      const block = document.createElement("div");
      block.className = "color-block";
      block.dataset.matchId = colorName;
      block.style.backgroundColor = this.colorDefinitions[colorName];
      this.originalColorHTML.push(block.cloneNode(true));

      // Create color label
      const label = document.createElement("div");
      label.className = "color-label";
      label.dataset.matchId = colorName;
      label.textContent =
        colorName.charAt(0).toUpperCase() + colorName.slice(1);
      this.originalColorHTML.push(label.cloneNode(true));
    });

    console.log("✓ Color mode HTML created");
  }

  createNumberModeHTML() {
    // Create number mode elements programmatically
    const numbers = Object.keys(this.numberDefinitions);
    this.originalNumberHTML = [];

    numbers.forEach((number) => {
      // Create number container
      const container = document.createElement("div");
      container.className = "number-container";
      container.dataset.matchId = number;
      container.textContent = number;
      this.originalNumberHTML.push(container.cloneNode(true));

      // Create number label (written form)
      const label = document.createElement("div");
      label.className = "number-label";
      label.dataset.matchId = number;
      label.textContent = this.numberDefinitions[number];
      this.originalNumberHTML.push(label.cloneNode(true));
    });

    console.log("✓ Number mode HTML created");
  }

  loadEmojiMode() {
    // Remove all existing game elements
    this.clearGameElements();

    // Add emoji elements
    const container =
      document.getElementById("game-container") || document.body;
    this.originalEmojiHTML.forEach((heading) => {
      const newHeading = heading.cloneNode(true);
      container.appendChild(newHeading);
    });

    console.log("✓ Emoji mode loaded");
  }

  loadColorMode() {
    // Remove all existing game elements
    this.clearGameElements();

    // Add color elements
    const container =
      document.getElementById("game-container") || document.body;
    this.originalColorHTML.forEach((element) => {
      const newElement = element.cloneNode(true);
      container.appendChild(newElement);
    });

    console.log("✓ Color mode loaded");
  }

  loadNumberMode() {
    // Remove all existing game elements
    this.clearGameElements();

    // Add number elements
    const container =
      document.getElementById("game-container") || document.body;
    this.originalNumberHTML.forEach((element) => {
      const newElement = element.cloneNode(true);
      container.appendChild(newElement);
    });

    console.log("✓ Number mode loaded");
  }

  clearGameElements() {
    // Remove all existing game elements
    const elementsToRemove = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, .color-block, .color-label, .number-container, .number-label"
    );
    elementsToRemove.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }

  switchMode(newMode) {
    console.log(`🔄 Switching to ${newMode} mode...`);

    // Save the new mode
    this.currentMode = newMode;
    localStorage.setItem("gameMode", newMode);

    // Clear game state
    this.matchingState.selectedElement = null;
    this.matchingState.matchedPairs.clear();
    this.positionedElements = [];

    // Load the new mode
    if (newMode === "color") {
      this.loadColorMode();
    } else if (newMode === "number") {
      this.loadNumberMode();
    } else {
      this.loadEmojiMode();
    }

    // Setup elements for the new mode
    let gameElements;
    if (newMode === "emoji") {
      gameElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    } else if (newMode === "color") {
      gameElements = document.querySelectorAll(".color-block, .color-label");
    } else if (newMode === "number") {
      gameElements = document.querySelectorAll(
        ".number-container, .number-label"
      );
    }

    // Count unique match IDs for total pairs
    const matchIds = new Set();
    gameElements.forEach((element) => {
      if (element.dataset.matchId) {
        matchIds.add(element.dataset.matchId);
      }
    });
    this.matchingState.totalPairs = matchIds.size;

    gameElements.forEach((element) => {
      // Split text into individual letter spans
      if (
        newMode === "emoji" ||
        element.classList.contains("color-label") ||
        element.classList.contains("number-label")
      ) {
        this.wrapLetters(element);
      }

      // Position randomly
      this.positionRandomlyOnLoad(element);

      // Add drag and click event listeners
      this.setupDragAndClick(element);
    });

    console.log(`✅ ${newMode} mode ready!`);
  }

  createHamburgerMenu() {
    // Create hamburger button container
    const hamburgerContainer = document.createElement("div");
    hamburgerContainer.className = "hamburger-container";

    // Create hamburger button
    const hamburgerButton = document.createElement("button");
    hamburgerButton.className = "hamburger-button";
    hamburgerButton.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    hamburgerButton.setAttribute("aria-label", "Menu");

    // Create menu panel
    const menuPanel = document.createElement("div");
    menuPanel.className = "menu-panel";

    // Game Modes Section
    const modesSection = document.createElement("div");
    modesSection.className = "menu-section";

    // Mode switching items
    const modes = [
      {
        id: "emoji",
        icon: "😀",
        label: "Emoji Mode",
        description:
          "Match fun emoji pairs! Find planets, animals, sports, and space objects!",
      },
      {
        id: "color",
        icon: "🎨",
        label: "Color Mode",
        description:
          "Match colors with their names! Each color has a unique shade and label to match!",
      },
      {
        id: "number",
        icon: "🔢",
        label: "Number Mode",
        description:
          "Match numbers with their written form! Connect digits like '1' with words like 'One'!",
      },
    ];

    modes.forEach((mode) => {
      const modeItem = this.createMenuItem({
        icon: mode.icon,
        label: mode.label,
        description: mode.description,
        onClick: () => {
          if (mode.id !== this.currentMode) {
            this.switchMode(mode.id);
            this.playSound("toggle");
            this.closeMenu(hamburgerButton, menuPanel);
            // Refresh the menu to update current mode display
            setTimeout(() => {
              this.refreshMenu();
            }, 100);
          }
        },
      });

      // Mark current mode as active
      if (mode.id === this.currentMode) {
        modeItem.style.background = "rgba(78, 205, 196, 0.2)";
        modeItem.style.borderColor = "#4ecdc4";
        const icon = modeItem.querySelector(".menu-item-icon");
        const label = modeItem.querySelector(".menu-item-label");
        icon.style.background = "rgba(78, 205, 196, 0.3)";
        label.textContent = `${mode.label} (Current)`;
      }

      modesSection.appendChild(modeItem);
    });

    // New Game Item
    const newGameItem = this.createMenuItem({
      icon: "🔄",
      label: "New Game",
      description:
        "Start a fresh game with all elements randomly repositioned. Your progress will be reset!",
      onClick: () => {
        this.resetGame();
        this.playSound("toggle");
        this.closeMenu(hamburgerButton, menuPanel);
      },
    });
    modesSection.appendChild(newGameItem);

    menuPanel.appendChild(modesSection);

    // Audio Settings Section
    const audioSection = document.createElement("div");
    audioSection.className = "menu-section";

    // Sound Toggle Item
    const soundItem = this.createMenuItem({
      icon: this.settings.soundEnabled ? "🔊" : "🔇",
      label: "Sound Effects",
      description: this.settings.soundEnabled
        ? "Sound effects are ON. Click to turn off beeps, pops, and explosions."
        : "Sound effects are OFF. Click to hear beeps, pops, and explosions when you match!",
      onClick: () => {
        this.settings.soundEnabled = !this.settings.soundEnabled;
        localStorage.setItem("soundEnabled", this.settings.soundEnabled);
        const icon = soundItem.querySelector(".menu-item-icon");
        const desc = soundItem.querySelector(".menu-item-description");
        icon.textContent = this.settings.soundEnabled ? "🔊" : "🔇";
        desc.textContent = this.settings.soundEnabled
          ? "Sound effects are ON. Click to turn off beeps, pops, and explosions."
          : "Sound effects are OFF. Click to hear beeps, pops, and explosions when you match!";
        this.playSound("toggle");
      },
    });
    audioSection.appendChild(soundItem);

    // Voice Toggle Item
    const voiceItem = this.createMenuItem({
      icon: this.settings.speechEnabled ? "🗣️" : "🔇",
      label: "Voice Announcements",
      description: this.settings.speechEnabled
        ? "Voice is ON. The game will speak match messages and celebrate your wins!"
        : "Voice is OFF. Click to enable spoken celebrations and match announcements.",
      onClick: () => {
        this.settings.speechEnabled = !this.settings.speechEnabled;
        localStorage.setItem("speechEnabled", this.settings.speechEnabled);
        const icon = voiceItem.querySelector(".menu-item-icon");
        const desc = voiceItem.querySelector(".menu-item-description");
        icon.textContent = this.settings.speechEnabled ? "🗣️" : "🔇";
        desc.textContent = this.settings.speechEnabled
          ? "Voice is ON. The game will speak match messages and celebrate your wins!"
          : "Voice is OFF. Click to enable spoken celebrations and match announcements.";
        this.playSound("toggle");
        if (this.settings.speechEnabled) {
          this.speak("Voice enabled!");
        }
      },
    });
    audioSection.appendChild(voiceItem);

    // Dark Mode Toggle Item
    const darkModeItem = this.createMenuItem({
      icon: this.settings.darkModeEnabled ? "🌙" : "🌞",
      label: "Dark Mode",
      description: this.settings.darkModeEnabled
        ? "Dark mode is ON. All background colors will be dark. Click to allow all colors."
        : "Dark mode is OFF. Background can be any color. Click to force dark backgrounds only.",
      onClick: () => {
        this.settings.darkModeEnabled = !this.settings.darkModeEnabled;
        localStorage.setItem("darkModeEnabled", this.settings.darkModeEnabled);
        const icon = darkModeItem.querySelector(".menu-item-icon");
        const desc = darkModeItem.querySelector(".menu-item-description");
        icon.textContent = this.settings.darkModeEnabled ? "🌙" : "🌞";
        desc.textContent = this.settings.darkModeEnabled
          ? "Dark mode is ON. All background colors will be dark. Click to allow all colors."
          : "Dark mode is OFF. Background can be any color. Click to force dark backgrounds only.";
        this.playSound("toggle");

        // Immediately generate new background color based on mode
        this.generateImmediateBackgroundColor();
        console.log("Well - It's Toggled!!! Dark Mode That Is!!!");
      },
    });
    audioSection.appendChild(darkModeItem);

    // Font Selection Item
    const fontItem = this.createMenuItem({
      icon: "🔤",
      label: "Font Selection",
      description: `Current font: ${this.settings.selectedFont}. Click to choose from 30+ fun fonts including spooky, modern, and retro styles!`,
      onClick: () => {
        this.openFontModal();
        this.playSound("toggle");
      },
    });
    // Store reference for updating
    this.fontMenuItem = fontItem;
    audioSection.appendChild(fontItem);

    // Voice Selection Item
    const voiceSelectionItem = this.createMenuItem({
      icon: "🎭",
      label: "Voice Selection",
      description: `Current voice: ${
        this.availableVoices.find((v) => v.name === this.settings.selectedVoice)
          ?.displayName || "Auto-Select"
      }. Click to choose from diverse voices including male, female, and different accents!`,
      onClick: () => {
        this.openVoiceModal();
        this.playSound("toggle");
      },
    });
    // Store reference for updating
    this.voiceMenuItem = voiceSelectionItem;
    audioSection.appendChild(voiceSelectionItem);

    menuPanel.appendChild(audioSection);

    // Utilities Section
    const utilsSection = document.createElement("div");
    utilsSection.className = "menu-section";

    // Clear Stardust Item
    const clearStardustItem = this.createMenuItem({
      icon: "✨",
      label: "Clear Stardust",
      description:
        "Remove all lingering stardust particles from the screen. They normally fade out after 4-5 minutes.",
      onClick: () => {
        this.clearAllStardust();
        this.playSound("toggle");
        this.closeMenu(hamburgerButton, menuPanel);
        console.log("Well - It's Cleared!!! Stardust That Is!!!");
      },
    });
    utilsSection.appendChild(clearStardustItem);

    const howToPlayItem = this.createMenuItem({
      icon: "❓",
      label: "Game Instructions",
      description:
        "Tap or click to select an item, then tap another to match. Drag items to move them around. Double-click empty space to change background colors!",
      onClick: null, // Non-clickable info item
    });
    utilsSection.appendChild(howToPlayItem);

    menuPanel.appendChild(utilsSection);

    // Toggle menu
    hamburgerButton.addEventListener("click", () => {
      const isOpen = menuPanel.classList.contains("open");
      if (isOpen) {
        this.closeMenu(hamburgerButton, menuPanel);
      } else {
        this.openMenu(hamburgerButton, menuPanel);
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburgerContainer.contains(e.target) &&
        !menuPanel.contains(e.target) &&
        menuPanel.classList.contains("open")
      ) {
        this.closeMenu(hamburgerButton, menuPanel);
      }
    });

    hamburgerContainer.appendChild(hamburgerButton);
    document.body.appendChild(hamburgerContainer);
    document.body.appendChild(menuPanel);
  }

  refreshMenu() {
    // Remove existing menu
    const existingMenu = document.querySelector(".hamburger-container");
    if (existingMenu) {
      existingMenu.remove();
    }

    // Recreate menu with updated current mode
    this.createHamburgerMenu();
  }

  addNumberFlashEffect(element) {
    // Determine which flash animation to use based on element class
    const isContainer = element.classList.contains("number-container");
    const flashClass = isContainer ? "number-flash" : "number-label-flash";

    // Add the flash class
    element.classList.add(flashClass);

    // Remove the flash class after animation completes
    setTimeout(() => {
      element.classList.remove(flashClass);
    }, 1000); // Match the animation duration
  }

  createMenuItem({ icon, label, description, onClick }) {
    const item = document.createElement("div");
    item.className = "menu-item";
    if (!onClick) {
      item.style.cursor = "default";
    }

    const header = document.createElement("div");
    header.className = "menu-item-header";

    const iconEl = document.createElement("div");
    iconEl.className = "menu-item-icon";
    iconEl.textContent = icon;

    const labelEl = document.createElement("div");
    labelEl.className = "menu-item-label";
    labelEl.textContent = label;

    header.appendChild(iconEl);
    header.appendChild(labelEl);

    const desc = document.createElement("div");
    desc.className = "menu-item-description";
    desc.textContent = description;

    item.appendChild(header);
    item.appendChild(desc);

    if (onClick) {
      item.addEventListener("click", onClick);
    } else {
      item.addEventListener("mouseenter", () => {
        item.style.background = "rgba(255, 255, 255, 0.1)";
        item.style.transform = "translateX(0)";
      });
    }

    return item;
  }

  openMenu(button, panel) {
    button.classList.add("open");
    panel.classList.add("open");
    this.playSound("toggle");
  }

  closeMenu(button, panel) {
    button.classList.remove("open");
    panel.classList.remove("open");
    this.playSound("toggle");
  }

  clearAllStardust() {
    // Find and remove all lingering stardust particles
    const allStardust = document.querySelectorAll(".lingering-stardust");
    allStardust.forEach((stardust) => {
      if (stardust.parentNode) {
        // Fade out smoothly before removing
        stardust.style.transition = "opacity 0.5s ease-out";
        stardust.style.opacity = "0";
        setTimeout(() => {
          if (stardust.parentNode) {
            stardust.parentNode.removeChild(stardust);
          }
        }, 500);
      }
    });
    console.log(`✨ Cleared ${allStardust.length} stardust particles`);
  }

  generateImmediateBackgroundColor() {
    // Generate a new background color immediately when dark mode is toggled
    console.log("🎨 Generating immediate background color...");

    // Use the BackgroundEffects class to generate appropriate color
    if (window.backgroundEffects) {
      // Update the settings reference to ensure it's current
      window.backgroundEffects.settings = this.settings;
      const newColor = window.backgroundEffects.generateRandomEndColor();

      // Apply the color with a smooth transition
      document.body.style.transition = "background-color 0.8s ease-in-out";
      document.body.style.backgroundColor = newColor;

      console.log("✅ New background color applied:", newColor);
    } else {
      // Fallback if BackgroundEffects isn't available
      const fallbackColor = this.settings.darkModeEnabled
        ? this.generateRandomDarkColor()
        : this.generateRandomColor();

      document.body.style.transition = "background-color 0.8s ease-in-out";
      document.body.style.backgroundColor = fallbackColor;

      console.log("✅ Fallback background color applied:", fallbackColor);
    }
  }

  generateRandomDarkColor() {
    // Generate extra dark colors for dark mode
    const darkPalettes = [
      // Very dark grays and blacks
      () => {
        const shade = Math.floor(Math.random() * 51);
        return `rgb(${shade}, ${shade}, ${shade})`;
      },
      // Dark blues (navy to midnight)
      () => {
        const r = Math.floor(Math.random() * 30);
        const g = Math.floor(Math.random() * 40);
        const b = Math.floor(Math.random() * 80);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark purples (deep purple to plum)
      () => {
        const r = Math.floor(Math.random() * 60);
        const g = Math.floor(Math.random() * 30);
        const b = Math.floor(Math.random() * 70);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark greens (forest to hunter)
      () => {
        const r = Math.floor(Math.random() * 30);
        const g = Math.floor(Math.random() * 60);
        const b = Math.floor(Math.random() * 40);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark reds (burgundy to wine)
      () => {
        const r = Math.floor(Math.random() * 70);
        const g = Math.floor(Math.random() * 20);
        const b = Math.floor(Math.random() * 30);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark browns (chocolate to coffee)
      () => {
        const r = Math.floor(Math.random() * 60) + 20;
        const g = Math.floor(Math.random() * 40) + 10;
        const b = Math.floor(Math.random() * 30);
        return `rgb(${r}, ${g}, ${b})`;
      },
    ];

    const palette =
      darkPalettes[Math.floor(Math.random() * darkPalettes.length)];
    return palette();
  }

  generateRandomColor() {
    // Generate any random color for regular mode
    const methods = [
      () => this.generateRandomVibrantColor(),
      () => this.generateRandomPastelColor(),
      () => this.generateRandomNeonColor(),
      () => this.generateRandomEarthTone(),
      () => this.generateRandomJewelTone(),
    ];

    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    return randomMethod();
  }

  generateRandomVibrantColor() {
    // Generate vibrant colors with at least one high value
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(Math.floor(Math.random() * 256));
    }
    // Ensure at least one color is vibrant (>150)
    const randomIndex = Math.floor(Math.random() * 3);
    colors[randomIndex] = Math.max(
      colors[randomIndex],
      150 + Math.floor(Math.random() * 106)
    );

    return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  }

  generateRandomPastelColor() {
    // Generate soft pastel colors
    const r = 150 + Math.floor(Math.random() * 106);
    const g = 150 + Math.floor(Math.random() * 106);
    const b = 150 + Math.floor(Math.random() * 106);
    return `rgb(${r}, ${g}, ${b})`;
  }

  generateRandomNeonColor() {
    // Generate bright neon-like colors
    const neonBase = [
      [255, 0, 255],
      [0, 255, 255],
      [255, 255, 0],
      [255, 0, 128],
      [128, 255, 0],
      [0, 128, 255],
    ];
    const base = neonBase[Math.floor(Math.random() * neonBase.length)];

    // Add some variation to the base neon color
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 100));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 100));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 100));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  generateRandomEarthTone() {
    // Generate earth tones (browns, greens, oranges)
    const earthPalettes = [
      { r: [101, 67, 33], g: [67, 33, 16], b: [33, 16, 8] }, // Browns
      { r: [34, 68, 102], g: [85, 119, 153], b: [34, 51, 68] }, // Forest greens
      { r: [153, 102, 51], g: [102, 68, 34], b: [51, 34, 17] }, // Oranges/rust
      { r: [68, 85, 102], g: [85, 102, 119], b: [102, 119, 136] }, // Blue-grays
    ];

    const palette =
      earthPalettes[Math.floor(Math.random() * earthPalettes.length)];
    const r =
      palette.r[Math.floor(Math.random() * palette.r.length)] +
      Math.floor(Math.random() * 50);
    const g =
      palette.g[Math.floor(Math.random() * palette.g.length)] +
      Math.floor(Math.random() * 50);
    const b =
      palette.b[Math.floor(Math.random() * palette.b.length)] +
      Math.floor(Math.random() * 50);

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
  }

  generateRandomJewelTone() {
    // Generate rich jewel tones
    const jewelBases = [
      [128, 0, 128], // Purple (amethyst)
      [0, 100, 0], // Green (emerald)
      [220, 20, 60], // Red (ruby)
      [0, 0, 139], // Blue (sapphire)
      [255, 140, 0], // Orange (topaz)
      [75, 0, 130], // Indigo
    ];

    const base = jewelBases[Math.floor(Math.random() * jewelBases.length)];
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 80));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 80));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 80));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  applyIPadScaling() {
    // Detect iPad devices and apply scaling as fallback
    const isIPad =
      /iPad|Macintosh/.test(navigator.userAgent) && "ontouchend" in document;
    const isTabletSize = window.innerWidth >= 768 && window.innerWidth <= 1024;

    console.log("🔍 Device detection:", {
      userAgent: navigator.userAgent,
      isIPad,
      isTabletSize,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    if (isIPad || isTabletSize) {
      console.log("📱 iPad detected, applying scaling fallback");

      // Apply scaling to all game elements
      const style = document.createElement("style");
      style.id = "ipad-scaling-fallback";
      style.textContent = `
          h1 { font-size: 4.55rem !important; }
          h2 { font-size: 2.33rem !important; }
          h3 { font-size: 1.75rem !important; }
          h4 { font-size: 1.46rem !important; }
          .color-block { 
            width: 70px !important; 
            height: 70px !important; 
            border-width: 3px !important; 
          }
          .color-label { 
            font-size: 1.75rem !important; 
            padding: 5px 12px !important; 
            border-width: 2px !important; 
          }
          .match-message { 
            font-size: 1.7rem !important; 
            padding: 16px 32px !important; 
          }
          .victory-message { 
            font-size: 2.4rem !important; 
            padding: 24px 40px !important; 
          }
          body { 
            padding: 40px 25px !important; 
          }
        `;
      document.head.appendChild(style);
    }
  }

  openFontModal() {
    // Create font selection modal
    const modal = document.createElement("div");
    modal.className = "font-modal-overlay";
    modal.innerHTML = `
      <div class="font-modal">
        <div class="font-modal-header">
          <button class="font-modal-close">&times;</button>
        </div>
        <div class="font-modal-content">
          <div class="font-categories">
            ${this.getFontCategories()
              .map(
                (category) => `
              <button class="font-category-btn" data-category="${category}">
                ${category}
              </button>
            `
              )
              .join("")}
          </div>
          <div class="font-grid">
            ${this.availableFonts
              .map(
                (font) => `
              <div class="font-option ${
                font.name === this.settings.selectedFont ? "selected" : ""
              }" 
                   data-font="${font.name}" 
                   data-category="${font.category}">
                <div class="font-preview" style="font-family: '${
                  font.name
                }', sans-serif;">
                  Aa Bb Cc
                </div>
                <div class="font-name">${font.displayName}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector(".font-modal-close").addEventListener("click", () => {
      this.closeFontModal(modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeFontModal(modal);
      }
    });

    // Category filter buttons
    modal.querySelectorAll(".font-category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        this.filterFontsByCategory(modal, category);

        // Update active category button
        modal
          .querySelectorAll(".font-category-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    // Font selection
    modal.querySelectorAll(".font-option").forEach((option) => {
      option.addEventListener("click", () => {
        const fontName = option.dataset.font;
        this.selectFont(fontName);
        this.closeFontModal(modal);
      });
    });

    // Show modal with animation
    setTimeout(() => modal.classList.add("show"), 10);
  }

  closeFontModal(modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  getFontCategories() {
    const categories = [
      ...new Set(this.availableFonts.map((font) => font.category)),
    ];
    return ["All", ...categories];
  }

  openVoiceModal() {
    // Create voice selection modal
    const modal = document.createElement("div");
    modal.className = "voice-modal-overlay";
    modal.innerHTML = `
      <div class="voice-modal">
        <div class="voice-modal-header">
          <button class="voice-modal-close">&times;</button>
        </div>
        <div class="voice-modal-content">
          <div class="voice-grid">
            ${this.availableVoices
              .map(
                (voice) => `
              <div class="voice-option ${
                voice.name === this.settings.selectedVoice ? "selected" : ""
              }" 
                   data-voice="${voice.name}">
                <div class="voice-icon">${voice.displayName.split(" ")[0]}</div>
                <div class="voice-name">${voice.displayName}</div>
                <div class="voice-description">${voice.description}</div>
                <button class="voice-test-btn" data-voice="${voice.name}">
                  🔊 Test Voice
                </button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector(".voice-modal-close").addEventListener("click", () => {
      this.closeVoiceModal(modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeVoiceModal(modal);
      }
    });

    // Voice selection
    modal.querySelectorAll(".voice-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        // Don't trigger selection when clicking test button
        if (e.target.classList.contains("voice-test-btn")) return;

        const voiceName = option.dataset.voice;
        this.selectVoice(voiceName);
        this.closeVoiceModal(modal);
      });
    });

    // Test voice buttons
    modal.querySelectorAll(".voice-test-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent option selection
        const voiceName = btn.dataset.voice;
        this.testVoice(voiceName);
      });
    });

    // Show modal with animation
    setTimeout(() => modal.classList.add("show"), 10);
  }

  closeVoiceModal(modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  selectVoice(voiceName) {
    this.settings.selectedVoice = voiceName;
    localStorage.setItem("selectedVoice", voiceName);

    // Update menu description
    if (this.voiceMenuItem) {
      const selectedVoice = this.availableVoices.find(
        (v) => v.name === voiceName
      );
      const description = this.voiceMenuItem.querySelector(
        ".menu-item-description"
      );
      if (description) {
        description.textContent = `Current voice: ${
          selectedVoice?.displayName || "Auto-Select"
        }. Click to choose from diverse voices including male, female, and different accents!`;
      }
    }

    this.playSound("toggle");
    console.log("🗣️ Voice changed to:", voiceName);
  }

  testVoice(voiceName) {
    // Temporarily change voice for testing
    const originalVoice = this.settings.selectedVoice;
    this.settings.selectedVoice = voiceName;

    // Test with a fun message
    const testMessages = [
      "Hello! I'm your new voice!",
      "This is how I sound!",
      "Ready to play the matching game!",
      "Let's have some fun together!",
    ];
    const randomMessage =
      testMessages[Math.floor(Math.random() * testMessages.length)];

    this.speak(randomMessage);

    // Restore original voice after a short delay
    setTimeout(() => {
      this.settings.selectedVoice = originalVoice;
    }, 2000);

    console.log("🗣️ Testing voice:", voiceName);
  }

  filterFontsByCategory(modal, category) {
    const fontOptions = modal.querySelectorAll(".font-option");
    fontOptions.forEach((option) => {
      if (category === "All" || option.dataset.category === category) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  }

  selectFont(fontName) {
    this.settings.selectedFont = fontName;
    localStorage.setItem("selectedFont", fontName);
    this.applySelectedFont();
    this.updateFontMenuItem();
    this.playSound("toggle");
    console.log("🔤 Font changed to:", fontName);
  }

  updateFontMenuItem() {
    // Update the font menu item description with current font
    if (this.fontMenuItem) {
      const desc = this.fontMenuItem.querySelector(".menu-item-description");
      if (desc) {
        desc.textContent = `Current font: ${this.settings.selectedFont}. Click to choose from 30+ fun fonts including spooky, modern, and retro styles!`;
      }
    }
  }

  applySelectedFont() {
    // Apply the selected font to all text elements
    const style = document.createElement("style");
    style.id = "selected-font-style";

    // Remove existing font style
    const existingStyle = document.getElementById("selected-font-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    style.textContent = `
      h1, h2, h3, h4, h5, h6 {
        font-family: "${this.settings.selectedFont}", sans-serif !important;
      }
      .color-label {
        font-family: "${this.settings.selectedFont}", sans-serif !important;
      }
      .number-container {
        font-family: "${this.settings.selectedFont}", sans-serif !important;
      }
      .number-label {
        font-family: "${this.settings.selectedFont}", sans-serif !important;
      }
      .match-message, .victory-message {
        font-family: "${this.settings.selectedFont}", sans-serif !important;
      }
    `;

    document.head.appendChild(style);
  }

  // Haptic feedback removed

  // Text-to-speech for messages with improved voice selection
  speak(text) {
    if (!this.settings.speechEnabled) return;
    if (!this.speechSynthesis) return;

    // Cancel any ongoing speech
    this.speechSynthesis.cancel();

    // Clean up text - remove emojis for more natural speech
    const cleanText = text.replace(/[🎉🏆⭐🌟💫🔥🎯🌈🎨🚀✨💥]/g, "").trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // More natural voice settings - less robotic
    utterance.pitch = 1.3; // More moderate pitch (less extreme = more natural)
    utterance.rate = 0.95; // Slightly slower = more expressive and clear
    utterance.volume = 0.9; // Good volume

    // Try to select voice based on user preference
    const voices = this.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (this.settings.selectedVoice === "auto") {
      // Auto-select best voice using improved logic
      selectedVoice = this.findBestAvailableVoice(voices);
    } else {
      // Use user-selected voice with better matching
      selectedVoice = this.findUserSelectedVoice(
        voices,
        this.settings.selectedVoice
      );

      if (!selectedVoice) {
        console.log("🗣️ Selected voice not found, falling back to auto-select");
        selectedVoice = this.findBestAvailableVoice(voices);
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("🗣️ Using voice:", selectedVoice.name);
    }

    this.speechSynthesis.speak(utterance);
    console.log("🗣️ Speaking:", cleanText);
  }

  // Find the best available voice automatically
  findBestAvailableVoice(voices) {
    // Log available voices for debugging
    console.log(
      "🗣️ Available voices:",
      voices.map((v, i) => `${i}: ${v.name}`)
    );

    // Skip Samantha (index 0) and try to find a different good voice
    // Start with Alex (index 1) and cycle through to find the best available
    const voiceIndices = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Start with index 1, end with 0

    // Try each index to find different voices
    for (const index of voiceIndices) {
      if (voices[index]) {
        console.log("🗣️ Auto-selected voice by index:", voices[index].name);
        return voices[index];
      }
    }

    // Fallback: prioritize local/premium voices (they sound better)
    const localVoice = voices.find(
      (voice) => voice.localService && voice.lang.startsWith("en")
    );
    if (localVoice) {
      console.log("🗣️ Auto-selected local voice:", localVoice.name);
      return localVoice;
    }

    // Final fallback: any English voice
    const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
    if (englishVoice) {
      console.log("🗣️ Auto-selected English voice:", englishVoice.name);
      return englishVoice;
    }

    return null;
  }

  // Find user-selected voice with better matching
  findUserSelectedVoice(voices, selectedVoiceName) {
    // First try exact match
    let voice = voices.find((v) => v.name === selectedVoiceName);
    if (voice) return voice;

    // Then try finding by voice option
    const voiceOption = this.availableVoices.find(
      (v) => v.name === selectedVoiceName
    );
    if (voiceOption) {
      // Use voiceIndex for precise matching
      if (voiceOption.voiceIndex !== null && voices[voiceOption.voiceIndex]) {
        console.log(
          "🗣️ Found voice by index:",
          voices[voiceOption.voiceIndex].name
        );
        return voices[voiceOption.voiceIndex];
      }

      // Fallback: try matching by search terms
      for (const searchTerm of voiceOption.searchTerms) {
        voice = voices.find((v) =>
          v.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (voice) return voice;
      }
    }

    return null;
  }

  // Reset game to initial state
  resetGame() {
    console.log("🔄 Resetting game...");

    // Clear game state
    this.matchingState.selectedElement = null;
    this.matchingState.matchedPairs.clear();

    // Clear positioned elements tracking
    this.positionedElements = [];

    // Remove all existing game elements
    this.clearGameElements();

    // Restore elements based on current mode
    const container =
      document.getElementById("game-container") || document.body;
    const originalHTML =
      this.currentMode === "emoji"
        ? this.originalEmojiHTML
        : this.originalColorHTML;

    if (originalHTML) {
      originalHTML.forEach((originalElement) => {
        const newElement = originalElement.cloneNode(true);
        container.appendChild(newElement);

        // Set up drag, click, and position for the restored element
        this.setupDragAndClick(newElement);

        // Wrap letters for text elements
        if (
          this.currentMode === "emoji" ||
          newElement.classList.contains("color-label")
        ) {
          this.wrapLetters(newElement);
        }

        this.positionRandomlyOnLoad(newElement);
      });

      // Update total pairs count
      const matchIds = new Set();
      const gameElements =
        this.currentMode === "emoji"
          ? document.querySelectorAll("h1, h2, h3, h4, h5, h6")
          : document.querySelectorAll(".color-block, .color-label");

      gameElements.forEach((element) => {
        if (element.dataset.matchId) {
          matchIds.add(element.dataset.matchId);
        }
      });
      this.matchingState.totalPairs = matchIds.size;
    }

    console.log("✅ Game reset complete!");
  }

  // Sound system using Web Audio API (pure JavaScript, no files needed!)
  async playSound(type) {
    if (!this.settings.soundEnabled) return;
    if (!this.audioContext) return;

    try {
      // Ensure audio context is running
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
        console.log("Audio context resumed for:", type);
      }

      const now = this.audioContext.currentTime;

      switch (type) {
        case "select":
          // Quick high beep
          this.createTone(this.audioContext, 800, now, 0.05, 0.1, "sine");
          break;

        case "match":
          // Cork/suction pop sound (make it louder!)
          this.createPopSound(this.audioContext, now, 0.18); // Increased volume
          break;

        case "explosion":
          // Soft explosion whoosh (no harsh buzz)
          this.createExplosionSound(this.audioContext, now);
          break;

        case "victory":
          // Epic victory fanfare - triumphant ascending melody!
          // First phrase (C-E-G)
          this.createTone(this.audioContext, 523, now, 0.15, 0.25, "sine"); // C
          this.createTone(
            this.audioContext,
            659,
            now + 0.15,
            0.15,
            0.25,
            "sine"
          ); // E
          this.createTone(this.audioContext, 784, now + 0.3, 0.2, 0.3, "sine"); // G

          // Second phrase (G-A-B)
          this.createTone(
            this.audioContext,
            784,
            now + 0.5,
            0.12,
            0.25,
            "sine"
          ); // G
          this.createTone(
            this.audioContext,
            880,
            now + 0.62,
            0.12,
            0.25,
            "sine"
          ); // A
          this.createTone(
            this.audioContext,
            988,
            now + 0.74,
            0.15,
            0.28,
            "sine"
          ); // B

          // Grand finale (High C - triumphant!)
          this.createTone(
            this.audioContext,
            1047,
            now + 0.9,
            0.4,
            0.35,
            "sine"
          ); // High C

          // Add harmony for richness
          this.createTone(this.audioContext, 523, now + 0.9, 0.4, 0.2, "sine"); // Harmony C
          this.createTone(this.audioContext, 784, now + 0.9, 0.4, 0.2, "sine"); // Harmony G
          break;

        case "background":
          // Big background explosion (dramatic sweep)
          this.createTone(this.audioContext, 400, now, 0.3, 0.4, "triangle");
          this.createTone(
            this.audioContext,
            200,
            now + 0.1,
            0.3,
            0.3,
            "sawtooth"
          );
          this.createTone(
            this.audioContext,
            100,
            now + 0.2,
            0.2,
            0.25,
            "sawtooth"
          );
          break;

        case "toggle":
          // Soft click
          this.createTone(this.audioContext, 600, now, 0.03, 0.08, "square");
          break;

        case "error":
          // Quick sawtooth buzzer for incorrect match
          this.createTone(this.audioContext, 180, now, 0.08, 0.15, "sawtooth");
          this.createTone(
            this.audioContext,
            150,
            now + 0.08,
            0.08,
            0.12,
            "sawtooth"
          );
          break;

        default:
          // Generic beep
          this.createTone(this.audioContext, 440, now, 0.1, 0.1, "sine");
      }
    } catch (e) {
      console.log("Audio playback not available:", e);
    }
  }

  createTone(
    audioContext,
    frequency,
    startTime,
    duration,
    volume,
    type = "sine"
  ) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Envelope (fade in and out to avoid clicks)
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + duration - 0.02);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  createPopSound(audioContext, startTime, volume = 0.12) {
    // Create a gentle, soft pop sound (no harsh buzz)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Connect the audio nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Soft sine wave only
    oscillator.type = "sine";

    // Gentle pitch drop (lower frequencies, less harsh)
    oscillator.frequency.setValueAtTime(250, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(60, startTime + 0.06);

    // Heavy low-pass filter to remove any harsh frequencies
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, startTime); // Much lower cutoff
    filter.frequency.exponentialRampToValueAtTime(150, startTime + 0.06);
    filter.Q.value = 0.5; // Gentler resonance

    // Softer envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, startTime + 0.06);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.06);
  }

  createExplosionSound(audioContext, startTime) {
    // Soft whoosh sound (no harsh sawtooth buzz)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Use sine wave instead of harsh sawtooth
    oscillator.type = "sine";

    // Descending whoosh
    oscillator.frequency.setValueAtTime(180, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, startTime + 0.15);

    // Filter to keep it soft
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, startTime);
    filter.frequency.exponentialRampToValueAtTime(200, startTime + 0.15);
    filter.Q.value = 0.7;

    // Envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
    gainNode.gain.linearRampToValueAtTime(0, startTime + 0.15);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.15);
  }

  setupDragAndClick(heading) {
    // Mouse events for desktop
    heading.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.startDrag(heading, e.clientX, e.clientY);
    });

    // Touch events for mobile - optimized for quick taps
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let hasMoved = false;

    heading.addEventListener(
      "touchstart",
      (e) => {
        touchStartTime = Date.now();
        const touch = e.touches[0];
        touchStartPos = { x: touch.clientX, y: touch.clientY };
        hasMoved = false;
      },
      { passive: true }
    );

    heading.addEventListener(
      "touchmove",
      (e) => {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartPos.x);
        const deltaY = Math.abs(touch.clientY - touchStartPos.y);

        // If moved more than 10px, it's a drag
        if (deltaX > 10 || deltaY > 10) {
          hasMoved = true;
          // Start drag if not already dragging
          if (!this.dragState.isDragging) {
            this.startDrag(heading, touchStartPos.x, touchStartPos.y);
          }
        }
      },
      { passive: true }
    );

    heading.addEventListener("touchend", (e) => {
      const touchDuration = Date.now() - touchStartTime;

      // Quick tap (< 300ms and no movement) = instant selection
      if (touchDuration < 300 && !hasMoved) {
        e.preventDefault();
        this.handleQuickClick(heading);
      } else if (hasMoved) {
        // Was a drag, handle normally
        this.handleMouseUp(e);
      }

      hasMoved = false;
    });
  }

  startDrag(element, clientX, clientY) {
    this.dragState.isDragging = true;
    this.dragState.element = element;
    this.dragState.startX = clientX;
    this.dragState.startY = clientY;
    this.dragState.hasMoved = false;

    // Get current position
    const rect = element.getBoundingClientRect();
    this.dragState.elementStartX = rect.left;
    this.dragState.elementStartY = rect.top;

    // Add dragging class for visual feedback
    element.classList.add("dragging");
    element.style.cursor = "grabbing";
  }

  handleMouseMove(e) {
    if (!this.dragState.isDragging) return;

    e.preventDefault();
    this.updateDragPosition(e.clientX, e.clientY);
  }

  handleTouchMove(e) {
    if (!this.dragState.isDragging) return;

    e.preventDefault();
    const touch = e.touches[0];
    this.updateDragPosition(touch.clientX, touch.clientY);
  }

  updateDragPosition(clientX, clientY) {
    const deltaX = clientX - this.dragState.startX;
    const deltaY = clientY - this.dragState.startY;

    // If moved more than 5 pixels, consider it a drag (not a click)
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      this.dragState.hasMoved = true;
    }

    const newX = this.dragState.elementStartX + deltaX;
    const newY = this.dragState.elementStartY + deltaY;

    this.dragState.element.style.left = `${newX}px`;
    this.dragState.element.style.top = `${newY}px`;
  }

  handleMouseUp(e) {
    if (!this.dragState.isDragging) return;

    const element = this.dragState.element;
    element.classList.remove("dragging");
    element.style.cursor = "grab";

    // If it was a click/tap (not a drag), handle selection
    if (!this.dragState.hasMoved) {
      this.handleQuickClick(element);
    }

    // Reset drag state
    this.dragState.isDragging = false;
    this.dragState.element = null;
    this.dragState.hasMoved = false;
  }

  handleTouchEnd(e) {
    this.handleMouseUp(e);
  }

  handleQuickClick(element) {
    // Check if already matched
    const matchId = element.dataset.matchId;
    if (this.matchingState.matchedPairs.has(matchId)) {
      return; // Already matched, do nothing
    }

    // If no element is selected, select this one
    if (!this.matchingState.selectedElement) {
      this.matchingState.selectedElement = element;
      element.classList.add("selected");

      // Add flash effect for number mode elements
      if (this.currentMode === "number") {
        this.addNumberFlashEffect(element);
      }

      this.playSound("select");
      console.log("✓ Selected:", element.textContent);
      return;
    }

    // If clicking the same element, deselect it
    if (this.matchingState.selectedElement === element) {
      element.classList.remove("selected");
      this.matchingState.selectedElement = null;
      console.log("✗ Deselected:", element.textContent);
      return;
    }

    // Check if it's a match
    const selectedMatchId = this.matchingState.selectedElement.dataset.matchId;
    if (selectedMatchId === matchId) {
      // It's a match!
      this.playSound("match");
      console.log("🎉 Match found!", element.textContent);

      // Add flash effect for both elements in number mode
      if (this.currentMode === "number") {
        this.addNumberFlashEffect(this.matchingState.selectedElement);
        this.addNumberFlashEffect(element);
      }

      this.handleMatch(this.matchingState.selectedElement, element);
    } else {
      // Not a match - show error feedback
      this.playSound("error");

      // Shake both elements briefly
      const prevElement = this.matchingState.selectedElement;
      prevElement.classList.add("shake-error");
      element.classList.add("shake-error");

      setTimeout(() => {
        prevElement.classList.remove("shake-error");
        element.classList.remove("shake-error");
      }, 500);

      // Then deselect previous and select new
      this.matchingState.selectedElement.classList.remove("selected");
      this.matchingState.selectedElement = element;
      element.classList.add("selected");

      // Add flash effect for number mode elements
      if (this.currentMode === "number") {
        this.addNumberFlashEffect(element);
      }

      console.log("❌ Not a match. Switched to:", element.textContent);
    }
  }

  handleMatch(element1, element2) {
    const matchId = element1.dataset.matchId;

    // Mark as matched
    this.matchingState.matchedPairs.add(matchId);
    element1.classList.remove("selected");
    element2.classList.remove("selected");
    element1.classList.add("matched");
    element2.classList.add("matched");

    // Show match message with custom message for this emoji
    this.showMatchMessage(matchId);

    // Explode both elements with stardust!
    setTimeout(() => {
      this.explodeMatchedPair(element1, element2);
    }, 500);

    // Reset selection
    this.matchingState.selectedElement = null;

    // Check for victory
    if (
      this.matchingState.matchedPairs.size === this.matchingState.totalPairs
    ) {
      setTimeout(() => {
        this.showVictoryMessage();
      }, 3000); // Wait for explosions to finish
    }
  }

  explodeMatchedPair(element1, element2) {
    // Create stardust at both locations before removing
    this.createLingeringStardust(element1);
    this.createLingeringStardust(element2);

    this.playSound("explosion");

    // Explode both elements
    this.explodeAndReform(element1);
    this.explodeAndReform(element2);

    // Remove both elements after explosion
    setTimeout(() => {
      if (element1.parentNode) {
        element1.style.opacity = "0";
        element1.style.transition = "opacity 1s ease-out";
      }
      if (element2.parentNode) {
        element2.style.opacity = "0";
        element2.style.transition = "opacity 1s ease-out";
      }

      setTimeout(() => {
        if (element1.parentNode) element1.parentNode.removeChild(element1);
        if (element2.parentNode) element2.parentNode.removeChild(element2);
      }, 1000);
    }, 2500); // After explosion animation
  }

  showMatchMessage(matchId) {
    // Get custom messages based on current mode
    let messages;
    if (this.currentMode === "color") {
      messages = this.colorMatchMessages[matchId] || this.defaultMatchMessages;
    } else if (this.currentMode === "number") {
      messages = this.numberMatchMessages[matchId] || this.defaultMatchMessages;
    } else {
      messages = this.customMatchMessages[matchId] || this.defaultMatchMessages;
    }

    // Select a random message from the array
    const message = messages[Math.floor(Math.random() * messages.length)];

    this.displayFloatingMessage(message, "#4ecdc4");
    this.speak(message);

    console.log(`✨ ${matchId} match:`, message);
  }

  showVictoryMessage() {
    let messages;
    if (this.currentMode === "number") {
      messages = this.numberVictoryMessages;
    } else {
      messages = this.victoryMessages;
    }

    const message = messages[Math.floor(Math.random() * messages.length)];
    this.displayFloatingMessage(message, "#feca57", true);
    this.playSound("victory");
    this.speak(message);
    this.createVictoryConfetti();
  }

  displayFloatingMessage(text, color, isLarge = false) {
    const messageEl = document.createElement("div");
    messageEl.className = isLarge ? "victory-message" : "match-message";
    messageEl.textContent = text;

    const displayTime = isLarge ? 6000 : 4000; // Victory shows for 6 seconds, match for 4 seconds
    const fadeTime = 1000; // Both messages fade over 1 second

    messageEl.style.cssText = `
      position: fixed;
      left: 50%;
      top: ${isLarge ? "40%" : "30%"};
      transform: translate(-50%, -50%);
      font-size: ${isLarge ? "3rem" : "2rem"};
      font-weight: bold;
      color: white;
      background: ${color};
      padding: ${isLarge ? "20px 40px" : "15px 30px"};
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      pointer-events: none;
      z-index: 10000;
      animation: floatMessage ${isLarge ? "3s" : "2s"} ease-out forwards;
      font-family: "Bangers", system-ui;
      text-align: center;
      max-width: 90vw;
      border: 4px solid white;
      -webkit-font-smoothing: antialiased;
      opacity: 1;
      transition: opacity ${fadeTime}ms ease-out;
    `;

    document.body.appendChild(messageEl);

    // Start fade out before removal
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.style.opacity = "0";
      }
    }, displayTime - fadeTime);

    // Remove after fade completes
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, displayTime);
  }

  createVictoryConfetti() {
    // Create lots of confetti particles
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        const colors = [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#feca57",
          "#ff9ff3",
          "#54a0ff",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const startX = Math.random() * window.innerWidth;
        const startY = -20;
        const endX = startX + (Math.random() - 0.5) * 400;
        const endY = window.innerHeight + 20;
        const rotation = Math.random() * 720;
        const duration = 2 + Math.random() * 2;

        confetti.style.cssText = `
          position: fixed;
          left: ${startX}px;
          top: ${startY}px;
          width: ${8 + Math.random() * 12}px;
          height: ${8 + Math.random() * 12}px;
          background: ${color};
          border-radius: ${Math.random() > 0.5 ? "50%" : "0%"};
          pointer-events: none;
          z-index: 9999;
          animation: confettiFall ${duration}s ease-out forwards;
          --end-x: ${endX}px;
          --end-y: ${endY}px;
          --rotation: ${rotation}deg;
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, duration * 1000);
      }, i * 30); // Stagger confetti creation
    }
  }

  positionRandomlyOnLoad(element) {
    // Calculate random position without overlap
    const newPosition = this.calculateRandomPositionNoOverlap(element);

    // Apply position immediately (no animation on load)
    element.style.top = `${newPosition.top}px`;
    element.style.left = `${newPosition.left}px`;

    // Track this position to prevent future overlaps
    this.positionedElements.push({
      element: element,
      top: newPosition.top,
      left: newPosition.left,
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    // Skip layout transformations for color mode elements (keep them neat and horizontal)
    if (
      element.classList.contains("color-block") ||
      element.classList.contains("color-label")
    ) {
      element.style.transform = "rotate(0deg)"; // Keep color elements perfectly horizontal
      return;
    }

    // Randomly choose layout orientation for emoji elements only
    const orientationChoice = Math.random();
    let elementTransform = "";

    if (orientationChoice < 0.3) {
      // 30% chance: Vertical layout (letters stacked)
      this.applyVerticalLayout(element);
      const randomRotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.5) {
      // 20% chance: Diagonal layout
      this.applyDiagonalLayout(element);
      const randomRotation = 30 + (Math.random() - 0.5) * 60; // 0 to 60 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.7) {
      // 20% chance: Steep angle
      const steepAngle = 60 + Math.random() * 60; // 60 to 120 degrees
      elementTransform = `rotate(${steepAngle}deg)`;
    } else if (orientationChoice < 0.85) {
      // 15% chance: Upside down
      const upsideAngle = 150 + Math.random() * 60; // 150 to 210 degrees
      elementTransform = `rotate(${upsideAngle}deg)`;
    } else {
      // 15% chance: Slight angle (normal-ish)
      const randomRotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    }

    element.style.transform = elementTransform;
  }

  wrapLetters(element) {
    const text = element.textContent;
    element.innerHTML = "";

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);
    });
  }

  explodeAndReform(element) {
    const letters = element.querySelectorAll(".letter");
    const randomColors = this.getRandomColorPalette();

    this.playSound("explosion");

    // Add glowing effect to the element
    element.classList.add("glowing");

    // Create enhanced sparkles with more particles
    this.createEnhancedSparkles(element);

    // Add screen shake for letter explosions too
    this.addLetterScreenShake();

    // If no letters (like color blocks), just animate the whole element
    if (letters.length === 0) {
      element.style.transition =
        "transform 0.8s ease-out, opacity 0.8s ease-out";
      element.style.transform = "scale(2) rotate(360deg)";
      element.style.opacity = "0";

      setTimeout(() => {
        element.style.transform = "scale(1) rotate(0deg)";
        element.style.opacity = "1";
      }, 800);

      setTimeout(() => {
        element.classList.remove("glowing");
        this.createLingeringStardust(element);
        this.repositionElement(element);
      }, 2200);

      return;
    }

    letters.forEach((letter, index) => {
      // Much more dramatic explosion properties
      const randomX = (Math.random() - 0.5) * 800; // Doubled from 400 to 800px
      const randomY = (Math.random() - 0.5) * 800; // Much bigger spread
      const randomRotation = (Math.random() - 0.5) * 1440; // Doubled rotation: -720 to 720 degrees

      // Dynamic font size changes during explosion
      const originalSize = parseFloat(getComputedStyle(letter).fontSize) || 16;
      const explosionSize = originalSize * (1.5 + Math.random() * 2); // 1.5x to 3.5x bigger
      const finalSize = originalSize * (0.8 + Math.random() * 0.6); // 0.8x to 1.4x final size

      letter.style.setProperty("--random-x", `${randomX}px`);
      letter.style.setProperty("--random-y", `${randomY}px`);
      letter.style.setProperty("--random-rotation", `${randomRotation}deg`);
      letter.style.setProperty("--explosion-size", `${explosionSize}px`);
      letter.style.setProperty("--final-size", `${finalSize}px`);

      // Add dramatic glow during explosion
      letter.style.setProperty(
        "--glow-color",
        randomColors[Math.floor(Math.random() * randomColors.length)]
      );

      // Start explosion with staggered timing
      setTimeout(() => {
        letter.classList.add("exploding");
        // Add individual letter shake
        this.addLetterShake(letter);
      }, index * 30); // Faster stagger for more chaos

      // Start reform with new color and enhanced flickering
      setTimeout(() => {
        letter.classList.remove("exploding");
        letter.classList.add("reforming");

        // Generate completely arbitrary reformation start positions
        const reformStartX = (Math.random() - 0.5) * 600; // -300 to 300px from final position
        const reformStartY = (Math.random() - 0.5) * 600; // -300 to 300px from final position
        const reformStartRotation = (Math.random() - 0.5) * 1080; // -540 to 540 degrees
        const reformStartScale = 0.1 + Math.random() * 0.4; // 0.1 to 0.5 scale

        // Set arbitrary reformation start properties
        letter.style.setProperty("--reform-start-x", `${reformStartX}px`);
        letter.style.setProperty("--reform-start-y", `${reformStartY}px`);
        letter.style.setProperty(
          "--reform-start-rotation",
          `${reformStartRotation}deg`
        );
        letter.style.setProperty("--reform-start-scale", reformStartScale);

        // Truly random color assignment
        const randomColorIndex = Math.floor(
          Math.random() * randomColors.length
        );
        letter.style.color = randomColors[randomColorIndex];
        letter.style.fontSize = `${finalSize}px`;

        // Add enhanced flickering effect during reformation
        this.addEnhancedFlickerEffect(letter, randomColors);

        // Remove animation classes after animation completes
        setTimeout(() => {
          letter.classList.remove("reforming");
        }, 1000); // Slightly longer for more dramatic effect
      }, 1000 + index * 40); // Longer explosion time
    });

    // Remove glowing effect and reposition element
    setTimeout(() => {
      element.classList.remove("glowing");
      // Leave behind stardust at the explosion location
      this.createLingeringStardust(element);
      // Reposition the entire element after letter animation completes
      this.repositionElement(element);
    }, 2200); // Extended timing for longer animations
  }

  repositionElement(element) {
    console.log(
      "Repositioning element:",
      element.textContent || element.className
    );

    // Add repositioning class for smooth animation
    element.classList.add("repositioning");

    // Calculate random position with collision protection
    const newPosition = this.calculateRandomPositionNoOverlap(element);

    // Apply new position
    element.style.top = `${newPosition.top}px`;
    element.style.left = `${newPosition.left}px`;

    // Update positioned elements tracking
    const existingIndex = this.positionedElements.findIndex(
      (p) => p.element === element
    );
    if (existingIndex !== -1) {
      this.positionedElements[existingIndex] = {
        element: element,
        top: newPosition.top,
        left: newPosition.left,
        width: element.offsetWidth,
        height: element.offsetHeight,
      };
    } else {
      this.positionedElements.push({
        element: element,
        top: newPosition.top,
        left: newPosition.left,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    }

    // Skip layout transformations for color mode elements (keep them horizontal)
    if (
      element.classList.contains("color-block") ||
      element.classList.contains("color-label")
    ) {
      element.style.transform = "rotate(0deg)"; // Keep color elements perfectly horizontal
      setTimeout(() => {
        element.classList.remove("repositioning");
      }, 1500);
      return;
    }

    // Randomly choose layout orientation for emoji elements only
    const orientationChoice = Math.random();
    let elementTransform = "";

    if (orientationChoice < 0.3) {
      // 30% chance: Vertical layout (letters stacked)
      this.applyVerticalLayout(element);
      const randomRotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.5) {
      // 20% chance: Diagonal layout
      this.applyDiagonalLayout(element);
      const randomRotation = 30 + (Math.random() - 0.5) * 60; // 0 to 60 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    } else if (orientationChoice < 0.7) {
      // 20% chance: Steep angle
      const steepAngle = 60 + Math.random() * 60; // 60 to 120 degrees
      elementTransform = `rotate(${steepAngle}deg)`;
    } else if (orientationChoice < 0.85) {
      // 15% chance: Upside down
      const upsideAngle = 150 + Math.random() * 60; // 150 to 210 degrees
      elementTransform = `rotate(${upsideAngle}deg)`;
    } else {
      // 15% chance: Slight angle (normal-ish)
      const randomRotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees
      elementTransform = `rotate(${randomRotation}deg)`;
    }

    element.style.transform = elementTransform;

    // Remove repositioning class after animation completes
    setTimeout(() => {
      element.classList.remove("repositioning");
    }, 1500);
  }

  applyVerticalLayout(element) {
    const letters = element.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      // Stack letters vertically with slight random offset
      const verticalOffset = index * (20 + Math.random() * 10); // 20-30px spacing
      const horizontalJitter = (Math.random() - 0.5) * 10; // -5 to 5px horizontal variation

      letter.style.position = "relative";
      letter.style.display = "block";
      letter.style.top = `${verticalOffset}px`;
      letter.style.left = `${horizontalJitter}px`;
      letter.style.lineHeight = "1";
    });
  }

  applyDiagonalLayout(element) {
    const letters = element.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      // Arrange letters diagonally
      const diagonalOffset = index * (15 + Math.random() * 8); // 15-23px spacing
      const verticalOffset = index * (12 + Math.random() * 6); // 12-18px vertical
      const jitter = (Math.random() - 0.5) * 8; // Random jitter

      letter.style.position = "relative";
      letter.style.display = "inline-block";
      letter.style.left = `${diagonalOffset + jitter}px`;
      letter.style.top = `${verticalOffset + jitter}px`;
    });
  }

  calculateRandomPosition(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate safe bounds (with padding)
    const padding = 20;
    const maxTop = viewportHeight - elementHeight - padding;
    const maxLeft = viewportWidth - elementWidth - padding;

    // Generate random position within safe bounds
    const top = Math.max(padding, Math.random() * maxTop);
    const left = Math.max(padding, Math.random() * maxLeft);

    return { top, left };
  }

  calculateRandomPositionNoOverlap(element) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate safe bounds (with padding)
    const padding = 20;
    const minSpacing = 15; // Minimum space between elements
    const maxTop = viewportHeight - elementHeight - padding;
    const maxLeft = viewportWidth - elementWidth - padding;

    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop

    while (attempts < maxAttempts) {
      // Generate random position within safe bounds
      const top = Math.max(padding, Math.random() * maxTop);
      const left = Math.max(padding, Math.random() * maxLeft);

      // Check if this position overlaps with any existing elements
      const hasOverlap = this.positionedElements.some((positioned) => {
        // Calculate boundaries with spacing
        const newRight = left + elementWidth + minSpacing;
        const newBottom = top + elementHeight + minSpacing;
        const existingRight = positioned.left + positioned.width + minSpacing;
        const existingBottom = positioned.top + positioned.height + minSpacing;

        // Check for overlap (AABB collision detection)
        const overlaps = !(
          newRight < positioned.left ||
          left > existingRight ||
          newBottom < positioned.top ||
          top > existingBottom
        );

        return overlaps;
      });

      // If no overlap, use this position
      if (!hasOverlap) {
        return { top, left };
      }

      attempts++;
    }

    // If we couldn't find a non-overlapping position after max attempts,
    // just return a random position (better than crashing)
    console.warn(
      "Could not find non-overlapping position after",
      maxAttempts,
      "attempts"
    );
    const top = Math.max(padding, Math.random() * maxTop);
    const left = Math.max(padding, Math.random() * maxLeft);
    return { top, left };
  }

  getRandomColorPalette() {
    return this.colorPalettes[
      Math.floor(Math.random() * this.colorPalettes.length)
    ];
  }

  addFlickerEffect(letter, colorPalette) {
    // Create rapid color changes during reformation
    const flickerCount = 3 + Math.floor(Math.random() * 4); // 3-6 flickers
    const flickerInterval = 800 / flickerCount; // Spread over 800ms reformation time

    for (let i = 0; i < flickerCount; i++) {
      setTimeout(() => {
        const randomColor =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        letter.style.color = randomColor;

        // Add brief intensity flash
        letter.style.textShadow = `0 0 8px ${randomColor}`;
        setTimeout(() => {
          letter.style.textShadow = "";
        }, flickerInterval / 3);
      }, i * flickerInterval);
    }
  }

  addEnhancedFlickerEffect(letter, colorPalette) {
    // Much more dramatic flickering with size and glow changes
    const flickerCount = 5 + Math.floor(Math.random() * 6); // 5-10 flickers
    const flickerInterval = 1000 / flickerCount; // Spread over 1000ms reformation time

    for (let i = 0; i < flickerCount; i++) {
      setTimeout(() => {
        const randomColor =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        letter.style.color = randomColor;

        // Dramatic glow and size effects
        const glowIntensity = 15 + Math.random() * 20; // 15-35px glow
        const sizeMultiplier = 0.8 + Math.random() * 0.6; // 0.8x to 1.4x size variation
        const currentSize = parseFloat(letter.style.fontSize) || 16;

        letter.style.textShadow = `
          0 0 ${glowIntensity}px ${randomColor},
          0 0 ${glowIntensity * 1.5}px ${randomColor},
          0 0 ${glowIntensity * 2}px ${randomColor}
        `;
        letter.style.fontSize = `${currentSize * sizeMultiplier}px`;

        setTimeout(() => {
          letter.style.textShadow = "";
          letter.style.fontSize = `${currentSize}px`;
        }, flickerInterval / 2);
      }, i * flickerInterval);
    }
  }

  createEnhancedSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 30; // Doubled from 15 to 30

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "enhanced-sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = 2 + Math.random() * 6; // Variable sizes 2-8px
      const duration = 0.8 + Math.random() * 0.8; // 0.8-1.6s duration

      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #fff, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: enhancedSparkle ${duration}s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
      `;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, (duration + 0.5) * 1000);
    }
  }

  createLingeringStardust(element) {
    // Get the current position of the element before it moves
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const stardustCount = 12 + Math.floor(Math.random() * 8); // 12-19 particles
    const colorPalette = this.getRandomColorPalette();

    for (let i = 0; i < stardustCount; i++) {
      const stardust = document.createElement("div");
      stardust.className = "lingering-stardust";

      // Random offset from explosion center
      const offsetX = (Math.random() - 0.5) * rect.width * 1.5;
      const offsetY = (Math.random() - 0.5) * rect.height * 1.5;

      const x = centerX + offsetX;
      const y = centerY + offsetY;
      const size = 2 + Math.random() * 5; // 2-7px
      const twinkleDuration = 1.5 + Math.random() * 2.5; // 1.5-4s twinkle
      const fadeDelay = 600 + Math.random() * 60; // 10–11 minutes
      // const fadeDelay = 270 + Math.random() * 30; // Start fading after 4.5-5 minutes!
      const fadeDuration = 20 + Math.random() * 10; // Fade over 20–30s
      // const fadeDuration = 5 + Math.random() * 5; // Fade over 5-10s

      const starColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      stardust.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${starColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 ${size * 3}px ${starColor}, 0 0 ${
        size * 5
      }px ${starColor};
        animation: twinkle ${twinkleDuration}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
        opacity: 0.9;
      `;

      document.body.appendChild(stardust);

      // Fade out and remove after a while
      setTimeout(() => {
        stardust.style.transition = `opacity ${fadeDuration}s ease-out`;
        stardust.style.opacity = "0";

        setTimeout(() => {
          if (stardust.parentNode) {
            stardust.parentNode.removeChild(stardust);
          }
        }, fadeDuration * 1000);
      }, fadeDelay * 1000);
    }
  }

  addLetterScreenShake() {
    // Lighter screen shake for letter explosions
    document.body.style.animation = "letterShake 0.4s ease-out";

    setTimeout(() => {
      document.body.style.animation = "";
    }, 400);
  }

  addLetterShake(letter) {
    // Individual letter shake during explosion
    letter.style.animation = "individualLetterShake 0.3s ease-out";

    setTimeout(() => {
      letter.style.animation = "";
    }, 300);
  }

  startSubtleAnimations() {
    // Add subtle default flickering and micro-explosions
    setInterval(() => {
      const allLetters = document.querySelectorAll(".letter");
      if (allLetters.length === 0) return;

      // Random letter gets a subtle effect
      if (Math.random() < 0.05) {
        // 5% chance every interval
        const randomLetter =
          allLetters[Math.floor(Math.random() * allLetters.length)];
        this.addSubtleFlicker(randomLetter);
      }

      // Occasionally trigger a mini-sparkle burst
      if (Math.random() < 0.02) {
        // 2% chance
        const randomElement =
          document.querySelectorAll("h1, h2, h3, h4")[
            Math.floor(Math.random() * 5)
          ];
        if (randomElement) {
          this.addMiniSparkles(randomElement);
        }
      }
    }, 2000); // Check every 2 seconds
  }

  addSubtleFlicker(letter) {
    const originalColor = letter.style.color || getComputedStyle(letter).color;
    const brightColors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
    ];
    const flickerColor =
      brightColors[Math.floor(Math.random() * brightColors.length)];

    // Brief color flash
    letter.style.color = flickerColor;
    letter.style.textShadow = `0 0 6px ${flickerColor}`;

    setTimeout(() => {
      letter.style.color = originalColor;
      letter.style.textShadow = "";
    }, 150 + Math.random() * 200); // 150-350ms flicker
  }

  addMiniSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 3 + Math.floor(Math.random() * 4); // 3-6 mini sparkles

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "mini-sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 2px;
        height: 2px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        animation: miniSparkle 1s ease-out forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1300);
    }
  }

  createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 15;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;

      element.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1000);
    }
  }
}

// Background effects system
class BackgroundEffects {
  constructor() {
    this.isAnimating = false;
    // Share settings with LetterExplosion
    this.settings = letterExplosion.settings;
    this.init();
    // Set random background color on page load
    this.setRandomInitialBackground();
  }

  playSound(type) {
    if (!this.settings.soundEnabled) return;
    console.log(`🔊 Sound: ${type}`);
  }

  init() {
    console.log("BackgroundEffects initialized!");

    // Add double-click event listener to body with better detection
    document.body.addEventListener("dblclick", (e) => {
      console.log(
        "Double-click detected on:",
        e.target,
        "tagName:",
        e.target.tagName
      );

      // Check if we clicked directly on the body element (empty space)
      const isBody = e.target === document.body;
      const isHeading = e.target.matches("h1, h2, h3, h4, h5, h6");
      const isLetter = e.target.matches(".letter");
      const isButton = e.target.matches("button");

      if (isBody || (!isHeading && !isLetter && !isButton)) {
        console.log("Triggering background effects!");
        this.triggerWildColors(e);
      } else {
        console.log(
          "Skipping background effects - clicked on:",
          e.target.tagName,
          e.target.className
        );
      }
    });

    // Add single click for pulse effect with better detection
    document.body.addEventListener("click", (e) => {
      const isBody = e.target === document.body;
      const isHeading = e.target.matches("h1, h2, h3, h4, h5, h6");
      const isLetter = e.target.matches(".letter");
      const isButton = e.target.matches("button");

      if (isBody || (!isHeading && !isLetter && !isButton)) {
        console.log("Triggering pulse effect!");
        this.triggerPulse();
      }
    });

    // Keep right-click as backup trigger
    document.body.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      console.log("Right-click detected - forcing background animation!");
      this.triggerWildColors(e);
    });
  }

  triggerWildColors(event) {
    if (this.isAnimating) return;

    this.isAnimating = true;

    this.playSound("background");

    // Debug log
    console.log("Triggering wild colors animation!");

    // Generate a random end color for this animation
    const randomEndColor = this.generateRandomEndColor();
    console.log("Animation will end with color:", randomEndColor);

    // Use smooth color transition instead of CSS animation for mobile compatibility
    this.animateBackgroundColorSmooth(randomEndColor);

    // Create floating particles from click point
    this.createBackgroundParticles(event.clientX, event.clientY);

    // Create screen flash effect
    this.createScreenFlash();

    // Complete animation
    setTimeout(() => {
      this.isAnimating = false;
      console.log(
        "Wild colors animation completed! New background:",
        randomEndColor
      );
    }, 3000);
  }

  animateBackgroundColorSmooth(finalColor) {
    // Detect iPad for optimized settings
    const isIPad =
      /iPad|Macintosh/.test(navigator.userAgent) && "ontouchend" in document;

    // Create color sequence for smooth transition
    const colorSequence = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#ff6348",
      "#2ed573",
      "#3742fa",
      "#f368e0",
      "#ffa502",
      "#ff4757",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#ff3838",
      "#f39c12",
      "#e74c3c",
      "#1abc9c",
      "#3498db",
      "#9b59b6",
      "#e67e22",
      "#e74c3c",
      "#8e44ad",
      finalColor,
    ];

    let currentStep = 0;
    const totalSteps = colorSequence.length;

    // iPad-specific optimizations
    const stepDuration = isIPad ? 3000 / (totalSteps * 0.8) : 3000 / totalSteps; // Slower on iPad
    const transitionType = isIPad ? "ease" : "ease-out"; // Simpler easing on iPad

    // Force repaint on iPad before starting
    if (isIPad) {
      document.body.style.transform = "translateZ(0)";
      document.body.offsetHeight; // Force reflow
    }

    const colorInterval = setInterval(() => {
      if (currentStep >= totalSteps) {
        clearInterval(colorInterval);
        // Ensure final color is set with iPad-specific handling
        if (isIPad) {
          requestAnimationFrame(() => {
            document.body.style.backgroundColor = finalColor;
          });
        } else {
          document.body.style.backgroundColor = finalColor;
        }
        return;
      }

      // iPad-optimized transition
      if (isIPad) {
        requestAnimationFrame(() => {
          document.body.style.transition = `background-color ${stepDuration}ms ${transitionType}`;
          document.body.style.backgroundColor = colorSequence[currentStep];
        });
      } else {
        document.body.style.transition = `background-color ${stepDuration}ms ${transitionType}`;
        document.body.style.backgroundColor = colorSequence[currentStep];
      }

      currentStep++;
    }, stepDuration);

    // Clean up transition after animation
    const cleanupDelay = isIPad ? 3500 : 3000; // Extra time for iPad
    setTimeout(() => {
      document.body.style.transition = "all 0.3s ease";
      if (isIPad) {
        // Reset transform on iPad
        document.body.style.transform = "";
      }
    }, cleanupDelay);
  }

  generateRandomEndColor() {
    // If dark mode is enabled, always use dark colors
    if (this.settings && this.settings.darkModeEnabled) {
      return this.generateRandomDarkColor();
    }

    // Otherwise, choose random color generation method
    const methods = [
      () => this.generateRandomDarkColor(),
      () => this.generateRandomVibrantColor(),
      () => this.generateRandomPastelColor(),
      () => this.generateRandomNeonColor(),
      () => this.generateRandomEarthTone(),
      () => this.generateRandomJewelTone(),
    ];

    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    return randomMethod();
  }

  generateRandomDarkColor() {
    // Generate extra dark colors with more variety
    // Choose from different dark color palettes
    const darkPalettes = [
      // Very dark grays and blacks (0-50)
      () => {
        const shade = Math.floor(Math.random() * 51);
        return `rgb(${shade}, ${shade}, ${shade})`;
      },
      // Dark blues (navy to midnight)
      () => {
        const r = Math.floor(Math.random() * 30);
        const g = Math.floor(Math.random() * 40);
        const b = Math.floor(Math.random() * 80);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark purples (deep purple to plum)
      () => {
        const r = Math.floor(Math.random() * 60);
        const g = Math.floor(Math.random() * 30);
        const b = Math.floor(Math.random() * 70);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark greens (forest to hunter)
      () => {
        const r = Math.floor(Math.random() * 30);
        const g = Math.floor(Math.random() * 60);
        const b = Math.floor(Math.random() * 40);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark reds (burgundy to wine)
      () => {
        const r = Math.floor(Math.random() * 70);
        const g = Math.floor(Math.random() * 20);
        const b = Math.floor(Math.random() * 30);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark browns (chocolate to coffee)
      () => {
        const r = Math.floor(Math.random() * 60) + 20;
        const g = Math.floor(Math.random() * 40) + 10;
        const b = Math.floor(Math.random() * 30);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Dark teals (deep teal to ocean)
      () => {
        const r = Math.floor(Math.random() * 25);
        const g = Math.floor(Math.random() * 60);
        const b = Math.floor(Math.random() * 70);
        return `rgb(${r}, ${g}, ${b})`;
      },
      // Mixed dark (any combination 0-80)
      () => {
        const r = Math.floor(Math.random() * 81);
        const g = Math.floor(Math.random() * 81);
        const b = Math.floor(Math.random() * 81);
        return `rgb(${r}, ${g}, ${b})`;
      },
    ];

    // Select random palette generator
    const palette =
      darkPalettes[Math.floor(Math.random() * darkPalettes.length)];
    return palette();
  }

  generateRandomVibrantColor() {
    // Generate vibrant colors with at least one high value
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(Math.floor(Math.random() * 256));
    }
    // Ensure at least one color is vibrant (>150)
    const randomIndex = Math.floor(Math.random() * 3);
    colors[randomIndex] = Math.max(
      colors[randomIndex],
      150 + Math.floor(Math.random() * 106)
    );

    return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  }

  generateRandomPastelColor() {
    // Generate soft pastel colors (high values with some variation)
    const r = 150 + Math.floor(Math.random() * 106);
    const g = 150 + Math.floor(Math.random() * 106);
    const b = 150 + Math.floor(Math.random() * 106);
    return `rgb(${r}, ${g}, ${b})`;
  }

  generateRandomNeonColor() {
    // Generate bright neon-like colors
    const neonBase = [
      [255, 0, 255],
      [0, 255, 255],
      [255, 255, 0],
      [255, 0, 128],
      [128, 255, 0],
      [0, 128, 255],
    ];
    const base = neonBase[Math.floor(Math.random() * neonBase.length)];

    // Add some variation to the base neon color
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 100));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 100));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 100));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  generateRandomEarthTone() {
    // Generate earth tones (browns, greens, oranges)
    const earthPalettes = [
      { r: [101, 67, 33], g: [67, 33, 16], b: [33, 16, 8] }, // Browns
      { r: [34, 68, 102], g: [85, 119, 153], b: [34, 51, 68] }, // Forest greens
      { r: [153, 102, 51], g: [102, 68, 34], b: [51, 34, 17] }, // Oranges/rust
      { r: [68, 85, 102], g: [85, 102, 119], b: [102, 119, 136] }, // Blue-grays
    ];

    const palette =
      earthPalettes[Math.floor(Math.random() * earthPalettes.length)];
    const r =
      palette.r[Math.floor(Math.random() * palette.r.length)] +
      Math.floor(Math.random() * 50);
    const g =
      palette.g[Math.floor(Math.random() * palette.g.length)] +
      Math.floor(Math.random() * 50);
    const b =
      palette.b[Math.floor(Math.random() * palette.b.length)] +
      Math.floor(Math.random() * 50);

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
  }

  generateRandomJewelTone() {
    // Generate rich jewel tones
    const jewelBases = [
      [128, 0, 128], // Purple (amethyst)
      [0, 100, 0], // Green (emerald)
      [220, 20, 60], // Red (ruby)
      [0, 0, 139], // Blue (sapphire)
      [255, 140, 0], // Orange (topaz)
      [75, 0, 130], // Indigo
    ];

    const base = jewelBases[Math.floor(Math.random() * jewelBases.length)];
    const r = Math.max(0, Math.min(255, base[0] + (Math.random() - 0.5) * 80));
    const g = Math.max(0, Math.min(255, base[1] + (Math.random() - 0.5) * 80));
    const b = Math.max(0, Math.min(255, base[2] + (Math.random() - 0.5) * 80));

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  setRandomInitialBackground() {
    const randomColor = this.generateRandomEndColor();
    document.body.style.backgroundColor = randomColor;
    console.log("Initial random background set to:", randomColor);
  }

  triggerPulse() {
    if (!this.isAnimating) {
      document.body.classList.add("pulsing");

      setTimeout(() => {
        document.body.classList.remove("pulsing");
      }, 500);
    }
  }

  createBackgroundParticles(centerX, centerY) {
    const particleCount = 60; // Doubled from 25 to 60!

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bg-particle";

      // More dramatic direction and distance
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 1.0;
      const distance = 150 + Math.random() * 400; // Increased from 100-300 to 150-550
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Set initial position at click point
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      // Set animation properties
      particle.style.setProperty("--particle-x", `${x}px`);
      particle.style.setProperty("--particle-y", `${y}px`);

      // More vibrant colors with higher opacity
      const colors = [
        "rgba(255, 107, 107, 0.95)",
        "rgba(78, 205, 196, 0.95)",
        "rgba(69, 183, 209, 0.95)",
        "rgba(150, 206, 180, 0.95)",
        "rgba(254, 202, 87, 0.95)",
        "rgba(255, 0, 255, 0.9)", // Bright magenta
        "rgba(0, 255, 255, 0.9)", // Bright cyan
        "rgba(255, 255, 0, 0.9)", // Bright yellow
        "rgba(255, 0, 128, 0.9)", // Hot pink
        "rgba(128, 255, 0, 0.9)", // Lime green
      ];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      // Random particle sizes for more variety
      const size = 4 + Math.random() * 8; // 4-12px instead of fixed 6px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Add glow effect to particles
      particle.style.boxShadow = `0 0 ${size * 2}px ${
        particle.style.background
      }`;

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000); // Increased duration from 4s to 5s
    }

    // Add additional explosion rings for more drama
    this.createExplosionRings(centerX, centerY);

    // Add screen shake effect
    this.addScreenShake();
  }

  createExplosionRings(centerX, centerY) {
    // Create 5 expanding rings for more dramatic effect (was 3)
    for (let ring = 0; ring < 5; ring++) {
      const ringElement = document.createElement("div");
      ringElement.className = "explosion-ring";

      // Random colors for each ring
      const ringColors = [
        "rgba(255, 107, 107, 0.9)",
        "rgba(78, 205, 196, 0.9)",
        "rgba(69, 183, 209, 0.9)",
        "rgba(255, 159, 243, 0.9)",
        "rgba(254, 202, 87, 0.9)",
      ];
      const ringColor = ringColors[ring % ringColors.length];

      ringElement.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 0px;
        height: 0px;
        border: 4px solid ${ringColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: explosionRingPulse ${3 + ring * 0.5}s ease-out forwards;
        animation-delay: ${ring * 0.3}s;
      `;

      document.body.appendChild(ringElement);

      // Remove ring after much longer duration
      setTimeout(() => {
        if (ringElement.parentNode) {
          ringElement.parentNode.removeChild(ringElement);
        }
      }, 8000 + ring * 1000); // Much longer persistence (8-12 seconds)
    }
  }

  addScreenShake() {
    // Add dramatic screen shake effect
    document.body.style.animation = "screenShake 0.6s ease-out";

    setTimeout(() => {
      document.body.style.animation = "";
    }, 600);
  }

  createScreenFlash() {
    // Create many more flash layers for extended flickering (was 3, now 12!)
    for (let i = 0; i < 12; i++) {
      const flash = document.createElement("div");
      const intensity = 0.5 - (i % 4) * 0.1; // Varying intensity in cycles
      const delay = i * 400; // Much more staggered (was 100ms, now 400ms)

      // Cycle through different colors for more dramatic effect
      const flashColors = [
        `radial-gradient(circle, rgba(255,255,255,${intensity}) 0%, rgba(255,255,255,${
          intensity * 0.3
        }) 30%, transparent 70%)`,
        `radial-gradient(circle, rgba(255,200,200,${intensity}) 0%, rgba(255,200,200,${
          intensity * 0.3
        }) 30%, transparent 70%)`,
        `radial-gradient(circle, rgba(200,255,255,${intensity}) 0%, rgba(200,255,255,${
          intensity * 0.3
        }) 30%, transparent 70%)`,
        `radial-gradient(circle, rgba(255,255,200,${intensity}) 0%, rgba(255,255,200,${
          intensity * 0.3
        }) 30%, transparent 70%)`,
      ];

      flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${flashColors[i % 4]};
        pointer-events: none;
        z-index: 9999;
        animation: dramaticFlash ${1.2 + (i % 3) * 0.3}s ease-out forwards;
        animation-delay: ${delay}ms;
      `;

      document.body.appendChild(flash);

      // Much longer removal time
      setTimeout(() => {
        if (flash.parentNode) {
          flash.parentNode.removeChild(flash);
        }
      }, 2000 + delay);
    }

    // Add flash animation if not already added
    if (!document.getElementById("dramaticFlashStyle")) {
      const style = document.createElement("style");
      style.id = "dramaticFlashStyle";
      style.textContent = `
        @keyframes dramaticFlash {
          0% { opacity: 0; transform: scale(0.8); }
          15% { opacity: 1; transform: scale(1.1); }
          30% { opacity: 0.7; transform: scale(1.05); }
          45% { opacity: 0.95; transform: scale(1.02); }
          60% { opacity: 0.8; transform: scale(1.04); }
          75% { opacity: 0.9; transform: scale(1.01); }
          90% { opacity: 0.5; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize both systems
const letterExplosion = new LetterExplosion();
const backgroundEffects = new BackgroundEffects();

// Make backgroundEffects globally available for immediate background generation
window.backgroundEffects = backgroundEffects;

// All systems initialized and ready!

// Keep the original movie variables for reference
const movieOne = "The VVitch";
const movieTwo = "Hell Watcher";
const movieThree = "Dog Man";
const movieFour = "Dog Man II";
