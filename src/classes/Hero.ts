import Phaser from 'phaser';
import Character from './Character';

export default class Hero extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, id: number, hp: number, phy: number, range: number) {
    super(scene, x, y, texture, id, hp, phy, range);
  }

  // ヒーローに固有のメソッドやプロパティを追加できます
}
