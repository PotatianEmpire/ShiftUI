


let initChoosePlayerCount = () => {
    canvas.sprites.upButton = {
        img: images.missing,
        x: 1000,
        y: 100,
        height: images.missing.height,
        width: images.missing.width
    }
    canvas.sprites.downButton = {
        img: images.missing,
        x: 1000,
        y: images.missing.height + 100,
        height: images.missing.height,
        width: images.missing.width
    }
    canvas.sprites.nextButton = {
        img: images.missing,
        x: 750,
        y: images.missing.height * 2 + 100,
        height: images.missing.height,
        width: images.missing.width
    }
    return choosePlayerCount;
}


let choosePlayerCount = () => {
    canvas.render();
    
    canvas.context.font = "100px 'Trebuchet MS', sans-serif";
    canvas.context.fillStyle = "#000000";
    canvas.context.fillText("Players: " + players.playerCount, 400, 400);
    
    createButton(canvas.sprites.upButton,
        () => canvas.scaleFromOriginal(canvas.sprites.upButton,1.2),
        () => players.playerCount++,
        () => canvas.scaleFromOriginal(canvas.sprites.upButton,1.0));

    createButton(canvas.sprites.downButton,
        () => canvas.scaleFromOriginal(canvas.sprites.downButton,1.2),
        () => {
            if(players.playerCount > 2)
                players.playerCount--;
        },
        () => canvas.scaleFromOriginal(canvas.sprites.downButton,1.0));

    if(createButton(canvas.sprites.nextButton,
        () => canvas.scaleFromOriginal(canvas.sprites.nextButton,1.2),
        () => true,
        () => canvas.scaleFromOriginal(canvas.sprites.nextButton,1.0)))
            return cleanupChoosePlayerCount;
    inputStagger = false;
    return choosePlayerCount;
}

let cleanupChoosePlayerCount = () => {
    delete canvas.sprites.upButton;
    delete canvas.sprites.downButton;
    delete canvas.sprites.nextButton;
    return initChooseCharacterBase;
}