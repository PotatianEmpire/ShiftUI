canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let paper = {
    character: new Sprite()
}

let image = new Image();
image.src = "./image.png";

function constructCharacter () {
    paper.character.addImage(image);
    paper.character.x = 0.5;
    paper.character.y = 0.2;
    paper.character.height = canvas.unscale(image.height) * 4;
    paper.character.width = canvas.unscale(image.width) * 4;

    paper.character.angle = 0;

    paper.character.appendAsSubSpriteTo(paper.character,"char")
}

constructCharacter();

let fps = 10;

image.addEventListener("load", () => {
    paper.character.activate();
    canvas.clear();
    setInterval(() => {
        canvas.clear();
        canvas.render(paper);
        
    },1000/fps);
})