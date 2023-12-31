let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() {
    if(!started){
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


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

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function (){nextSequence()}, 1000);
    }
    
    } else {
        console.log("wrong");
        
        playSound('wrong');

        $('body').addClass('game-over');

        setTimeout(function (){
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').text('Game over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

$(document).ready(function () {
    $("#instructions-button").click(function () {
        $("#instructions-box").fadeToggle();
    });

    $(document).click(function (event) {
        if (!$(event.target).closest("#instructions-box, #instructions-button").length) {
            $("#instructions-box").fadeOut();
        }
    });
});
