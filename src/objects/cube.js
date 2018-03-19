import { CubeGeometry, MeshBasicMaterial, Mesh } from 'three';

import Geometry from './geometry';

export default class Cube extends Geometry {
  constructor(name) {
    super(name);
    this.geometry = new CubeGeometry(10, 10, 10);
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.instance = new Mesh(this.geometry, this.material);
  }
}
