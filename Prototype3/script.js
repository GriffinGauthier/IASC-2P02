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
scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects
const torusGeometry = new THREE.TorusGeometry(1, 0.2, 10, 10, 3.1)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh (torusGeometry, torusMaterial)
torus.position.set(6, 1, 0)
torus.rotation.y = Math.PI * 0.5
torus.rotation.x = Math.PI
torus.castShadow = true
scene.add(torus)

const circleGeometry = new THREE.CircleGeometry(0.5, 100)
const circleMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const circle = new THREE.Mesh (circleGeometry, circleMaterial)
circle.position.set(6, 2, 1)
circle.rotation.y = Math.PI * 0.5
circle.castShadow = true
scene.add(circle)

const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh (sphereGeometry, sphereMaterial)
sphere.position.set(6, 2, -1)
sphere.castShadow = true
scene.add(sphere)

/***********
** Lights **
***********/
// Ambient Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 512
directionalLight.shadow.mapSize.height = 512

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

/*******
** UI **
********/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')


/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    //torusKnot.rotation.y = elapsedTime

    // Update directionalLightHelper
    directionalLightHelper.update()
    
    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()