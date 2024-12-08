let spriteLibrary = {
    subSpriteFunctions: {
        /**
         * 
         * @param {Sprite} parent 
         * @param {Object} button
         * @param {Sprite} button.idle
         * @param {Sprite} button.hover
         * @param {Sprite} button.pressed
         * @param {Sprite} button.clicked 
         * @param {Sprite} mouse 
         * @param {Sprite} mouseDown 
         */
        constructButton (parent,button,mouse,mouseDown) {
            button.idle.addSubPass (() => {
                if (mouse.overlaps(button.idle)) {
                    parent.switch(button.hover);
                }
            })
            button.hover.addSubPass (() => {
                if (!mouse.overlaps(button.hover)) {
                    parent.switch(button.idle);
                }
                if (mouseDown.active) {
                    parent.switch(button.pressed);
                }
            })
            button.pressed.addSubPass (() => {
                if (!mouseDown.active) {
                    if (mouse.overlaps(button.pressed)) {
                        parent.switch(button.clicked);
                    } else {
                        parent.switch(button.idle);
                    }
                }
            })
            button.clicked.addSubPass (() => {
                parent.switch(button.idle);
            })
        }
    }
}

