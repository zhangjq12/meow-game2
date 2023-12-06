import Phaser from "phaser";
import { eventEmitter } from "../../eventEmitter";
import { globalVariables } from "../game";

export default class Enemy {
  scene;
  zhudou;
  constructor(scene) {
    this.scene = scene;
  }
  create(player, bullets, scoreTextLabel) {
    this.scoreTextLabel = scoreTextLabel;
    this.zhudou = this.scene.physics.add.group({
      key: "zhudou",
      repeat: 12,
      setScale: { x: 0.3, y: 0.3 },
      // setXY: { x: 12, y: 0, stepX: 70 },
    });
    const baseY = 400;
    let iter = 0;

    this.zhudou.children.iterate(function (child) {
      child.setX(Math.floor(Math.random() * 500 + 50));
      child.setY(baseY + iter * 200);
      iter++;
    });

    // this.stars.children.iterate(function (child) {
    //   child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   // child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.setCollideWorldBounds(true);
    // });

    // this.scene.physics.add.collider(this.stars, platforms);
    // for (let i = 0; i < questions.length; i++) {
    //   this.scene.physics.add.collider(
    //     this.stars,
    //     questions[i],
    //     (star, question) => {
    //       this.collideQuestion(star, question);
    //     }
    //   );
    // }
    this.scene.physics.add.overlap(
      bullets,
      this.zhudou,
      (bullets, zhudou) => {
        this.collectZhudou(bullets, zhudou);
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      player,
      this.zhudou,
      (player, zhudou) => {
        this.gameover(player, zhudou);
      },
      null,
      this
    );
  }

  collectZhudou(bullets, star) {
    bullets.setActive(false);
    bullets.setVisible(false);
    star.disableBody(true, true);
    globalVariables.totalScore += 10;
    this.scoreTextLabel.setText("爱星得分: " + globalVariables.totalScore);
    if (globalVariables.totalScore === 120) {
      this.scene.scene.pause();
      eventEmitter.emit("photo");
    }
    // if (this.stars.countActive(true) === 0) {
    //   this.stars.children.iterate(function (child) {
    //     child.enableBody(true, child.x, 0, true, true);
    //     child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //   });
    // }
  }

  gameover(_player, _zhudou) {
    this.scene.scene.pause();
    eventEmitter.emit("fail");
  }
}
