import { dailyWordsSmall, wordleWords } from "/theWholeEnchilada.js";

const anyThing = "Nothing";
console.log(anyThing);
const otherThing = "Everything";
console.log(otherThing);
const moreThing = "Litte";
console.log(moreThing);
const anotherThing = "Man";
console.log(anotherThing);
const yetAnotherThing = "Good job";
console.log(
  yetAnotherThing,
  "You, well, um, ahem, ah, er, ah, errr, laaaah, errr, ehhh, duhhh, errrr, duhhh, aggg, errrrr, suck, gaaaa, ah, errr, mmm, ahhhh, grrr, errr, uhhhh, er, ahhh, ahhhh, hmmm, er, errr,  grrr, ahhh, gerrr, kkkk, jaaa, grrrr, errr, ahh, well, lot, um, Man. Um, er, got, er, of penis, grrr, and er, ah, ah, um, that, errr, ah, anal, er, boy?!?"
);

const blueLink = document.querySelector(".line-1a");
blueLink.addEventListener("click", changeOpacity);

function changeOpacity() {
  document.body.innerText =
    "NICE WORK, um, Old, um, CALVINO, er, ahhh, Asshole, err, arrrr, well, ahh, grrrr, errrrr, um..., ahem, jahhh, errr, well, uhhhh, kkkkkiiihh, gaaaq, um, er, ah, er, that, er, gaa, ah, you, ah, are, well...see!";
  console.log("Bite me wire, I declare!");
}

const redLink = document.querySelector(".line-21a");
redLink.addEventListener("click", changeMyOpacity);

function changeMyOpacity() {
  document.body.innerText = "Bad Job Philbo!";
}

console.log(dailyWordsSmall);

function logOverallAverageScore() {
  const playedWords = wordleWords.filter(
    (word) => word.myScore > 0 && word.myScore <= 7
  );

  if (playedWords.length === 0) {
    console.log("No played words found with scores between 1 and 7.");
    return;
  }

  const totalScore = playedWords.reduce((sum, word) => sum + word.myScore, 0);
  const averageScore = totalScore / playedWords.length;

  console.log(
    `Overall average score (excluding unplayed words): ${averageScore.toFixed(
      5
    )}`
  );
}

logOverallAverageScore();

// Black and White Toggle Functionality
const bwToggle = document.getElementById("bwToggle");
let isGrayscale = false;

bwToggle.addEventListener("click", function () {
  isGrayscale = !isGrayscale;

  if (isGrayscale) {
    document.body.classList.add("grayscale-mode");
    bwToggle.textContent = "🎨 Back to Color";
  } else {
    document.body.classList.remove("grayscale-mode");
    bwToggle.textContent = "🎨 Color / B&W";
  }

  console.log("Grayscale mode:", isGrayscale ? "ON" : "OFF");
});
