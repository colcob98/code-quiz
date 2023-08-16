//Declare and assign variable for manipulation
var timerElement = document.getElementById("time")
var choices = document.getElementById("answer-choices");
var startButton = document.getElementById("start-button");
var responseCard = document.getElementById("response-card");
var response = document.getElementById("response");
var questionCard = document.getElementById("questions");
var initialsElement = document.getElementById("initials");
var submitButton = document.getElementById("submit-button");

//Extra time variable to pause and manipulate score/time display even after score is displayed to user
var timer;
//Have an inital timer of 100 seconds
var timerCountdown = 100;

//Set the initial question to the first one. 
var questionIndex = 0;
//function to hide start screen and begin game
function startQuiz () {
    // hide the start screen once quiz starts
    document.getElementById("start-screen").hidden = true;
    //show questions template
    document.getElementById("questions").hidden = false;
    //start timer
    scoreTimer();
    //import questions
    getQuestions();
}

function getQuestions() {
    var currentQuestion = questions[questionIndex];
    var question = document.getElementById("question");
    question.textContent = currentQuestion.question;
    choices.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var answerChoices = document.createElement("button");
        answerChoices.setAttribute("class", "choice");
        answerChoices.setAttribute("value", choice);
        answerChoices.textContent = choice;

        answerChoices.addEventListener("click", function(event) {
            answerCheck(event.target.getAttribute("value"));
        });
        choices.appendChild(answerChoices);
    }
};

function answerCheck(selectedChoice) {
    var correctAnswer = questions[questionIndex].answer;
    var correctSound = new Audio("assets/audio-and-images/ding-idea-40142.mp3");
    var incorrectSound = new Audio("assets/audio-and-images/negative_beeps-6008.mp3");
    if (!selectedChoice && timerCountdown <= 0) {
        response.textContent = "Time's Up!"   
    } else if (selectedChoice === correctAnswer) {
        correctSound.play();
        response.textContent = "Correct!";
    } else {
        incorrectSound.play();
        response.textContent = "Too bad!";
        timerCountdown -= 10;
    }

    document.getElementById("response-card").hidden = false;
    questionIndex++;
    if (questionIndex === questions.length) {
        showResults();
    } else {
        getQuestions();
    }
}

function showResults() {
    questionCard.hidden = true;
    var scoreDisplay = document.getElementById("score-display");
    scoreDisplay.textContent = timerCountdown;
    document.getElementById("result-screen").hidden = false;
    clearInterval(timer);
}

function scoreTimer() {
    var timer = setInterval(function() {
        if (questionIndex < questions.length) {
        timerCountdown--;
        }
        if (timerCountdown <= 0) {
            clearInterval(timer);
            answerCheck(null);
            showResults();
        }
        timerElement.textContent = timerCountdown;
        if(questionIndex === questions.length) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);

    return timer
}

function addHighscore() {
    //get value of initials in input
    var initials = initialsElement.value.trim();
    const storedScores = JSON.parse(window.localStorage.getItem('highscoreslist')) || [];
    var newScore = {
        score: timerCountdown,
        initials: initials,
    };
    storedScores.push(newScore);
    localStorage.setItem("highscoreslist", JSON.stringify(storedScores));

    window.location.href = "highscores.html";
}

submitButton.addEventListener("click", addHighscore);
//Add event listener to begin quiz on click
startButton.addEventListener("click", startQuiz);