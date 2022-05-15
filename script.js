const start = document.getElementById("start");
const quizQuestions = document.getElementById("quiz-questions");
const questions = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const linkLeaderboard = document.getElementById("leader-board");
const home = document.getElementById("home");
const clearScores = document.getElementById("clear");
var highScoreSubmission = document.getElementById("high-score-submission");
var viewHighScores = document.getElementById("view-high-scores");
var initialInput = document.getElementById("Initials");
var timeScore = document.getElementById("time-remaining");

var randomizedQuestions;
var currentQuestion;

var sec = 90;
var countDown;
var options;
var question;
var score;

const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');
const submitButton = document.getElementById("submit-button");

const endHighScores = JSON.parse(localStorage.getItem("endHighScores")) || [];
const maxHighScores = 10;
const highScoresList = document.getElementById("ld-high-scores");

var createdQuestions = [
    {   question: "What is NOT a data type in JavaScript?",
        options: [
            {text: "Flex", correct: true},
            {text: "Number", correct: false},
            {text: "Boolean", correct: false},
            {text: "String", correct: false},
        ]
    },
    {   question: "What is NOT a way to define a variable?",
        options: [
            {text: "name", correct: true},
            {text: "let", correct: false},
            {text: "var", correct: false},
            {text: "const", correct: false},
        ]
    },
    {   question: "What variable scope can be accessed anywhere in code?",
        options: [
            {text: "Global", correct: true},
            {text: "Local", correct: false},
            {text: "Function", correct: false},
            {text: "International", correct: false},
        ]
    },
    {   question: "What data type is a variable that has been declared, but not yet assigned a value?",
        options: [
            {text: "Undefined", correct: true},
            {text: "Boolean", correct: false},
            {text: "Null", correct: false},
            {text: "Object", correct: false},
        ]
    },
    {   question: "What is NOT a way to include JavaScript within a HTML file?",
        options: [
            {text: "Extraterrestrial", correct: true},
            {text: "Inline", correct: false},
            {text: "Internal", correct: false},
            {text: "External", correct: false},
        ]
    },
]

start.addEventListener("click", startQuiz);
linkLeaderboard.addEventListener("click", showLeaderboard);

function startQuiz() {
    countDown = setInterval(timer, 1000);
    start.classList.add("hide");
    randomizedQuestions = createdQuestions.sort(() => Math.random() > .5 ? 1 : -1);
    currentQuestion = 0;
    quizQuestions.classList.remove("hide");
    nextQuestion();
    a1.addEventListener("click", chooseAnswer);
    a2.addEventListener("click", chooseAnswer);
    a3.addEventListener("click", chooseAnswer);
    a4.addEventListener("click", chooseAnswer);
}

function nextQuestion() {
    if (currentQuestion >= createdQuestions.length) {
        correct.classList.add('hide');
        incorrect.classList.add("hide");
        clearInterval(countDown);
        submitHighScore();
    } else {
        showQuestion(randomizedQuestions[currentQuestion]);
    }
}

function showQuestion(question) {
    questions.innerText = question.question;

    let options = createdQuestions[currentQuestion].options
    options.sort(() => Math.random() > .5 ? 1 : -1);

    a1.textContent = options[0].text;
    a2.textContent = options[1].text;
    a3.textContent = options[2].text;
    a4.textContent = options[3].text;

    a1.value = options[0].correct;
    a2.value = options[1].correct;
    a3.value = options[2].correct;
    a4.value = options[3].correct;

}

function chooseAnswer(event) {
    correct.classList.add('hide');
    incorrect.classList.add("hide");
    if (event.target.value == "true") {
        correct.classList.remove("hide");
        currentQuestion++;
        nextQuestion();
    } else {
        sec = sec - 15;
        incorrect.classList.remove("hide");
        currentQuestion++;
        nextQuestion();
    }
}

function submitHighScore() {
    quizQuestions.classList.add("hide");
    highScoreSubmission.classList.remove("hide");
    timeScore.innerHTML = sec;
    submitButton.addEventListener("click", highScoreLeaderboard);
}

function highScoreLeaderboard() {
    const score = {
        score: sec,
        name: initialInput.value
    };
    endHighScores.push(score);
    endHighScores.sort( (a,b) => {
        return b.score - a.score;
    })
    endHighScores.splice(maxHighScores);
    localStorage.setItem("endHighScores", JSON.stringify(endHighScores));
    showLeaderboard();
}

function showLeaderboard() {
    quizQuestions.classList.add("hide");
    correct.classList.add("hide");
    incorrect.classList.add("hide");
    highScoreSubmission.classList.add("hide");
    viewHighScores.classList.remove("hide");
    start.classList.add("hide");
    home.classList.remove("hide");
    clearScores.classList.remove("hide");

    highScoresList.innerHTML = endHighScores
    .map( score => {
        return `<li class="high-score">${score.name} - ${score.score}<li>`;
    })
    .join("");

    home.addEventListener("click", reloadPage);
    clearScores.addEventListener("click", clearLeaderboard);
    clearScores.addEventListener("click", reloadPage);
}

function reloadPage() {
    location.reload();
}

function clearLeaderboard() {
    localStorage.clear();
}

function timer() {
    document.getElementById("time-left").innerHTML = sec;
    sec--;
    if (sec <= -1) {
        clearInterval(countDown);
        alert("You lose!");
        showLeaderboard();
    }
}


