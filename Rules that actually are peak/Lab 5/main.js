let canvas = new Canvas("view");
let lab5 = new Sprite ();

function init () {
    constructMouseNormalMode();
    constructMouse();
    constructTitleScreen();
    constructLab5();
}


function main () {

    canvas.runThreads(lab5);
    console.log("----- threads completed running -----");

    canvas.prepareRender(lab5);
    console.log("----- rendering prepared -----");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.clear();
    console.log("----- frame cleared and window size adjusted -----");

    canvas.render(lab5);
    console.log("----- new frame -----");

}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);