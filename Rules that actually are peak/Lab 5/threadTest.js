let fps = 1;

let sprites = {
    testSprite: new Sprite()
}

function init () {

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    sprites.testSprite.addText(`"threads"`);

    let secondSubThread = new Thread ([
        () => {
            console.log("subThread called by subThread called by " + secondSubThread.args.origin + " looping until mouse is pressed...");
            if(mouse.getMouseClicks() <= 0) {
                secondSubThread.requestNextFrameAndLoop();
                return;
            }
            secondSubThread.returnThread();
        },
        () => {
            console.log("if this was called something is wrong...");
        }
    ])

    let subThread = new Thread ([
        () => {
            console.log("subThread called by " + subThread.args.origin + " function part 1");
        },
        () => {
            console.log("subThread called by " + subThread.args.origin + " function part 2");
            subThread.lendThread(secondSubThread,subThread.args);
        }
    ])

    let mainThread = new Thread([
        () => {
            console.log("sprite.testSprite thread function part 1");
            mainThread.lendThread(subThread,{origin: "turtle"});
        },
        () => {
            console.log("sprite.testSprite thread function part 2");
            mainThread.pause()
        },
        () => {
            console.log("sprite.testSprite thread function part 3");
            mainThread.pause()
        }
    ])

    sprites.testSprite.addThread(mainThread)

    sprites.testSprite.thread.makeThreadOrigin();

}

init()

setInterval(() => {
    canvas.clear();
    canvas.render(sprites);
    console.log("render complete")
},1000/fps);