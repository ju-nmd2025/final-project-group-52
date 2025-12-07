// sketch.js
import { Game } from "./game.js";

let game;

window.setup = function () {
  // You can change size if you want, but 400x600 is nice for Doodle Jump
  createCanvas(400, 600);
  game = new Game();
};

window.draw = function () {
  game.update();
  game.draw();
};

window.keyPressed = function () {
  game.handleKeyPressed(keyCode);
};

window.keyReleased = function () {
  game.handleKeyReleased(keyCode);
};
