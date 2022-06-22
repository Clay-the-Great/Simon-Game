var buttonColors = ["purple", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".start-button").click(function() {
  animatePress($(".start-button"));
  playSound("sounds/purple.mp3");
  started = true;
  $(".start-button").text("Start Over!");
  level = 0;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  gamePattern = [];
  setTimeout(function() {
    nextSequence();
  }, 500);
});

$(document).keydown(function() {
  if ($("#level-title").text() === "Press A Key to Start") {
    //$("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }

});

$(".btn").click(function() {
  if (started) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound("sounds/" + userChosenColor + ".mp3");
    animatePress($(this));
    var rightColor = gamePattern[userClickedPattern.length - 1];
    if (userChosenColor === rightColor) {
      if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
          nextSequence();
        }, 500);
      }
    } else {
      gameOver();
    }
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress($("." + randomChosenColor));
  playSound("sounds/" + randomChosenColor + ".mp3");
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio(name);
  sound.play();
}

function animatePress(currentColor) {
  currentColor.addClass("pressed");
  setTimeout(function() {
    currentColor.removeClass("pressed");
  }, 200);
}

function gameOver() {
  started = false;
  var over = new Audio("sounds/wrong.mp3");
  over.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  // $(".start-button").text("Start Over!");
  if(level < 5){
    $("#level-title").text("Level " + level + ". Well, even morons can do better than that.");
  }
  else if(level < 10){
    $("#level-title").text("Level " + level + ". Seriously? You suck, man.");
  }
  else if (level < 15){
    $("#level-title").text("Level " + level + ". Come on, is that really what you can do?");
  }
  else if (level < 20){
    $("#level-title").text("Level " + level + ". Thought you are better than that, but apparently I was wrong.");
  }
  else if (level < 25){
    $("#level-title").text("Level " + level + ". Maybe, just maybe, there's still hope in you.");
  }
  else if (level < 30){
    $("#level-title").text("Level " + level + ". Meh.");
  }
  else if (level < 35){
    $("#level-title").text("Level " + level + ". Finally, acceptable.");
  }
  else{
    $("#level-title").text("Level " + level + ". I suppose that's not bad.");
  }
}
