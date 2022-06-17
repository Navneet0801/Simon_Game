
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    makesound(randomChosenColor);
    level++;
    $("h1").html(`Level ${level}`);
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    makesound(userChosenColour);
    animatePress(userChosenColour);
})

function makesound(color){
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed")
    }, 100);
}

$(document).keydown(function(){
    if(!started){
        nextSequence();
        $("h1").html(`Level ${level}`);
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 900);
        }
    }

    else{
        console.log("Wrong");
        makesound("wrong");

        $(document.body).addClass("game-over");
        setTimeout(function(){
        $(document.body).removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press any key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}