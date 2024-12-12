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
        normal: {
            thread: new Thread ()
        },
        pointer: new Sprite(0,0,0,0)
    }
    subSprites.normal = mouseConstructors.normalMode.constructNormalMode(subSprites.normal);

    let thread = new Thread ([
        () => {
            sprite.x = canvas.normalizeX(mouse.mouseX);
            sprite.y = canvas.normalizeY(mouse.mouseY);
        }
    ])
    
    sprite.addThread(thread);
    sprite.addSubsprites(subSprites);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructNormalMode = function (parent) {
    let sprite = new Sprite(0,0,1/32,1/32);
    
    let subSprites = {
        up: {
            thread: new Thread ()
        },
        down: {
            thread: new Thread ()
        },
        click: {
            thread: new Thread ()
        }
    }
    subSprites.up = mouseConstructors.normalMode.constructMouseUp(subSprites.up);
    subSprites.down = mouseConstructors.normalMode.constructMouseDown(subSprites.down);
    subSprites.click = mouseConstructors.normalMode.constructMouseClick(subSprites.click);

    let thread = new Thread ([
        () => {
            sprite.activate();
        },
        () => {
            thread.lendThread(subSprites.up.thread);
        },
        () => {
            thread.lendThread(subSprites.down.thread);
        },
        () => {
            thread.lendThread(subSprites.click.thread);
        }
    ])

    sprite.addThread(thread);
    sprite.addSubsprites(subSprites);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseUp = function (parent) {
    let sprite = new Sprite(0,0,1,1);
    
    sprite.addImageSample(media.images.testSprite.arrow);

    let thread = new Thread ([
        () => {
            sprite.activate();
        },
        () => {

            if (mouse.mouseDown) {
                thread.returnThread();
                sprite.deactivate();
                return;
            }

            thread.requestNextFrameAndLoop();
        }
    ])

    sprite.addThread(thread);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseDown = function (parent) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addImageSample(media.images.highlightedTestSprite.arrow);

    let thread = new Thread ([
        () => {
            sprite.activate();
        },
        () => {
            if (!mouse.mouseDown) {
                thread.returnThread();
                sprite.deactivate();
                return;
            }

            thread.requestNextFrameAndLoop();
        }
    ])

    sprite.addThread(thread);
    return sprite.fuseSprite(parent);
}

mouseConstructors.normalMode.constructMouseClick = function (parent) {
    let sprite = new Sprite(0,0,1,1);

    sprite.addImageSample(media.images.testSprite.corruptedCard);

    let thread = new Thread ([
        () => {
            sprite.activate();
        },
        () => {
            thread.returnThread();
            sprite.deactivate();
        }
    ])

    sprite.addThread(thread);
    return sprite.fuseSprite(parent);
}