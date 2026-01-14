const countDownEl = document.getElementById("countdown");
const instructionsEl = document.getElementById("instructions");
const numbersListEl = document.getElementById("numbers-list");

const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const messageEl = document.getElementById("message");

const inputs = document.querySelectorAll("input");

const TOTAL_SECONDS = 30;
const NUMBERS_COUNT = 5;

let numbersToguess = [];
let secondsLeft = TOTAL_SECONDS;
let intervalId = null;
