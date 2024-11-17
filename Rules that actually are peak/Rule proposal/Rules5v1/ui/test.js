let particleTest = {
    sprites: {
        testEmitter: new ParticleEmitter(0.5,0.25,0,0,(particles) => {
            if (frames % 5 == 0 || true) {
                for (let i = 0; i < 1; i++) {
                    particles.push({
                        x: canvas.scale(particleTest.sprites.testEmitter.x),
                        y: canvas.scale(particleTest.sprites.testEmitter.y),
                        shootDirection: Math.random(),
                        angle: Math.random(),
                    });
                }
                
            }
        }, (particle) => {
            if (Math.abs(canvas.unscale(particle.x) - particleTest.sprites.testEmitter.x) > 0.25 ||
            Math.abs(canvas.unscale(particle.y) - particleTest.sprites.testEmitter.y) > 0.25) {
                particle.delete = true;
                return;
            }
            canvas.context.save();
            particle.x += Math.sin(particle.shootDirection * Math.PI * 2);
            particle.y += Math.cos(particle.shootDirection * Math.PI * 2);
            canvas.context.fillStyle = `darkslategrey`
            canvas.context.fillRect(particle.x - canvas.scale(0.005 / 2),particle.y - canvas.scale(0.005 / 2),canvas.scale(0.005),canvas.scale(0.005));
            canvas.context.restore();
        })
    },
    particleTestInit : () => {
        canvas.sprites = particleTest.sprites;
        return particleTest.particleTest;
    },
    particleTest:() => {
        canvas.clear();
        canvas.render(particleTest.sprites)
        return particleTest.particleTest;
    }
}