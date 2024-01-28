
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("keypress",function(){
       
    if(!started){
    
    $("h1").text("Level "+level);
    
    nextSequence(); 

    started =true;
    }
    
});



function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        $("h1").text("Game Over, Press Any Key to Restart");

        started=false;
        gamePattern=[];
        userClickedPattern=[];
        level=0;

    }

}



$(".btn").on("click",function(){

    if(started){
    var userChosenColor= this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    makeSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    }

});

function nextSequence(){

    userClickedPattern=[];
    level++;

    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor  = buttonColors[randomNumber];

    makeSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);



}

function makeSound(color){

    var audio= new Audio("sounds/"+color+".mp3");
    audio.play();

}

function animatePress(color){

    $("#"+color).addClass("pressed");

    setTimeout(function(){
    
        $("#"+color).removeClass("pressed");
    },100);
}

