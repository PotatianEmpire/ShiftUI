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
}


init ();
app.start();