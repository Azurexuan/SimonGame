var colorSet=["green","red","yellow","blue"];
var getPattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level;
var bestScore=0;


$(document).keydown(mainGame);

function mainGame(){
    if (gameStarted==false){
        $("body").removeClass("game-over");
        gameStarted=true;
        getPattern=[];
        level=0;
        nextSequence();

    }
}

//检查答案是否正确
function checkAnswer(inputNum){
    if (userClickedPattern[inputNum-1]==getPattern[inputNum-1]){
        console.log("success");
    }
    else {
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        gameStarted=false;
        setTimeout(function(){
            $("h1").text("Game over. Press any key to restart.")
        },200);

    }
}

//generate next sequence in a certain pattern
function nextSequence(){
    if(level>bestScore){
        bestScore=level;
        $("#best-score").text("Best Score: "+bestScore);
    }
    level++;
    $("h1").text("Level "+level);

    var num= Math.floor( Math.random()*4);
    getPattern.push(colorSet[num]);

    var lastButtonInPattern=getPattern[getPattern.length-1];
    playSound(lastButtonInPattern);
    autoPlayAnimation(lastButtonInPattern);

    userClickedPattern=[];//每次加入了新的图案，用户需要从头输入
}





//the user press the button
$(".btn").on("click",function(){
        var userChosenColor=$(this).attr('id');
        
        
        userClickAnimation(userChosenColor);
        userClickedPattern.push(userChosenColor);

        var inputNum=userClickedPattern.length;
        
        if (inputNum<level){
            checkAnswer(inputNum);
            if (gameStarted==true){
                playSound(userChosenColor);
            }
        }
        else if (inputNum=level){
            checkAnswer(inputNum);
            if (gameStarted==true){
                playSound(userChosenColor);
                setTimeout(nextSequence,1000);
            }
        }
        
        
})

//按钮声音
function playSound(name){
    mySound = new Audio("sounds/"+name+".mp3");//play sound
    mySound.play();

}

//自动播放的按钮动画
function autoPlayAnimation(name){
    $("#"+name).fadeOut(100).fadeIn(100);//the button flashes
}

//用户点击的按钮动画
function userClickAnimation(name){//the button flashes
    $("#"+name).addClass("pressed");//注意addClass后面的类别名不要加. (踩坑好久才发现)
    setTimeout(function() { $("#"+name).removeClass("pressed")}, 200);
}