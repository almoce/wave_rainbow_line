import p5 from "p5";
let centerX, centerY;
let pos = [];
let noiseTime = 0;
let noiseTime_2 = 0;
// let startTop = 0;
// let startLeft = 0;
let size = 8;

window.setup = () => {
    createCanvas(window.innerWidth, window.innerHeight);
    centerX = width / 2;
    centerY = height / 2;
    for (var i = 0; i < size; i++) {
        pos.push(createVector(width / (size - 1) * i, 0));
    }
    blendMode(ADD);
    colorMode(HSB, 360, 100, 100, 1);
    background(0);
    // startTop = -200;
    // startLeft = -width;
};
window.draw = () => {
    background(0);
    // background(255);
    // startTop = startTop >= height ? -200: startTop+1;
    // startLeft = startLeft >= width ? -width : startLeft+1;
    let timeJump = map(mouseY, 0, height, 0.0005, 0.01);
    timeJump = 0.001;
    noiseTime += timeJump;
    noiseTime_2 += 0.001;

    let newColor = map(cos(noiseTime), -1, 1, 0, 360);
    let range = constrain(noiseTime_2, 1, 4);
    let centerOffset = map(range, 1, 4, 0, height / 2 - height / range / 2);

    push();
    translate(0, centerOffset);
    noFill();
    stroke(newColor, 100, map(mouseX, 0, width, 5, 100), 0.03);
    beginShape();
    curveVertex(0, noise(noiseTime_2) * height / range);
    for (var i = 0; i < pos.length; i++) {
        let x = pos[i].x;
        let y = noise(noiseTime, i) * height / range;
        curveVertex(x, y);
    }
    curveVertex(width, noise(noiseTime_2) * height / range);
    endShape();
    pop();
};

window.windowResized = () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
};


