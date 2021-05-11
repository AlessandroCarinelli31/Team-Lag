// JavaScript Document
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class particle {
    constructor(size, x, y, directionX, directionY) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
    }
    
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = '#ffffff';
        context.fill();
    }
    
    update() {
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
    }
}

function init() {
    let numParticles = canvas.width * canvas.height / 7000;
    for(let i = 0; i < numParticles; i ++) {
        var size = Math.floor(Math.random() * 5 + 1);
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        var directionX = Math.floor(Math.random() * 4 - 2);
        var directionY = Math.floor(Math.random() * 4 - 2);
        
        particles.push(new particle(size, x, y, directionX, directionY));
    }
}

function frame() {
    requestAnimationFrame(frame);
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i ++) {
        particles[i].update();
        particles[i].draw();
    }
}

init();
frame();