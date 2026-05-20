const numbersDisplay = document.getElementById('numbers-display');
const generateButton = document.getElementById('generate-button');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersDisplay.innerHTML = '';
    for (const number of numbers) {
        const numberCircle = document.createElement('div');
        numberCircle.classList.add('number-circle');
        numberCircle.textContent = number;
        numbersDisplay.appendChild(numberCircle);
    }
}

generateButton.addEventListener('click', () => {
    const generatedNumbers = generateNumbers();
    displayNumbers(generatedNumbers);
});

// Initial generation
const initialNumbers = generateNumbers();
displayNumbers(initialNumbers);