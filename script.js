// Messages pour Mame Diarra
const messages = [
    "Chaque seconde passée à penser à toi est un trésor que je garde précieusement.",
    "Mame Diarra, ton nom résonne dans mon cœur comme une douce mélodie sénégalaise.",
    "Le monde est plus lumineux depuis que tu en fais partie.",
    "Si les étoiles pouvaient parler, elles te diraient à quel point tu es unique.",
    "Ton sourire est ma source d'énergie préférée.",
    "Plus qu'un nom, Mame Diarra Sall est ma plus belle pensée quotidienne.",
    "Il n'y a pas assez de mots en français ou en wolof pour décrire ce que je ressens.",
    "Dans l'univers infini de mon existence, tu es l'étoile qui guide mon chemin.",
    "Ton amour est la force qui transforme mes tempêtes en océans calmes.",
    "Même si le temps s'arrête, mon amour pour toi continuera d'éternité en éternité."
];

let currentIndex = 0;
const textElement = document.getElementById('dynamic-text');
let musicStarted = false;

const audio = new Audio('vj.mp3');
audio.loop = true;
audio.volume = 0.5;

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');

    if (!musicStarted) {
        audio.play().then(() => {
            musicStarted = true;
            musicBtn.innerHTML = '<i class="fa-solid fa-pause mr-1"></i> Lecture';
            musicBtn.classList.remove('bg-gray-700');
            musicBtn.classList.add('bg-green-600');
        }).catch(e => console.log('Audio play failed:', e));
    } else {
        if (audio.paused) {
            audio.play();
            musicBtn.innerHTML = '<i class="fa-solid fa-pause mr-1"></i> Lecture';
            musicBtn.classList.remove('bg-rose-600');
            musicBtn.classList.add('bg-green-600');
        } else {
            audio.pause();
            musicBtn.innerHTML = '<i class="fa-solid fa-play mr-1"></i> Pause';
            musicBtn.classList.remove('bg-green-600');
            musicBtn.classList.add('bg-green-600');
        }
    }
}

let isTyping = false;
function changeMessage() {
    if (isTyping) return;
    isTyping = true;

    // Fade out animation
    textElement.classList.add('fade-out');

    setTimeout(() => {
        const msg = messages[currentIndex];
        textElement.textContent = '';
        textElement.classList.remove('fade-out');
        textElement.classList.add('fade-in');

        let i = 0;
        const interval = setInterval(() => {
            textElement.textContent += msg[i];
            i++;
            if (i >= msg.length) {
                clearInterval(interval);
                setTimeout(() => {
                    textElement.classList.remove('fade-in');
                    isTyping = false;
                }, 500);
            }
        }, 70);
        currentIndex = (currentIndex + 1) % messages.length;
    }, 300);
}

// Animation des étoiles
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.8 + 0.2
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();
changeMessage();



document.addEventListener('click', function (e) {
  if (e.target.closest('a, button, input, textarea, select, label')) return;
  createHeart(e.clientX, e.clientY);
});

function createHeart(x, y) {
  const container = document.getElementById('heart-container');
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.innerText = '❤️';

  // décalage aléatoire
  const offsetX = Math.random() * 40 - 20;
  const offsetY = Math.random() * 20 - 10;

  heart.style.left = (x + offsetX) + 'px';
  heart.style.top = (y + offsetY) + 'px';

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}