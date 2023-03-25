import Phaser from 'phaser';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  preload() {
    // ここでアセットを読み込みます
  }

  create() {
    const restartButton = this.add.text(400, 550, 'RESTART', { fontSize: '32px', color: '#FFF' }).setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.start('StartScene');
    });
  }

  update() {
    // ここでゲームの状態を更新します
  }
}
