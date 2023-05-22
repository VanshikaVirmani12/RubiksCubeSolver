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

        this.uniforms = {
            u_time: { type: 'f', value: 1.0 },
            colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
            colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
          };

        const canvas = document.getElementById(this.canvasID);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        this.scene.add(ambientLight);

        let spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        this.scene.add(spotLight);

        window.addEventListener('resize', () => this.onWindowResize(), false);

    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
    }

    render() {
        this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
      }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

} 



