var potatoBackground;
var potato;
var potatoText;
var isPotato;
var countdown;
var totalTime;
var bestTime;

function setup() {
	createCanvas(800, 600);
	potatoBackground = loadImage("assets/background.png");
	potato = loadImage("assets/potato.png");
	textFont("Gloria Hallelujah");
	textSize(32);
	potatoText = "Click the potato to start being a potato";
	isPotato = false;
	bestTime = 0;
}

function draw() {
	if (potatoIsHovered()) {
		cursor(HAND);
	} else {
		cursor(ARROW);
	}

	if (isPotato) {
		deltaTime = 1 / frameRate();
		totalTime += deltaTime;
		countdown -= deltaTime;
		if (countdown <= 0) {
			isPotato = false;
			document.getElementById("music").pause();
			if (totalTime > bestTime) {
				bestTime = totalTime;
			}
			potatoText = "You were a potato for " + Math.trunc(totalTime) + " seconds";
			potatoText += "\nYour best time is " + Math.trunc(bestTime) + " seconds";
			potatoText += "\nClick the potato to try again";
		} else {
			potatoText = "You will stop being a potato in " + Math.trunc(countdown) + " seconds";
			potatoText += "\nClick the potato to focus on being a potato";
		}
	}

	image(potatoBackground, 0, 0);
	text(potatoText, 50, 450);
}

function mousePressed() {
	if (potatoIsHovered()) {
		if (!isPotato) {
			isPotato = true;
			totalTime = 0;
			document.getElementById("music").play();
		}
		countdown = random(10, 60);
	}
}

function potatoIsHovered() {
	return mouseX > 0 && mouseX < width &&
		mouseY > 0 && mouseY < height &&
		potato.get(mouseX, mouseY)[3] > 0;
}
