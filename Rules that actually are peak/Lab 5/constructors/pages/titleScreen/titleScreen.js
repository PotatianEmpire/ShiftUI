function constructTitleScreen () {
    
    let titleScreen = new Sprite ();

    
    let clearCache = new Sprite ();
    let next = new Sprite ();

    // visual

    // events

    clearCache.addEventDistributor();
    next.addEventDistributor();

    mouseEvents.mouseDown.addStream(clearCache);
    mouseEvents.mouseUp.addStream([clearCache,next]);

    keyboardEvents.keyDown.addStream(next);
    clearCache.eventDistributor.addStream(next);

    next.eventDistributor.addStream(clearCache);

    // logic

    clearCache.addNode(new ChainedFunctions([
        () => {
            clearCache.eventStream.clear();
            console.log("clearCache");
        },
        () => {
            if (clearCache.eventStream.recent() &&
                clearCache.onSprite(mouseEvents.position)) {
                    clearCache.eventDistributor.distribute(new EventTask("block"));
                    //lab5.thread.push(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox);
            }
            lab5.thread.postpone();
            clearCache.node.goto("loop");
        }
    ]))

    next.addNode(new ChainedFunctions([
        () => {
            next.eventStream.clear();
            console.log("titleScreen Next");
        },
        () => {
            let recentEvent = next.eventStream.recent();
            if (recentEvent.name == "block") {
                next.eventStream.clear();
                next.node.goto("loop");
                return;
            }
            if (recentEvent) {
                next.eventDistributor.distribute(new EventTask("next"));
                next.node.goto("next");
                return;
            }
            lab5.thread.postpone();
            next.node.goto("loop");
        },
        () => {
            console.log("next")
        }
    ]))

    titleScreen.addNode(new ChainedFunctions([
        () => {
            lab5.thread.host(lab5App.subSprites.mouse.subSprites.normalMode);
            lab5.thread.merge([clearCache,next]);
        }
    ]))
















    clearCache.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache = clearCache;
    lab5App.subSprites.titleScreen.subSprites.next = next;
    titleScreen.addSubSprites(lab5App.subSprites.titleScreen.subSprites);
    lab5App.subSprites.titleScreen = titleScreen;
}