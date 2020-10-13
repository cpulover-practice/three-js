import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

/* COMPONENTS */
const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const basicMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, basicMaterial)
scene.add(cube)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01) // this calls animate()
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01)
const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, 'x', -10, 10)
cubePositionFolder.add(cube.position, 'y', -10, 10)
cubePositionFolder.add(cube.position, 'z', -10, 10)
const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, 'x', 0, 5, 0.1)
cubeScaleFolder.add(cube.scale, 'y', 0, 5, 0.1)
cubeScaleFolder.add(cube.scale, 'z', 0, 5, 0.1)
cubeFolder.add(cube, 'visible', true)
cubeFolder.open()


/* EVENTS */
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

controls.addEventListener('change', render)

/* ANIMATE & RENDER */
var animate = function () {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // controls.update()
    stats.update()
    render()
}
animate()

function render() {
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}
render()


