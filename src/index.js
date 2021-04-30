import * as dat from "dat.gui";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { WebGL } from "./webgl";

import { game } from "./game";

import { TerrainChunk } from "./terrain";

import { OrbitControls } from "./controls";
import { BumpHeightMap } from "./terrain/heightmap";

if (WebGL.isWebGLAvailable()) {
  console.log("web gl is available");
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

class ProceduralEnvironmentGenerator extends game.Game {
  constructor() {
    super();
  }

  onInit() {
    this.createGUI();
    this.controls = this.createControls();

    this.chunk = this.spawn(
      "terrain",
      new TerrainChunk({
        width: 500,
        scale: 1,
        segments: 128,
        heightmap: new BumpHeightMap({ max_dist: 250 }),
      })
    ).chunk;

    this._graphics.scene.add(this.chunk);
  }

  createControls() {
    const controls = new OrbitControls(
      this._graphics._camera,
      this._graphics.renderer.domElement
    );
  }

  createGUI() {
    this._guiParams = {
      general: {
        wireframe: false,
        vertexColoring: false,
      },
    };
    this._gui = new dat.GUI();

    const generalRollup = this._gui.addFolder("General");
    generalRollup
      .add(this._guiParams.general, "wireframe")
      .onChange((value) => {
        this.chunk.material.wireframe = value;
      });
    generalRollup
      .add(this._guiParams.general, "vertexColoring")
      .onChange((value) => {
        this.chunk.material.vertexColors = value;
      });
    this._gui.close();
  }

  onUpdate() {}
}

const app = new ProceduralEnvironmentGenerator();
