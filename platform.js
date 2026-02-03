
class Platform {
  constructor(x, y, w = 80, h = 15) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // Moves the platform vertically
  update(offsetY) {
    this.y += offsetY;
  }

  //safety placeholder, allows to call extraUpdate() on every platform in a loop without the game crashing
  extraUpdate() {}

  // drwa the standard plattform
  draw() {
    rectMode(CORNER);
    fill(120, 240, 120);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  // Main logic to check if the player landed on the platform from above
  collidesWith(player) {
    // Only register a landing if the player is moving downwards
    const isFallingDown = player.vy > 0;

    // defines the players boundries (hitbox) for easier collision calculations
    const playerBottom = player.y + player.h;
    const playerTop = player.y;
    const playerLeft = player.x;
    const playerRight = player.x + player.w;

    // Checks if player is horizontally aligned and was above the platform in the last frame
    const withinX = playerRight > this.x && playerLeft < this.x + this.w;
    const feetAbovePlatformLastFrame = playerBottom - player.vy <= this.y;
    const feetNowOnPlatform = playerBottom >= this.y && playerBottom <= this.y + this.h;

    return isFallingDown && withinX && feetAbovePlatformLastFrame && feetNowOnPlatform;
  }

  // Checks if the platform has fallen off the bottom of the screen
  isGone() {
    return this.y > height + 50;
  }
}

// standard platform with no special movement or behavior
class NormalPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
  }
}

// platform that slides horizontally and bounces off walls
class MovingPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
    // Picks a random starting speed and direction
    this.speedX = random(1, 2.5) * (random() < 0.5 ? -1 : 1);
  }

  // Handles the left to right movement logic
  extraUpdate() {
    this.x += this.speedX;
    
    // Check for screen boundary collisions
    if (this.x < 0 || this.x + this.w > width) {
      this.speedX *= -1; // Bounce back
    }
  }

  // draws the moving platform with a blue color
  draw() {
    rectMode(CORNER);
    fill(120, 180, 255);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}

// platform that breaks and falls away when stepped on
class BreakingPlatform extends Platform {
  constructor(x, y) {
    super(x, y);
    this.isBroken = false;
    this.fallSpeed = 3;
  }

  // Triggers the breaking state
  break() {
    this.isBroken = true;
  }

  // falling animation once the platform is broken
  extraUpdate() {
    if (this.isBroken) {
      this.y += this.fallSpeed;
      this.fallSpeed += 0.2; // Gravity effect strength
    }
  }

  // Stops collisions if the platform is already broken
  collidesWith(player) {
    if (this.isBroken) return false;
    return super.collidesWith(player);
  }

  // Draws a red platform, draws it in two pieces if broken
  draw() {
    rectMode(CORNER);
    if (!this.isBroken) {
      fill(255, 140, 140);
      rect(this.x, this.y, this.w, this.h, 5);
    } else {
      fill(180, 80, 80);
      // Splits the platform visually into two broken pieces
      rect(this.x, this.y, this.w / 2 - 2, this.h, 3);
      rect(this.x + this.w / 2 + 2, this.y, this.w / 2 - 2, this.h, 3);
    }
  }
}

export { NormalPlatform, MovingPlatform, BreakingPlatform };
