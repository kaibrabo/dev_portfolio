// THREE-JS
import * as THREE from 'three';
import { OrbitControls } from './src/OrbitControls.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });

// Camera
const fov = 45;     // fov: degrees, others: radians
const aspect = 1;   // canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 10, 20);
// camera.position.z = 2;

// Scene
const scene = new THREE.Scene();

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0,5,0);
controls.update();

// multiple texture loading
const loadManager = new THREE.LoadingManager(); 
const loader = new THREE.TextureLoader(loadManager);

// Texture: Ground Plane
const planeSize = 40;
const planeTexture = loader.load('assets/img/checkered.png');

// Texture: Cube
const cubeMaterials = [
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_cut_mug.png') }),
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_cut_mug.png') }),
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_mug.png') }),
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_cut_mug.png') }),
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_mug.png') }),
    new THREE.MeshPhongMaterial({ map: loader.load('assets/img/sq_mug.png') }),
]

// Cube
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const cubeMesh = new THREE.Mesh(geometry, cubeMaterials);

// Loading bar for slow connections
const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');
loadManager.onLoad = () => {
    loadingElem.style.display = 'none';
    scene.add(cubeMesh);
}
loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, ItemsTotal) => {
    const progress = itemsLoaded / ItemsTotal;
    progressBarElem.style.transform = `scaleX(${progress})`;
};


// Light
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}


function render(time) {
    // convert to seconds
    time *= 0.001;

    // responsive canvas
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // object manipulation
    // cubeMesh.rotation.x = time/3;
    cubeMesh.rotation.y = time / 2;

    // render scene
    renderer.render(scene, camera);

    // animate
    requestAnimationFrame(render);
}
// start initial animation
requestAnimationFrame(render);


// responsive display size
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
