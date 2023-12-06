import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Image {
  base = 1;
  distance = -800;
  lastY = 0;
  frequency = 1000;
  damage = 10;

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
    if (this.y - this.lastY < this.distance) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  changeSpeed(ratio) {
    this.speed += this.base * ratio;
  }

  changeDistance(distance) {
    this.distance = distance;
  }

  changeFrequency(freq) {
    this.frequency = freq;
  }

  changeDamage(damage) {
    this.damage = damage;
  }

  getDistance() {
    return this.distance;
  }

  getFrequency() {
    return this.frequency;
  }

  getDamage() {
    return this.damage;
  }
}
