import { v1 } from 'uuid';

export default class Geometry {
  constructor(name) {
    if (name) this.name = name;
    else this.name = v1();
    this.animate = () => {};
  }

  doAnimate() {
    this.animate(this.instance);
  }
}
