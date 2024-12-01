


function init () {

}

function main () {
    canvas.clear();
    canvas.render();
}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);