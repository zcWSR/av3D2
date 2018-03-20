export default class Utils {
  /**
   * @param {Camera} camera 相机
   * @param {HTMLElement} domElement 画布
   */
  static mouseControl(camera, domElement, lookAt, maxAngle = { x: Math.PI / 2, y: Math.PI / 2 }) {
    const mousePosition = {
      x: 0,
      y: 0
    };

    const distance = Math.sqrt((camera.position.x * camera.position.x) +
      (camera.position.y * camera.position.y) +
      (camera.position.z * camera.position.z));


    const appendAngle = {
      x: (Math.PI - maxAngle.x) / 2,
      y: (Math.PI - maxAngle.y) / 2
    };

    const basePositionX = camera.position.x;
    const basePositionY = camera.position.y;
    const basePositionZ = camera.position.z;

    domElement.addEventListener('mousemove', (e) => {
      mousePosition.x = e.clientX - (domElement.clientWidth / 2);
      mousePosition.y = e.clientY - (domElement.clientHeight / 2);
      const xAngle = ((e.clientX / domElement.clientWidth) * maxAngle.x) + appendAngle.x;
      const yAngle = ((e.clientY / domElement.clientHeight) * maxAngle.y) + appendAngle.y;
      camera.position.x = basePositionX + (distance * Math.sin(yAngle) * Math.cos(xAngle));
      camera.position.y = basePositionY + (distance * Math.cos(yAngle));
      camera.position.z = basePositionZ + (distance * Math.sin(yAngle) * Math.sin(xAngle));
      camera.lookAt(lookAt);
    });

    return mousePosition;
  }

  // /**
  //  * @param {Camera} camera 相机
  //  * @param {HTMLElement} domElement 画布
  //  */
  // static mouseControl(scene, camera, domElement, speed = 2) {
  //   const mousePosition = {
  //     x: 0,
  //     y: 0
  //   };

  //   const basePositionX = camera.position.x;
  //   const basePositionY = camera.position.y;

  //   domElement.addEventListener('mousemove', (e) => {
  //     mousePosition.x = e.clientX - (domElement.clientWidth / 2);
  //     mousePosition.y = (domElement.clientHeight / 2) - e.clientY;
  //     camera.position.x = basePositionX + ((mousePosition.x / 50) * speed);
  //     camera.position.y = basePositionY + ((mousePosition.y / 50) * speed);
  //     camera.lookAt(scene.position);
  //   });

  //   return mousePosition;
  // }
}
