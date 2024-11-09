let startMenu = {
    sprites: {

        titleText: {
            text: `0.04 'vinque-rg' #000000 "Name of the game goes here"
                                    #00FF00 "title phrase goes here"
                                            "hi"`,
            x: 0.5,
            y: 0.2,
            width: 0.1,
            height: 0.1,
            textBoxHeightScale: 1.0
        }

    },
    startMenu: () => {

        canvas.render(startMenu.sprites);
        
        return startMenu.startMenu;
    }
}