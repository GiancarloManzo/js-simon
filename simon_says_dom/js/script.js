const countDownEl = document.getElementById("countdown");
const instructionsEl = document.getElementById("instructions");
const numbersListEl = document.getElementById("numbers-list");

const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");

const inputs = inputGroup.querySelectorAll("input");

const TOTAL_SECONDS = 30;
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
    if (!numbers.includes(n)) numbers.push(n);
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

function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.remove("text-success", "text-danger");
  messageEl.classList.add(isError ? "text-danger" : "text-success");
}

function resetValidationUI() {
  showMessage("");
  inputs.forEach((inp) => inp.classList.remove("is-invalid"));
}

function getDuplicates(arr) {
  const dups = [];
  arr.forEach((num, idx) => {
    if (arr.indexOf(num) !== idx && !dups.includes(num)) dups.push(num);
  });
  return dups;
}

function getValidatedUserNumbers() {
  resetValidationUI();

  const userNumbers = [];
  let hasError = false;

  inputs.forEach((inp) => {
    const raw = inp.value.trim();
    const value = parseInt(raw, 10);

    if (raw === "" || Number.isNaN(value)) {
      inp.classList.add("is-invalid");
      hasError = true;
      return;
    }

    const minAttr = parseInt(inp.min, 10);
    const maxAttr = parseInt(inp.max, 10);

    if (value < minAttr || value > maxAttr) {
      inp.classList.add("is-invalid");
      hasError = true;
      return;
    }

    userNumbers.push(value);
  });

  if (hasError) {
    showMessage("Inserisci solo numeri validi (1-50) in tutti i campi.", true);
    return null;
  }

  const duplicates = getDuplicates(userNumbers);
  if (duplicates.length > 0) {
    inputs.forEach((inp) => {
      const v = parseInt(inp.value.trim(), 10);
      if (duplicates.includes(v)) inp.classList.add("is-invalid");
    });
    showMessage("Non puoi inserire due numeri uguali.", true);
    return null;
  }

  return userNumbers;
}

function hideNumbersShowForm() {
  numbersListEl.classList.add("d-none");
  instructionsEl.textContent =
    "Ora inserisci i 5 numeri che ricordi (ordine libero).";
  answersForm.classList.remove("d-none");
}

function startTimer() {
  secondsLeft = TOTAL_SECONDS;
  countDownEl.textContent = secondsLeft;

  if (intervalId !== null) clearInterval(intervalId);

  intervalId = setInterval(() => {
    secondsLeft--;
    countDownEl.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      hideNumbersShowForm();
    }
  }, 1000);
}

function resetGame() {
  if (intervalId !== null) clearInterval(intervalId);
  intervalId = null;

  resetValidationUI();
  inputs.forEach((inp) => (inp.value = ""));

  resetBtn.classList.add("d-none");
  answersForm.classList.add("d-none");

  numbersListEl.classList.remove("d-none");
  instructionsEl.textContent = "Memorizza i numeri entro il tempo limite!";

  numbersToGuess = generateUniqueRandomNumbers(NUMBERS_COUNT, 1, 50);
  renderNumbers(numbersToGuess);

  startTimer();
}

resetBtn.addEventListener("click", resetGame);

function startGame() {
  numbersToGuess = generateUniqueRandomNumbers(NUMBERS_COUNT, 1, 50);
  renderNumbers(numbersToGuess);
  instructionsEl.textContent = "Memorizza i numeri entro il tempo limite!";
  startTimer();
}

startGame();

answersForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userNumbers = getValidatedUserNumbers();
  if (!userNumbers) return;

  const guessed = userNumbers.filter((n) => numbersToGuess.includes(n));

  if (guessed.length === 0) {
    showMessage("Hai indovinato 0 numeri :/", true);
  } else {
    showMessage(
      `Hai indovinato ${guessed.length} numero/i: ${guessed.join(", ")} ✅`
    );
  }

  resetBtn.classList.remove("d-none");
});
