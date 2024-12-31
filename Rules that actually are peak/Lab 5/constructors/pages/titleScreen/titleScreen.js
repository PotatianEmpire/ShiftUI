function constructTitleScreen () {
    
    let titleScreen = new Sprite ();

    
    let clearCache = new Sprite ();
    let next = new Sprite ();

    // visual

    // events

    clearCache.addEventDistributor();
    next.addEventDistributor();

    mouseEvents.mouseDown.addStream([clearCache,next]);
    mouseEvents.mouseUp.addStream([clearCache,next]);

    keyboardEvents.keyDown.addStream(next);
    keyboardEvents.keyUp.addStream(next);
    clearCache.eventDistributor.addStream(next);

    next.eventDistributor.addStream(clearCache);

    // logic

    let clearCacheFunnel = new ChainedFunctions();

    clearCache.addNode(new ChainedFunctions([
        () => {
            clearCache.eventStream.clear();
            console.log("---$ clearCache");
        },
        () => {
            clearCacheFunnel.toggleOption("paused");
            console.log("> clearCache idle");
        },
        () => {
            if (clearCache.onSprite(mouseEvents.position)) {
                console.log("> mouse on clearCache");

                clearCacheFunnel.toggleOption("paused");
                clearCache.node.goto("next");
                return;
            }
            
            clearCache.node.postpone();
            clearCache.node.goto("loop");
        },
        () => {
            if (clearCache.eventStream.recent().name == "mousedown") {
                clearCache.eventDistributor.distribute(new EventTask("block"));

                console.log("> mousedown on clearCache");
                
                clearCache.node.goto("next");
                return;
            }
            
            
            clearCache.node.postpone();
            clearCache.node.goto("loop");
        },
        () => {
            if (clearCache.eventStream.recent().name == "mouseup") {
                lab5.thread.push(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox);
                return;
            }

            clearCache.node.postpone();
            clearCache.node.goto("loop");
        },
        () => {
            clearCache.node.restart();
        }
    ]))

    clearCacheFunnel = Thread.createFunnel(clearCache,1,new EventStream(),
    (event) => !clearCache.onSprite(mouseEvents.position));

    next.addNode(new ChainedFunctions([
        () => {
            
            next.eventStream.clear();
            console.log("---$ next");

        },
        () => {
            let recentEvent = next.eventStream.prioritize("name","block");

            if (recentEvent.name == "block") {
                next.eventStream.clear();
                next.node.goto("loop");
                return;
            }

            if (recentEvent.name == "keydown" || recentEvent.name == "mousedown") {
                console.log("next mousedown")

                next.node.goto("next");
                return;
            }

            next.node.postponedGoto("loop");
        },
        () => {
            let recentEvent = next.eventStream.recent();

            if (recentEvent.name == "mouseup" || recentEvent.name == "keyup") {
                console.log("!> next");
                next.eventDistributor.distribute(new EventTask("next"));
                next.node.goto("next");
                return;
            }

            if (!next.eventStream.empty()) {
                next.node.goto("next");
                return;
            }

            next.node.postponedGoto("loop");
        },
        () => {
            
        }
    ]))

    keyboardEvents.keyDown.addStream(titleScreen);

    titleScreen.addNode(new ChainedFunctions([
        () => {
            
            console.log("--$ titleScreen");

            lab5.thread.mergeHost(lab5App.subSprites.mouse.subSprites.normalMode);
            lab5.thread.merge(clearCacheFunnel);
            lab5.thread.merge([clearCache,next]);
        },
        () => {
            let recentEvent = titleScreen.eventStream.recent();

            if (recentEvent) {
                console.log(recentEvent);
            }

            titleScreen.node.postponedGoto("loop");
        }
    ]))
















    clearCache.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache = clearCache;
    lab5App.subSprites.titleScreen.subSprites.next = next;
    titleScreen.addSubSprites(lab5App.subSprites.titleScreen.subSprites);
    lab5App.subSprites.titleScreen = titleScreen;
}