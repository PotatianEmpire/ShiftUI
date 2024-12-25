/**
 * Constructs the application.
 */
function constructLab5() {
    lab5 = new Sprite();
    lab5.addSubSprites(lab5App.subSprites);

    lab5.addThread();

    lab5.addNode(new ChainedFunctions([
        () => {
            // load title screen
            mediaInterface.images.requestSamples(media.images.title.backdrop,media.images.title.backdrop.image,"./assets/images/title/backdrop/backdrop.png");
            mediaInterface.images.requestSamples(media.images.title.buttons,media.images.title.buttons.image,"./assets/images/title/clearCache/titleButtons.png");
            
            
            mediaInterface.images.requestSamples(media.images.testSprite,media.images.testSprite.image,"./assets/images/testSprite.png");
            mediaInterface.images.requestSamples(media.images.highlightedTestSprite,media.images.highlightedTestSprite.image,"./assets/images/testSpriteHighlighted.png");
            console.log("loading")
        },
        () => {
            if (mediaInterface.images.loadProgress().finished) {
                return;
            }
            lab5.node.postpone();
            lab5.node.goto("loop");
        },
        () => {
            lab5.thread.push(lab5App.subSprites.titleScreen);
        },
        () => {
            lab5.thread.push(lab5App.subSprites.loadingScreen);
        },
        () => {
            lab5.thread.push(lab5App.subSprites.menu);
        },
        () => {
            lab5.node.goto(2);
        }
    ]));

    lab5.thread.push(lab5);
}