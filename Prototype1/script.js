import * as THREE from "three"

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
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
/************
 ** MESHES **
 ************/
 // testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0, 0, 0)

// testTorus
const torusGeometry = new THREE.TorusGeometry(2)
const torusMaterial = new THREE.MeshNormalMaterial(1)
const testTorus = new THREE.Mesh(torusGeometry, torusMaterial)

scene.add(testTorus)
testTorus.position.set(0, 0, 0)

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)
    testSphere.position.x = Math.cos(elapsedTime)
    testSphere.position.z = Math.cos(elapsedTime / 10)

    // Animate testTorus
    testTorus.position.y = Math.sin(elapsedTime)
    testTorus.position.x = Math.cos(elapsedTime)
    testTorus.position.z = Math.cos(elapsedTime / 10)

    testTorus.rotation.y = Math.sin(elapsedTime * 2)
    testTorus.rotation.y = Math.cos(elapsedTime / 2)
    testTorus.rotation.y = Math.tan(elapsedTime / 10)
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()