let titleScreenConstructors = {
    constructTitleScreen (parent) {},
    interface: {
        constructClickToContinue (parent) {},
        constructResetButton (parent) {}
    }
}

titleScreenConstructors.constructTitleScreen = function (parent) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addImageSample(media.images.title.backdrop.title);

    let subSprites = {
        clickToContinue: {},
        resetButton: {
            thread: new Thread (),
            subSprites: {
                idle: new Sprite (),
                hover: new Sprite (),
                pressed: new Sprite (),
                clicked: new Sprite ()
            }
        }
    }

    subSprites.clickToContinue = titleScreenConstructors.interface.constructClickToContinue(subSprites.clickToContinue);
    // subSprites.resetButton = titleScreenConstructors.interface.constructResetButton(subSprites.resetButton);

    

    let thread = new Thread([
        () => {
            mediaInterface.images.reqeustSamples(media.images.title.backdrop,media.images.title.backdrop.image,"./assets/images/titleTest.png");
            mediaInterface.images.reqeustSamples(media.images.title.buttons,media.images.title.buttons.image,"./assets/images/titleButtons.png");
            mediaInterface.images.reqeustSamples(media.images.testSprite,media.images.testSprite.image,"./assets/images/testSprite.png");
            mediaInterface.images.reqeustSamples(media.images.highlightedTestSprite,media.images.highlightedTestSprite.image,"./assets/images/testSpriteHighlighted.png")
        },
        () => {
            let loaded = mediaInterface.images.loadProgress(media.images.title);
            
            if (loaded.finished) {
                return;
            }
            thread.requestNextFrameAndLoop();
        },
        () => {
            
            thread.cloneThread(lab5.main.subSprites.mouse.subSprites.normal.thread);
            sprite.activateSubSprites();
            sprite.activate();
        },
        () => {
            

            thread.requestNextFrameAndLoop();
        }
    ])

    sprite.addSubsprites(subSprites);
    sprite.addThread(thread);
    return sprite.fuseSprite(parent);
}

titleScreenConstructors.interface.constructClickToContinue = function (parent) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addText(`"click to continue ...`);

    let blinkingAnimation = new ActivatedFunction(() => {
        sprite.transparency = 0;
        blinkingAnimation.frame = 0;
    },
    () => {
        sprite.transparency = 0.5 + Math.sin(frame/100)/5;
    })

    sprite.addAnimation(blinkingAnimation);

    return sprite.fuseSprite(parent);
}