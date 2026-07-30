const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const words = [
  { fr: "Bonjour", en: "Hello" },
  { fr: "Merci", en: "Thank you" },
  { fr: "Le chat", en: "The cat" },
  { fr: "L'eau", en: "Water" },
  { fr: "Un", en: "One" },
  { fr: "La pomme", en: "The apple" },
  { fr: "Au revoir", en: "Goodbye" },
];

const flashcard = document.getElementById("flashcard");

if (flashcard) {
  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");
  const progress = document.getElementById("quiz-progress");
  const btnRight = document.getElementById("btn-right");
  const btnWrong = document.getElementById("btn-wrong");

  let order = shuffle([...words.keys()]);
  let index = 0;
  let known = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showCard() {
    flashcard.classList.remove("flipped");
    const word = words[order[index]];
    front.textContent = word.fr;
    back.textContent = word.en;
    progress.textContent = `Card ${index + 1} of ${words.length} — known: ${known}`;
  }

  function nextCard(gotItRight) {
    if (gotItRight) known++;
    index++;
    if (index >= order.length) {
      order = shuffle([...words.keys()]);
      index = 0;
      known = 0;
    }
    showCard();
  }

  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });

  btnRight.addEventListener("click", () => nextCard(true));
  btnWrong.addEventListener("click", () => nextCard(false));

  showCard();
}
