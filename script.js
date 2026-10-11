```javascript
// Open the theater curtains
const curtains = document.getElementById("curtains");
const openButton = document.getElementById("openButton");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", () => {
  curtains.classList.add("open");

  setTimeout(() => {
    invitation.classList.add("visible");
  }, 700);

  setTimeout(() => {
    curtains.style.display = "none";
  }, 2200);
});

// Create twinkling stars
const stars = document.getElementById("stars");

for (let i = 0; i < 45; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "✦";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (6 + Math.random() * 12) + "px";
  star.style.animationDelay = Math.random() * 3 + "s";

  stars.appendChild(star);
}

// Light the candles one by one
const surpriseButton = document.getElementById("surpriseButton");
const candles = document.querySelectorAll(".flame");
const cake = document.querySelector(".cake");
const birthdayMessage = document.getElementById("birthdayMessage");
const confettiContainer = document.getElementById("confetti");

let isAnimating = false;
let confettiTimeout;

surpriseButton.addEventListener("click", () => {
  if (isAnimating) return;

  isAnimating = true;
  surpriseButton.disabled = true;
  surpriseButton.textContent = "Making a wish...";

  // Reset for replay
  candles.forEach(flame => {
    flame.style.opacity = "0";
    flame.style.transform = "translateX(-50%) scale(0)";
  });

  cake.classList.remove("lit");
  birthdayMessage.classList.add("hidden");
  confettiContainer.replaceChildren();

  clearTimeout(confettiTimeout);

  // Light each candle in sequence
  candles.forEach((flame, index) => {
    setTimeout(() => {
      flame.style.transition = "opacity .3s, transform .3s";
      flame.style.opacity = "1";
      flame.style.transform = "translateX(-50%) scale(1)";
    }, (index + 1) * 500);
  });

  // Glow and confetti
  setTimeout(() => {
    cake.classList.add("lit");
    launchConfetti();
  }, 2300);

  // Reveal the birthday message
  setTimeout(() => {
    birthdayMessage.classList.remove("hidden");
    surpriseButton.textContent = "Replay ↻";
    surpriseButton.disabled = false;
    isAnimating = false;
  }, 3000);
});

// Purple confetti animation
function launchConfetti() {
  const colors = [
    "#592080",
    "#8046b8",
    "#a779d6",
    "#c5a0ed",
    "#e1ccff",
    "#8c59b0"
  ];

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    if (i % 3 === 0) {
      piece.classList.add("circle");
    }

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDelay = Math.random() * 1.8 + "s";
    piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";

    confettiContainer.appendChild(piece);
  }

  confettiTimeout = setTimeout(() => {
    confettiContainer.replaceChildren();
  }, 7000);
}
```
