import Phaser from 'phaser';
import ResultScene from './scene/ResultScene';
import GameScene from './scene/GameScene';
import StartScene from './scene/StartScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene, ResultScene, StartScene],
};

export default new Phaser.Game(config);
