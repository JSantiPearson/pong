var elem = document.getElementById('draw-shapes');
var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 600;
var PADDLE_HEIGHT = 100;
var PADDLE_WIDTH = 20;
var BALL_SIZE = 12;


var PADDLE1_XPOS = 50;
var PADDLE2_XPOS = 500;

var params = { width: 600, height: 400 };
var two = new Two(params).appendTo(elem);

var makeBar = function(player1Y, player2Y){
  var player1 = two.makeRectangle(50, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  player1.fill = 'rgb(43, 209, 255)';
  player1.opacity = 0.75;
  player1.stroke = 'rgb(0, 0, 150)'; // Accepts all valid css color
  player1.linewidth = 5;
  var player2 = two.makeRectangle(500, player2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  player2.fill = 'rgb(255, 61, 61)';
  player2.opacity = 0.75;
  player2.stroke = 'rgb(150, 0, 0)'; // Accepts all valid css color
  player2.linewidth = 5;
}

//should rename to paddl#Y
var player1Y = 100;
var player2Y = 100;
var SPEED = 3;


var ballX = 100;
var ballY = PADDLE_HEIGHT + 52  ;

var ballVelX = SPEED;
var ballVelY = SPEED;


var W = 87;
var S = 83;
var UP = 38;
var DOWN = 40;

// two has convenience methods to create shapes.


// Don't forget to tell two to render everything
// to the screen

var circle;
var drawBall = function(color){
  circle = two.makeCircle(ballX, ballY, BALL_SIZE);

  // The object returned has many stylable properties:
  circle.fill = '#FF8000';

  circle.stroke = 'orangered'; // Accepts all valid css color
  circle.linewidth = 5;
}


drawBall();
two.update();

var drawFrame = function(){

  var frameRect = two.makeRectangle(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);

  frameRect.stroke = 'black';
  frameRect.linewidth = 10;
  // frameRect.opacity = 0.25;


}

var rightActiveCollision = false;
var leftActiveCollision = false;

var ballStateUpdate = function() {

  var ballRight = ballX + BALL_SIZE/2;
  var ballLeft = ballX - BALL_SIZE/2;

var offset = 50;

  var ballTop =    ballY - BALL_SIZE/2;
  var ballBottom = offset + ballY + BALL_SIZE/2;

//TODO preform collision check


if( ballRight > PADDLE2_XPOS - 15 ){

  //TODO end round in favor of P1;
  // System.exit
  throw new Error("PLAYER 1 Won round!");


}

if( ballLeft < PADDLE1_XPOS - 20  ){

  //TODO end round in favor of P2;
  throw new Error("PLAYER 2  Won round!");

}

// console.log("ballBottom: " + ballBottom + "; paddle Top: "+ player2Y + "P2 Y collision: " + ( (ballBottom > player2Y ) && (ballTop < (player2Y + PADDLE_HEIGHT- 55)) ) );

// clear = false;

//if ballRight is inside of paddle 2 && ball is within the height && width of the paddle, then invert it
if(ballRight > PADDLE2_XPOS - 20      && ( (ballBottom > player2Y ) && (ballTop < (player2Y + PADDLE_HEIGHT- 55)) )  && !rightActiveCollision){

//TODO  Right paddle collision – invert direction of ball
ballVelX = -ballVelX;
rightActiveCollision = true;
clear = false;
console.log("Right paddle collision");

}else if(ballRight < PADDLE2_XPOS -21 && rightActiveCollision){
  rightActiveCollision = false;
  clear = true;

}


if(ballLeft < (PADDLE1_XPOS + PADDLE_WIDTH  + 0)    && ( (ballBottom > player1Y ) && (ballTop < (player1Y + PADDLE_HEIGHT- 55)) ) && !leftActiveCollision   ){

//TODO  Left paddle collision – invert direction of ball
ballVelX = -ballVelX;
leftActiveCollision = true;
clear = false;
console.log("Left paddle collision");

}else if(ballLeft > (PADDLE1_XPOS + PADDLE_WIDTH  + 1)  && leftActiveCollision){
  leftActiveCollision = false;
  clear = true;
  console.log("Left paddle collision recoil");

}


//TODO update ball velocity based on collisions

if(ballTop <= 55){

//TODO: invert y velocity
  ballVelY = -ballVelY;

}

if(ballBottom >= CANVAS_HEIGHT-10){

//TODO: invert y velocity
  ballVelY = -ballVelY;

}


ballX += ballVelX;
ballY += ballVelY;

}


var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

// x = 100;
var clear = true;

var gameLoop =  function() {

if(clear){
  two.clear();
  drawFrame();

}
    if (keyState[W] && player1Y > 55){
      player1Y = player1Y - SPEED;
    }
    if (keyState[S] && player1Y+PADDLE_HEIGHT < CANVAS_HEIGHT+45){
      player1Y = player1Y + SPEED;

    }

    if(keyState[UP] && player2Y > 55){
      player2Y = player2Y - SPEED;
    }
    if(keyState[DOWN] && player2Y+PADDLE_HEIGHT < CANVAS_HEIGHT+45){
      player2Y = player2Y + SPEED;
    }


    makeBar(player1Y, player2Y);

    ballStateUpdate();


    drawBall();




    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    two.update();

    setTimeout(gameLoop, 10);
}
gameLoop();
two.update();
