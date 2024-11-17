let startMenu = {
    sprites: {


    },
    startMenu: () => {

        canvas.render(startMenu.sprites);
        
        for (const key in startMenu.sprites) {
            startMenu.sprites[key].angle += 0.01;
        } 

        return startMenu.startMenu;
    },
    startMenuInit: () => {
        console.log("startMenuInit")
        for (let i = 0; i < 1000; i++) {
            startMenu.sprites[i] = new ImageSprite(
                Math.random(),
                Math.random(),
                0.1,
                0.1,
                images.cardTest
            );
            startMenu.sprites[i].rotate(0);
            startMenu.sprites[i].transparency = 1;
        }
        return startMenu.startMenu;
    }
}

