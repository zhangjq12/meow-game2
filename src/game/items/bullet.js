import Phaser from "phaser";
import { globalVariables } from "../game";

export default class Bullet extends Phaser.GameObjects.Image {
  base = 1;
  lastY = 0;

  constructor(scene) {
    super(scene, 0, 0, "roseblue");
    this.setScale(0.05, 0.05);

    this.speed = Phaser.Math.GetSpeed(400, 1);
  }

  fire(x, y) {
    this.setPosition(x, y - 50);
    this.lastY = y - 50;

    this.setActive(true);
    this.setVisible(true);
  }

  update(time, delta) {
    this.y -= this.speed * delta;
    if (this.y - this.lastY < globalVariables.distance) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
