import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { addStar } from "./stars";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load(
  "public/2k_stars_milky_way.jpg"
);
const sunTexture = new THREE.TextureLoader().load("public/2k_sun.jpg");
const moonTexture = new THREE.TextureLoader().load("public/2k_moon.jpg");
const meTexture = new THREE.TextureLoader().load("public/me.jpg");

const torusGeometry = new THREE.TorusGeometry(10, 3);
const sunGeometry = new THREE.SphereGeometry(100);
const standardYellowMaterial = new THREE.MeshStandardMaterial({
  color: "#ffff00",
});
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
const torusMesh = new THREE.Mesh(torusGeometry, standardYellowMaterial);
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
const pointLight = new THREE.PointLight("#ffffff", 0);
const gridHelper = new THREE.GridHelper(200, 50);
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  new THREE.MeshBasicMaterial({ map: meTexture })
);
const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);

camera.position.x = -10;
pointLight.intensity = 5;
pointLight.position.x = 800;
sunMesh.position.x = 1000;
torusMesh.position.x = 20;
torusMesh.rotation.x += 1;
torusMesh.rotation.y += 1;
cubeMesh.position.x = -30;
cubeMesh.position.z = -10;
moonMesh.position.set(-100, 0, 20);

scene.add(torusMesh);
scene.add(sunMesh);
scene.add(pointLight);
scene.add(cubeMesh);
scene.add(moonMesh);

function clampToX(xValue: number) {
  const topLength = document.body.getBoundingClientRect().top;
  return topLength / 20 >= xValue ? xValue : topLength / 20;
}

function moveCamera() {
  const topLength = document.body.getBoundingClientRect().top;
  camera.position.x = clampToX(-10);
  cubeMesh.rotation.y = topLength / 200;
  moonMesh.rotation.z += 0.1;
}

document.body.onscroll = moveCamera;

scene.background = spaceTexture;

Array(300)
  .fill(null)
  .forEach(() => addStar(scene));

function animate() {
  requestAnimationFrame(animate);

  torusMesh.rotation.x += 0.0005;
  torusMesh.rotation.y += 0.0005;
  torusMesh.rotation.z += 0.0005;

  sunMesh.rotation.x += 0.001;
  sunMesh.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

animate();
