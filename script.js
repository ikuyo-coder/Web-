const questions = [
  "文章の読み書きが嫌いではない",
  "ネット検索をよくする",
  "ルールを守れるほうだ",
  "一人での作業が苦ではない",
  "人とのコミュニケーションが得意",
  "相手の気持ちを考えられる",
  "行動力がある方だ",
  "向上心がある方だ",
  "約束を守れる",
  "趣味や特技がある"
];

const questionCard = document.querySelector("#questionCard");
const questionText = document.querySelector("#questionText");
const questionBadge = document.querySelector("#questionBadge");
const currentNumber = document.querySelector("#currentNumber");
const stepFlag = document.querySelector("#stepFlag");
const progressBar = document.querySelector("#progressBar");
const progressValue = document.querySelector("#progressValue");
const nextButton = document.querySelector("#nextButton");
const answerButtons = document.querySelectorAll(".answer-btn");
const resultPanel = document.querySelector("#resultPanel");
const scoreValue = document.querySelector("#scoreValue");

let currentQuestion = 0;
let score = 0;
let selectedScore = null;

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    answerButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    selectedScore = Number(button.dataset.score);
    nextButton.disabled = false;
  });
});

nextButton.addEventListener("click", () => {
  if (selectedScore === null) return;
  score += selectedScore;

  if (currentQuestion === questions.length - 1) {
    showResult();
    return;
  }

  currentQuestion += 1;
  selectedScore = null;
  nextButton.disabled = true;
  answerButtons.forEach((item) => item.classList.remove("selected"));

  questionCard.classList.remove("switching");
  void questionCard.offsetWidth;
  questionCard.classList.add("switching");

  window.setTimeout(updateQuestion, 170);
});

function updateQuestion() {
  const number = currentQuestion + 1;
  const padded = String(number).padStart(2, "0");
  questionText.textContent = questions[currentQuestion];
  questionBadge.textContent = padded;
  currentNumber.textContent = number;
  stepFlag.textContent = padded;
  const progress = number * 10;
  progressBar.style.width = `${progress}%`;
  progressValue.textContent = `${progress}%`;
  nextButton.innerHTML = number === questions.length
    ? '診断結果を見る <span>›</span>'
    : '次の質問へ <span>›</span>';
}

function showResult() {
  questionCard.hidden = true;
  resultPanel.hidden = false;
  progressBar.style.width = "100%";
  progressValue.textContent = "100%";
  currentNumber.textContent = "10";
  stepFlag.textContent = "02";
  scoreValue.textContent = score;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
updateQuestion();
