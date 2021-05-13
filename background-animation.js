// JavaScript Document
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const speedMultiplier = 0.01;
const linkThreshold = 0.1;

class particle {
    constructor(size, x, y, directionX, directionY, sticky) {
        this.size = Math.floor(size * 8);
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.sticky = sticky;
    }
    
    draw() {
        context.beginPath();
        context.arc(Math.floor(this.x * canvas.width), Math.floor(this.y * canvas.height), this.size, 0, Math.PI * 2, false);
        context.fillStyle = '#ffffff';
        context.fill();
    }
    
    update() {
        if(this.x > 1 || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > 1 || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
    }
    
    distanceTo(dest) {
        let dx = this.x - dest.x;
        let dy = this.y - dest.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }
}

function init() {
    let numParticles = canvas.width * canvas.height / 7000;
    for(let i = 0; i < numParticles; i ++) {
        var size = Math.random();
        var x = Math.random();
        var y = Math.random();
        var directionX = (Math.random() - 0.5) * speedMultiplier;
        var directionY = (Math.random() - 0.5) * speedMultiplier;
        var sticky = Math.floor(Math.random() * 10) % 8 == 0;
        
        particles.push(new particle(size, x, y, directionX, directionY, sticky));
    }
}

function particleDistance(p1, p2) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function frame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(frame);
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i ++) {
        particles[i].update();
        particles[i].draw();
    }
    
    /*for(let i = 0; i < particles.length; i ++) {
        if(particles[i].sticky) {
          for(let j = 0; j < particles.length; j ++) {
              if(particleDistance(particles[i], particles[j]) < linkThreshold) {
              context.beginPath();
              context.moveTo(Math.floor(particles[i].x * canvas.width), Math.floor(particles[i].y * canvas.height));
              context.lineTo(Math.floor(particles[j].x * canvas.height), Math.floor(particles[j].y * canvas.height));
              context.strokeStyle = '#ffffff';
              context.stroke();
              }
          }
        }
    }*/
}

init();
frame();