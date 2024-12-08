let mouseConstructors = {
    constructMouse (parent) {},
    normalMode: {
        constructNormalMode (parent) {},
        constructMouseUp (parent,mode) {},
        constructMouseDown (parent,mode) {},
        constructMouseClick (parent,mode) {}
    }
}

mouseConstructors.constructMouse = function (parent) {
    let sprite = new Sprite(0,0,1,1);
    let subSprites = {
        normal: {},
        pointer: new Sprite(0,0,0,0)
    }

    subSprites.normal = this.normalMode.constructNormalMode(subSprites.normal);

    function subPass () {
        sprite.x = canvas.normalizeX(mouse.mouseX);
        sprite.y = canvas.normalizeY(mouse.mouseY);
    }
    
    sprite.addSubPass(subPass);
    sprite.addSubsprites(subSprites);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructNormalMode = function (parent) {
    let sprite = new Sprite(0,0,1/32,1/32);
    let subSprites = {
        mouseDown: {
            activate () {},
            deactivate () {},
            active: false
        },
        mouseUp: {
            activate () {},
            deactivate () {},
            active: true
        },
        mouseClick: {
            activate () {},
            deactivate () {},
            active: false
        },
    }

    subSprites.mouseDown = mouseConstructors.normalMode.constructMouseDown(subSprites.mouseDown,sprite);
    subSprites.mouseUp = mouseConstructors.normalMode.constructMouseUp(subSprites.mouseUp,sprite);
    subSprites.mouseClick = mouseConstructors.normalMode.constructMouseClick(subSprites.mouseClick,sprite);

    function activation () {
        sprite.deactivated = false;
        sprite.switch(subSprites.mouseUp);
    }

    sprite.addActivation(activation);
    sprite.addSubsprites(subSprites);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseDown = function (parent,mode) {
    let sprite = new Sprite(0,0,1,1);
    
    sprite.addImageSample(media.images.highlightedTestSprite.arrow);

    function subPass () {
        console.log("mouseDown")
        if (mouse.mouseUp) {
            mode.switch(mode.subSprites.mouseClick);
        }
    }

    sprite.addSubPass(subPass);

    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseUp = function (parent,mode) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addImageSample(media.images.testSprite.arrow);

    function subPass () {
        console.log("mouseUp")
        if (mouse.mouseDown) {
            mode.switch(mode.subSprites.mouseDown);
        }
    }

    sprite.addSubPass(subPass);

    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseClick = function (parent,mode) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addImageSample(media.images.testSprite.corruptedCard);

    function subPass () {
        mode.switch(mode.subSprites.mouseUp)
    }

    function activation () {
        sprite.deactivated = false;
    }
    function deactivation () {
        sprite.swapAnimation("deactivate");
        sprite.animation.activate();
    }
    let animation = new ActivatedFunction (() => {
        sprite.deactivated = true;
    }, () => {
        console.log(animation.frame)
        if (animation.frame > 100)
            sprite.deactivated = true;
    })
    sprite.addAnimationToChain(animation,"deactivate");
    sprite.addActivation(activation,deactivation);
    sprite.addSubPass(subPass);

    return sprite.fuseSprite(parent);
}
