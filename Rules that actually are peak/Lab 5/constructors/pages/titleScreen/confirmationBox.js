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

    confirm.addNode(new ChainedFunctions([
        () => {
            confirm.eventStream.clear();
            console.log("confirm");
        },
        () => {
            

            confirm.node.goto("loop");
            lab5.thread.postpone();
        }
    ]))

    cancel.addNode(new ChainedFunctions([
        () => {
            cancel.eventStream.clear();
            console.log("cancel");
        },
        () => {
            cancel.node.goto("loop");
            lab5.thread.postpone();
        }
    ]))

    confirmationBox.addNode(new ChainedFunctions([
        () => {
            lab5.thread.merge([confirm,cancel]);
            console.log("confimationBox");
        },
        () => {
            confirmationBox.node.goto("loop");
            lab5.thread.postpone();
        }
    ]))











    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.confirm = confirm;
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.cancel = cancel;
    confirmationBox.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox = confirmationBox;
}