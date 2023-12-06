export const controllerInit = (scene) => {
  const cursors = scene.input.keyboard.createCursorKeys();
  return cursors;
};

export const controllerUpdate = (cursors, player) => {
  if (cursors.left.isDown) {
    player.setVelocityX(-460);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(460);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  // if (cursors.space.isDown && player.body.touching.down) {
  //   player.setVelocityY(-660);
  // }
};

export const autoMove = (player, speed = 1, cameras) => {
  if (cameras.main.scrollY > 0) {
    player.setVelocityY(-100 * speed);
  } else {
    player.setVelocityY(0);
  }
};

export const autoShoot = (player, bullets, time, lastfired) => {
  if (time > lastfired) {
    const bullet = bullets.get();
    if (bullet) {
      bullet.fire(player.x, player.y);
      return time + bullet.getFrequency();
    }
  }

  return lastfired;
};
