// character.js
export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = 0;
    this.vy = 0;

    this.gravity = 0.5;
    this.jumpStrength = -11;

    this.moveLeft = false;
    this.moveRight = false;
  }

  update() {
    const speed = 4;
    if (this.moveLeft && !this.moveRight) this.vx = -speed;
    else if (this.moveRight && !this.moveLeft) this.vx = speed;
    else this.vx = 0;

    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // horizontal wrap
    if (this.x > width) this.x = -this.w;
    if (this.x + this.w < 0) this.x = width;
  }

  jump() {
    this.vy = this.jumpStrength;
  }

  draw() {
    rectMode(CORNER);
    fill(255, 230, 80);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}
