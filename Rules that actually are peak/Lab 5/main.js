function init () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    constructLab5();
}


function main () {
    canvas.clear();
    console.log("----- new frame -----");
    canvas.render(lab5);
}

let fps = 5;

init();
setInterval(() => {
    main();
},1000/fps);