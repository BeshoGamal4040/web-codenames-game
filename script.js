const words =[
   "تلفاز", "حرب", "مدينة", "قوة",
  "مرآة", "حكمة", "باب", "بركان",
  "حلم", "شارع", "لوحة", "عدو",
  "جسر", "دموع", "مغارة", "نظارة"
  ];
const colors = ["gray", "gray", "gray", "gray", "gray", "blue", "blue", "blue", "blue", "blue", "red", "red", "red", "red", "red", "black"];
let shuffledColors = colors.sort(() => Math.random() - 0.5);
let revealed = false;
let blueScore = 0, redScore = 0;

const grid = document.getElementById("grid");
const revealBtn = document.getElementById("reveal-btn");
const blueScoreElem = document.querySelector(".blue-score");
const redScoreElem = document.querySelector(".red-score");

words.forEach((word, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = word;

    cell.addEventListener("click", () => {
        if (!cell.classList.contains("gray") && !cell.classList.contains("blue") && !cell.classList.contains("red") && !cell.classList.contains("black")) {
            cell.classList.add(shuffledColors[index]);
            playSound(shuffledColors[index]);

            if (shuffledColors[index] === "blue") blueScore++;
            if (shuffledColors[index] === "red") redScore++;

            updateScore();
        }
    });

    grid.appendChild(cell);
});

// Reveal Button Logic
revealBtn.addEventListener("click", () => {
    revealed = !revealed;
    document.querySelectorAll(".cell").forEach((cell, index) => {
        if (revealed) {
            cell.classList.add(shuffledColors[index]);
        } else {
            cell.classList.remove("gray", "blue", "red", "black");
        }
    });
});

// Update Scoreboard
function updateScore() {
    blueScoreElem.textContent = `Blue: ${blueScore}`;
    redScoreElem.textContent = `Red: ${redScore}`;
}

// Sound Effects
function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}
