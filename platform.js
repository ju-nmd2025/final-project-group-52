// platform.js
class Platform {
  constructor(x, y, w = 80, h = 15) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update(offsetY) {
    this.y += offsetY;
  }

  extraUpdate() {
    // default: do nothing
  }

  draw() {
    rectMode(CORNER);
    fill(120, 240, 120);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  collidesWith(player) {
    const isFallingDown = player.vy > 0;

    const playerBottom = player.y + player.h;
    const playerTop = player.y;
    const playerLeft = player.x;
    const playerRight = player.x + player.w;

    const withinX = playerRight > this.x && playerLeft < this.x + this.w;
    const feetAbovePlatformLastFrame = playerBottom - player.vy <= this.y;
    const feetNowOnPlatform =
      playerBottom >= this.y && playerBottom <= this.y + this.h;

    return isFallingDown && withinX && feetAbovePlatformLastFrame && feetNowOnPlatform;
  }

  isGone() {
    return this.y > height + 50;
  }
}

class NormalPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
  }
}

class MovingPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
    this.speedX = random(1, 2.5) * (random() < 0.5 ? -1 : 1);
  }

  extraUpdate() {
    this.x += this.speedX;
    if (this.x < 0 || this.x + this.w > width) {
      this.speedX *= -1;
    }
  }

  draw() {
    rectMode(CORNER);
    fill(120, 180, 255);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}

class BreakingPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
    this.isBroken = false;
    this.fallSpeed = 3;
  }

  break() {
    this.isBroken = true;
  }

  extraUpdate() {
    if (this.isBroken) {
      this.y += this.fallSpeed;
      this.fallSpeed += 0.2;
    }
  }

  collidesWith(player) {
    if (this.isBroken) return false;
    return super.collidesWith(player);
  }

  draw() {
    rectMode(CORNER);
    if (!this.isBroken) {
      fill(255, 140, 140);
      rect(this.x, this.y, this.w, this.h, 5);
    } else {
      fill(180, 80, 80);
      rect(this.x, this.y, this.w / 2 - 2, this.h, 3);
      rect(this.x + this.w / 2 + 2, this.y, this.w / 2 - 2, this.h, 3);
    }
  }
}

export { NormalPlatform, MovingPlatform, BreakingPlatform };
