const countDownEl = document.getElementById("countdown");
const instructionsEl = document.getElementById("instructions");
const numbersListEl = document.getElementById("numbers-list");

const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const messageEl = document.getElementById("message");

const inputs = document.querySelectorAll("input");

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
console.log("numbersToGuess:", numbersToGuess);
console.log("UL html:", numbersListEl.innerHTML);

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
