import {
  Vector3,
  Mesh,
  PlaneGeometry,
  FrontSide,
  MeshStandardMaterial,
  Color,
  DoubleSide,
} from "three";

export class TerrainChunk {
  constructor(params) {
    this.params = params;
    this.init();
  }

  init() {
    const size = new Vector3(
      this.params.width * this.params.scale,
      0,
      this.params.width * this.params.scale
    );
    const geometry = new PlaneGeometry(
      size.x,
      size.z,
      this.params.segments,
      this.params.segments
    );
    const material = new MeshStandardMaterial({
      color: 0xffeeee,
      side: FrontSide,
    });
    this._plane = new Mesh(geometry, material);
    this._plane.castShadow = false;
    this._plane.receiveShadow = true;
    this.setHeight(this.params.heightmap);
  }

  get chunk() {
    return this._plane;
  }

  setHeight(heightmap) {
    const GREEN = new Color(0x46b00c);
    const position = this._plane.geometry.getAttribute("position");
    for (let i = 0; i < position.array.length; i=i+3) {
      const x = position.array[i];
      const z = position.array[i + 1];
      const y = heightmap.getHeight(x, z);
      position.array[i + 2] = y;
    }
    this._plane.geometry.setAttribute("position", position);
    position.needsUpdate = true;
    this._plane.geometry.computeVertexNormals();
  }

  update(time) {}
}
