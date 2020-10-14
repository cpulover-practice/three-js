import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';
/* COMPONENTS */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const boxGeometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
const cube = new THREE.Mesh(boxGeometry, material);
scene.add(cube);
const texture = new THREE.TextureLoader().load("img/grid.png");
material.map = texture;
const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"]);
//envTexture.mapping = THREE.CubeReflectionMapping
envTexture.mapping = THREE.CubeRefractionMapping;
material.envMap = envTexture;
const stats = Stats();
document.body.appendChild(stats.dom);
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01); // this calls animate()
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);
const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, 'x', 0, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'y', 0, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'z', 0, 5, 0.1);
cubeFolder.add(cube, 'visible', true);
cubeFolder.open();
const options = {
    side: {
        "FrontSide": THREE.FrontSide,
        "BackSide": THREE.BackSide,
        "DoubleSide": THREE.DoubleSide,
    },
    combine: {
        "MultiplyOperation": THREE.MultiplyOperation,
        "MixOperation": THREE.MixOperation,
        "AddOperation": THREE.AddOperation
    },
};
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'transparent');
materialFolder.add(material, 'opacity', 0, 1, 0.01);
materialFolder.add(material, 'depthTest');
materialFolder.add(material, 'depthWrite');
materialFolder.add(material, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial());
materialFolder.add(material, 'visible');
materialFolder.add(material, 'side', options.side).onChange(() => updateMaterial());
materialFolder.open();
var data = {
    color: material.color.getHex(),
};
var meshBasicMaterialFolder = gui.addFolder('THREE.MeshBasicMaterial');
meshBasicMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))); });
meshBasicMaterialFolder.add(material, 'wireframe');
//meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10);
meshBasicMaterialFolder.add(material, 'combine', options.combine).onChange(() => updateMaterial());
meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1);
meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1);
meshBasicMaterialFolder.open();
function updateMaterial() {
    // change string value ("FrontSide") from dat gui to number to apply change
    material.side = Number(material.side);
    material.combine = Number(material.combine);
    material.needsUpdate = true;
}
/* EVENTS */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
controls.addEventListener('change', render);
/* ANIMATE & RENDER */
var animate = function () {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // controls.update()
    stats.update();
    render();
};
animate();
function render() {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
}
render();
