const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const optionButtons = document.getElementById("option-buttons");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerText = document.getElementById("time-left");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Start quiz
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.parentElement.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestion = 0;
  score = 0;

  loadQuestion();
}

// Load question
function loadQuestion() {
  clearInterval(timer);
  resetState();

  let current = questions[currentQuestion];
  questionText.textContent = current.question;

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;
    button.addEventListener("click", selectAnswer);
    optionButtons.appendChild(button);
  });

  startTimer();
}

// Reset option area
function resetState() {
  while (optionButtons.firstChild) {
    optionButtons.removeChild(optionButtons.firstChild);
  }
}

// Timer logic
function startTimer() {
  timeLeft = 15;
  timerText.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showNextQuestion();
    }
  }, 1000);
}

// Handle answer
function selectAnswer(e) {
  clearInterval(timer);

  const selected = e.target.textContent;
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
    e.target.style.backgroundColor = "green";
  } else {
    e.target.style.backgroundColor = "red";
  }

  setTimeout(showNextQuestion, 800);
}

// Next question or end quiz
function showNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End screen
function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.textContent = `${score} / ${questions.length}`;
}
