var watch; // the watch table
var c = document.getElementById("myCanvas"); // the canvas object
var heightTo255 = 355 / c.height;
var ctx = c.getContext("2d"); // the canvas' drawing context
var x1 = 0; // the line's starting point's horizontal coordinate
var y1 = 0; // the line's starting point's vertical coordinate
var x2 = c.width; // // the line's ending point's horizontal coordinate
var y2 = 0; // the line's ending point's vertical coordinate
var y2v = 1; // the current vertical velocity of y2 (unit: px/update)
var interval = 10; // how frequently we will update the position
var mouseDown = false; // is the mouse button pressed
var circleRadius = 5;
var hue;

// Prepare all the variable watches
function prepareWatch() {
	watch = new Watch("canvasWatch");
	watch.add("x");
	watch.add("y");
	watch.add("hue");
	watch.updateWithBackgroundColor = function(name, value) {
		var tdValue = document.getElementById(this.name + "." + name); // Find the right table cell
		tdValue.innerHTML = value;
		tdValue.style.backgroundColor = "hsl(" + value + ", 100%, 50%)"; // Put the value in the cell
	}
}


// Update all the values in the watch table
function updateWatch() {
	watch.update("x", x1);
	watch.update("y", y1);
	watch.updateWithBackgroundColor("hue", hue);
}

// Redraw the image
function redraw() {
	function drawLine() {
		ctx.fillStyle = "black";
		ctx.beginPath(); // Reset the previous line drawing settings
		ctx.moveTo(x1,y1); // Select starting point
		ctx.lineTo(x2,y2); // Draw a line to the ending point
		ctx.stroke();
	}
	function drawCircle() {
		ctx.beginPath();
		ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
		ctx.arc(x1, y1, circleRadius, 0, 2*Math.PI);
		ctx.fill();
	}
	// ctx.fillStyle = "rgba(255,255,255,0.05)"; // Set the canvas fill color to white with just 10% opacity
	// ctx.fillRect(0,0,c.width,c.height); // Fill the canvas
	// drawLine();
	if (mouseDown) {
		drawCircle();
		circleRadius += 0.1;
	}
}

// Change the position of the Y2 and refresh the canvas
function animateY2() {
	// Calculate the new value of Y2 
	function getNewY2() {
		var newY2 = y2 + y2v; // Calculate the new value of Y2 based on the current velocity
		if ((newY2 < 0) || (newY2 >= c.height)) { // If the new value exceeds the canvas:
			y2v = -y2v; // Invert the velocity
			newY2 = y2 + y2v; // Discard the previous result and recalculate the position
		}
		hue = Math.round(y2 * (heightTo255));
		return newY2; // Return the new Y2 coordinate
	}
	// Main code of animate()
	y2 = getNewY2();
	redraw();
	updateWatch();
}

// Event handler for onmousemove
function updateX1Y1(event) {
	x1 = event.pageX - c.offsetLeft;
	y1 = event.pageY - c.offsetTop;
}

// Event handler for onmousedown
function onMouseDown(event) {
	mouseDown = true;
	lastEvent = event;
}

// Event handler for onmouseup
function onMouseUp(event) {
	mouseDown = false;
	circleRadius = 5;
}

prepareWatch();
setInterval(animateY2, interval);
c.addEventListener("mousemove", updateX1Y1, false);
c.addEventListener("mousedown", onMouseDown, false);
c.addEventListener("mouseup", onMouseUp, false);