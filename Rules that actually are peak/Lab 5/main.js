let lab5 = new Sprite ();
let app = new ShiftEngine("view",lab5);

function init () {
    // initial clear to get canvas dimensions.
    app.canvas.width = window.innerWidth;
    app.canvas.height = window.innerHeight;
    app.canvas.clear();

    constructMouseNormalMode();
    constructMouse();
    constructClearCacheConfirmation();
    constructTitleScreen();
    constructLab5();
    
    app = new ShiftEngine("view",lab5);
    app.fps = 1
}


init ();
app.start();

setInterval(() => {
    console.log(`rendered ${app.frame} frames in 10 seconds
which is ${app.frame / 10} frames per second.
target of ${app.fps}`);
    app.frame = 0;
},10000)