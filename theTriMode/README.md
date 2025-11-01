# 🎮 Emoji, Color & Number Matching Game

An interactive matching game with three modes: Emoji Mode, Color Mode, and Number Mode! Features explosions, stardust, dynamic backgrounds, and enhanced visual feedback!

## 🎨 Game Modes

### 😀 Emoji Mode (Default)

- Match pairs of identical emojis
- 12 different emoji pairs to match
- Each emoji has custom celebration messages

### 🎨 Color Mode

- Match color blocks with their corresponding color name labels
- 10 colors: Red, Orange, Yellow, Green, Blue, Purple, Pink, Brown, Gray, Black
- Same explosive effects and celebration messages
- Color blocks and labels stay perfectly horizontal (no rotation) for clean, easy reading

### 🔢 Number Mode

- Match numbers (1-10) with their written form (One, Two, Three, etc.)
- Beautiful gradient number containers with large, bold digits
- Written number labels in styled containers
- Enhanced visual feedback with flashing and pulsing effects
- Custom celebration messages for each number
- All numbers and text stay perfectly upright

**Switch between all three modes** using the hamburger menu in the top-right corner!

## ✨ Features

### 🍔 Hamburger Menu

All game controls are now tucked away in a beautiful, sliding hamburger menu! No more UI clutter - just pure gameplay.

**What's in the menu:**

- **Game Modes**: Switch between Emoji, Color, and Number modes with full explanations
- **New Game**: Start fresh with one click
- **Audio Settings**: Toggle sound effects and voice announcements
- **How to Play**: Quick instructions right when you need them

Each menu item includes a detailed description of what it does - perfect for new players!

### 🎯 Matching Game

- **Click/Tap** an element to select it (it will pulse with a glow)
- **Number Mode**: Elements flash through multiple colors when clicked for extra visual feedback
- **Click/Tap** its matching pair to make them both explode and disappear
- Match all pairs to win and see victory confetti! 🎉
- Wrong match? Both elements will shake and you'll hear a subtle error sound

### 🎨 Interactive Effects

- **Double-click anywhere** on the screen for a colorful explosion with pulsing rings
- **Right-click** (or long-press on mobile) for wild color background animations
- **Drag emojis** to reposition them manually - they're all draggable!

### 💫 Visual Magic

- Sparkling stardust lingers after every explosion (lasts 35-45 seconds)
- Pulsing explosion rings with random colors
- Screen flickers and particle effects
- Continuous shimmer on the background
- Random positioning on each page load
- Victory confetti celebration when you complete the game

### 🔊 Sound Effects

- **Select sound**: Soft click when selecting an emoji
- **Match sound**: Satisfying "pop" when you find a pair
- **Error sound**: Quick sawtooth buzz for wrong matches
- **Explosion sound**: Soft whoosh for matched pairs
- **Victory fanfare**: Triumphant celebration when you win
- **Background sound**: Ambient tone for color explosions
- **Toggle in menu**: Enable/disable sounds and voice in the hamburger menu

### 🎮 Game Controls (All in Hamburger Menu!)

Click the hamburger button (☰) in the top-right corner to access:

- **🎨/😀/🔢 Mode Toggle**: Switch between Emoji Mode, Color Mode, and Number Mode (saved to browser storage)
- **🔄 New Game**: Resets the game, brings back all elements, and randomizes positions
- **🔊 Sound**: Toggle sound effects on/off (saved to browser storage)
- **🗣️ Voice**: Toggle voice announcements on/off (saved to browser storage)
- **🌙/🌞 Dark Mode**: Force all background colors to be dark, or allow any color (saved to browser storage)
- **🔤 Font Selection**: Choose from 30+ fun fonts including spooky, modern, and retro styles (saved to browser storage)
- **✨ Clear Stardust**: Instantly remove all lingering stardust particles from the screen
- **❓ How to Play**: Quick instructions and tips

Each control has a full explanation in the menu so you always know what it does!

## 🛠️ How to Add More Emoji Pairs

It's super easy! Just add pairs to `index.html`:

```html
<h1 data-match-id="star">⭐</h1>
<h1 data-match-id="star">⭐</h1>

<h1 data-match-id="alien">👽</h1>
<h1 data-match-id="alien">👽</h1>
```

**Rules:**

1. Each pair needs **two** `<h1>` tags with the **same emoji**
2. Give them the **same** `data-match-id` (can be anything unique)
3. The game automatically detects and handles all pairs - no code changes needed!

## 🎨 Customizing Color Mode

To add or modify colors in Color Mode, edit the `colorDefinitions` and `colorMatchMessages` objects in `script.js`:

```javascript
// Add a new color
this.colorDefinitions = {
  red: "#E53935",
  // ... other colors
  turquoise: "#1ABC9C", // New color!
};

// Add custom messages for the new color
this.colorMatchMessages = {
  red: ["Red Hot Match!", "Seeing Red... Success!"],
  // ... other colors
  turquoise: ["Tropical Match!", "Teal Victory!"], // New messages!
};
```

The game will automatically create color blocks and labels for all colors in `colorDefinitions`!

## 🔢 Customizing Number Mode

To add or modify numbers in Number Mode, edit the `numberDefinitions` and `numberMatchMessages` objects in `script.js`:

