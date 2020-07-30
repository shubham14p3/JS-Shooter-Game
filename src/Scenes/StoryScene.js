import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import Dom from '../Objects/dom';
// eslint-disable-next-line no-undef
export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene');
  }

  preload() {
    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(600, 300, 'bg');

    const div = Dom.createStory();

    this.add.dom(
      this.game.config.width + 50,
      this.game.config.hight * 0.5,
      div,
    );

    this.playButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );
  }
}
