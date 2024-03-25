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
        this.color = color;
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
    var numberOfParticles = 100;
    for (var i = 0; i < numberOfParticles; i++) {
        var radius = Math.random() * 5 + 2;
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var color = 'rgba(255, 255, 255, 0.5)';
        var velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
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
    }

    animate();
}