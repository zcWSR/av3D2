import { CubeGeometry, MeshBasicMaterial, Mesh } from 'three';
import { v1 } from 'uuid';

export default class Cube {
  constructor(name) {
    if (name) this.name = name;
    else this.name = v1();
    this.geometry = new CubeGeometry(2, 3, 4);
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.instance = new Mesh(this.geometry, this.material);
    this.animate = () => {};
  }

  doAnimate() {
    this.animate(this.instance);
  }
}
