import Phaser from "phaser";
import Stage from "../classes/Stage";
import Enemy from "../classes/Enemy";
import Hero from "../classes/Hero";
import Character from "../classes/Character";

export default class GameScene extends Phaser.Scene {
  private stage: Stage;
  private distanceText: Phaser.GameObjects.Text;
  private hero: Hero | null;

  constructor() {
    super("GameScene");
    this.stage = new Stage();
    this.distanceText = {} as Phaser.GameObjects.Text;
    this.hero = null;
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

    battleArea.setDepth(0);
    // 芝生を追加します
    const grassHeight = battleAreaHeight * 0.2;
    const grassY = battleAreaHeight - grassHeight;
    const grass = this.add
      .rectangle(0, grassY, width, grassHeight, 0x00aa00)
      .setOrigin(0);
    battleArea.setDepth(1);

    // ヒーローとエネミーの作成
    this.hero = new Hero(
      this,
      width / 4,
      grassY + grassHeight / 2,
      "hero",
      1,
      100,
      50,
      10
    );
    this.hero.setDepth(10);
    this.add.existing(this.hero);
    const enemy = new Enemy(this, (3 * width) / 4, grassY + grassHeight / 2, 'enemy', 2, 100, 50, 10);
    this.add.existing(enemy);
    enemy.setDepth(10);

    // 距離テキストの作成
    this.distanceText = this.add.text(
      10,
      10,
      `Distance: ${this.stage.distance}`,
      { fontSize: "16px", color: "#ffffff" }
    );

    this.distanceText.setDepth(100);

    // ヒーローの移動に対応するためにカーソルキーを設定
    this.input.keyboard.createCursorKeys();
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
    // ヒーローの移動処理
    const heroSpeed = 5;
    const cursors = this.input.keyboard.createCursorKeys();

    // カメラがヒーローの位置に追従
    if (this.hero) {
      const battleAreaHeight = this.scale.height * 0.8;

      const battleArea = this.add
        .rectangle(
          this.cameras.main.scrollX,
          0,
          this.scale.width,
          battleAreaHeight,
          0x00aaff
        )
        .setOrigin(0, 0);
      battleArea.setDepth(0);

      // 芝生を追加します
      const grassHeight = battleAreaHeight * 0.2;
      const grassY = battleAreaHeight - grassHeight;
      const grass = this.add
        .rectangle(this.cameras.main.scrollX, grassY, this.scale.width, grassHeight, 0x00aa00)
        .setOrigin(0);
        grass.setDepth(1);

      this.cameras.main.scrollX = this.hero.x - this.cameras.main.width / 4;
      this.distanceText.setX(this.cameras.main.scrollX)  
    }

    if (cursors.right?.isDown) {
      const hero = this.children.list.find(
        (child) => child instanceof Hero
      ) as Hero;
      hero.x += heroSpeed;
      this.stage.updateDistance(hero.x);
      this.distanceText.text = `Distance: ${this.stage.distance}`;
    }

    // Update Hero and Enemy objects
    this.children.list.forEach((child) => {
      if (child instanceof Character) {
        child.update();
      }
    });
  }
}
