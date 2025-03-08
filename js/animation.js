const roseContainer = document.getElementById('rose-container');
const message = document.getElementById('message');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

roseContainer.addEventListener('click', () => {
    message.classList.add('show-message');
    roseContainer.classList.add('rose-hidden');
    drawHeartWithParticles();
});

function drawHeartWithParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const heartSize = Math.min(canvas.width, canvas.height) * 0.4;
    const particles = [];
    const numParticles = 200;
    
    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * heartSize * 0.8;
        particles.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            targetX: 0,
            targetY: 0,
            radius: Math.random() * 3 + 1,
            color: `rgb(${200 + Math.random() * 55}, ${Math.random() * 50}, ${Math.random() * 50})`,
            speed: Math.random() * 2 + 1
        });
    }
    
    const heartPoints = [];
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const x = centerX + heartSize * 16 * Math.pow(Math.sin(angle), 3) / 16;
        const y = centerY - heartSize * (13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle)) / 16;
        heartPoints.push({x, y});
    }
    
    for (let i = 0; i < particles.length; i++) {
        const targetPoint = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        particles[i].targetX = targetPoint.x;
        particles[i].targetY = targetPoint.y;
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let completed = true;
        
        for (const particle of particles) {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 1) {
                completed = false;
                particle.x += (dx / distance) * particle.speed;
                particle.y += (dy / distance) * particle.speed;
            }
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        }
        
        if (!completed) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}