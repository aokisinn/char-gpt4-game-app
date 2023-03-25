import Phaser from "phaser";

export default class Character extends Phaser.GameObjects.Image {
  id: number;
  hp: number;
  maxHp: number;
  phy: number;
  range: number;
  hpBar: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: number,
    hp: number,
    phy: number,
    range: number
  ) {
    super(scene, x, y, texture);

    this.id = id;
    this.hp = hp;
    this.maxHp = hp;
    this.phy = phy;
    this.range = range;

    this.setOrigin(0.5);

    // Create HP bar
    const hpBarWidth = this.width * 0.8;
    const hpBarHeight = 5;
    this.hpBar = scene.add
      .rectangle(
        x,
        y + this.height / 2 + hpBarHeight,
        hpBarWidth,
        hpBarHeight,
        0x00ff00
      )
      .setOrigin(0.5);
    this.updateHpBar();
  }

  updateHpBar() {
    const hpPercentage = (this.hp / this.maxHp) * 100;

    // Update HP bar color
    if (hpPercentage >= 60) {
      this.hpBar.setFillStyle(0x00ff00); // Green
    } else if (hpPercentage >= 20) {
      this.hpBar.setFillStyle(0xffff00); // Yellow
    } else {
      this.hpBar.setFillStyle(0xff0000); // Red
    }

    // Update HP bar width
    const hpBarWidth = this.width * 0.8 * (this.hp / this.maxHp);
    this.hpBar.width = hpBarWidth;
  }

  // 新しく追加されたメソッド
  takeDamage(damage: number) {
    this.hp = Math.max(this.hp - damage, 0);
    this.updateHpBar();
    this.showDamageText(damage); // ダメージテキストを表示

    if (this.isDead()) {
      this.fadeOutAndDestroy();
    }
  }

  isDead(): boolean {
    return this.hp <= 0;
  }

  // 新しく追加されたメソッド
  showDamageText(damage: number) {
    const damageText = this.scene.add
      .text(this.x, this.y - this.height / 2, `-${damage}`, {
        fontSize: "20px",
        color: "#ff0000",
        backgroundColor: "rgba(0,0,0,0)",
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    // テキストを上に移動しながらフェードアウトさせるアニメーション
    this.scene.tweens.add({
      targets: damageText,
      y: damageText.y - 30,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        damageText.destroy();
      },
    });
  }

  // 新しく追加されたメソッド
  fadeOutAndDestroy() {
    // キャラクターを赤く光らせる
    this.setTint(0xff0000);

    // キャラクターをフェードアウトさせるアニメーション
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.destroy();
      },
    });

    // HPバーをフェードアウトさせるアニメーション
    this.scene.tweens.add({
      targets: this.hpBar,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.hpBar.destroy();
      },
    });
  }

  update() {
    if (this.hpBar) {
      const hpBarHeight = 5;
      this.hpBar.setPosition(this.x, this.y + this.height / 2 + hpBarHeight);
    }
  }
}
