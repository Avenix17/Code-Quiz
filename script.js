const start = document.getElementById("start")
const quizQuestions = document.getElementById("quiz-questions")
var questions = document.getElementById("questions")
var answerButtons = document.getElementById("answer-buttons")

var randomizedQuestions
var currentQuestion

var sec = 90;
var time = setInterval(timer, 1000);

var createdQuestions = []

start.addEventListener("click", startQuiz)

function startQuiz() {
    start.classList.add("hide");
    quizQuestions.classList.remove("hide");
}

function showQuestion() {
}

function correctAnswer() {
}

function incorrectAnswer() {
}

function nextQuestion() {
}


function timer() {
    document.getElementById("time-left").innerHTML = sec;
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("You lose!");
    }
}

function leaderBoard() {

}