
import { Game } from "./game.js";

let game;

// Runs once when the program starts to set up the game
window.setup = function () {
  createCanvas(400, 600);
  game = new Game();
};

// runs to update and show the game
window.draw = function () {
  game.update();
  game.draw();
};

// listens for when you press a key
window.keyPressed = function () {
  game.handleKeyPressed(keyCode);
};

// listens for when you release a key
window.keyReleased = function () {
  game.handleKeyReleased(keyCode);
};
