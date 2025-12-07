import Character from "./character.js";
import { NormalPlatform, MovingPlatform, BreakingPlatform } from "./platform.js";


class Game {
  constructor() {
    this.player = null;        // Character instance
    this.platforms = [];       // array of platforms
    this.score = 0;
    this.state = "start";      // "start", "playing", "gameover"
    this.bestScore = 0;
  }

  
  startNewRun() {
    // Use your Character class instead of Player
    this.player = new Character(width / 2 - 20, height - 100, 40, 40);
    this.platforms = [];
    this.score = 0;

    const platformCount = 10;
    const spacing = height / platformCount;

    for (let i = 0; i < platformCount; i++) {
      const x = random(40, width - 120);
      const y = height - i * spacing;
      this.platforms.push(this._createRandomPlatform(x, y, i === 0));
    }
  }

  // create random type of platform
  _createRandomPlatform(x, y, forceNormal = false) {
    if (forceNormal) {
      return new NormalPlatform(x, y);
    }

    const r = random();

    if (r < 0.6) {
      return new NormalPlatform(x, y);      // 60% normal
    } else if (r < 0.85) {
      return new MovingPlatform(x, y);      // 25% moving
    } else {
      return new BreakingPlatform(x, y);    // 15% breaking
    }
  }

  update() {
    if (this.state !== "playing") return;

    this.player.update();

    // camera scrolling upwards
    const cameraThreshold = height * 0.4;
    let offsetY = 0;

    if (this.player.y < cameraThreshold) {
      offsetY = cameraThreshold - this.player.y;
      this.player.y = cameraThreshold;

      this.score += offsetY;

      // scroll platforms down
      for (let p of this.platforms) {
        p.update(offsetY);
      }
    }

    // extra behaviour (moving + breaking fall)
    for (let p of this.platforms) {
      p.extraUpdate();
    }

    // collisions
    for (let p of this.platforms) {
      if (p.collidesWith(this.player)) {
        this.player.jump();
        if (p instanceof BreakingPlatform) {
          p.break();
        }
      }
    }

    // remove off-screen platforms
    this.platforms = this.platforms.filter(p => !p.isGone());

    // spawn new platforms
    while (this.platforms.length < 12) {
      const highestY = Math.min(...this.platforms.map(p => p.y));
      const newY = highestY - random(60, 100);
      const newX = random(30, width - 110);
      this.platforms.push(this._createRandomPlatform(newX, newY));
    }

    // game over
    if (this.player.y > height) {
      this.state = "gameover";
      this.bestScore = max(this.bestScore, floor(this.score));
    }
  }

  draw() {
    background(160, 210, 255);

    if (this.state === "start") {
      this.drawStartScreen();
    } else if (this.state === "playing") {
      this.drawGamePlay();
    } else if (this.state === "gameover") {
      this.drawGamePlay();
      this.drawGameOverScreen();
    }
  }

  drawGamePlay() {
    // draw platforms
    for (let p of this.platforms) {
      p.draw();
    }

    // draw player
    this.player.draw();

    // UI
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text("Score: " + floor(this.score), 10, 10);
    text("Best: " + this.bestScore, 10, 30);
  }

  drawStartScreen() {
    noStroke();
    fill(255, 255, 255, 80);
    ellipse(80, 100, 80, 40);
    ellipse(130, 120, 100, 50);
    ellipse(300, 80, 100, 40);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("DOODLE JUMP", width / 2, height / 2 - 40);

    textSize(18);
    text("Use ← → or A/D to move", width / 2, height / 2 + 10);
    text("Press SPACE or ENTER to start", width / 2, height / 2 + 40);
  }

  drawGameOverScreen() {
    fill(0, 0, 0, 160);
    rectMode(CORNER);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("GAME OVER", width / 2, height / 2 - 40);

    textSize(18);
    text("Score: " + floor(this.score), width / 2, height / 2);
    text("Best: " + this.bestScore, width / 2, height / 2 + 30);

    textSize(16);
    text("Press R or ENTER to play again", width / 2, height / 2 + 70);
  }

  handleKeyPressed(keyCode) {
    if (this.state === "start") {
      if (keyCode === 32 || keyCode === ENTER) { // SPACE or ENTER
        this.startNewRun();
        this.state = "playing";
      }
      return;
    }

    if (this.state === "gameover") {
      if (keyCode === 82 || keyCode === ENTER) { // R or ENTER
        this.startNewRun();
        this.state = "playing";
      }
      return;
    }

    // playing
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      this.player.moveLeft = true;
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      this.player.moveRight = true;
    }
  }

  handleKeyReleased(keyCode) {
    if (this.state !== "playing") return;

    if (keyCode === LEFT_ARROW || keyCode === 65) {
      this.player.moveLeft = false;
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      this.player.moveRight = false;
    }
  }
}

//p5 integration

let game;

function setup() {
  createCanvas(400, 600);
  game = new Game();
}

function draw() {
  game.update();
  game.draw();
}

function keyPressed() {
  game.handleKeyPressed(keyCode);
}

function keyReleased() {
  game.handleKeyReleased(keyCode);
}

export { Game };
