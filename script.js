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
const resultTitle = document.querySelector("#resultTitle");
const resultBody = document.querySelector("#resultBody");
const continueButton = document.querySelector("#continueButton");
const consultation = document.querySelector("#consultation");

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

continueButton.addEventListener("click", () => {
  consultation.hidden = false;
  consultation.scrollIntoView({ behavior: "smooth", block: "center" });
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

  if (score >= 5) {
    resultTitle.textContent = "Webライター適性あり！";
    resultBody.innerHTML = `
      <p>あなたはWebライターに向いている要素をすでに持っています。</p>
      <p>文章を書くことや調べること、約束を守ることなど、Webライターとして大切な資質が備わっています。</p>
      <p>もちろん最初から完璧な人はいません。実際に活躍しているライターも未経験からスタートしています。</p>
      <p>まずは小さな一歩を踏み出してみましょう。</p>`;
  } else {
    resultTitle.textContent = "まだまだ可能性は<br>十分あります";
    resultBody.innerHTML = `
      <p>今回の結果だけで向いていないと判断する必要はありません。</p>
      <p>実は私自身も最初にこの診断をしたら4点でした。それでも知識やスキルを身につけ、行動を続けたことでWebライターとして活動できるようになりました。</p>
      <p>Webライターに必要なのは才能よりも</p>
      <ul><li>学ぶ姿勢</li><li>行動する力</li><li>続ける力</li></ul>
      <p>今の結果はスタート地点に過ぎません。</p>`;
  }

  resultPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
updateQuestion();
