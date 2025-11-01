const returnHomeNow = document.querySelector("#returnHome");
returnHomeNow.addEventListener("click", headedHome);

function headedHome() {
    console.log("I'm Home!")
    window.location = "index.html";
}


const sydneyLink = document.getElementById("radar");
sydneyLink.addEventListener("click", () => {
    playSound();
    // window.location = "index.html"; // Open the new page if needed
});

function playSound() {
    const audio = document.getElementById("myAudio");
    audio.play();
    console.log("Sound played");
}