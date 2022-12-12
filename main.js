// THREE-JS
import * as THREE from 'three';

function main() {
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
    // const scene = new THREE.scene();

}

main();
console.log("Three JS loaded");