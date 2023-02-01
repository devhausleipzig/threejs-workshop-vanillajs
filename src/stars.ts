import * as THREE from "three";
import { Scene } from "three";

export function addStar(scene: Scene) {
    const geometry = new THREE.OctahedronGeometry(1);
    const material = new THREE.MeshToonMaterial({color: "#ffffff"});
    const starMesh = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(null).map(() => THREE.MathUtils.randFloatSpread(1000))

    starMesh.position.set(x,y,z);
    
    scene.add(starMesh);
}

