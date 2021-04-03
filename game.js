import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';

// Game scene
const gameScene = new GameScene();
const titleScene = new TitleScene();


//* Game object */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
        debug: true
    }
},
};

const game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('titleScene');