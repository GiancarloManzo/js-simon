const countDownEl = document.getElementById("countdown");
const instructionsEl = document.getElementById("instructions");
const numbersListEl = document.getElementById("numbers-list");

const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const messageEl = document.getElementById("message");

const inputs = document.querySelectorAll("input");

const TOTAL_SECONDS = 5;
const NUMBERS_COUNT = 5;

let numbersToGuess = [];
let secondsLeft = TOTAL_SECONDS;
let intervalId = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueRandomNumbers(howMany, min, max) {
  const numbers = [];
  while (numbers.length < howMany) {
    const n = getRandomInt(min, max);

    if (!numbers.includes(n)) {
      numbers.push(n);
    }
  }
  return numbers;
}

function renderNumbers(numbers) {
  numbersListEl.innerHTML = "";

  numbers.forEach((n) => {
    const li = document.createElement("li");
    li.textContent = n;
    li.className = "fs-2 fw-bold";
    numbersListEl.appendChild(li);
  });
}

numbersToGuess = generateUniqueRandomNumbers(NUMBERS_COUNT, 1, 50);
renderNumbers(numbersToGuess);

instructionsEl.textContent = "Memorizza i numeri entro il tempo limite!";

countDownEl.textContent = secondsLeft;
intervalId = setInterval(() => {
  secondsLeft--;
  countDownEl.textContent = secondsLeft;

  if (secondsLeft <= 0) {
    clearInterval(intervalId);
    hideNumbersShowForm();
  }
}, 1000);

function hideNumbersShowForm() {
  numbersListEl.classList.add("d-none");
  instructionsEl.textContent =
    "Ora inserisci i 5 bnumeri che ricordi (ordine libero.)";
  answersForm.classList.remove("d-none");
}

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle("text-success", !isError);
}

function resetValidationUI() {
  showMessage("");
  inputs.forEach((inp) => inp.classList.remove("is-invalid"));
}

function getDuplicates(arr) {
  const dups = [];

  arr.forEach((num, idx) => {
    if (arr.indexOf(num) !== idx && !dups.includes(num)) {
      dups.push(num);
    }
  });

  return dups;
}

function getValidatedUserNumber() {
  resetValidationUI();

  const userNumbers = [];
  let hasError = false;

  inputs.forEach((inp) => {
    const raw = inp.value.trim();
    const value = parseInt(raw, 10);

    if (raw === "" || Number.isNaN(value)) {
      inp.classList.add("is-valid");
      hasError = true;
      return;
    }

    const minAttr = parseInt(inp.min, 10);
    const maxAttr = parseInt(inp.max, 10);
  });
}
