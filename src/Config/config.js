import 'phaser';

export default {
  // eslint-disable-next-line no-undef
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 600,
  backgroundColor: 'black',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
