import Button from '../Objects/Button';
import config from '../Config/config';
import API from '../Objects/api';
import Dom from '../Objects/dom';
import LocalStorage from '../Objects/localStorage';
/* eslint-disable no-undef */
export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('bg', 'assets/entities/logo-big.png');
    // eslint-disable-next-line no-unused-expressions
    API;
  }

  create() {
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.W);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.S);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.A);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.D);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.J);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.I);

    this.input.keyboard.enabled = false;
    this.input.keyboard.preventDefault = false;

    this.add.image(600, 300, 'bg');

    const score = LocalStorage.readLocalStorage();
    LocalStorage.clearLocalStorage();

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.gameButton = new Button(
      this,
      config.width / 4,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play Again',
      'Game',
    );

    this.title = this.add.text(
      this.game.config.width * 0.75,
      200,
      `Your score is: ${score}`,
      {
        fontFamily: 'monospace',
        fontSize: 32,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);

    const div = Dom.createForm();
    this.add.dom(this.game.config.width * 0.7, 250, div);

    Dom.addButtonFunctionality(score);

    this.submitButton = new Button(
      this,
      config.width / 4,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits',
    );
  }
}
