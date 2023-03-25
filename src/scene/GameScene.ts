import Phaser from "phaser";
import Stage from "../classes/Stage";
import Enemy from "../classes/Enemy";
import Hero from "../classes/Hero";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // ここでアセットを読み込みます
    this.load.image("hero", "5013.png");
    this.load.image("enemy", "114.png");
  }

  create() {
    const { width, height } = this.scale;

    // バトル画面の背景を作成します
    const battleAreaHeight = height * 0.8;
    const battleArea = this.add
      .rectangle(0, 0, width, battleAreaHeight, 0x00aaff)
      .setOrigin(0);

    // 芝生を追加します
    const grassHeight = battleAreaHeight * 0.2;
    const grassY = battleAreaHeight - grassHeight;
    const grass = this.add
      .rectangle(0, grassY, width, grassHeight, 0x00aa00)
      .setOrigin(0);

    // キャラクターを芝生の中心に表示します

    const hero = new Hero(
      this,
      width / 4,
      grassY + grassHeight / 2,
      "hero",
      1,
      100,
      50,
      10
    );
    this.add.existing(hero);

    const enemy = new Enemy(
      this,
      (3 * width) / 4,
      grassY + grassHeight / 2,
      "enemy",
      2,
      100,
      50,
      10
    );

    // クリックイベントを追加
    enemy.setInteractive();
    enemy.on('pointerdown', () => {
      enemy.takeDamage(10);
    });

    this.add.existing(enemy);

    // 召喚ボタンの種別と色を定義します
    const buttonData = [
      { type: "Common", color: 0x0000ff },
      { type: "Uncommon", color: 0x00aa00 },
      { type: "Rare", color: 0xffff00 },
      { type: "Epic", color: 0xff9900 },
      { type: "Legendary", color: 0xff0000 },
    ];

    // 召喚ボタンを5つ均等に配置し、カラーテーマを適用します
    const buttonWidth = width / buttonData.length;
    for (let i = 0; i < buttonData.length; i++) {
      const x = buttonWidth * i;
      const y = battleAreaHeight;

      const button = this.add
        .rectangle(
          x + buttonWidth / 2,
          y + grassHeight / 2,
          buttonWidth * 0.9,
          grassHeight * 0.8,
          buttonData[i].color
        )
        .setInteractive();

      button.setStrokeStyle(4, 0xffffff); // 枠線を追加してデザインをカッコよくします
      const buttonText = this.add
        .text(x + buttonWidth / 2, y + grassHeight / 2, buttonData[i].type, {
          fontSize: "18px",
          color: "#000000",
          fontStyle: "bold",
        })
        .setOrigin(0.5);

      button.on("pointerdown", () => {
        // ここに召喚ボタンが押された時の処理を記述します
        this.tweens.add({
          targets: button,
          scaleX: 0.9,
          scaleY: 0.9,
          duration: 100,
          ease: "Cubic",
          yoyo: true,
        });
      });
    }

    // 結果画面へ遷移するボタンを作成します
    // const resultButton = this.add.text(width / 2, height - 50, 'RESULT', { fontSize: '32px', color: '#FFF' }).setInteractive().setOrigin(0.5);

    // resultButton.on('pointerdown', () => {
    //   this.scene.start('ResultScene');
    // });
  }

  update() {
    // ここでゲームの状態を更新します
  }
}
