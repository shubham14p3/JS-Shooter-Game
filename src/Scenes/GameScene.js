import 'phaser';
import { Player, Beerus, Picolo } from '../Objects/Entities';
import LocalStorage from '../Objects/localStorage';

let scoreText;
/* eslint-disable no-undef */
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('bg', 'assets/entities/battle_ground_area.png');

    this.load.spritesheet('de', 'assets/entities/friza.png', {
      frameWidth: 32,
      frameHeight: 49,
    });

    this.load.image('beerus', 'assets/entities/beerus.png');

    this.load.image('ak', 'assets/entities/ak.png');
    this.load.image('ex', 'assets/entities/ex.png');
    this.load.image('pt', 'assets/entities/pt.png');
    this.load.image('ep', 'assets/entities/picolo.png');

    this.load.spritesheet('hp', 'assets/entities/goku.png', {
      frameWidth: 32,
      frameHeight: 49,
    });
  }

  create() {
    let score = 0;
    this.add.image(600, 300, 'bg');

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.anims.create({
      key: 'hp',
      frames: this.anims.generateFrameNumbers('hp'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'de',
      frames: this.anims.generateFrameNumbers('de'),
      frameRate: 20,
      repeat: -1,
    });

    this.player = new Player(
      this,
      this.game.config.height * 0.05,
      this.game.config.height * 0.5,
      'hp',
    );
    this.player.setScale(1.5);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.expeliarmus = this.add.group();
    this.expectopatronum = this.add.group();
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.enemies.getChildren().length < 6) {
            enemy = new Picolo(
              this,
              this.game.config.width * 0.9,
              this.game.config.height * 0.5,
            );
          }
        } else if (this.getEnemiesByType('ChaserShip').length < 15) {
          enemy = new Beerus(
            this,
            this.game.config.width * 0.95,
            this.game.config.height * Math.random(),
          );
        }

        if (enemy !== null) {
          enemy.setScale(1.5);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.expeliarmus,
      this.enemies,
      (expeliarmus, enemy) => {
        if (enemy) {
          if (enemy.getData('type') === 'GunShip') {
            enemy.wandless(true);
            enemy.onDestroy();
            expeliarmus.destroy();
            score += 15;
            scoreText.setText(`Score: ${score}`);
            LocalStorage.saveLocalStorage(score);
          } else {
            expeliarmus.destroy();
          }
        }
      },
    );

    this.physics.add.collider(
      this.expectopatronum,
      this.enemies,
      (expectopatronum, enemy) => {
        if (enemy) {
          if (enemy.getData('type') === 'ChaserShip') {
            enemy.wandless(true);
            enemy.onDestroy();
            expectopatronum.destroy();
            score += 10;
            scoreText.setText(`Score: ${score}`);
            LocalStorage.saveLocalStorage(score);
          } else {
            expectopatronum.destroy();
          }
        }
      },
    );

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.wandless(true);
        player.onDestroy();
        enemy.wandless(true);
        enemy.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.wandless(true);
        laser.destroy();
        player.onDestroy();
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    this.player.update();

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keyJ.isDown) {
        this.player.setData('isShootingExpeliarmus', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShootingExpeliarmus', false);
      }

      if (this.keyI.isDown) {
        this.player.setData('isShootingExpectoPatronum', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShootingExpectoPatronum', false);
      }
    }

    this.removeEntities(this.enemyLasers);
    this.removeEntities(this.enemies);
    this.removeEntities(this.expeliarmus);
    this.removeEntities(this.expectopatronum);
  }

  removeEntities(entities) {
    for (let i = 0; i < entities.getChildren().length; i += 1) {
      const entity = entities.getChildren()[i];
      entity.update();

      if (
        entity.x < -entity.displayWidth
        || entity.x > this.game.config.width + entity.displayWidth
        || entity.y < -entity.displayHeight * 4
        || entity.y > this.game.config.height + entity.displayHeight
      ) {
        if (entity) {
          entity.destroy();
        }
      }
    }
  }
}
