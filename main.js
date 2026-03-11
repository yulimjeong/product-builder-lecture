// Function to get color based on number
function getColor(number) {
    if (number <= 10) return '#f44336'; // Red
    if (number <= 20) return '#ff9800'; // Orange
    if (number <= 30) return '#fbc02d'; // Yellow (Darker for visibility)
    if (number <= 40) return '#4caf50'; // Green
    return '#2196f3'; // Blue
}

// Function to create a lotto ball element
function createLottoBall(number) {
    const ball = document.createElement('div');
    ball.className = 'lotto-ball';
    ball.textContent = number;
    ball.style.backgroundColor = getColor(number);
    return ball;
}

// Generator Button Click Event
document.getElementById('generator-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = ''; // Clear previous numbers
    
    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    // Sort and display numbers
    Array.from(numbers)
        .sort((a, b) => a - b)
        .forEach(number => {
            const ball = createLottoBall(number);
            lottoNumbersContainer.appendChild(ball);
        });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    
    localStorage.setItem('theme', theme);
});
