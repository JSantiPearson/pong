var elem = document.getElementById('draw-shapes');
var params = { width: 600, height: 600 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);
var recta = two.makeRectangle(275, 150, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.stroke = 'blue'; // Accepts all valid css color
rect.linewidth = 5;

recta.fill = 'rgb(0, 200, 255)';
recta.opacity = 0.75;
recta.stroke = 'blue'; // Accepts all valid css color
recta.linewidth = 5;

// Don't forget to tell two to render everything
// to the screen
two.update();
