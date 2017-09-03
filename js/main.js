var elem = document.getElementById('draw-shapes');
var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 600;
var PADDLE_HEIGHT = 100;
var params = { width: 600, height: 400 };
var two = new Two(params).appendTo(elem);

var makeBar = function(player1Y, player2Y){
  var player1 = two.makeRectangle(50, player1Y, 20, PADDLE_HEIGHT);
  player1.fill = 'rgb(43, 209, 255)';
  player1.opacity = 0.75;
  player1.stroke = 'rgb(0, 0, 150)'; // Accepts all valid css color
  player1.linewidth = 5;
  var player2 = two.makeRectangle(500, player2Y, 20, PADDLE_HEIGHT);
  player2.fill = 'rgb(255, 61, 61)';
  player2.opacity = 0.75;
  player2.stroke = 'rgb(150, 0, 0)'; // Accepts all valid css color
  player2.linewidth = 5;
}

var player1Y = 100;
var player2Y = 100;
var SPEED = 3;

var W = 87;
var S = 83;
var UP = 38;
var DOWN = 40;

// two has convenience methods to create shapes.


// Don't forget to tell two to render everything
// to the screen


var makeCircle = function(){
  var circle = two.makeCircle(72, 100, 50);

  // The object returned has many stylable properties:
  circle.fill = '#FF8000';
  circle.stroke = 'orangered'; // Accepts all valid css color
  circle.linewidth = 5;
}


makeCircle();
two.update();




var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

// x = 100;

var gameLoop =  function() {
  two.clear();
    if (keyState[W] && player1Y > 55){
      player1Y = player1Y - SPEED;
    }
    if (keyState[S] && player1Y+PADDLE_HEIGHT < CANVAS_HEIGHT+45){
      player1Y = player1Y + SPEED;

    }

    if(keyState[UP]){
      player2Y = player2Y - SPEED;
    }
    if(keyState[DOWN]){
      player2Y = player2Y + SPEED;
    }


    makeBar(player1Y, player2Y);
    // makeBall()


    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    two.update();

    setTimeout(gameLoop, 5);
}
gameLoop();
two.update();
