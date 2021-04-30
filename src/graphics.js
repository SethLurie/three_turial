import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  DirectionalLight,
} from "three";

export const graphics = (function () {
  function getImageData(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
  }

  function getPixel(imagedata, x, y) {
    const position = (x + imagedata.width * y) * 4;
    const data = imagedata.data;
    return {
      r: data[position],
      g: data[position + 1],
      b: data[position + 2],
      a: data[position + 3],
    };
  }

  class Graphics {
    constructor(game) {}

    init() {
      this.renderer = new WebGLRenderer({
        antialias: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      const target = document.getElementById("container");
      target.appendChild(this.renderer.domElement);

      // this._stats = new Stats();
      // target.appendChild(this._stats.dom);

      window.addEventListener(
        "resize",
        () => {
          this.onResize();
        },
        false
      );

      const fov = 60;
      const aspect = 1920 / 1080;
      const near = 0.1;
      const far = 10000.0;
      this._camera = new PerspectiveCamera(fov, aspect, near, far);
      this._camera.position.set(75, 20, 1000);

      this._scene = new Scene();
      this._scene.background = new Color(0xaaaaaa);

      this.createLights();

      return true;
    }

    createLights() {
      let light = new DirectionalLight(0x808080, 1, 100);
      light.position.set(-250, 250, 100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);

      light = new DirectionalLight(0x404040, 1, 100);
      light.position.set(250, -250, -100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);
    }

    onResize() {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    get scene() {
      return this._scene;
    }

    get camera() {
      return this._camera;
    }

    render(timeInSeconds) {
      this.renderer.render(this._scene, this._camera);
    }
  }

  return {
    Graphics: Graphics,
    getPixel: getPixel,
    getImageData: getImageData,
  };
})();
