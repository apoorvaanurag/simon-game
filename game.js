let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];


//play audio
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setInterval(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var level = 0;
var started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
})


//detect mouse clicks
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var indexLast = userClickedPattern.length - 1;
    checkAnswer(indexLast);

});
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// checking answer from user vs game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
            console.log(gamePattern);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
//refresh variables after wrong move
function startOver()
{
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
}








