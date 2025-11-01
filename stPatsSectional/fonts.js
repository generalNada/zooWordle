const googleFonts = [
  "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway",
  "Nunito", "Oswald", "Merriweather", "Quicksand", "Playfair Display",
  "Dancing Script", "Pacifico", "Indie Flower", "Bangers", "Anton", "Concert One",
  "Cinzel", "Fredoka", "Caveat", "Carter One", "Courgette", "Julius Sans One", "Matemasie",
  "Kalam", "Lobster", "Lora", "Merriweather Sans", "Oxygen", "PT Sans", "Bungee Shade", "Silkscreen",
  "Righteous", "Shadows Into Light", "Satisfy", "Rock Salt", "Spicy Rice", "Alfa Slab One", "Cormorant"
];

// Dynamically load Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font.replace(/ /g, "+")}`).join("&")}&display=swap`;
document.head.appendChild(link);