let startMenu = {
    sprites: {
        //parent: new Sprite(0,0,0.1,0.1,{})

    },
    render: {parent: new Sprite(0,0,1,1)},
    startMenu: () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.clear();
        startMenu.render.parent.x = mouse.mouseX;
        startMenu.render.parent.y = mouse.mouseY;
        canvas.render(startMenu.render);
        
        // for (const key in startMenu.sprites) {
        //     startMenu.sprites[key].angle += 0.01;
        // } 

        return startMenu.startMenu;
    },
    startMenuInit: () => {
        console.log("startMenuInit")
        let objectCount = 100
        for (let i = 0; i < objectCount; i++) {
            startMenu.sprites[i] = new ImageSprite(
                Math.random() - 0.5,
                Math.random() - 0.5,
                0.1,
                0.1,
                images.missing,
            );
            //startMenu.sprites[i].rotate(0);
            startMenu.sprites[i].transparency = (objectCount-i)/objectCount;
            startMenu.sprites[i].z = (objectCount - i) / objectCount * 1.0 - 1.0;
        }
        startMenu.render.parent.addSubsprites(startMenu.sprites);
        return startMenu.startMenu;
    }
}

