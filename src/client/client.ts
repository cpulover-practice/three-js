import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'

/* COMPONENTS */
const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update()
    stats.update()
    render()
}
// animate()

function render() {
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}
render()


