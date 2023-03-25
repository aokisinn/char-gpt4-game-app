export default class Stage {
  public distance: number;

  constructor() {
    this.distance = 0;
  }

  updateDistance(newDistance: number): void {
    this.distance = newDistance;
  }
}
