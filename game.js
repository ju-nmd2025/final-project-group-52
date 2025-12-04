import Platform from "./platform.js";
import Character from "./character.js";

// Canvas size and game variables
let canvasWidth = 400;
let canvasHeight = 400;
let floor = 300;

let character;
let platform;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // Create the character and a single platform
    character = new Character(50, 50, 50, 50);   
    platform  = new Platform(300, 260, 100, 20); 
}

// Obstacle / Spike / Death
function drawObstacle() {
    push();
    fill("red");
    triangle(180, 300, 210, 240, 240, 300);
    pop();
}

function draw() {
    background(100, 100, 100);

    // Draw character and platform
    character.draw();
    platform.draw();
   

    // Move the platform to the left
    platform.x -= 4;
    if (platform.x + platform.w < 0) {
        platform.x = canvasWidth + 100; // reset off screen to the right
    }

    // Gravity, character falls if above floor and not colliding with platform
    if (
        character.y + character.h < floor &&
        !character.isColliding(character, platform)
    ) {
        character.y += 5;
    }

    // Floor
    line(0, floor, canvasWidth, floor);
}

function keyPressed() {
    // Simple jump, only jump if standing on floor or on platform
    if (
        character.y + character.h === floor ||
        character.isColliding(character, platform)
    ) {
        character.y -= 120;
    }
}
