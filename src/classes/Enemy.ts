import Phaser from 'phaser';
import Character from './Character';

export default class Enemy extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, id: number, hp: number, phy: number, range: number) {
    super(scene, x, y, texture, id, hp, phy, range);
  }

  // エネミーに固有のメソッドやプロパティを追加できます
}
