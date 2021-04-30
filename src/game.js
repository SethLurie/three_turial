import { graphics } from "./graphics"
export const game = (function () {
  return {
    Game: class {
      constructor() {
        this.init();
      }

      init() {
        this._graphics = new graphics.Graphics(this);
        if (!this._graphics.init()) {
          console.error("initialization of graphics failed")
          return;
        }

        this._previousRAF = null;
        this._minFrameTime = 1.0 / 10.0;
        this._entities = {};

        this.onInit();
        this.animate();
      }

      spawn(name, drawable) {
        this._entities[name] = drawable
        return drawable
      }

      despawn(name) {
        delete this._entities[name]
      }

      animate() {
        requestAnimationFrame((t) => {
          if (this._previousRAF === null) {
            this._previousRAF = t;
          }
          this.render(t - this._previousRAF);
          this._previousRAF = t;
        });
      }

      updateEntities(timeInSeconds) {
        for (let k in this._entities) {
          this._entities[k].update(timeInSeconds);
        }
      }

      render(timeInMS) {
        const timeInSeconds = Math.min(timeInMS * 0.001, this._minFrameTime);
        this.updateEntities(timeInSeconds);
        this.onUpdate()
        this._graphics.render(timeInSeconds);
        this.animate();
      }

      // implement these methods if needed
      onInit() {}
      onUpdate() {}
    },
  };
})();
