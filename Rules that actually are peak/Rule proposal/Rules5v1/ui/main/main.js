let fps = 60;
let frames = 1;
let start = Date.now();

let stage = load.load;

let testStage = startMenu.startMenuInit;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let main = () => {

    stage = stage();

    frames++;

    if (frames == fps) {
        console.log(Math.round(frames/((Date.now() - start) / 1000)))
        console.log("particle count = " + particleTest.sprites.testEmitter.particles.length)
        frames = 1;
        start = Date.now();
    }

}

console.log(canvas.unscale(0.5))

let intervalId = setInterval(() => main(),1000/fps);
