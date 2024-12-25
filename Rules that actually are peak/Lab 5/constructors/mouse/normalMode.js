
function constructMouseNormalMode () {

    let normalMode = new Sprite ();

    let mouseUp = new Sprite ();
    let mouseDown = new Sprite ();

    mouseUp.addSample(media.images.testSprite.arrow);
    mouseDown.addSample(media.images.highlightedTestSprite.arrow);

    mouseEvents.mouseDown.addStream(mouseUp);
    mouseEvents.mouseUp.addStream(mouseDown);
    
    normalMode.addThread();
    
    mouseUp.addNode(new ChainedFunctions([
        () => {
            mouseUp.toggleOption("show","active");
        },
        () => {
            if (mouseUp.eventStream.recent()) {
                mouseUp.toggleOption("show","inactive");
                mouseUp.node.goto("start");
                mouseUp.node.return();
                return;
            }
            mouseUp.node.postpone();
            mouseUp.node.goto("loop");
        }
    ]));

    mouseDown.addNode(new ChainedFunctions([
        () => {
            mouseDown.toggleOption("show","active");
        },
        () => {
            if (mouseDown.eventStream.recent()) {
                mouseDown.toggleOption("show","inactive");
                mouseDown.node.goto("start");
                mouseDown.node.return();
                return;
            }
            mouseDown.node.postpone();
            mouseDown.node.goto("loop");
        }
    ]));

    normalMode.addNode(new ChainedFunctions([
        () => {
            normalMode.toggleOption(["show","subSprites"],"active");
            mouseDown.eventStream.clear();
            mouseUp.eventStream.clear();
        },
        () => {
            normalMode.thread.push(mouseUp);
        },
        () => {
            normalMode.thread.push(mouseDown);
        },
        () => {
            normalMode.node.goto(1);
        }
    ]));

    normalMode.thread.push(normalMode);

    lab5App.subSprites.mouse.subSprites.normalMode.subSprites.mouseUp = mouseUp;
    lab5App.subSprites.mouse.subSprites.normalMode.subSprites.mouseDown = mouseDown;

    normalMode.addSubSprites(lab5App.subSprites.mouse.subSprites.normalMode.subSprites);

    normalMode.toggleOption(["show","subSprites","thread"],"inactive");

    lab5App.subSprites.mouse.subSprites.normalMode = normalMode;
}