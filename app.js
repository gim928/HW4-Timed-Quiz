// var qContainer = document.getElementbyId("question");
var qContainer = $("#question");
var container = $(".container");
var aContainer = document.getElementById("answers");
var button = document.querySelector("#button");
var indexQuestion = 0;
var choicesOptions = $("#answers");
var startButton = $("#startbtn");
var timer = $("#timer");
var userScore = 0;
var form = $("#prompt");
var scoreh1 = $("#score");
var saveBtn = $("#btn-save");
var userScores = $(".scores");
var intialInput = $(".initials");
var scoreList = $(".score-list");

var questions = [
  {
    question: "what color is the sun?",
    choices: ["blue", "yellow", "purple"],
    correctAnswer: "yellow",
  },
  {
    question: "Is the sun hot?",
    choices: ["yes", "no"],
    correctAnswer: "yes",
  },
  {
    question: "Is the moon round?",
    choices: ["yes", "no"],
    correctAnswer: "yes",
  },
];

function hideStart(event) {
  event.preventDefault;
  $(".start").hide();
}

startButton.on("click", hideStart);
startButton.on("click", nextQuestion);
startButton.on("click", countdown);

function nextQuestion() {
  if (indexQuestion < questions.length) {
    var questionNumber = indexQuestion + 1;
    $("#question").text(
      "Question#" +
        questionNumber +
        ": " +
        ` ${questions[indexQuestion].question}`
    );

    var questionCurrent = questions[indexQuestion];
    choicesOptions.html("");
    for (var i = 0; i < questionCurrent.choices.length; i++) {
      var choicesEl = $(
        `<li id="listItem"> <button>${questionCurrent.choices[i]}</button> </li>`
      );
      choicesOptions.append(choicesEl);
    }

    //   } else {
    //     displayResults();
  }
}

//

choicesOptions.on("click", checkAnswer);

// Write a function to keep track of score
function checkAnswer(event) {
  event.preventDefault;
  var userSelection = event.target.textContent;
  var correctAnswer = questions[indexQuestion].correctAnswer;
  console.log(userSelection);
  console.log(correctAnswer);
  if (userSelection === correctAnswer) {
    userScore++;
    alert(`you are correct. Your score currently is: ${userScore}`);
  } else {
    secondsLeft = secondsLeft - 5;
    alert("you are incorrect");
  }
  indexQuestion++;
  nextQuestion();
}

var secondsLeft = 10;

function countdown(event) {
  event.preventDefault;
  var timerInterval = setInterval(function () {
    if (secondsLeft < 1) {
      timer.html("Times up!");
      clearInterval(timerInterval);
      clearScreen();
    } else {
      secondsLeft--;
      timer.html(secondsLeft);
    }
  }, 1000);
}

function clearScreen() {
  container.remove();
  timer.remove();
  endQuiz();
}
function endQuiz() {
  scoreh1.text("Your final score was " + `${userScore}`);
  form.html("Please enter your initials to save your score.");
  var initials = document.createElement("input");
  $(initials).attr("type", "text", "required");
  $(initials).attr("placeholder", "Initials");
  $(initials).attr("class", "intitals");
  form.append(initials);
  $("#initials").append(
    $(document.createElement("button")).prop({
      type: "button",
      innerHTML: "Save Score",
      class: "btn-save",
    })
  );
  function saveScore(event) {
    console.log("this is working");
    event.preventDefault();
    var initials = initialInput.val();
    console.log(initials);
    var scores = [];
    if (localStorage.getItem("scores")) {
      scores = JSON.parse(localStorage.getItem("scores"));
    }
    scores.push({ initials: initials, score: `${userScore}` });
    localStorage.setItem("scores", JSON.stringify(scores));

    qContainer.text("Scoreboard");
    scoreList.html(localStorage.getItem(JSON.parse("scores")));
  }
  saveBtn.on("submit", saveScore);
}
