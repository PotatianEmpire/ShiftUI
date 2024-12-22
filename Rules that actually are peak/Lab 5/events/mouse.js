let mouseEvents = {
    mouseDown: new EventStream(),
    mouseUp: new EventStream(),
    mouseScroll: new EventStream()
}

function constructMouse () {
    let mouse = new Sprite();

    mouse.dimensions.assignVal(0.1,0.1,0.1);

    let mouseUp = new Sprite(new Coordinate(),new Coordinate(),new Coordinate(2,2,0.1));
    let mouseDown = new Sprite(new Coordinate(),new Coordinate(),new Coordinate(2,2,0.1));
    
    mouseUp.addSample(media.images.testSprite.arrow);
    mouseDown.addSample(media.images.highlightedTestSprite.arrow);

    mouse.addThread(new Thread());

    mouseUp.addNode(new ChainedFunctions([
        () => {
            mouseUp.toggleOption("show","active");
        },
        () => {
            if (mouseEvents.mouseDown.recent()) {
                mouseUp.toggleOption("show","inactive");
                mouseUp.node.return();
                return;
            }
            mouse.thread.postpone();
            mouseUp.node.goto("loop");
        }
    ]));

    mouseDown.addNode(new ChainedFunctions([
        () => {
            mouseDown.toggleOption("show","active");
        },
        () => {
            if (mouseEvents.mouseUp.recent()) {
                mouseDown.toggleOption("show","inactive");
                mouseDown.node.return();
                return;
            }
            mouse.thread.postpone();
            mouseDown.node.goto("loop");
        }
    ]));

    mouse.addNode(new ChainedFunctions([
        () => {
            mouseUp.node.restart();
            mouse.thread.push(mouseUp);
        },
        () => {
            mouseDown.node.restart();
            mouse.thread.push(mouseDown);
            mouse.node.goto("start");
            mouseEvents.mouseDown.clearCompleted();
            mouseEvents.mouseUp.clearCompleted();
        }
    ]));

    mouse.thread.push(mouse);

    console.log(mouse);
    

    mouse.addSubSprites({mouseDown: mouseDown,mouseUp: mouseUp});

    document.addEventListener("mousedown",(ev) => {
        mouseEvents.mouseDown.pushEvent(ev);
    });

    document.addEventListener("mouseup",(ev) => {
        mouseEvents.mouseUp.pushEvent(ev);
    });
    
    document.addEventListener("scroll",(ev) => {
        mouseEvents.mouseScroll.pushEvent(ev);
    });
    
    document.addEventListener("mousemove",(ev) => {
        mouse.position.assignVal(ev.x,ev.y,0);
        mouse.position.assign( mouse.position.unscale(canvas.width/2).difference(canvas.centerPoint));
    });

    lab5App.subSprites.mouse = mouse;
}