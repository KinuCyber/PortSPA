// particleModule.js

import { getMousePosition} from './eventManager.js';

const particleModule = (function () {
    let canvas, ctx, particlesArray = [];
    const mouse = {
        x: null,
        y: null,
        radius: 100 // Radius within which particles will avoid the mouse
    };
    const gradientPoints = [
        { x: 100, y: 100, color: { r: 255, g: 0, b: 0 } }, // Red
        { x: 500, y: 400, color: { r: 0, g: 255, b: 0 } }, // Green
        { x: 900, y: 200, color: { r: 0, g: 0, b: 255 } }  // Blue
    ];

    let themeColor; // Variable to store the theme color

    // Particle class with a z dimension for depth
    class Particle {
        constructor(x, y, z, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.z = z; // Depth
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.baseSize = size;
        }

        // Draw each particle
        draw() {
            const interpolatedColor = interpolateColors(this.x, this.y);

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let opacity = 1;
            if (distance < mouse.radius) {
                opacity = Math.max(0.1, 1 - distance / mouse.radius);
            }

            const scaleFactor = 1 / (this.z + 5);
            const size = this.baseSize * scaleFactor;

            ctx.fillStyle = `rgba(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b}, ${opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        // Update particle position
        update() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                this.x -= dx / distance * 2;
                this.y -= dy / distance * 2;
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
            }

            this.z += Math.sin(this.x * 0.01) * 0.05;

            // Ensure z is within bounds
            if (this.z < 0 || this.z > 20) {
                this.z = (this.z + 20) % 20;
            }

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
    }

    function interpolateColors(particleX, particleY) {
        let totalWeight = 0;
        let interpolatedColor = { r: 0, g: 0, b: 0 };

        gradientPoints.forEach(point => {
            const dx = particleX - point.x;
            const dy = particleY - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Weight inversely proportional to distance
            const weight = 1 / Math.max(distance, 1);
            totalWeight += weight;

            interpolatedColor.r += point.color.r * weight;
            interpolatedColor.g += point.color.g * weight;
            interpolatedColor.b += point.color.b * weight;
        });

        // Normalize by total weight
        interpolatedColor.r = Math.min(255, Math.max(0, interpolatedColor.r / totalWeight));
        interpolatedColor.g = Math.min(255, Math.max(0, interpolatedColor.g / totalWeight));
        interpolatedColor.b = Math.min(255, Math.max(0, interpolatedColor.b / totalWeight));

        return interpolatedColor;
    }

    // Initialize particles
    function init() {
        canvas = document.getElementById('bgParticleCanvas');
        if (!canvas) {
            console.error("Canvas element with ID 'bgParticleCanvas' not found");
            return;
        }

        ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("2D context could not be initialized");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Retrieve the theme color from CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const colorValue = rootStyles.getPropertyValue('--theme-color').trim();
        const rgb = colorValue.match(/\d+/g).map(Number);
        themeColor = { r: rgb[0], g: rgb[1], b: rgb[2] };

        particlesArray = [];
        const numberOfParticles = 200;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 5 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const z = Math.random() * 20;
            const speedX = (Math.random() - 0.5) * 2;
            const speedY = (Math.random() - 0.5) * 2;
            particlesArray.push(new Particle(x, y, z, size, speedX, speedY));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const dz = particlesArray[a].z - particlesArray[b].z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < 100) {
                    const colorA = interpolateColors(particlesArray[a].x, particlesArray[a].y);
                    const colorB = interpolateColors(particlesArray[b].x, particlesArray[b].y);

                    const gradient = ctx.createLinearGradient(
                        particlesArray[a].x, particlesArray[a].y,
                        particlesArray[b].x, particlesArray[b].y
                    );

                    gradient.addColorStop(0, `rgba(${colorA.r}, ${colorA.g}, ${colorA.b}, ${1 - distance / 100})`);
                    gradient.addColorStop(1, `rgba(${colorB.r}, ${colorB.g}, ${colorB.b}, ${1 - distance / 100})`);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const mousePosition = getMousePosition();
        mouse.x = mousePosition.x;
        mouse.y = mousePosition.y;

        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    // Public API
    return { init, animate };
})();

// Export module functions
export { particleModule };
