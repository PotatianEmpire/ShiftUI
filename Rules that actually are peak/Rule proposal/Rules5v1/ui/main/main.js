let fps = 60;
let frames = 1;
let start = Date.now();

let stage = load.load;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let main = () => {

    stage = stage();

    frames++;

    if (frames == fps) {
        console.log(Math.round(frames/((Date.now() - start) / 1000)))
        frames = 1;
        start = Date.now();
    }

}

setInterval(() => main(),1000/fps);

