import Renderer from './renderer';
import Cube from './objects/cube';
import Plane from './objects/plane';
import './index.css';

const container = document.getElementById('container');
const renderer = new Renderer(container);

const simpleCube = new Cube();
const plane = new Plane();

renderer.add(plane);
renderer.add(simpleCube);
simpleCube.animate = (object) => {
  object.instance.rotation.x += Math.PI / 100;
  object.instance.rotation.y += Math.PI / 100;
};

renderer.start();

// setTimeout(() => {
//   renderer.removeObject(simpleCube);
// }, 5000);
