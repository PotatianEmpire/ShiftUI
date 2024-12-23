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
        },
        () => {
            if (mediaInterface.images.loadProgress().finished) {
                return;
            }
            console.log("loopin'");
            lab5.thread.postpone();
            lab5.node.goto("loop");
        },
        () => {
            activateMouseNormalMode();
            lab5.thread.push(lab5App.subSprites.titleScreen);
        },
        () => {

        }
    ]));

    lab5.thread.push(lab5);
}