import { WebGLRenderer, AxesHelper, PerspectiveCamera, Scene } from 'three';
import Stats from 'stats.js';
import MouseControl from './utils/mouse-control';

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
    this.camera.position.set(20, 30, 40);
    this.camera.lookAt(this.scene.position);
    this.mouseControl = new MouseControl(this.camera, this.container, this.scene.position);
    // this.mouseControl.cordinationMappingMode();
    this.mouseControl.offsetAppendMode(1);
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  add(object) {
    this.objectMap[object.uuid] = object;
    this.objectKeys = Object.keys(this.objectMap);
    this.scene.add(object.instance);
    return object.uuid;
  }

  getObjectById(uuid) {
    let object = this.objectMap[uuid];
    if (!object) {
      object = this.scene.getObjectById(uuid);
    }
    return object;
  }

  removeObject(object) {
    delete this.objectMap[object.uuid];
    this.objectKeys = Object.keys(this.objectMap);
    this.scene.remove(object.instance || object);
  }

  animate() {
    for (let i = 0; i < this.objectKeys.length; i++) {
      const o = this.objectMap[this.objectKeys[i]];
      if (o.doAnimate) o.doAnimate();
    }
  }

  start() {
    const render = () => {
      requestAnimationFrame(render);
      this.stats.begin();
      this.mouseControl.update();
      this.animate();
      this.renderer.render(this.scene, this.camera);
      this.stats.end();
    };
    render();
  }
}
