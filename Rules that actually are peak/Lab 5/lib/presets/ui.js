class UIpresets {
    /**
     * @typedef {{swap: ExpandedFunctionTypes, continuous: ExpandedFunctionTypes}} SwapFunctionOptions
     */

    /**
     * Creates a button with different continuous or swap states.
     * @param {SwapFunctionOptions} idle button idle state
     * @param {SwapFunctionOptions} mouseon button when mouse is hovering
     * @param {SwapFunctionOptions} mousedown when button is pressed
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

        let idlecf = new ChainedFunctions([
            idle.swap,
            () => {
                if (sprite.onSprite(mousePosition)) {
                    idlecf.restart();
                    idlecf.return();
                }
            },
            idle.continuous,
            () => {
                idlecf.postponedGoto(1);
            }
        ])

        let mouseoncf = new ChainedFunctions([
            mouseon.swap,
            () => {
                if (!sprite.onSprite(mousePosition)) {
                    mouseoncf.restart();
                    button.goto("start");
                }
                if (button.eventStream.recent().name == "mousedown") {
                    mouseoncf.restart();
                    mouseoncf.return();
                }
            },
            mouseon.continuous,
            () => {
                mouseoncf.postponedGoto(1);
            }
        ])

        let mousedowncf = new ChainedFunctions([
            mousedown.swap,
            () => {
                if (!sprite.onSprite(mousePosition)) {
                    mousedowncf.restart();
                    button.goto("start");
                }
                if (button.eventStream.recent().name == "mouseup") {
                    mousedowncf.restart();
                    mousedowncf.return();
                }
            },
            mousedown.continuous,
            () => {
                mousedowncf.postponedGoto(1);
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

class FlowPresets {
    /**
     * Idles chained function.
     * @param {Function} eventHandler optionally wait for a specific event
     */
    static wait (eventHandler = () => false) {
        let wait = new ChainedFunctions([
            () => {
                if (eventHandler()) {
                    wait.return();
                    return;
                }
                wait.postponedGoto("loop");
            }
        ]);
        return wait;
    }
}