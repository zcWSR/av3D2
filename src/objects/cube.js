import { CubeGeometry, MeshBasicMaterial, Mesh } from 'three';
import { v1 } from 'uuid';

export default class Cube {
  constructor(name) {
    if (name) this.name = name;
    else this.name = v1();
    this.geometry = new CubeGeometry();
    this.material = new MeshBasicMaterial();
    this.instance = new Mesh(this.geometry, this.material);
  }

  rotate(x, y, animateFunc, ) {

  }
}
