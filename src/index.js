import Renderer from './renderer';
import Cube from './objects/cube';
import './index.css';

const container = document.getElementById('container');
const renderer = new Renderer(container);

const simpleCube = new Cube();

renderer.add(simpleCube);

setTimeout(() => {
  simpleCube.animate = (instance) => {
    instance.rotation.x += 0.05;
    instance.rotation.y += 0.02;
  };
}, 1000);

renderer.go();
