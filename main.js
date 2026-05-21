import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. 기본 설정
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // 하늘색 배경

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias로 렌더링 품질 향상
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. 조명
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // 전체 조명을 약간 더 밝게
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true; // 그림자 생성
scene.add(directionalLight);

// 3. 땅
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0; // 땅의 위치를 Y=0으로 설정
ground.receiveShadow = true; // 그림자를 받음
scene.add(ground);
const groundLevel = 1; // 캐릭터가 서 있을 땅의 Y 좌표 (캐릭터 크기 고려)

// 4. 플레이어 캐릭터 (이미지 스프라이트)
const textureLoader = new THREE.TextureLoader();
let player; // 플레이어 변수를 바깥에서 선언

textureLoader.load(
    'character.png', // 이미지 파일 경로
    (texture) => {
        // 텍스처 로드 성공 시
        const playerMaterial = new THREE.SpriteMaterial({ map: texture });
        player = new THREE.Sprite(playerMaterial);
        player.scale.set(2.5, 2.5, 1); // 캐릭터 크기 조절
        player.position.y = groundLevel;
        scene.add(player);
        console.log("캐릭터가 성공적으로 로드되었습니다!");
    },
    undefined, // onProgress 콜백
    (error) => {
        // 에러 발생 시
        console.error('캐릭터 이미지를 불러오는 데 실패했습니다:', error);
        // 이미지가 없어도 게임이 멈추지 않도록, 대체 상자를 생성
        const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
        const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 });
        player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.y = groundLevel;
        scene.add(player);
    }
);


// 5. 물리 및 키보드 입력
const keys = {};
const moveSpeed = 0.15; // 이동 속도 소폭 증가
const jumpStrength = 0.25;
const gravity = -0.012;

const playerVelocity = new THREE.Vector3();
let isOnGround = true;

document.addEventListener('keydown', (event) => { keys[event.code] = true; });
document.addEventListener('keyup', (event) => { keys[event.code] = false; });

function updatePlayerMovement() {
    if (!player) return; // 플레이어가 아직 로드되지 않았으면 아무것도 하지 않음

    // X, Z 방향 속도를 먼저 초기화
    playerVelocity.x = 0;
    playerVelocity.z = 0;

    // 키보드 입력에 따라 속도 설정
    if (keys['KeyW']) playerVelocity.z = -moveSpeed;
    if (keys['KeyS']) playerVelocity.z = moveSpeed;
    if (keys['KeyA']) playerVelocity.x = -moveSpeed;
    if (keys['KeyD']) playerVelocity.x = moveSpeed;

    // 점프
    if (keys['Space'] && isOnGround) {
        playerVelocity.y = jumpStrength;
        isOnGround = false;
    }

    // 중력 적용
    playerVelocity.y += gravity;

    // 속도를 위치에 반영
    player.position.x += playerVelocity.x;
    player.position.z += playerVelocity.z;
    player.position.y += playerVelocity.y;

    // 땅 충돌 감지
    if (player.position.y <= groundLevel) {
        player.position.y = groundLevel;
        playerVelocity.y = 0;
        isOnGround = true;
    }
}

// 6. 게임 루프
function animate() {
    requestAnimationFrame(animate);

    updatePlayerMovement();

    // 플레이어가 존재할 때만 카메라 업데이트
    if (player) {
        const cameraOffset = new THREE.Vector3(0, 4, 10);
        camera.position.copy(player.position).add(cameraOffset);
        camera.lookAt(player.position);
    }

    renderer.render(scene, camera);
}

// 7. 창 크기 조절 대응
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 애니메이션 루프 시작
animate();
