import p5 from "p5";
import Point from "./point"

let centerX, centerY;
let allPoints = [];
let color = true;
let posX, posY;

window.setup = () => {
	createCanvas(window.innerWidth, window.innerHeight);
	centerX = width / 2;
	centerY = height / 2;
	background(0);
	// frameRate(5);
	for (var i = 0; i < 20; i++) {
		color = !color;
		allPoints.push(new Point(centerX,centerY, 200, color, i))
	}
	posX = centerX;
	posY = centerY;

};
window.draw = () => {
	if(frameCount%120 == 0){
		posX = random(width);
		posY = random(height);		
	}

	for (var i = 0; i < allPoints.length; i++) {
		allPoints[i].move(posX, posY)
	}
};

window.windowResized = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
};
