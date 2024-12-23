let mouseEvents = {
    mouseDown: new EventDistributor(),
    mouseUp: new EventDistributor(),
    mousePress: false,
    mouseScroll: new EventDistributor()
}

function constructMouse () {
    let mouse = new Sprite();

    mouse.dimensions.assignVal(0.2,0.2);

    //mouse.toggleOption(["show","subSprites"],"inactive");
    
    mouse.addSubSprites(lab5App.subSprites.mouse.subSprites);

    document.addEventListener("mousedown",(ev) => {
        if (!mouseEvents.mousePress) {
            mouseEvents.mousePress = true;
            mouseEvents.mouseDown.distribute(ev);
        } else {
            mouseEvents.mousePress = true;
            mouseEvents.mouseUp.distribute(ev);
            mouseEvents.mouseDown.distribute(ev);
        }
    });

    document.addEventListener("mouseup",(ev) => {
        if (mouseEvents.mousePress) {
            mouseEvents.mousePress = false;
            mouseEvents.mouseUp.distribute(ev);
        } else {
            mouseEvents.mousePress = false;
            mouseEvents.mouseDown.distribute(ev);
            mouseEvents.mouseUp.distribute(ev);
        }
    });
    
    document.addEventListener("scroll",(ev) => {
        mouseEvents.mouseScroll.distribute(ev);
    });
    
    document.addEventListener("mousemove",(ev) => {
        mouse.position.assignVal(ev.x,ev.y);
        mouse.position.assign( mouse.position.unscale(canvas.width/2).difference(canvas.centerPoint));
    });

    lab5App.subSprites.mouse = mouse;
}