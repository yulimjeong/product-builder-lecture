// --- Lotto Color Logic ---
function getColor(n) {
    if (n <= 10) return '#f44336';
    if (n <= 20) return '#ff9800';
    if (n <= 30) return '#fbc02d';
    if (n <= 40) return '#4caf50';
    return '#2196f3';
}

// --- Generate Lotto Numbers ---
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

// --- Theme Logic ---
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

// --- Animal Similarity Test Logic ---
const TM_URL = "https://teachablemachine.withgoogle.com/models/Yk4de7eck/";
let animalModel;

async function loadAnimalModel() {
    const modelURL = TM_URL + "model.json";
    const metadataURL = TM_URL + "metadata.json";
    animalModel = await tmImage.load(modelURL, metadataURL);
}

document.getElementById('image-upload').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = document.getElementById('face-image');
        img.src = e.target.result;
        img.style.display = 'block';
        
        const loadingMsg = document.getElementById('loading-msg');
        loadingMsg.style.display = 'block';
        
        if (!animalModel) {
            try {
                await loadAnimalModel();
            } catch (err) {
                console.error("Failed to load model:", err);
                loadingMsg.textContent = "Error loading AI model.";
                return;
            }
        }
        
        const prediction = await animalModel.predict(img);
        loadingMsg.style.display = 'none';
        
        const labelContainer = document.getElementById('label-container');
        labelContainer.innerHTML = '';
        
        // Sort predictions by probability (descending)
        prediction.sort((a, b) => b.probability - a.probability).forEach(p => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const prob = (p.probability * 100).toFixed(1);
            resultItem.innerHTML = `
                <div class="result-label">${p.className}</div>
                <div class="result-bar-bg">
                    <div class="result-bar-fill" style="width: ${prob}%"></div>
                </div>
                <div class="result-percent">${prob}%</div>
            `;
            labelContainer.appendChild(resultItem);
        });
    };
    reader.readAsDataURL(file);
});
