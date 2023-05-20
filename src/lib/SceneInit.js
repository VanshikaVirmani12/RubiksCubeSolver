import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default class SceneInit {
    constructor (canvasID, camera, scene, stats, controls, renderer, fov=36) {
        this.fov = fov;
        this.canvasID = canvasID;
        this.camera = camera;
        this.scene = scene;
        this.stats = stats;
        this.controls = controls;
        this.renderer = renderer;
    }

    initScene () {
        this.camera = new THREE.PerspectiveCamera(
            this.fov, 
            window.innerWidth / window.innerHeight, 
            1,
            1000
        );
        this.camera.position.z = 196; 

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();


        const canvas = document.getElementById(this.canvasID);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

    }
} 



