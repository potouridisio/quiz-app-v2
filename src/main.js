import "./style.css";

// DOM Elements
const questionContainer = document.querySelector("#questionQuestion");
const answersList = document.querySelector("#questionAnswersList");
const answersForm = document.querySelector("#questionAnswersForm");

// API Data
const apiResponse = await fetch("https://quizapi.io/api/v1/questions", {
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
});
const quizQuestions = await apiResponse.json();

// State Variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
const currentQuestion = quizQuestions[currentQuestionIndex];

// Functions
function displayQuestion(question) {
  questionContainer.textContent = question.question;
  answersList.innerHTML = "";

  for (let key in question.answers) {
    if (question.answers[key]) {
      const answerListItem = document.createElement("li");
      const answerLabel = document.createElement("label");
      answerLabel.className = "inline-flex items-center flex-row-reverse gap-2";
      answerLabel.textContent = question.answers[key];
      const answerInput = document.createElement("input");
      answerInput.name = `question-${question.id}-answer`;
      answerInput.type =
        question.multiple_correct_answers === "false" ? "radio" : "checkbox";
      answerInput.value = key;
      answerLabel.appendChild(answerInput);
      answerListItem.appendChild(answerLabel);
      answersList.appendChild(answerListItem);
    }
  }
}

// Event Listeners
answersForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const userResponse = formData.get(`question-${currentQuestion.id}-answer`);

  if (currentQuestion.correct_answers[`${userResponse}_correct`] === "true") {
    correctAnswers++;
  }

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    const nextQuestion = quizQuestions[currentQuestionIndex];
    displayQuestion(nextQuestion);
  } else {
    questionContainer.textContent = `${Math.ceil(
      (correctAnswers / quizQuestions.length) * 100
    )}%`;
    answersList.remove();
    answersForm.remove();
  }
});

// Initial Render
displayQuestion(currentQuestion);
