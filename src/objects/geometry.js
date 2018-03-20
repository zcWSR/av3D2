export default class Geometry {
  constructor() {
    this.animate = () => {};
  }

  doAnimate() {
    this.animate(this);
  }

  get uuid() {
    return this.instance.uuid;
  }
}
