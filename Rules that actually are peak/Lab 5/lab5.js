let lab5 = {
    game: {
        thread: new Thread(),

        subSprites: {
            titleScreen: {
                thread: new Thread()
            },
            load: {
                thread: new Thread()
            },
            menu: {
                thread: new Thread(),

                subSprites: {
                    game: {}
                }
            },
            settings: {
                thread: new Thread(),

                subSprites: {

                }
            }
        }
    }
}

let media = {
    images: {},
    audio: {},
    fonts: {}
}

function constructLab5 () {
    constructGame();
    constructTitleScreen();
    constructLoad();
    constructMenu();
}

function constructGame () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            sprite.y = canvas.referenceHeight /2;
            sprite.activate();
        },
        () => {
            console.log("titel screen!");
            thread.lendThread(lab5.game.subSprites.titleScreen.thread);
        },
        () => {
            console.log("load!");
            thread.lendThread(lab5.game.subSprites.load.thread);
        },
        () => {
            console.log("menu!");
            thread.lendThread(lab5.game.subSprites.menu.thread);
        }
    ])
    thread.makeThreadOrigin();

    sprite.width = 1;
    sprite.height = 1;
    sprite.x = 0.5;


    sprite.addThread(thread);
    lab5.game = sprite.fuseSprite(lab5.game);
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
    lab5.game.subSprites.titleScreen = sprite.fuseSprite(lab5.game.subSprites.titleScreen);
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
    lab5.game.subSprites.load = sprite.fuseSprite(lab5.game.subSprites.load);
}

function constructMenu () {
    let sprite = new Sprite();
    let thread = new Thread([
        () => {
            console.log("menu...");
        }
    ])


    sprite.addThread(thread);
    lab5.game.subSprites.menu = sprite.fuseSprite(lab5.game.subSprites.menu);
}