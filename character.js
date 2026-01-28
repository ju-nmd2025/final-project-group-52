
export default class Character {
  // characters initial position, size, movement properties
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // starting velocity
    this.vx = 0;
    this.vy = 0;

    // Physics constants
    this.gravity = 0.5;
    this.jumpStrength = -11;

    // tracks which movement keys are currently pressed
    this.moveLeft = false;
    this.moveRight = false;
  }

  // physics, input detection, and screen wrapping every frame
  update() {
    const speed = 4;
    // Determine horizontal velocity based on user input
    if (this.moveLeft && !this.moveRight) this.vx = -speed;
    else if (this.moveRight && !this.moveLeft) this.vx = speed;
    else this.vx = 0;

    // gravity to vertical speed and update position
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // horizontal wrap, if player goes off one side they appear on the other
    if (this.x > width) this.x = -this.w;
    if (this.x + this.w < 0) this.x = width;
  }

  // resets thr vertical speed to launch character up
  jump() {
    this.vy = this.jumpStrength;
  }

  // dwras the character
  draw() {
    rectMode(CORNER);
    fill(255, 230, 80);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}
