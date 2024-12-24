/**
 * mouse events have an importance value of 5 on default.
 */
let mouseEvents = {
    importance: 5,
    mouseDown: new EventDistributor(),
    mouseUp: new EventDistributor(),
    mousePress: false,
    mouseScroll: new EventDistributor(),
    position: new Coordinate()
}

function constructMouse () {
    let mouse = new Sprite();

    mouse.dimensions.assignVal(0.2,0.2);

    //mouse.toggleOption(["show","subSprites"],"inactive");
    
    mouse.addSubSprites(lab5App.subSprites.mouse.subSprites);

    document.addEventListener("mousedown",(ev) => {
        let event = new EventTask ("mousedown",mouseEvents.importance);
        if (!mouseEvents.mousePress) {
            mouseEvents.mousePress = true;
            mouseEvents.mouseDown.distribute(event);
        } else {
            mouseEvents.mousePress = true;
            mouseEvents.mouseUp.distribute(event);
            mouseEvents.mouseDown.distribute(event);
        }
    });

    document.addEventListener("mouseup",(ev) => {
        let event = new EventTask("mouseup",mouseEvents.importance)
        if (mouseEvents.mousePress) {
            mouseEvents.mousePress = false;
            mouseEvents.mouseUp.distribute(event);
        } else {
            mouseEvents.mousePress = false;
            mouseEvents.mouseDown.distribute(event);
            mouseEvents.mouseUp.distribute(event);
        }
    });
    
    document.addEventListener("wheel",(ev) => {
        let event = new EventTask("scroll",mouseEvents.importance);
        event.deltaY = ev.deltaY;
        mouseEvents.mouseScroll.distribute(event);
    });
    
    document.addEventListener("mousemove",(ev) => {
        mouse.position.assignVal(2 * ev.x / app.canvas.width,2 * ev.y / app.canvas.width);
        mouse.position.assign( mouse.position.difference(app.canvas.centerPoint));
    });

    lab5App.subSprites.mouse = mouse;
    mouseEvents.position = mouse.position;
}