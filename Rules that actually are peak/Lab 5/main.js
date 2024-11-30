let lab5 = {
    main: {
        constructor () {
            let main = new Sprite ();

            let mainThread = new Thread ([
                (args,thread) => {
                    
                }
            ])

            main.addThread()
        }
    },
    view: {
        subSprites: {
            game: {},
            menu: {},
            ui: {}
        }
    },
    loadingScreen: {
        subSprites: {
            progress: {}
        }
    }
}


function init () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    constructor.construct(lab5.main);
    constructor.construct(lab5.view);
    constructor.construct(lab5.loadingScreen);
}

function main () {
    canvas.clear();
    canvas.render(game);
}

let fps = 60;

init();
setInterval(() => {
    main();
},1000/fps);