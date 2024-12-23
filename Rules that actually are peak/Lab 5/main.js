let canvas = new Canvas("view");
let lab5 = new Sprite ();

function init () {
    // initial clear to get canvas dimensions.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.clear();

    constructMouseNormalMode();
    constructMouse();
    constructTitleScreen();
    constructLab5();
}


function main () {

    canvas.runThreads(lab5);
    // console.log("----- threads completed running -----");

    canvas.runPreProcessors(lab5);
    // console.log("----- completed running preprocessors");

    canvas.prepareRender(lab5);
    // console.log("----- rendering prepared -----");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.clear();
    // console.log("----- frame cleared and window size adjusted -----");

    canvas.render(lab5);
    // console.log("----- new frame -----");

}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);