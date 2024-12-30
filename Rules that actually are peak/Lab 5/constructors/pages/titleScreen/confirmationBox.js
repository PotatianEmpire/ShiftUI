function constructClearCacheConfirmation () {
    let confirmationBox = new Sprite ();

    let confirm = new Sprite();
    let cancel = new Sprite();

    // visual

    // events

    confirm.addEventDistributor();
    cancel.addEventDistributor();

    mouseEvents.mouseDown.addStream([confirm,cancel]);
    mouseEvents.mouseUp.addStream([confirm,cancel]);

    confirm.eventDistributor.addStream([cancel,confirmationBox]);
    cancel.eventDistributor.addStream([confirm,confirmationBox]);

    // logic

    let confirmButtonFunnel = new ChainedFunctions();

    confirm.addNode(new ChainedFunctions([
        () => {
            confirm.eventStream.clear();
        },
        () => {
            console.log("idle confirm");
            confirmButtonFunnel.toggleOption("paused");
        },
        () => {
            if (confirm.onSprite(mouseEvents.position)) {
                console.log("mouseon confirm");

                confirmButtonFunnel.toggleOption("paused");
                return;
            }

            confirm.node.postponedGoto("loop");
        },
        () => {
            if (confirm.eventStream.recent().name == "mousedown") {
                console.log("mousedown confirm");

                return;
            }

            confirm.node.postponedGoto("loop");
        },
        () => {
            if (confirm.eventStream.recent().name == "mouseup") {
                console.log("confirm clicked");
                
                return;
            }

            confirm.node.postponedGoto("loop");
        }
    ]))

    confirmButtonFunnel = Thread.createFunnel(confirm,1,null,
    () => !confirm.onSprite(mouseEvents.position));

    cancel.addNode(new ChainedFunctions([
        () => {
            cancel.eventStream.clear();
            console.log("cancel");
        },
        UIpresets.button(() => {
            console.log("idle mouseon");
        },() => {
            console.log("mouseon cancel");
        },() => {
            console.log("mousedown cancel");
        },cancel),
        () => {
            cancel.node.goto("loop");
            cancel.node.postpone();
        }
    ]))

    confirmationBox.addNode(new ChainedFunctions([
        () => {
            lab5.thread.merge([confirmButtonFunnel])
            lab5.thread.merge([confirm,cancel]);
            console.log("-----|-----");
            console.log("confimationBox");
        },
        () => {
            confirmationBox.node.goto("loop");
            confirmationBox.node.postpone();
        }
    ]))











    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.confirm = confirm;
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.cancel = cancel;
    confirmationBox.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox = confirmationBox;
}