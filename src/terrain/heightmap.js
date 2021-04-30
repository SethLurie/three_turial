import { Vector2 } from "three";
import { bound } from "../math";

export class BumpHeightMap {
  constructor (params) {
    this.max_dist = params.max_dist
    this.origin = new Vector2(0, 0)
  }

  getHeight(x, y) {
    const dist = new Vector2(x, y).distanceTo(this.origin)
    let h = 1.0 - bound(dist / this.max_dist);
    h = h * h * h * (h * (h * 6 - 15) + 10);
    return h * 128;
  }
}
