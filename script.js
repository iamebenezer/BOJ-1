window.onload = function() {
    // Initialize canvas and context
    var canvas = document.getElementById('particle-canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    function Particle(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color; // #9a5b3a color
        this.velocity = velocity;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.update = function() {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // Keep particles within canvas bounds
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.velocity.y = -this.velocity.y;
            }
        }
    }

    // Create particles
    var particles = [];
    var numberOfParticles = 50;
    for (var i = 0; i < numberOfParticles; i++) {
        var radius = 2;
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var color = '#9a5b3a'; // #9a5b3a color
        var angle = Math.random() * Math.PI * 2;
        var velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
        particles.push(new Particle(x, y, radius, color, velocity));
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function(particle) {
            particle.update();
        });

        // Draw lines between particles to form web
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#fff'; // #9a5b3a color
                    ctx.stroke();
                }
            }
        }
    }

    animate();
}
