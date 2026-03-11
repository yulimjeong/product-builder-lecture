// Lotto Color Logic
function getColor(n) {
    if (n <= 10) return '#f44336';
    if (n <= 20) return '#ff9800';
    if (n <= 30) return '#fbc02d';
    if (n <= 40) return '#4caf50';
    return '#2196f3';
}

// Generate Lotto Numbers
document.getElementById('generator-btn').addEventListener('click', () => {
    const container = document.getElementById('lotto-numbers-container');
    container.innerHTML = '';
    
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    Array.from(numbers).sort((a, b) => a - b).forEach((num, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = 'lotto-ball';
            ball.style.backgroundColor = getColor(num);
            ball.textContent = num;
            container.appendChild(ball);
        }, index * 100);
    });
});

// Theme Logic
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = '☀️ Light Mode';
} else {
    themeBtn.textContent = '🌙 Dark Mode';
}

themeBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
