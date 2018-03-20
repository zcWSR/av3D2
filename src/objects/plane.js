import { PlaneBufferGeometry, MeshBasicMaterial, Mesh } from 'three';
import Geometry from './geometry';

export default class Plane extends Geometry {
  constructor() {
    super();
    this.gemoetry = new PlaneBufferGeometry(100, 100, 1, 1);
    this.material = new MeshBasicMaterial({ color: '#0288d1' });
    this.instance = new Mesh(this.gemoetry, this.material);
    this.instance.rotation.x = -0.5 * Math.PI;
    this.instance.position.x = 0;
    this.instance.position.y = -10;
    this.instance.position.z = 0;
  }
}
