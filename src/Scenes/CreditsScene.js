import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  preload() {
    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(600, 300, 'bg');
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, 'Created By: Shubham Raj', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    this.titleButton = new Button(
      this,
      config.width / 2,
      1000,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );
    Phaser.Display.Align.In.Center(this.creditsText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.madeByTween = this.tweens.add({
      targets: this.titleButton,
      y: 250,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {},
    });
  }
}
