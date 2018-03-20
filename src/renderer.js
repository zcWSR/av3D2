import { WebGLRenderer, AxesHelper, PerspectiveCamera, Scene } from 'three';
import Stats from 'stats.js';
import { v1 } from 'uuid';

export default class Renderer {
  /**
   *
   * @param {HTMLDivElement} domContainer
   */
  constructor(domContainer) {
    this.container = domContainer;
    this.objectMap = {};
    this.initRenderer();
    this.initSceneAndCamera();
    this.scene.add(new AxesHelper(20));
  }

  initRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
    // this.renderer.setClearColor(0xFFFFFF, 1.0);
    window.addEventListener('resize', () => this.onResize());
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  initSceneAndCamera() {
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = 20;
    this.camera.position.y = 30;
    this.camera.position.z = 40;
    this.camera.lookAt(this.scene.position);
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  add(object) {
    if (object.name) {
      this.objectMap[object.name] = object;
      this.scene.add(object.instance);
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

  animate() {
    // for(let name in this.objectMap) {
    //   this.objectMap[name].doAnimate();
    // }
    const keys = Object.keys(this.objectMap);
    for (let i = 0; i < keys.length; i++) {
      this.objectMap[keys[i]].doAnimate();
    }
  }

  go() {
    const render = () => {
      requestAnimationFrame(render);
      this.stats.begin();
      this.animate();
      this.renderer.render(this.scene, this.camera);
      this.stats.end();
    };
    render();
  }
}
