import * as THREE from "three"
import * as dat from "lil-gui"
import{ OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('purple')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(-2, 3, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Box
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial()
const box = new THREE.Mesh(geometry, material)

scene.add(box)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1
}

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// Box UI
const boxFolder = ui.addFolder('Box')

boxFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Box
    box.rotation.y = elapsedTime * uiObject.speed

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()