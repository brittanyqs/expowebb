// ==== Fondo con estrellas y sol en movimiento ====
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 300; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5 + 0.5
  });
}

let angle = 0;
const sunRadius = 40;
const sunOrbitRadius = 100;
const sunCenter = {
  x: canvas.width / 2,
  y: canvas.height / 2.5
};

function drawSun(x, y) {
  const gradient = ctx.createRadialGradient(x, y, 10, x, y, sunRadius);
  gradient.addColorStop(0, '#ffff00');
  gradient.addColorStop(0.5, '#ffaa00');
  gradient.addColorStop(1, 'rgba(255,140,0,0.3)');
  ctx.beginPath();
  ctx.arc(x, y, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function animateStarsAndSun() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    star.y += star.d;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  const sunX = sunCenter.x + Math.cos(angle) * sunOrbitRadius;
  const sunY = sunCenter.y + Math.sin(angle) * sunOrbitRadius;
  drawSun(sunX, sunY);

  angle += 0.005;
  requestAnimationFrame(animateStarsAndSun);
}

animateStarsAndSun();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  sunCenter.x = canvas.width / 2;
  sunCenter.y = canvas.height / 2.5;
});
