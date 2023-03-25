import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    // ここでアセットを読み込みます
  }

  create() {
    // ここでゲームオブジェクトを作成します
    const startButton = this.add.text(400, 300, 'START', { fontSize: '32px', color: '#FFF' }).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }

  update() {
    // ここでゲームの状態を更新します
  }
}
