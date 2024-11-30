let lab5 = {
    sprites: {
        view: {                                     // < -- construct this sprite to initialize and start the program

            subSprites: {
                menu: {

                    subSprites: {
                        settings: {

                            constructor() {},
                            thread: new Thread(),   // < -- move to this thread whenever you want to display the settings
                            subSprites: {
                                visual: {},
                                audio: {},
                                keybinds: {},
                                return: {}          // when this button is pressed the thread is returned
                            }
                        }
                    }
                },
                ui: {},
                game: {}
            }
        },
    },
    images: {

    },
    audio: {

    },
    fonts: {

    }
}


function init () {
    
    lab5.sprites.view.subSprites.menu.subSprites.settings.thread.returnThisThread

}

function main () {
    canvas.clear();
    // canvas.render(lab5.sprites);
}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);