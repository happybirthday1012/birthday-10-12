
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================

  const curtains = document.getElementById("curtains");
  const openButton = document.getElementById("openButton");
  const invitation = document.getElementById("invitation");
  const surpriseButton = document.getElementById("surpriseButton");
  const birthdayMessage = document.getElementById("birthdayMessage");
  const cake = document.querySelector(".cake");
  const stars = document.getElementById("stars");
  const confettiContainer = document.getElementById("confetti");
  const flames = document.querySelectorAll(".candle .flame");

  // =========================
  // OPENING CURTAINS
  // =========================

  let curtainsOpened = false;

  if (curtains && openButton && invitation) {
    openButton.addEventListener("click", () => {
      if (curtainsOpened) return;

      curtainsOpened = true;
      openButton.disabled = true;

      curtains.classList.add("open");

      // Fade in the birthday invitation.
      setTimeout(() => {
        invitation.classList.add("visible");
      }, 700);

      // Remove the curtain overlay after the animation.
      setTimeout(() => {
        curtains.style.display = "none";
      }, 2300);
    });
  }

  // =========================
  // TWINKLING STARS
  // =========================

  if (stars && stars.children.length === 0) {
    for (let i = 0; i < 65; i++) {
      const star = document.createElement("span");

      star.className = "star";
      star.textContent = "✦";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.fontSize = (8 + Math.random() * 12) + "px";
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration =
        (1.5 + Math.random() * 2) + "s";

      stars.appendChild(star);
    }
  }

  // =========================
  // ANIMATION STATE
  // =========================

  let isAnimating = false;
  let animationTimers = [];
  let confettiTimeout = null;

  function clearAnimationTimers() {
    animationTimers.forEach(timer => clearTimeout(timer));
    animationTimers = [];
  }

  function schedule(callback, delay) {
    const timer = setTimeout(callback, delay);
    animationTimers.push(timer);
  }

  // =========================
  // ANIMATED CONFETTI
  // =========================

  function launchConfetti() {
    if (!confettiContainer) return;

    const colors = [
      "#592080",
      "#8046b8",
      "#a779d6",
      "#c5a0ed",
      "#e1ccff",
      "#f0a2cb",
      "#ffe0f0",
      "#ffd166"
    ];

    confettiContainer.replaceChildren();

    if (confettiTimeout) {
      clearTimeout(confettiTimeout);
    }

    for (let i = 0; i < 100; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti-piece";

      if (i % 3 === 0) {
        piece.classList.add("circle");
      }

      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.animationDelay =
        Math.random() * 1.5 + "s";

      piece.style.animationDuration =
        (2.5 + Math.random() * 2) + "s";

      confettiContainer.appendChild(piece);
    }

    confettiTimeout = setTimeout(() => {
      confettiContainer.replaceChildren();
    }, 6500);
  }

  // =========================
  // BIRTHDAY CANDLE SURPRISE
  // =========================

  function startBirthdaySurprise() {
    if (
      isAnimating ||
      !surpriseButton ||
      !cake ||
      !birthdayMessage ||
      !confettiContainer
    ) {
      return;
    }

    isAnimating = true;
    surpriseButton.disabled = true;
    surpriseButton.textContent = "Making a wish...";

    clearAnimationTimers();

    if (confettiTimeout) {
      clearTimeout(confettiTimeout);
      confettiTimeout = null;
    }

    confettiContainer.replaceChildren();

    // Reset the cake for the animation.
    cake.classList.remove("lit");

    // Hide the message until the animation finishes.
    birthdayMessage.classList.add("hidden");

    // Reset every candle flame.
    flames.forEach(flame => {
      flame.style.animation = "none";
      flame.style.transition = "none";
      flame.style.opacity = "0";
      flame.style.transform = "translateX(-50%) scale(0)";
    });

    // Apply the reset before starting the animation.
    void cake.offsetWidth;

    // Light the four candles one at a time.
    flames.forEach((flame, index) => {
      schedule(() => {
        flame.style.transition =
          "opacity .3s ease, transform .3s ease";

        flame.style.opacity = "1";
        flame.style.transform =
          "translateX(-50%) scale(1)";
      }, (index + 1) * 500);
    });

    // Add the glow and confetti.
    schedule(() => {
      cake.classList.add("lit");

      flames.forEach(flame => {
        flame.style.animation = "";
      });

      launchConfetti();
    }, 2300);

    // Reveal the original birthday message.
    schedule(() => {
      birthdayMessage.classList.remove("hidden");

      surpriseButton.textContent = "Replay ↻";
      surpriseButton.disabled = false;

      isAnimating = false;

      // Gently scroll to the revealed message.
      setTimeout(() => {
        birthdayMessage.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 150);
    }, 3000);
  }

  if (surpriseButton) {
    surpriseButton.addEventListener(
      "click",
      startBirthdaySurprise
    );
  }

});
