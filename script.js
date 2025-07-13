const allWords = [
  "قمر", "شمس", "بحر", "مفتاح", "كتاب", "باب", "نور", "حلم","مدينة", "غابة", "مروحة", "شباك", "قطار", "جبل", "هاتف", "مطار",
  "تلفاز", "حرب", "مدينة", "قوة","مرآة", "حكمة", "باب", "بركان","حلم", "شارع", "لوحة", "عدو","جسر", "دموع", "مغارة", "نظارة",
  "الأهرامات", "مكة", "البحر", "الغابة","مزارع", "مخترع", "رائد فضاء", "محامي","مصباح", "كاميرا", "نظارة", "حاسوب","باندا",
  "نمر", "بومة", "حصان","بركان", "قمر", "مطر", "رعد","حرية", "سلام", "أمل", "ذكاء","ميسي", "هدف", "حارس", "تسلل","رونالدو", 
  "صلاح", "نيمار", "هازارد","محرك", "دركسيون", "سباق", "فرامل","بطل", "شرير", "أكشن", "سيناريو","تيتانيك", "الجوكر", "آفاتار",
  "توم", "سبونج بوب", "ناروتو","مقلاة", "ملح", "عجين", "كيك","الدحيح","حقيبة", "شجرة", "سفينة", "قلعة", "سحاب", "نار", "ثلج", "نمر"
];

const selectedWords = allWords
  .sort(() => Math.random() - 0.5)
  .slice(0, 16);

const greenCount = 6;
const redCount = 6;
const blackCount = 1;
const grayCount = 16 - (greenCount + redCount + blackCount);

let colorRoles = [
  ...Array(greenCount).fill("green"),
  ...Array(redCount).fill("red"),
  ...Array(grayCount).fill("gray"),
  "black"
].sort(() => Math.random() - 0.5);

let greenScore = 0;
let redScore = 0;
let revealed = false;

const grid = document.getElementById("grid");
const revealBtn = document.getElementById("reveal-btn");
const greenScoreElem = document.querySelector(".green-score");
const redScoreElem = document.querySelector(".red-score");

selectedWords.forEach((word, index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.textContent = word;

  const color = colorRoles[index];
  cell.dataset.color = color;

  cell.addEventListener("click", () => {
    if (!cell.classList.contains("revealed")) {
      cell.classList.add("revealed", color); 

      if (color === "green") greenScore++ , playSound("green");
      if (color === "red") redScore++ , playSound("red");
      if (color == "black"){
        alert("You Lost 😱!, The game is about to restart.");
        location.reload();
      }
      else playSound("gray");

      updateScore();
    }
  });

  grid.appendChild(cell);
});

revealBtn.addEventListener("click", () => {
  revealed = !revealed;

  document.querySelectorAll(".cell").forEach(cell => {
    const color = cell.dataset.color;

    if (revealed) {
      cell.classList.add("revealed", color);
    } else {
      cell.classList.remove("revealed", "green", "red", "gray", "black");
    }
  });
});

function updateScore() {
  greenScoreElem.textContent = `Green: ${greenScore}`;
  redScoreElem.textContent = `Red: ${redScore}`;
}

const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  location.reload(); 
});

function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}