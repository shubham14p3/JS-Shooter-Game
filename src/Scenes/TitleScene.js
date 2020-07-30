import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
/* eslint-disable no-undef */
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('bg', 'assets/entities/battle_ground_area.png');
  }

  create() {
    this.add.image(600, 300, 'bg');

    this.storyButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 150,
      'blueButton1',
      'blueButton2',
      'Play',
      'StoryScene',
    );

    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 50,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 50,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );

    this.leaderButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 150,
      'blueButton1',
      'blueButton2',
      'Top Scores',
      'LeaderBoardScene',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
