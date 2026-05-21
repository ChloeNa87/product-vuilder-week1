import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. 기본 설정 (Scene, Camera, Renderer)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // 하늘색 배경

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10); // 카메라 위치 조정
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. 조명 설정 (현실감을 더하기 위해)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 전체적으로 부드러운 빛
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
 directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 3. 월드(땅) 생성
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // 녹색 땅
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // 땅을 눕힘
scene.add(ground);

// 4. 플레이어 캐릭터 생성
const playerGeometry = new THREE.BoxGeometry(1, 2, 1); // 세로로 긴 상자 모양
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 }); // 주황색
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1; // 땅 위에 서 있도록 위치 조정
scene.add(player);

// 5. 키보드 입력 처리
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

const moveSpeed = 0.1;
const playerVelocity = new THREE.Vector3(); // 플레이어의 이동 속도를 관리

function updatePlayerMovement() {
    playerVelocity.set(0, 0, 0);

    if (keys['KeyW']) {
        playerVelocity.z = -moveSpeed;
    }
    if (keys['KeyS']) {
        playerVelocity.z = moveSpeed;
    }
    if (keys['KeyA']) {
        playerVelocity.x = -moveSpeed;
    }
    if (keys['KeyD']) {
        playerVelocity.x = moveSpeed;
    }

    player.position.add(playerVelocity); // 계산된 속도를 위치에 더함
}

// 6. 게임 루프 (애니메이션)
function animate() {
    requestAnimationFrame(animate);

    updatePlayerMovement();

    // 플레이어를 따라다니는 카메라 (간단한 3인칭 시점)
    const cameraOffset = new THREE.Vector3(0, 5, 10);
    camera.position.copy(player.position).add(cameraOffset);
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

// 7. 창 크기 조절 시 렌더러와 카메라 업데이트
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 애니메이션 루프 시작
animate();
