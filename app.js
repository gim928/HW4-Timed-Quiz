//global variables
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
var userScores = $(".scores");
var intialInput = $(".initials").val();
var scoreList = $(".score-list");
var secondsLeft = 10;
var saveButton;

//array of questions and answers
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

//FUNCTIONS

//hides directions and start menu after user begins test
function hideStart(event) {
  event.preventDefault;
  $(".start").hide();
  nextQuestion();
}

//shows the first question after start and next question after user picks answer
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
  }
}

// Write a function to keep track of score and call the next question function when user clicks answer
function checkAnswer(event) {
  event.preventDefault;
  var userSelection = event.target.textContent;
  var correctAnswer = questions[indexQuestion].correctAnswer;
  // console.log(userSelection);
  // console.log(correctAnswer);
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

//function for countdown timer

function countdown(event) {
  event.preventDefault;
  var timerInterval = setInterval(function () {
    if (secondsLeft < 1) {
      timer.html("Times up!");
      clearInterval(timerInterval);
      clearScreen();
    } else {
      secondsLeft--;
      timer.html("You have " + secondsLeft + " seconds left");
    }
  }, 1000);
}
//function to clear the screen at the end of the quiz
function clearScreen() {
  qContainer.hide();
  container.hide();
  timer.hide();
  endQuiz();
}
function endQuiz() {
  scoreh1.text("Your final score was " + `${userScore}`);
  form.html("Please enter your initials to save your score.");
  var initials = document.createElement("input");
  initials.setAttribute("type", "text");
  initials.setAttribute("placeholder", "Initials");
  initials.setAttribute("class", "intitals");
  form.append(initials);
  $("#initials").append(
    $(document.createElement("button")).prop({
      type: "submit",
      innerHTML: "Save Score",
      class: "btn-save",
    })
  );
}

function saveScore(event) {
  event.preventDefault();
  console.log("this is working");
  console.log(initialInput);
  scoreh1.hide();
  form.hide();
  var scores = [];
  if (localStorage.getItem("scores")) {
    scores = JSON.parse(localStorage.getItem("scores"));
  }
  scores.push({ initials: initialInput, score: UserScore });
  localStorage.setItem("scores", JSON.stringify(scores));
}

// var saveButton = endQuiz();
//EVENT HANDLERS
$(".btn-save").on("click", saveScore);
$(".btn-save").on("click", function () {
  console.log("button click");
});
// event listeners for start button
startButton.on("click", hideStart);
startButton.on("click", countdown);
//event listener for user click on answer

choicesOptions.on("click", checkAnswer);
