const numbersDisplay = document.getElementById('numbers-display');
const generateButton = document.getElementById('generate-button');
const themeSwitch = document.getElementById('theme-switch');

// 로또 번호에 따른 색상 클래스를 반환하는 함수
function getColorClass(number) {
    if (number <= 10) return 'color-1';
    if (number <= 20) return 'color-2';
    if (number <= 30) return 'color-3';
    if (number <= 40) return 'color-4';
    return 'color-5';
}

// 6개의 고유한 로또 번호를 생성하는 함수
function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// 생성된 번호를 화면에 표시하는 함수
function displayNumbers(numbers) {
    numbersDisplay.innerHTML = '';
    for (const number of numbers) {
        const numberCircle = document.createElement('div');
        numberCircle.classList.add('number-circle');
        numberCircle.classList.add(getColorClass(number)); // 색상 클래스 추가
        numberCircle.textContent = number;
        numbersDisplay.appendChild(numberCircle);
    }
}

// 번호 생성 버튼 이벤트 리스너
generateButton.addEventListener('click', () => {
    const generatedNumbers = generateNumbers();
    displayNumbers(generatedNumbers);
});

// --- 테마 전환 로직 ---
const THEME_KEY = 'lotto_theme';

// 테마를 적용하고 localStorage에 저장하는 함수
function applyTheme() {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem(THEME_KEY, 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem(THEME_KEY, 'light');
    }
}

// 테마 스위치 변경 이벤트 리스너
themeSwitch.addEventListener('change', applyTheme);

// 페이지 로드 시 저장된 테마를 확인하고 적용
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        themeSwitch.checked = true;
    }
    applyTheme();
}

// 페이지가 로드되면 테마 적용
loadTheme();
