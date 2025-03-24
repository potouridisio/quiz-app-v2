import "./style.css";

const questionQuestionEl = document.querySelector("#questionQuestion");
const questionAnswersListEl = document.querySelector("#questionAnswersList");
const questionAnswersFormEl = document.querySelector("#questionAnswersForm");

const response = await fetch("https://quizapi.io/api/v1/questions", {
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
});

const questions = await response.json();

let currentIndex = 0;

const currentQuestion = questions[currentIndex];

function displayQuestion(question) {
  questionQuestionEl.textContent = question.question;
  questionAnswersListEl.innerHTML = "";

  for (let key in question.answers) {
    if (question.answers[key]) {
      const questionAnswersAnswerListItemEl = document.createElement("li");
      questionAnswersAnswerListItemEl.textContent = question.answers[key];
      questionAnswersListEl.appendChild(questionAnswersAnswerListItemEl);
    }
  }
}

displayQuestion(currentQuestion);

questionAnswersFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (currentIndex < questions.length - 1) {
    currentIndex++;

    const currentQuestion = questions[currentIndex];

    displayQuestion(currentQuestion);
  } else {
    //
    //
  }
});
