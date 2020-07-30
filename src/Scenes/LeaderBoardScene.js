import 'phaser';
import config from '../Config/config';
import API from '../Objects/api';
import Button from '../Objects/Button';
/* eslint-disable no-undef */
export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoardScene');
  }

  preload() {
    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(600, 300, 'bg');
    API.getScores().then((response) => {
      const sortedResponse = response.result.sort((a, b) => b.score - a.score);
      let namesToDisplay = '';

      for (let i = 0; i < 7; i += 1) {
        namesToDisplay += `${i + 1}. ${sortedResponse[i].user}: ${
          sortedResponse[i].score
        }\n\n`;
        if (i === sortedResponse.length - 1) {
          break;
        }
      }

      this.creditsText = this.add.text(0, 0, 'Top Scores', {
        fontSize: '32px',
        fill: '#fff',
      });
      this.madeByText = this.add.text(0, 0, namesToDisplay, {
        fontSize: '26px',
        fill: '#fff',
      });
      this.zone = this.add.zone(
        config.width / 2,
        config.height / 2,
        config.width,
        config.height,
      );
      Phaser.Display.Align.In.Center(this.creditsText, this.zone);
      Phaser.Display.Align.In.Center(this.madeByText, this.zone);

      this.creditsText.setY(20);
      this.madeByText.setY(80);
    });

    this.titleButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );
  }
}
