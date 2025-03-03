import * as THREE from "three"
import * as dat from "lil-gui"
import{ OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

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
    antialias: true,
    alpha: true
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
torus.position.set(8, 1, 0)
torus.rotation.y = Math.PI * 0.5
torus.rotation.x = Math.PI
torus.castShadow = true
scene.add(torus)

const circleGeometry = new THREE.CircleGeometry(0.5, 100)
const circleMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const circle = new THREE.Mesh (circleGeometry, circleMaterial)
circle.position.set(8, 2, 2)
circle.rotation.y = Math.PI * 0.5
circle.castShadow = true
scene.add(circle)

const circle2 = new THREE.Mesh (circleGeometry, circleMaterial)
circle2.position.set(8, 2, -2)
circle2.rotation.y = Math.PI * 0.5
circle2.castShadow = true
scene.add(circle2)

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

/*********************
** DOM INTERACTIONS **
*********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thridChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// thrid-change
document.querySelector('#thrid-change').onclick = function() {
    domObject.thridChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******
** UI **
********/
// UI
/*
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
*/


/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(15, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        torus.position.x = Math.sin(elapsedTime) + 8
        circle.position.x = Math.sin(elapsedTime) + 8
        circle2.position.x = Math.sin(elapsedTime) + 8
        
    }

    // second-change
    if(domObject.secondChange)
    {
        torus.position.y = Math.sin(elapsedTime) + 1
        circle.position.y = Math.sin(elapsedTime) + 2
        circle2.position.y = Math.sin(elapsedTime) + 2
    }

    // thrid-change
    if(domObject.thridChange)
    {
        circle.rotation.x = Math.sin(elapsedTime)
        circle.rotation.y = Math.sin(elapsedTime)

        circle2.rotation.y = Math.sin(elapsedTime)
        circle2.rotation.x = Math.sin(elapsedTime)
    }

    // fourth-change
    if(domObject.fourthChange)
    {
        torus.rotation.x = 6.3
        circle.position.z = 2
        circle2.position.z = -2

    }

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