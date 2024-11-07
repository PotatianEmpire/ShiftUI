let fps = 60;

let stage = load.load;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let main = () => {

    stage = stage();

}

setInterval(() => main(),1000/fps);

