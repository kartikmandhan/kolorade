$(document).ready(function(){
  function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      $(".clicks-counter").text("You had played this game "+localStorage.clickcount+" times, till date.");
    }
  }
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; //storres actual sequence of the game
var userClickedPattern = [];  //stores sequence of pattern in which user clicks on the square

var level = 0;    //stores value of current level to be displayed
var started = false;
var score_level;  //stores number o level user completes successfully
// $(document).keypress(function(event) {
//   //important to check started or else always on a keypress nextsequence() is called and level increases
//   if (!started) {
//     nextSequence();
//     started = true;
//
//   }
//});
$(".myButton").click(function(){
  if (!started) {
    clickCounter();
    nextSequence();
    started = true;
    //$("body").css("background-color","#011F3F");
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //everytime user clicks a button answer is checked
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

$(".how_to_play_btn").click(function(){
$(".content").slideToggle();
});

function checkAnswer(currentIndex) {

  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Play Again to Restart");
    console.log(score_level);
    setTimeout(function () {
      score(score_level);
    }, 200);

    //2. Call startOver() if the user gets the sequence wrong.
    startOver();

  }

}


function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //flash animation
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function playSound(color) {
  switch (color) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      //console.log(randomChosenColor);

  }

}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function score(currentLevel){
  var points=currentLevel*50;
  console.log(points);
  if(points<250){
    alert("You need to work on your memory,Try Again.\n your Score is : "+points);
  }
  else if(points>=250 && points<=600){
  alert("Good job! you have a decent memory.\n your Score is : "+points);
  }
  else if(points>600){
  alert("Marvellous! you surely have a photographic memory. \n your Score is : "+points);
  }
}

function startOver() {
  score_level=level-1;
  level = 0;
  gamePattern = [];
  started = false;

  $(".myButton").text("PLAY AGAIN");
}
});
