import Phaser from "phaser";
import logoImg from "./assets/logo.png";

import Intro from './assets/scenes/Intro.js';
import Level1 from './assets/scenes/Level1.js';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 400,
  scene: [Intro, Level1],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 500
      }
    }
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
