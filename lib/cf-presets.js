class CFpresets {
    /**
     * @typedef {{swap: ExpandedFunctionTypes, continuous: ExpandedFunctionTypes}} SwapFunctionOptions
     */

    /**
     * Creates a button with different continuous or swap states.
     * @param {SwapFunctionOptions | ExpandedFunctionTypes} idle button idle state
     * @param {SwapFunctionOptions | ExpandedFunctionTypes} mouseon button when mouse is hovering
     * @param {SwapFunctionOptions | ExpandedFunctionTypes} mousedown when button is pressed
     * @param {Sprite} sprite button sprite
     * @returns {ChainedFunctions} created button
     */
    static button (sprite,idle = () => {},
    mouseon = () => {},
    mousedown = () => {}) {
        let idleFunc = {};
        let mouseonFunc = {};
        let mousedownFunc = {};

        if (idle instanceof ChainedFunctions || typeof idle == "function") {
            idleFunc.continuous = idle;
        } else {
            idleFunc = idle;
        }

        if (mouseon instanceof ChainedFunctions || typeof mouseon == "function") {
            mouseonFunc.continuous = mouseon;
        } else {
            mouseonFunc = mouseon;
        }

        if (mousedown instanceof ChainedFunctions || typeof mousedown == "function") {
            mousedownFunc.continuous = mousedown;
        } else {
            mousedownFunc = mousedown;
        }


        let button = new ChainedFunctions();

        let idlecf = new ChainedFunctions([
            idleFunc.swap,
            () => {
                if (sprite.onSprite(Events.mousePosition)) {
                    idlecf.restart();
                    idlecf.return();
                }
            },
            idleFunc.continuous,
            () => {
                idlecf.postponedGoto(1);
            }
        ])

        let mouseoncf = new ChainedFunctions([
            mouseonFunc.swap,
            () => {
                if (!sprite.onSprite(Events.mousePosition)) {
                    mouseoncf.restart();
                    button.goto("start");
                }
                if (button.eventStream.recent().name == Events.mouseDownEvent) {
                    mouseoncf.restart();
                    mouseoncf.return();
                }
            },
            mouseonFunc.continuous,
            () => {
                mouseoncf.postponedGoto(1);
            }
        ])

        let mousedowncf = new ChainedFunctions([
            mousedownFunc.swap,
            () => {
                if (!sprite.onSprite(Events.mousePosition)) {
                    mousedowncf.restart();
                    button.goto("start");
                }
                if (button.eventStream.recent() == Events.mouseUpEvent) {
                    mousedowncf.restart();
                    mousedowncf.return();
                }
            },
            mousedownFunc.continuous,
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
        Events.mouseDown.addStream(button.eventStream);
        Events.mouseUp.addStream(button.eventStream);

        return button;
    }

    /**
     * Idles chained function.
     * @param {Function} eventHandler optionally wait for a specific event
     * @returns {ChainedFunctions} created wait chainedFunctions
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

    /**
     * Creates a request that returns once request has been fulfilled.
     * @param {("image" |
     *          "audio" |
     *          "font")} option type of request
     * @param {Image |
     *         Audio |
     *         FontFace} target where to save the request to
     * @param {String} source request source
     * @returns {ChainedFunctions} constructed request chainedFunctions
     */
    static request (option,target,source) {
        let request;
        let sendRequest;
        switch (option) {
            case "image":
                sendRequest = new ChainedFunctions([
                    () => {
                        request.target.src = request.source;
                        request.target.addEventListener("load", () => {
                            request.hasLoaded = true;
                        })
                    }
                ])
                break;
            case "audio":
                sendRequest = new ChainedFunctions([
                    () => {
                        request.target.src = request.source;
                        request.target.addEventListener("load",() => {
                            request.hasLoaded = true;
                        })
                    }
                ])
                break;
            case "font":
                sendRequest = new ChainedFunctions([
                    () => {
                        request.target = new FontFace(request.target.family,`url(${request.source})`);
                        document.fonts.add(request.target);
                        request.target.load().then(() => {
                            request.hasLoaded = true;
                        })
                    }
                ])
                break;
        }
        
        request = new ChainedFunctions([
            sendRequest,
            this.wait(() => request.hasLoaded)
        ])

        request.hasLoaded = false;
        request.target = target;
        request.source = source;
        return request;
    }
}

class Events {
    static mouseDown = new EventDistributor();
    static mouseDownEvent = new EventTask("mousedown",5);
    static mouseUp = new EventDistributor();
    static mouseUpEvent = new EventTask("mouseup",5);
    static mouseEventOptions = {
        mousePress: false
    }
    static mousePosition = new Coordinate();
    static mouseWheel = new EventDistributor();
    static mouseWheelUpEvent = new EventTask("mousewheelup",5);
    static mouseWheelDownEvent = new EventTask("mousewheeldown",5);
    static mouseWheelSpeed = 0;

    static keyDown = new EventDistributor();
    static keyDownEvent = new EventTask("keydown",4);
    static keyUp = new EventDistributor();
    static keyUpEvent = new EventTask("keyup",4);
}

document.addEventListener("mousedown",(ev) => {
    if (Events.mouseEventOptions.mousePress) {
        Events.mouseUp.distribute(Events.mouseUpEvent);
    }

    Events.mouseEventOptions.mousePress = true;
    Events.mouseDown.distribute(Events.mouseDownEvent);
})

document.addEventListener("mouseup",(ev) => {
    if (!Events.mouseEventOptions.mousePress) {
        Events.mouseDown.distribute(Events.mouseDownEvent);
    }

    Events.mouseEventOptions.mousePress = false;
    Events.mouseUp.distribute(Events.mouseDownEvent);
})

document.addEventListener("mousemove",(ev) => {
    Events.mousePosition.assignVal(2 * ev.x / window.innerWidth,2 * ev.y / window.innerWidth);
    let windowCenterPoint = new Coordinate(1,window.innerHeight/window.innerWidth);
    Events.mousePosition.assign(Events.mousePosition.difference(windowCenterPoint));
});

document.addEventListener("wheel",(ev) => {
    Events.mouseWheelSpeed = Math.abs(ev.deltaY);
    if (ev.deltaY > 0) {
        Events.mouseWheel.distribute(Events.mouseWheelDownEvent);
    } else {
        Events.mouseWheel.distribute(Events.mouseWheelUpEvent);
    }
})

document.addEventListener("keydown",ev => {
    let event = {... Events.keyDownEvent};
    event.key = ev.key;
    keyboardEvents.keyDown.distribute(event);
})

document.addEventListener("keyup",ev => {
    let event = {... Events.keyUpEvent};
    event.key = ev.key;
    keyboardEvents.keyUp.distribute(event);
})