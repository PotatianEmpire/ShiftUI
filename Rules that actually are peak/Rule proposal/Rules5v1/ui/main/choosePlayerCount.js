
let choosePlayerCount = {

    sprites: {
        upButton: {
            img: images.missing,
            x: 1000,
            y: 100,
            height: images.missing.height,
            width: images.missing.width,
            mode: "align-center"
        },
        downButton: {
            img: images.missing,
            x: 1000,
            y: images.missing.height + 100,
            height: images.missing.height,
            width: images.missing.width,
            mode: "align-center"
        },
        nextButton: {
            img: images.missing,
            x: 750,
            y: images.missing.height * 2 + 100,
            height: images.missing.height,
            width: images.missing.width,
            mode: "align-center"
        }
    },

    initChoosePlayerCount: () => {
        
        return choosePlayerCount.choosePlayerCount;
    },


    choosePlayerCount: () => {
        
        canvas.render(choosePlayerCount.sprites);
        
        canvas.context.font = "100px 'Trebuchet MS', sans-serif";
        canvas.context.fillStyle = "#000000";
        canvas.context.fillText("Players: " + players.playerCount + keys.getKeyString(), 400, 400);
        
        createButton(choosePlayerCount.sprites.upButton,
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.upButton,1.2),
            () => players.playerCount++,
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.upButton,1.0));

        createButton(choosePlayerCount.sprites.downButton,
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.downButton,1.2),
            () => {
                if(players.playerCount - mouse.mouseClicks > 1) {
                    players.playerCount -= mouse.getMouseClicks();
                    return;
                }
                players.playerCount = 2;
            },
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.downButton,1.0));

        if(createButton(choosePlayerCount.sprites.nextButton,
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.nextButton,1.2),
            () => true,
            () => canvas.scaleFromOriginal(choosePlayerCount.sprites.nextButton,1.0)))
                return choosePlayerCount.cleanupChoosePlayerCount;
        


        mouse.unstaggerAll();
        return choosePlayerCount.choosePlayerCount;
    },

    cleanupChoosePlayerCount: () => {
        canvas.render(choosePlayerCount.sprites);
        return chooseCharacterBase.initChooseCharacterBase;
    }

}