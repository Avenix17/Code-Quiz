const start = document.getElementById("start");
const quizQuestions = document.getElementById("quiz-questions");
var questions = document.getElementById("questions");
var answerButtons = document.getElementById("answer-buttons");
var highScoreSubmission = document.getElementById("enter-high-scores")
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");

var randomizedQuestions;
var currentQuestion;

var sec = 90;
var countDown;
var options;
var question;

const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');

var createdQuestions = [
    {   question: "You end every line in CSS with what...",
        options: [
            {text: "A semicolon", correct: true},
            {text: "I dunno", correct: false},
            {text: "Jeffrey Bezos", correct: false},
            {text: "Nothing", correct: false},
        ]
    },
    {   question: "Billy joe sally",
        options: [
            {text: "cotton eye joe", correct: true},
            {text: "billy jean is not my lover", correct: false},
            {text: "sally mae", correct: false},
            {text: "Hua?", correct: false},
        ]
    },
    {   question: "Billy joe ",
        options: [
            {text: "cotton eye joe", correct: true},
            {text: "billy jean is not my lover", correct: false},
            {text: "sally mae", correct: false},
            {text: "Hua?", correct: false},
        ]
    },
    {   question: "Billy joe richy",
        options: [
            {text: "cotton eye joe", correct: true},
            {text: "billy jean is not my lover", correct: false},
            {text: "sally mae", correct: false},
            {text: "Hua?", correct: false},
        ]
    },
    {   question: "Billy joe crazy",
        options: [
            {text: "cotton eye joe", correct: true},
            {text: "billy jean is not my lover", correct: false},
            {text: "sally mae", correct: false},
            {text: "Hua?", correct: false},
        ]
    },
]

start.addEventListener("click", startQuiz);

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
        // TODO: go to high score submission
        alert("submit highscore");
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

function timer() {
    document.getElementById("time-left").innerHTML = sec;
    sec--;
    if (sec <= 0) {
        clearInterval(countDown);
        alert("You lose!");
    }
}


