function constructClearCacheConfirmation () {
    let confirmationBox = new Sprite ();

    let confirm = new Sprite();
    let cancel = new Sprite();

    // visual

    // events

    mouseEvents.mouseDown.addStream([confirm,cancel]);
    mouseEvents.mouseUp.addStream([confirm,cancel]);

    // logic

    confirm.addNode(new ChainedFunctions([
        () => {
            confirm.eventStream.clear();
        }
    ]))

    confirmationBox.addNode(new ChainedFunctions([
        () => {
            lab5.thread.merge([confirm,cancel]);
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