function activateTitleScreen () {}
function deactivateTitleScreen () {}

function constructTitleScreen () {
    
    let titleScreen = new Sprite ();

    
    let clearCache = new Sprite ();
    let next = new Sprite ();

    // visual :

    // events :

    // logic :

    titleScreen.addThread();

    titleScreen.addNode(new ChainedFunctions([
        () => {},
        () => {
            clearCache.eventStream.clear();
            next.eventStream.clear();
        },
        () => {
            
        },
        () => {
            titleScreen.toggleOption("subSprites","inactive");
        }
    ]))











    activateTitleScreen = function () {
        titleScreen.toggleOption(["show","subSprites"],"active");
        titleScreen.node.restart();
    }

    deactivateTitleScreen = function () {
        titleScreen.toggleOption(["show","subSprites"],"inactive");
    }

    lab5App.subSprites.titleScreen.subSprites.clearCache = clearCache;
    lab5App.subSprites.titleScreen.subSprites.next = next;
    titleScreen.addSubSprites(lab5App.subSprites.titleScreen.subSprites);
    lab5App.subSprites.titleScreen = titleScreen;
}