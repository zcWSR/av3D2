/**
 * 鼠标镜头控制
 */
export default class MouseControl {
  /**
   *
   * @param {Camera} camera
   * @param {} lookAt
   * @param {*} speed 镜头偏移范围，最大值为2PI=360° 球坐标系(r, theta, phi)
   */
  constructor(camera, dom, lookAt) {
    this.camera = camera;
    this.dom = dom;
    this.lookAt = lookAt;
    this.mousePosition = { x: 0, y: 0 };
    this.setRadius();
    this.setBaseAngle();

    this.update = () => {};
  }

  setRadius() {
    this.radius = Math.sqrt((this.camera.position.x * this.camera.position.x) +
    (this.camera.position.y * this.camera.position.y) +
    (this.camera.position.z * this.camera.position.z));
  }

  setBaseAngle() {
    this.baseAngle = {
      theta: Math.acos(this.camera.position.y / this.radius),
      phi: Math.atan(this.camera.position.z / this.camera.position.x)
    };
  }

  updateMousePostion(e) {
    this.mousePosition.x = e.clientX - (this.dom.clientWidth / 2);
    this.mousePosition.y = (this.dom.clientHeight / 2) - e.clientY;
  }

  setCamera(radius, theta, phi) {
    this.camera.position.x = radius * Math.sin(theta) * Math.cos(phi);
    this.camera.position.y = radius * Math.cos(theta);
    this.camera.position.z = radius * Math.sin(theta) * Math.sin(phi);
    this.camera.lookAt(this.lookAt);
  }

  /**
   * 坐标映射模式
   * @param {{ theta, phi }} range 可移动范围
   */
  cordinationMappingMode(range = { theta: 0.25, phi: 0.25 }) {
    this.dom.addEventListener('mousemove', (e) => {
      this.updateMousePostion(e);
      const phi =
        this.baseAngle.phi +
        ((this.mousePosition.x / this.dom.clientWidth) * range.phi);

      const theta =
        this.baseAngle.theta +
        ((this.mousePosition.y / this.dom.clientHeight) * range.theta);
      this.setCamera(this.radius, theta, phi);
    });
  }

  /**
   * 偏移量追加模式
   * @param {number} speed 速度
   */
  offsetAppendMode(speed = 2) {
    this.thetaSpeed = 0;
    this.phiSpeed = 0;
    this.setBaseAngle();
    const updateFunc = () => {
      this.baseAngle.theta += Math.PI * this.thetaSpeed;
      this.baseAngle.phi += Math.PI * this.phiSpeed;
      if (this.baseAngle.theta < 0.01) {
        this.baseAngle.theta = 0.01;
      }
      if (this.baseAngle.theta > 3.13) {
        this.baseAngle.theta = 3.13;
      }
      this.setCamera(this.radius, this.baseAngle.theta, this.baseAngle.phi);
    };

    this.dom.addEventListener('mousemove', (e) => {
      this.updateMousePostion(e);
      this.thetaSpeed = -(this.mousePosition.y / this.dom.clientHeight) / (100 / speed);
      this.phiSpeed = -(this.mousePosition.x / this.dom.clientWidth) / (100 / speed);
    });

    this.dom.addEventListener('mouseout', () => {
      this.thetaSpeed = 0;
      this.phiSpeed = 0;
      this.update = () => {};
    });

    this.dom.addEventListener('mouseover', () => {
      this.update = updateFunc;
    });
  }
}
