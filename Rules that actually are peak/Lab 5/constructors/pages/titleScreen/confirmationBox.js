function constructClearCacheConfirmation () {
    let confirmationBox = new Sprite ();

    let confirm = new Sprite();
    let cancel = new Sprite();

    // visual

    confirm.dimensions.assign(media.images.title.buttons.a.sampleSize);
    confirm.position.x = -0.5;

    cancel.dimensions.assign(media.images.title.buttons.a.sampleSize);
    cancel.position.x = 0.5;

    // events

    confirm.addEventDistributor();
    cancel.addEventDistributor();

    confirm.eventDistributor.addStream([confirmationBox,confirm,cancel]);
    cancel.eventDistributor.addStream([confirmationBox,confirm,cancel]);

    // logic

    let clearCache = new ChainedFunctions([
        () => {
            console.log("...clearing cache");
        }
    ])
    
    confirm.addNode(new ChainedFunctions([
        () => {
            console.log("-----$ confirm");
        },
        UIpresets.button({swap: () => {
            confirm.addSample(media.images.title.buttons.a);
            console.log("> idle confirm");
        }},{swap: () => {
            confirm.addSample(media.images.title.buttons.b);
            console.log("> mouseon confirm");
        }},{swap: () => {
            console.log("> mousedown confirm");
        }},confirm),
        () => {
            console.log(".confirm clicked");
        },
        clearCache,
        () => {
            confirm.eventDistributor.distribute(new EventTask("closeConfirmationBox"));
        },
        FlowPresets.wait(() => cancel.eventStream.recent()),
        new ChainedFunctions([
            () => {
                console.log("@_confirm end")
            }
        ]),
        () => {
            confirm.node.restartAll();
            confirm.node.return();
        }
    ]))

    cancel.addNode(new ChainedFunctions([
        () => {
            console.log("-----$ cancel");
            console.log(cancel.node.pointer)
        },
        UIpresets.button({swap: () => {
            cancel.addSample(media.images.title.buttons.a);
            console.log("> idle cancel");
        }},{swap: () => {
            cancel.addSample(media.images.title.buttons.b);
            console.log("> mouseon cancel");
        }},{swap: () => {
            console.log("> mousedown cancel");
        }},cancel),
        () => {
            console.log(".cancel clicked");
            cancel.eventDistributor.distribute(new EventTask("closeConfirmationBox"));
        },
        FlowPresets.wait(() => cancel.eventStream.recent()),
        new ChainedFunctions([
            () => {
                console.log("@_cancel end");
            }
        ]),
        () => {
            cancel.node.restartAll();
            cancel.node.return();
        }
    ]))

    let confirmFunnel = Thread.createFunnel(confirm,"secondLast",confirm.eventStream);

    let cancelFunnel = Thread.createFunnel(cancel,"secondLast",cancel.eventStream);


    confirmationBox.addNode(new ChainedFunctions([
        () => {
            lab5.thread.merge([confirmFunnel,cancelFunnel]);
            lab5.thread.merge([confirm,cancel]);
            console.log("----->-----");
            console.log("----$ confimationBox");
        },
        FlowPresets.wait(() => confirmationBox.eventStream.recent().name == "closeConfirmationBox"),
        new ChainedFunctions([
            () => {
                console.log("@_confirmationBox end");
            }
        ]),
        () => {
            confirmationBox.node.restartAll();
            confirmationBox.node.return();
        }
    ]))











    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.confirm = confirm;
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites.cancel = cancel;
    confirmationBox.addSubSprites(lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox.subSprites);
    lab5App.subSprites.titleScreen.subSprites.clearCache.subSprites.confirmationBox = confirmationBox;
}