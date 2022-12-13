// THREE-JS
import * as THREE from 'three';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });

// Camera
const fov = 75;     // fov: degrees, others: radians
const aspect = 2;   // canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); 

camera.position.z = 2;

// Scene
const scene = new THREE.Scene();

// Cube
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const cubeMat = new THREE.MeshBasicMaterial({color: 0x44aa88});
const cubeMesh = new THREE.Mesh(geometry, cubeMat);
scene.add(cubeMesh); 


function render(time) {
    // convert to seconds
    time += 0.001;    
    
    // object manipulation

    // render scene
    renderer.render(scene, camera);

    // animate
    requestAnimationFrame(render);
}
// start initial animation
requestAnimationFrame(render);


console.log("Three JS loaded");