class UIpresets {
    /**
     * Creates a button with different continuous states.
     * @param {Function | ChainedFunctions} idle button idle state
     * @param {Function | ChainedFunctions} mouseon button when mouse is hovering
     * @param {Function | ChainedFunctions} mousedown when button is pressed
     * @param {Sprite} sprite button sprite
     * @param {Coordinate} mousePosition position of the mouse
     * @param {EventDistributor} mouseDown mousedown event distributor
     * @param {EventDistributor} mouseUp mouseup event distributor
     * @returns {ChainedFunctions} created button
     */
    static button (idle,mouseon,mousedown,
        sprite,
        mousePosition = mouseEvents.position,
        mouseDown = mouseEvents.mouseDown,
        mouseUp = mouseEvents.mouseUp) {
            
        let button = new ChainedFunctions();

        function funnel () {
            if (!sprite.onSprite(mousePosition)) {
                button.goto("start");
            }
        }

        let idlecf = new ChainedFunctions([
            () => {
                if (sprite.onSprite(mousePosition)) {
                    idlecf.restart();
                    idlecf.return();
                }
            },
            idle,
            () => {
                idlecf.postponedGoto("start");
            }
        ])

        let mouseoncf = new ChainedFunctions([
            funnel,
            () => {
                if (button.eventStream.recent().name == "mousedown") {
                    mouseoncf.restart();
                    mouseoncf.return();
                }
            },
            mouseon,
            () => {
                mouseoncf.postponedGoto("start");
            }
        ])

        let mousedowncf = new ChainedFunctions([
            funnel,
            () => {
                if (button.eventStream.recent().name == "mouseup") {
                    mousedowncf.restart();
                    mousedowncf.return();
                }
            },
            mousedown,
            () => {
                mousedowncf.postponedGoto("start");
            }
        ])

        button = new ChainedFunctions([
            () => {
                button.eventStream.clear();
            },
            idlecf,
            mouseoncf,
            mousedowncf,
            () => {
                button.restart();
                button.return();
            }
        ]);

        button.eventStream = new EventStream();
        mouseDown.addStream(button.eventStream);
        mouseUp.addStream(button.eventStream);

        return button;
    }
}