let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

$(document).keypress(function() {
    if(!started){
        $('#level-title').text("Level " + level);
        console.log("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

function nextSequence() {
    userClickedPattern = [];

    randomNumber = Math.floor(Math.random() * 4);
    
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour)
    .fadeIn(80)
    .fadeOut(80)
    .fadeIn(80);
    
    playSound(randomChosenColour);
    level++;
    $('#level-title').text('Level ' + level);
}