const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Sidebar navigation — add a page here and it shows up on every page automatically.
const NAV = [
  { id: "home", label: "Home", href: "index.html" },
  {
    id: "vocabulary",
    label: "Vocabulary",
    href: "vocabulary/index.html",
    children: [
      { id: "vocabulary/greetings", label: "Greetings", href: "vocabulary/greetings.html" },
      { id: "vocabulary/numbers", label: "Numbers", href: "vocabulary/numbers.html" },
      { id: "vocabulary/food", label: "Food", href: "vocabulary/food.html" },
      { id: "vocabulary/places", label: "Places", href: "vocabulary/places.html" },
    ],
  },
  {
    id: "grammar",
    label: "Grammar",
    href: "grammar/index.html",
    children: [
      { id: "grammar/articles", label: "Articles", href: "grammar/articles.html" },
      { id: "grammar/sentence-structure", label: "Sentence structure", href: "grammar/sentence-structure.html" },
    ],
  },
  {
    id: "verbs",
    label: "Verbs",
    href: "verbs/index.html",
    children: [
      { id: "verbs/regular-er", label: "Regular -er", href: "verbs/regular-er.html" },
      { id: "verbs/regular-ir", label: "Regular -ir", href: "verbs/regular-ir.html" },
      { id: "verbs/regular-re", label: "Regular -re", href: "verbs/regular-re.html" },
      { id: "verbs/irregular", label: "Irregular", href: "verbs/irregular.html" },
    ],
  },
  { id: "quiz", label: "Quiz", href: "quiz.html" },
];

function buildSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const base = document.body.dataset.base || "";
  const current = document.body.dataset.page || "";

  const brand = document.createElement("a");
  brand.className = "sidebar-brand";
  brand.href = base + "index.html";
  brand.textContent = "Apprendre le français";
  sidebar.appendChild(brand);

  const nav = document.createElement("nav");

  NAV.forEach((item) => {
    const group = document.createElement("div");
    group.className = "nav-group";

    const isParentActive =
      current === item.id || current.startsWith(item.id + "/");

    const top = document.createElement("a");
    top.className = "nav-top" + (isParentActive ? " active" : "");
    top.href = base + item.href;
    top.textContent = item.label;
    group.appendChild(top);

    if (item.children) {
      const list = document.createElement("ul");
      list.className = "nav-children";
      item.children.forEach((child) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = base + child.href;
        a.textContent = child.label;
        if (current === child.id) a.className = "active";
        li.appendChild(a);
        list.appendChild(li);
      });
      group.appendChild(list);
    }

    nav.appendChild(group);
  });

  sidebar.appendChild(nav);
}

buildSidebar();

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
