let fps = 60;

let sprites = {
    helloWorld: {}
}

function init () {
    let sprite = new Sprite();

    sprite.addText(
        `"Hello World"`
    );

    sprite.appendAsSpriteTo(sprites.helloWorld);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function main () {
    
    canvas.clear();
    
    canvas.render(sprites);

}

init();
setInterval (() => {
    main();
},1000/fps)