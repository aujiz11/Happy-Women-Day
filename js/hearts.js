function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const heartTypes = ['❤️', '💕', '💖', '💗', '💓'];
    const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    const size = Math.floor(Math.random() * 30) + 10;
    heart.textContent = heartType;
    heart.style.fontSize = `${size}px`;
    
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    
    const duration = Math.random() * 10 + 5;
    heart.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createFloatingHeart, 500);