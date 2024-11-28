let fps = 1;

let sprites = {
    testSprite: new Sprite()
}

function init () {

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    sprites.testSprite.addText(`"threads"`);

    let secondSubThread = new Thread ([
        (args,thread) => {
            console.log("subThread called by subThread called by " + args.origin + " looping until mouse is pressed...");
            if(mouse.getMouseClicks() <= 0) {
                thread.requestNextFrameAndLoop();
                return;
            }
            thread.returnThread();
        },
        (args,thread) => {
            console.log("if this was called something is wrong...");
        }
    ])

    let subThread = new Thread ([
        (args,thread) => {
            console.log("subThread called by " + args.origin + " function part 1");
        },
        (args,thread) => {
            console.log("subThread called by " + args.origin + " function part 2");
            thread.lendThread(secondSubThread,args);
        }
    ])

    sprites.testSprite.addThread(new Thread([
        (args,thread) => {
            console.log("sprite.testSprite thread function part 1");
            thread.lendThread(subThread,{origin: "turtle"});
        },
        (args,thread) => {
            console.log("sprite.testSprite thread function part 2");
        },
        (args,thread) => {
            console.log("sprite.testSprite thread function part 3");
        }
    ]))

    sprites.testSprite.thread.makeThreadOrigin();

}

init()

setInterval(() => {
    canvas.clear();
    canvas.render(sprites);
    console.log("render complete")
},1000/fps);