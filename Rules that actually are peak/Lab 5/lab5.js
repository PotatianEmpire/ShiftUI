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
        characters: []
    },
    game: {
        scenes: {}
    }
}

let media = {
    images: {
        testSprite: {
            image: new Image(),
            green1_1: new Sample(0,0,0.25,0.25),
            orange1_1: new Sample(0.5,0,0.25,0.25),
            blue1_1: new Sample(0.75,0,0.25,0.25),
            f: new Sample(0,0.25,0.25,0.125),
            arrow: new Sample(0,0.25 + 0.125,0.125,0.125),
            b: new Sample(0.125,0.25 + 0.125,0.125,0.125),
            blue1_2: new Sample(0.25,0,0.25,0.5),
            green2_1: new Sample(0.5,0.25,0.5,0.25),
            green_3: new Sample(0,0.5 + 0.125,0.25,0.25 + 0.125),
            blue3_: new Sample(0.25,0.5 + 0.125,0.25 + 0.125,0.25),
            card: new Sample(0.25,0.75 + 0.125,0.125,0.125),
            corruptedCard: new Sample(0.75 + 0.125,0.5 + 0.125,0.125,0.125),
            corruptedOrange_3: new Sample(0.5 + 0.125,0.5 + 0.125,0.25,0.25 + 0.125),
            orangew: new Sample(0,0.5,0.25 + 0.125,0.125),
            red4_w: new Sample(0.25 + 0.125,0.5,0.5,0.125),
            a: new Sample(0.75 + 0.125,0.5,0.125,0.125)
        },
        highlightedTestSprite: {
            image: new Image(),
            green1_1: new Sample(0,0,0.25,0.25),
            orange1_1: new Sample(0.5,0,0.25,0.25),
            blue1_1: new Sample(0.75,0,0.25,0.25),
            f: new Sample(0,0.25,0.25,0.125),
            arrow: new Sample(0,0.25 + 0.125,0.125,0.125),
            b: new Sample(0.125,0.25 + 0.125,0.125,0.125),
            blue1_2: new Sample(0.25,0,0.25,0.5),
            green2_1: new Sample(0.5,0.25,0.5,0.25),
            green_3: new Sample(0,0.5 + 0.125,0.25,0.25 + 0.125),
            blue3_: new Sample(0.25,0.5 + 0.125,0.25 + 0.125,0.25),
            card: new Sample(0.25,0.75 + 0.125,0.125,0.125),
            corruptedCard: new Sample(0.75 + 0.125,0.5 + 0.125,0.125,0.125),
            corruptedOrange_3: new Sample(0.5 + 0.125,0.5 + 0.125,0.25,0.25 + 0.125),
            orangew: new Sample(0,0.5,0.25 + 0.125,0.125),
            red4_w: new Sample(0.25 + 0.125,0.5,0.5,0.125),
            a: new Sample(0.75 + 0.125,0.5,0.125,0.125)
        }
    },
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
            let buttonPressed = true;

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
            mediaInterface.images.reqeustSamples(media.images.testSprite,media.images.testSprite.image,"./assets/images/testSprite.png");
            mediaInterface.images.reqeustSamples(media.images.highlightedTestSprite,media.images.highlightedTestSprite.image,"./assets/images/testSpriteHighlighted.png")
        },
        () => {
            let loaded = mediaInterface.images.loadProgress(media.images);

            console.log("loading... " + loaded.percentage + "%");

            if (loaded.finished) {
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

            sprite.addImageSample(media.images.testSprite.corruptedCard)
            sprite.x = 0;
            sprite.y = 0;
            sprite.width = sprite.sample.sampleWidth;
            sprite.height = sprite.sample.sampleHeight;
            sprite.activate()

            thread.requestNextFrameAndLoop()
        }
    ])


    sprite.addThread(thread);
    lab5.main.subSprites.menu = sprite.fuseSprite(lab5.main.subSprites.menu);
}

function constructGame () {
    let sprite = new Sprite();
    let subSprites = {
        characterSelection: {
            thread: new Thread()
        },
        load: {
            thread: new Thread()
        },
        level: {
            thread: new Thread()
        },
        unload: {
            thread: new Thread()
        }
    }
    let scene = lab5.main.subSprites.game.scene;
    let thread = new Thread ([
        () => {
            thread.lendThread(subSprites.characterSelection.thread);
        },
        () => {
            thread.lendThread(subSprites.load.thread);
        },
        () => {
            thread.lendThread(subSprites.level.thread);
        },
        () => {
            thread.lendThread(subSprites.unload.thread);
        }
    ]);

    function constructCharacterSelection () {
        let selecteableCharacters = gameInfo.playerInfo.characters;
        let sprite = new Sprite ();
        let thread = new Thread ([
            () => {
                
            }
        ])
    }
    function constructGameLoad () {
        let sprite = new Sprite ();
        let thread = new Thread ([
            () => {
                
            }
        ])
    }
    function constructLevel () {
        let sprite = new Sprite ();
        let thread = new Thread ([
            () => {}
        ])
    }
    function constructGameUnload () {
        let sprite = new Sprite ();
        let thread = new Thread ([
            () => {}
        ])
    }


    sprite.addSubsprites(subSprites);
    sprite.addThread(thread);
    lab5.main.subSprites.game = sprite.fuseSprite(lab5.main.subSprites.game);
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