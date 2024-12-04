let lab5 = {
    main: {
        thread: new Thread(),

        subSprites: {
            titleScreen: {
                thread: new Thread()
            },
            load: {
                thread: new Thread()
            },
            menu: {
                thread: new Thread()
            },
            game: {
                thread: new Thread(),
                scene: {}
            },
            settings: {
                thread: new Thread()
            }
        }
    }
}

let gameInfo = {
    playerInfo: {
        characters: {}
    },
    game: {
        scenes: {}
    }
}

let media = {
    images: {},
    audio: {},
    fonts: {}
}

function constructLab5 () {
    constructMain();
    constructTitleScreen();
    constructLoad();
    constructMenu();
    constructGame();
}

function constructMain () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            sprite.y = canvas.referenceHeight / 2;
            sprite.activate();
        },
        () => {
            console.log("titel screen!");
            thread.lendThread(lab5.main.subSprites.titleScreen.thread);
        },
        () => {
            console.log("load!");
            thread.lendThread(lab5.main.subSprites.load.thread);
        },
        () => {
            console.log("menu!");
            thread.lendThread(lab5.main.subSprites.menu.thread);
        }
    ])
    thread.makeThreadOrigin();

    sprite.width = 1;
    sprite.height = 1;
    sprite.x = 0.5;


    sprite.addThread(thread);
    lab5.main = sprite.fuseSprite(lab5.main);
}

function constructTitleScreen () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            sprite.activate();
        },
        () => {
            let buttonPressed = false;

            console.log("title screen...");

            if (buttonPressed) {
                sprite.deactivate();
                thread.returnThread();
                return;
            }

            thread.requestNextFrameAndLoop();
        }
    ])

    sprite.addText(`center "title screen"`);

    sprite.x = 0;
    sprite.y = 0;
    sprite.align = "center"


    sprite.addThread(thread);
    lab5.main.subSprites.titleScreen = sprite.fuseSprite(lab5.main.subSprites.titleScreen);
}

function constructLoad () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            let loaded = true;                      // logic here

            console.log("loading... " + 0 + "%");   // animation here

            if (loaded) {                           // continue condition here
                thread.returnThread();
                return;
            }

            thread.requestNextFrameAndLoop()
        }
    ])


    sprite.addThread(thread); 
    lab5.main.subSprites.load = sprite.fuseSprite(lab5.main.subSprites.load);
}

function constructMenu () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            console.log("menu...");

            
        }
    ])


    sprite.addThread(thread);
    lab5.main.subSprites.menu = sprite.fuseSprite(lab5.main.subSprites.menu);
}

function constructGame () {
    let sprite = new Sprite();
    let subSprites = {
        characterSelection: {
            thread: new Thread(),
            selectedCharacters: []
        },
        load: {
            thread: new Thread()
        },
        level: {
            thread: new Thread(),
            done: false,
            playerIsWinner: false,
        },
        winScreen: {
            thread: new Thread()
        },
        defeatScreen: {
            thread: new Thread()
        }
    }
    let scene = lab5.main.subSprites.game.scene;
    let selectedCharacters = subSprites.characterSelection.selectedCharacters;
    let thread = new Thread ([
        () => {
            thread.lendThread(subSprites.characterSelection);
        },
        () => {
            thread.lendThread(subSprites.load);
        },
        () => {
            thread.lendThread(subSprites.level);
            if (subSprites.level.done) {
                return;
            }
            thread.requestNextFrameAndLoop();
        },
        () => {
            if (subSprites.level.playerIsWinner) {
                thread.lendThread(subSprites.winScreen);
            } else {
                thread.lendThread(subSprites.defeatScreen);
            }
        }
    ])

    function constructLevel (fusion) {
        let sprite = new Sprite();
        let subSprites =  {
            ui: {
                subSprites: {
                    chooseCard: {
                        character: {},
                        thread: new Thread()
                    },
                    showCharacterDetails: {
                        character: {},
                        thread: new Thread()
                    }
                }
            },
            scene: {
                thread: new Thread()
            },
            pause: {
                thread: new Thread()
            }
        }
    
        let spriteMethods = {
            pauseGameAnimationSmooth () {},
            unpauseGameAnimationSmooth () {},
            blockingAnimationDone () {},
            winnerDecided (characters) {},
            getWinners (characters) {},
            getAliveCharacters (characters) {},
            getQuickestCharacter (characters) {}
        }

    
        let thread = new Thread([
            () => {
                thread.lendThread(subSprites.scene);
            },
            () => {
                if (sprite.blockingAnimationDone()) {
                    return;
                }
                thread.requestNextFrameAndLoop();
            },
            () => {
                if (spriteMethods.winnerDecided()) {
                    thread.returnThread();
                    return;
                }
                
            },
            () => {
                if (quickestCharacter.controlleable) {
                    subSprites.ui.subSprites.chooseCard.character = quickestCharacter;
                    thread.lendThread(subSprites.ui.subSprites.chooseCard.thread);
                } else {
                    quickestCharacter.ai.chooseCardToActivate();
                }
            }
        ])
    
        sprite.addSubsprites(subSprites);
        sprite.addThread(thread);
        sprite.fuseSprite(spriteMethods);
        return sprite.fuseSprite(fusion);
    }

    subSprites.level = constructLevel(subSprites.level);

}



function constructUI () {

}

function constructChooseCard () {

}

function constructScene () {

}

function constructPause () {}

function constructShowCharacterDetails () {}

function constructSettings () {
    let subSprites = {
        graphics: {},
        audio: {},
        gameplay: {},
        keybinds: {}
    }
}