import 'phaser';
import './stylesheet/style.css';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import SceneGameOver from './Scenes/SceneGameOver';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import StoryScene from './Scenes/StoryScene';
import Model from './Model';

// eslint-disable-next-line no-undef
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LeaderBoardScene', LeaderBoardScene);
    this.scene.add('Game', GameScene);
    this.scene.add('SceneGameOver', SceneGameOver);
    this.scene.add('StoryScene', StoryScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
