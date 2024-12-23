function constructTitleScreen () {
    
    let titleScreen = new Sprite ();

    
    let clearCache = new Sprite ();
    let next = new Sprite ();

    // visual

    titleScreen.addSample(media.images.testSprite.a)

    // events

    clearCache.addEventDistributor();

    mouseEvents.mouseUp.addStream([clearCache,next]);

    keyboardEvents.keyDown.addStream(next);
    clearCache.eventDistributor.addStream(next);

    // logic

    clearCache.addNode(new ChainedFunctions([
        () => {
            clearCache.eventStream.clear();
        },
        () => {
            if (clearCache.eventStream.recent() &&
                clearCache.onSprite(mouseEvents.position)) {
                    lab5.thread.push(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox);
            }
            console.log("mx: " + mouseEvents.position.x + "my: " + mouseEvents.position.y);
            lab5.thread.postpone()
            clearCache.node.goto("loop");
        }
    ]))

    titleScreen.addNode(new ChainedFunctions([
        () => {},
        () => {
            lab5.thread.push([clearCache,next]);
        },
        () => {
            
        },
        () => {
            titleScreen.toggleOption("subSprites","inactive");
        }
    ]))

















    lab5App.subSprites.titleScreen.subSprites.clearCache = clearCache;
    lab5App.subSprites.titleScreen.subSprites.next = next;
    titleScreen.addSubSprites(lab5App.subSprites.titleScreen.subSprites);
    lab5App.subSprites.titleScreen = titleScreen;
}