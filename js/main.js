var elem = document.getElementById('draw-shapes');
var params = { width: 600, height: 400 };
var two = new Two(params).appendTo(elem);

var makeBar = function(player1Y, player2Y){
  var player1 = two.makeRectangle(213, player1Y, 100, 100);
//  var player2 = two.makeRectangle(213, player2Y, 100, 100);
  player1.fill = 'rgb(0, 200, 255)';
  player1.opacity = 0.75;
  player1.stroke = 'blue'; // Accepts all valid css color
  player1.linewidth = 5;
  // player2.fill = 'rgb(0, 200, 255)';
  // player2.opacity = 0.75;
  // player2.stroke = 'blue'; // Accepts all valid css color
  // player2.linewidth = 5;
}

var player1Y = 100;
// var player2Y = 100;

var W = 87;
var S = 83;
var UP = 38;
var DOWN = 40;

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);

window.onkeydown = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == W) {
      player1Y = player1Y-10;
       makeBar(player1Y);
   }else if (key == S) {
     player1Y = player1Y+10;
       makeBar(player1Y);
   }
      two.update();
}

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

// Don't forget to tell two to render everything
// to the screen
two.update();