```javascript
// Add a new number
this.numberDefinitions = {
  1: "One",
  2: "Two",
  // ... other numbers
  11: "Eleven", // New number!
};

// Add custom messages for the new number
this.numberMatchMessages = {
  1: ["Number One Match!", "First Place Victory!"],
  2: ["Double Trouble Success!", "Two for Two!"],
  // ... other numbers
  11: ["Eleven Heaven!", "Lucky Eleven!"], // New messages!
};
```

The game will automatically create number containers and labels for all numbers in `numberDefinitions`!

## 🌙 Dark Mode

Force all background colors to be dark with the Dark Mode toggle in the hamburger menu!

**How it works:**

- When **Dark Mode is OFF** (default): Background can be any color - dark, vibrant, pastel, neon, earth tones, or jewel tones
- When **Dark Mode is ON**: All background colors will be extra dark (RGB values 0-80) with rich variety:
  - Very dark grays and blacks (0-50)
  - Dark blues (navy to midnight)
  - Dark purples (deep purple to plum)
  - Dark greens (forest to hunter green)
  - Dark reds (burgundy to wine)
  - Dark browns (chocolate to coffee)
  - Dark teals (deep teal to ocean)
  - Mixed dark shades for variety
- **Immediate Background Generation**: Toggling dark mode instantly generates a new background color with smooth transitions
- Your preference is saved to browser storage

Perfect for playing in low-light environments, at night, or if you prefer darker aesthetics!

## 🔤 Font Selection

Customize the look and feel of your game with 30+ unique fonts!

**How it works:**

- **Font Categories**: Choose from Serif, Display, Fun, Spooky, Modern, and Retro styles
- **Live Preview**: See exactly how each font looks with "Aa Bb Cc" preview
- **Instant Application**: Font changes apply immediately to all text elements
- **Persistent Choice**: Your font selection is saved and restored on page reload
- **Universal Coverage**: Affects all text including emojis, color labels, and messages

**Available Font Categories:**

- **Serif**: Classic, readable fonts (Bree Serif, Roboto Slab)
- **Display**: Bold, attention-grabbing fonts (Spicy Rice, Bangers, Righteous)
- **Fun**: Playful, friendly fonts (Comic Neue, Fredoka One, Luckiest Guy, Chewy, Boogaloo)
- **Spooky**: Halloween-themed fonts (Creepster, Butcherman, Nosifer, Griffy, Creepy, Chiller, Jolly Lodger)
- **Modern**: Contemporary, stylish fonts (Rubik Glitch, Rubik Wet Paint, Rubik Moonrocks, Rubik Beastly, etc.)
- **Retro**: Vintage-inspired fonts (Rubik 80s Fade)

Perfect for personalizing your gaming experience or matching your mood!

## ✨ Stardust Management

Lingering stardust particles add magic to your matches, but sometimes you want a clean screen!

**How it works:**

- Stardust automatically appears after every successful match
- Particles twinkle and fade out naturally after 4-5 minutes
- Use the **Clear Stardust** button in the hamburger menu to instantly remove all particles
- Perfect for taking screenshots or if you prefer a cleaner look
- Stardust has no effect on gameplay - it's purely decorative!

## 📱 Device Compatibility & Responsive Design

### 🖥️ Desktop

- Works on all modern browsers (Chrome, Safari, Firefox, Edge)
- Full-size emojis (6rem), color blocks (120px), and number containers (120px)
- Smooth animations and effects

### 📱 iPad / Tablets (768px - 1024px)

- **~58% scaling + 30% emoji boost** (perfectly sized for tablets!)
- Emojis: 4.55rem (larger for better visibility)
- Color blocks: 70px
- Number containers: 70px
- Advanced collision protection prevents overlapping
- Optimized touch targets and spacing

### 📱 iPhone / Small Screens (< 768px)

- **44% scaling** (larger and easier to see!)
- Emojis: 2.64rem
- Color blocks: 53px
- Number containers: 53px
- Compact menu and controls
- Maximum screen space for gameplay

### ✨ iOS Optimizations

- Touch-optimized for smooth tapping and dragging
- iOS audio unlocking for sound effects
- Prevents text selection and iOS callout menus
- Hardware-accelerated animations
- Backdrop blur effects on the menu

## 🎨 Customization

All styles are in `style.css`:

- Change emoji sizes, colors, animations
- Modify explosion effects, sparkles, confetti
- Adjust background shimmer and color palettes
- Customize button styles and positioning
- Number container gradients and flash effects

All game logic is in `script.js`:

- Sound synthesis using Web Audio API
- Match messages and victory messages arrays for all three modes
- Animation timings and durations
- Color palettes for explosions
- Number definitions and custom messages

## 🚀 Quick Start

1. Open `index.html` in a browser
2. Try all three modes: Emoji, Color, and Number matching
3. Click elements to match pairs
4. Double-click for explosions
5. Drag elements to reposition
6. Have fun! 🎉

## 💾 Technical Details

- **Pure JavaScript** - no external libraries
- **Web Audio API** - synthesized sounds (no audio files needed)
- **CSS Animations** - hardware-accelerated effects
- **LocalStorage** - saves sound preferences
- **Responsive Design** - works on any screen size

---

**Enjoy the game!** 🌟 💰
