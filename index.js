
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence(){
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
    makesound(userChosenColour);
    animatePress(userChosenColour);
    nextSequence();
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
