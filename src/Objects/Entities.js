/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('wandless', false);
    this.setData('isDead', false);
  }

  wandless() {
    if (!this.getData('isDead') && !this.getData('wandless')) {
      this.setTint(0x00b3ff);

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(300, 300);

      this.setData('isDead', true);
    }
  }

  petrified() {
    const possibility = this.wandless ? 10 : Math.round(Math.random() * 10);

    if (possibility >= 7) {
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.destroy();
      this.setData('isDead', true);
    }
  }
}

export class Expeliarmus extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ex');
    this.body.velocity.x = 200;
  }
}

export class ExpectoPatronum extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ep');
    this.body.velocity.x = 200;
  }
}

export class AvadaKedavra extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ak');
    this.body.velocity.x = -200;
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);
    this.play('hp');

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShootingExpeliarmus')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const expeliarmus = new Expeliarmus(this.scene, this.x, this.y);
        this.scene.expeliarmus.add(expeliarmus);
        this.setData('timerShootTick', 0);
      }
    }

    if (this.getData('isShootingExpectoPatronum')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const expectopatronum = new ExpectoPatronum(this.scene, this.x, this.y);
        this.scene.expectopatronum.add(expectopatronum);

        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export class Dementor extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'dementor', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      this.state = this.states.CHASE;

      if (this.state === this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    }
  }

  onDestroy() {
    this.destroy();
    this.setData('isDead', true);
  }
}

export class DeathEater extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'de', 'GunShip');
    this.play('de');
    this.body.velocity.y = Phaser.Math.Between(50, 200);
    this.body.immovable = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback() {
        const laser = new AvadaKedavra(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (
      !this.getData('isDead')
      && this.scene !== undefined
      && this.scene.player
    ) {
      if (this.y > this.scene.player.y) {
        this.body.velocity.y = this.body.velocity.y < 0
          ? this.body.velocity.y
          : this.body.velocity.y * -1;
      } else {
        this.body.velocity.y = Math.abs(this.body.velocity.y);
      }
    }
  }
}
