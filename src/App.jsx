import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from './lib/SceneInit';
import { vertexShader, fragmentShader } from './lib/Shaders';

function App() {
    useEffect(() => {
        const test =   new SceneInit('myCanvas');
        test.initScene(); 
        test.animate(); 
        const scale = 32;
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader(),
            fragmentShader: fragmentShader(),
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = scale;
        mesh.scale.y = scale;
        mesh.scale.z = scale;
        mesh.rotateX(Math.PI / 8);
        mesh.rotateY(Math.PI / 4);

        test.scene.add(mesh);

    }, []); 

    return (
        <div>
          <canvas id='myCanvas'></canvas>
        </div>
    );
}

export default App; 