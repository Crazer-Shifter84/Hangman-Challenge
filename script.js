const words = [
  "javascript","browser","hangman","variable","function","object","array",
  "string","number","boolean","syntax","compile","execute","debug","program",
  "developer","frontend","backend","database","network","internet","protocol",
  "algorithm","binary","decimal","hexadecimal","operator","condition","loop",
  "iteration","recursion","framework","library","module","package","runtime",
  "engine","document","window","console","event","listener","callback","promise",
  "async","await","thread","process","memory","storage","cookie","session"
];

const secret = words[Math.floor(Math.random() * words.length)];
let guessed = [];
let missed = [];
let lives = 6;

const wordEl = document.getElementById("word");
const missedEl = document.getElementById("missed");
const livesEl = document.getElementById("lives");
const statusEl = document.getElementById("status");

function update() {
  wordEl.textContent = secret
    .split("")
    .map(l => (guessed.includes(l) ? l : "_"))
    .join(" ");

  missedEl.textContent = missed.join(", ");
  livesEl.textContent = "❤️".repeat(lives);

  if (!wordEl.textContent.includes("_")) {
    statusEl.textContent = "🎉 You won!";
    document.removeEventListener("keydown", handleKey);
  }

  if (lives === 0) {
    statusEl.textContent = `💀 Game Over! Word was "${secret}"`;
    document.removeEventListener("keydown", handleKey);
  }
}

function handleKey(e) {
  const letter = e.key.toLowerCase();
  if (!/^[a-z]$/.test(letter)) return;
  if (guessed.includes(letter) || missed.includes(letter)) return;

  if (secret.includes(letter)) {
    guessed.push(letter);
  } else {
    missed.push(letter);
    lives--;
  }

  update();
}

document.addEventListener("keydown", handleKey);
update();