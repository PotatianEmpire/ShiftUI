/**
 * Constructs the application.
 */
function constructLab5() {
    lab5 = new Sprite();
    lab5.addSubSprites(lab5App.subSprites);

    let backgroundAnimations = new Sprite();
    backgroundAnimations.addThread();

    backgroundAnimations.addNode(new ChainedFunctions([
        () => {
            console.log("--$ backgroundAnimations");
        },
        () => {
            backgroundAnimations.node.postponedGoto("loop");
        }
    ]))

    backgroundAnimations.thread.merge(backgroundAnimations);

    lab5App.subSprites.backgroundAnimations = backgroundAnimations;

    lab5.addThread();

    lab5.addNode(new ChainedFunctions([
        () => {
            console.log("-$ lab5");

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

            console.log("...loading");

            lab5.node.postpone();
            lab5.node.goto("loop");
        },
        () => {
            console.log("---->----");
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