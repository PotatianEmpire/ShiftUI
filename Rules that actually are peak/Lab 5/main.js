function init () {
    viewportInterface.width = window.innerWidth;
    viewportInterface.height = window.innerHeight;

    constructLab5();
}


function main () {
    viewportInterface.clear();
    console.log("----- new frame -----");
    viewportInterface.render(lab5);
}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);