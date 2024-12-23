function activateMouseNormalMode () {}
function deactivateMouseNormalMode () {}

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
            normalMode.thread.postpone();
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
            normalMode.thread.postpone();
            mouseDown.node.goto("loop");
        }
    ]));

    normalMode.addNode(new ChainedFunctions([
        () => {
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
            normalMode.node.goto(0);
        }
    ]));

    normalMode.thread.push(normalMode);

    lab5App.subSprites.mouse.subSprites.normalMode.subSprites.mouseUp = mouseUp;
    lab5App.subSprites.mouse.subSprites.normalMode.subSprites.mouseDown = mouseDown;

    normalMode.addSubSprites(lab5App.subSprites.mouse.subSprites.normalMode.subSprites);

    activateMouseNormalMode = function () {
        normalMode.toggleOption(["show","subSprites","thread"],"active");
    }

    deactivateMouseNormalMode = function () {
        normalMode.toggleOption(["show","subSprites","thread"],"inactive");
        normalMode.node.restart();
    }

    deactivateMouseNormalMode();

    lab5App.subSprites.mouse.subSprites.normalMode = normalMode;
}