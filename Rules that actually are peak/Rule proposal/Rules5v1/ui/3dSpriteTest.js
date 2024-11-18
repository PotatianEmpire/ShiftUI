let test3dSprite = {
    sprites: {
        test: new Sprite(0,0,0.1,0.1,{
            back: new ImageSprite(0,0,1,1,images.missing),
            top: new ImageSprite(0,-2,1,1,images.missing),
            left: new ImageSprite(-2,0,1,1,images.missing),
            bottom: new ImageSprite(0,2,1,1,images.missing),
            right: new ImageSprite(2,0,1,1,images.missing),
            front: new ImageSprite(0,0,1,1,images.missing)
        })
    },
    init () {
        test3dSprite.sprites.test.subSprites.front.z = -2;
        test3dSprite.sprites.test.subSprites.back.z = 2;
        return test3dSprite.render;
    },
    render() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        test3dSprite.sprites.test.x = mouse.getMouseX();
        test3dSprite.sprites.test.y = mouse.getMouseY();
        canvas.clear();
        canvas.render(test3dSprite.sprites);
        return test3dSprite.render;
    }
}