let startMenu = {
    sprites: {

        titleText: {
            text: `0.04 center 'vinque-rg' #000000 "Name of the game goes here"
            #00FF00 "title phrase goes here"`,
            x: 0.5,
            y: 0.2,
            width: 0.5,
            height: 0.1,
            textBoxHeightScale: 1.1
        }

    },
    startMenu: () => {

        canvas.render(startMenu.sprites);

        createButton(startMenu.sprites.titleText,
            () => {
                startMenu.sprites.titleText.text = `0.04 'DEADCRT' #00FF00 center "You are hovering"
                "over the hitbox"`;
            },
            () => {},
            () => {
                startMenu.sprites.titleText.text = `0.04 center 'vinque-rg' #000000 "Name of the game goes here"
                #00FF00 "title phrase goes here"`;
            }
        )
        
        return startMenu.startMenu;
    }
}