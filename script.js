
document.addEventListener("DOMContentLoaded", () => {
  // Opening theater curtains
  const curtains = document.getElementById("curtains");
  const openButton = document.getElementById("openButton");
  const invitation = document.getElementById("invitation");

  let curtainsOpened = false;

  if (curtains && openButton && invitation) {
    openButton.addEventListener("click", () => {
      if (curtainsOpened) return;
      curtainsOpened = true;

      curtains.classList.add("open");

      setTimeout(() => {
        invitation.classList.add("visible");
      }, 700);

      setTimeout(() => {
        curtains.style.display = "none";
      }, 2200);
    });
  }

  // Create twinkling stars
  const stars = document.getElementById("stars");

  if (stars && !stars.children.length) {
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
  }

  // Birthday candle surprise
  const surpriseButton = document.getElementById("surpriseButton");
  const flames = document.querySelectorAll(".candle .flame");
  const cake = document.querySelector(".cake");
  const birthdayMessage = document.getElementById("birthdayMessage");
  const confettiContainer = document.getElementById("confetti");

  let isAnimating = false;
  let animationTimers = [];
  let confettiTimeout;

  function clearAnimationTimers() {
    animationTimers.forEach(timer => clearTimeout(timer));
    animationTimers = [];
  }

  function schedule(callback, delay) {
    const timer = setTimeout(callback, delay);
    animationTimers.push(timer);
  }

  function launchConfetti() {
    if (!confettiContainer) return;

    const colors = [
      "#592080",
      "#8046b8",
      "#a779d6",
      "#c5a0ed",
      "#e1ccff",
      "#8c59b0"
    ];

    confettiContainer.replaceChildren();
    clearTimeout(confettiTimeout);

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
      piece.style.animationDuration =
        (2.5 + Math.random() * 2) + "s";

      confettiContainer.appendChild(piece);
    }

    confettiTimeout = setTimeout(() => {
      confettiContainer.replaceChildren();
    }, 7000);
  }

  function startBirthdaySurprise() {
    if (isAnimating || !surpriseButton || !cake ||
        !birthdayMessage || !confettiContainer) {
      return;
    }

    isAnimating = true;
    surpriseButton.disabled = true;
    surpriseButton.textContent = "Making a wish...";

    clearAnimationTimers();
    clearTimeout(confettiTimeout);
    confettiContainer.replaceChildren();

    // Reset the cake and hide the original message
    cake.classList.remove("lit");
    birthdayMessage.classList.add("hidden");

    // Turn off every candle before relighting them
    flames.forEach(flame => {
      flame.style.transition = "none";
      flame.style.opacity = "0";
      flame.style.transform = "translateX(-50%) scale(0)";
    });

    // Force the browser to apply the reset before animating
    void cake.offsetWidth;

    flames.forEach((flame, index) => {
      schedule(() => {
        flame.style.transition =
          "opacity .3s ease, transform .3s ease";
        flame.style.opacity = "1";
        flame.style.transform = "translateX(-50%) scale(1)";
      }, (index + 1) * 500);
    });

    // Glow and confetti after the candles relight
    schedule(() => {
      cake.classList.add("lit");
      launchConfetti();
    }, 2300);

    // Reveal your existing long birthday message
    schedule(() => {
      birthdayMessage.classList.remove("hidden");
      surpriseButton.textContent = "Replay ↻";
      surpriseButton.disabled = false;
      isAnimating = false;
    }, 3000);
  }

  if (surpriseButton) {
    surpriseButton.addEventListener("click", startBirthdaySurprise);
  }
});
