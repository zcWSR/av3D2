import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { v1 } from 'uuid';

export default class Renderer {
  /**
   *
   * @param {HTMLDivElement} domContainer
   */
  constructor(domContainer) {
    this.container = domContainer;

    this.objectMap = {};
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  add(object) {
    if (object.name) {
      this.objectMap[object.name] = object.instance;
      this.scene(object.instance);
      return null;
    }
    const name = v1();
    this.objectMap[name] = object;
    this.scene.add(object);
    return name;
  }

  getObject(name) {
    return this.objectMap[name];
  }

  removeObject(name) {
    delete this.objectMap[name];
  }

  go() {
    requestAnimationFrame(() => this.render());
    this.animate();
    this.renderer.render(this.scene, this.camera);
  }
}
