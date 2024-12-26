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
            if (clearCache.onSprite(mouseEvents.position)) {
                clearCache.node.goto("next");
                return;
            }

            console.log("clearCache idle");
            
            clearCache.node.postpone();
            clearCache.node.goto("loop");
        },
        () => {
            if (clearCache.eventStream.recent().name == "mousedown") {
                clearCache.node.goto("next");
                return;
            }
            
            console.log("mouse on clearCache");
            
            clearCache.node.postpone();
            clearCache.node.goto("loop");
        },
        () => {
            if (clearCache.eventStream.recent().name == "mouseup") {
                    clearCache.eventDistributor.distribute(new EventTask("block"));
                    lab5.thread.push(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox);
            }

            console.log("mousedown on clearCache")

            clearCache.node.postpone();
            clearCache.node.goto("loop");
        }
    ]))

    let clearCacheFunnel = Thread.createFunnel(clearCache,1,new EventStream(),
    (event) => !clearCache.onSprite(mouseEvents.position));

    next.addNode(new ChainedFunctions([
        () => {
            
            next.eventStream.clear();
            //console.log("titleScreen Next");

        },
        () => {

            let recentEvent = next.eventStream.prioritize("name","block");
            
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

            next.node.postpone();
            next.node.goto("loop");

        },
        () => {
            console.log("next")
        }
    ]))

    titleScreen.addNode(new ChainedFunctions([
        () => {
            lab5.thread.mergeHost(lab5App.subSprites.mouse.subSprites.normalMode);
            lab5.thread.merge(clearCacheFunnel);
            lab5.thread.merge([clearCache,next]);
        }
    ]))
















    clearCache.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache = clearCache;
    lab5App.subSprites.titleScreen.subSprites.next = next;
    titleScreen.addSubSprites(lab5App.subSprites.titleScreen.subSprites);
    lab5App.subSprites.titleScreen = titleScreen;
}