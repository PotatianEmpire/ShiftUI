let particleTest = {
    sprites: {
        background: new ImageSprite(0.5,0.2,0,0,images.cave),
        testEmitter: new ParticleEmitter(0.5,0.25,0.1,0.1,(particles) => {
            if (particleTest.emit) {
                for (let i = 0; i < 2; i++) {
                    let shootDirection = Math.random()
                    particles.push({
                        x: canvas.scale(particleTest.sprites.testEmitter.x) + Math.sin(shootDirection * Math.PI * 2) * 2000,
                        y: canvas.scale(particleTest.sprites.testEmitter.y) + Math.cos(shootDirection * Math.PI * 2) * 2000,
                        shootDirection: shootDirection + 0.5,
                        angle: Math.random(),
                        frame: 0,
                        color: `RGB(${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`,
                        radius: Math.random()
                    });
                }
                
            }
        }, (particle) => {
            if (Math.abs(canvas.unscale(particle.x) - particleTest.sprites.testEmitter.x) < 0.05 &&
            Math.abs(canvas.unscale(particle.y) - particleTest.sprites.testEmitter.y) < 0.05) {
                particle.delete = true;
                return;
            }
            canvas.context.save();
            particle.x += Math.sin(particle.shootDirection * Math.PI * 2) *5// 100/(particle.frame + 1);
            particle.y += Math.cos(particle.shootDirection * Math.PI * 2) *5// 100/(particle.frame + 1);
            // canvas.context.fillStyle = particle.color;
            canvas.context.fillStyle = "rgb(255, 255, 194)";
            const circle = new Path2D();
            circle.arc(particle.x, particle.y, 1 / (particle.frame + 1) * 100 * particle.radius, 0, 2 * Math.PI);

            
            canvas.context.fill(circle);
            particle.frame += particle.frame > 10 ? 0.025: 0.025;
            // canvas.context.fillRect(particle.x - canvas.scale(0.05 / 2),particle.y - canvas.scale(0.05 / 2),canvas.scale(0.05),canvas.scale(0.05));
            canvas.context.restore();
        })
    },
    particleTestInit : () => {
        // particleTest.sprites.testEmitter.addImage(images.dragon);
        // particleTest.sprites.testEmitter.addText(`
        //     vinque-rg 0.02 #FF0000 center "I am the dragon!"`,1.1,"top")
        particleTest.sprites.background.width = canvas.unscale(images.cave.width);
        particleTest.sprites.background.height = canvas.unscale(images.cave.height);
        return particleTest.particleTest;
    },
    particleTest:() => {
        if (mouse.getMouseDown()) {
            particleTest.emit = true;
        } else {
            particleTest.emit = false;
        }
        particleTest.sprites.testEmitter.x = mouse.getMouseX();
        particleTest.sprites.testEmitter.y = mouse.getMouseY();
        canvas.clear();
        canvas.render(particleTest.sprites)
        return particleTest.particleTest;
    }
}