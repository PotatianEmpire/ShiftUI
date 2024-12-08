
let mouse = {
    mouseX: 0,
    mouseY: 0,
    wheel: 0,
    wheelStagger: false,
    mouseDown: false,
    mouseDownStagger: false,
    mouseUp: true,
    mouseUpStagger: false,
    mouseClick: false,
    mouseClicks: 0,
    mouseMove: false,
    mouseMoveStagger: false,
    mouseMoveOldX: 0,
    mouseMoveOldY: 0,
    mouseMoveTolerance: 0.01,

    getMouseX: () => {
        return mouse.mouseX;
    },
    getMouseY: () => {
        return mouse.mouseY;
    },
    getMouseDown: () => {
        mouse.mouseDownStagger = false;
        return mouse.mouseDown;
    },
    getMouseClicks: () => {
        let retVal = mouse.mouseClicks;
        mouse.mouseClicks = 0;
        return retVal;
    },
    getWheel: () => {
        mouse.wheelStagger = false;
        mouse.wheel = 0;
        return mouse.wheel;
    },
    unstaggerAll: () => {
        mouse.wheelStagger = false;
        mouse.mouseDownStagger = false;
        mouse.mouseClicks = 0;
        mouse.mouseMoveStagger = false;
        mouse.mouseUpStagger = false;
    },
    getMouseMove: () => {
        mouse.mouseMoveStagger = false;
        mouse.mouseMove = false;
        return mouse.mouseMove;
    }
}

document.addEventListener("mousemove",(e) => {

    mouse.mouseX = canvas.unscale(e.clientX);
    mouse.mouseY = canvas.unscale(e.clientY);

    let deltaX = mouse.mouseMoveOldX - mouse.mouseX;
    let deltaY = mouse.mouseMoveOldY - mouse.mouseY;
    if (mouse.mouseMoveStagger || 
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) < mouse.mouseMoveTolerance)
        return;
    mouse.mouseMoveOldX = mouse.mouseX;
    mouse.mouseMoveOldY = mouse.mouseY;
    mouse.mouseMove = true;
    mouse.mouseMoveStagger = true;

})


document.addEventListener("mousedown",(e) => {
    
    mouse.mouseClick = true;
    if (mouse.mouseDownStagger)
        return;
    mouse.mouseDown = true;
    if (!mouse.mouseUpStagger)
        mouse.mouseUp = false;
    mouse.mouseDownStagger = true;

})

document.addEventListener("mouseup",(e) => {
    
    if (mouse.mouseClick)
        mouse.mouseClicks++;
    mouse.mouseClick = false;
    if (mouse.mouseUpStagger)
        return;
    mouse.mouseUp = true;
    if (!mouse.mouseDownStagger)
        mouse.mouseDown = false;
    mouse.mouseUpStagger = true;

})

document.addEventListener("wheel",(e) => {
    if (mouse.wheelStagger){
        mouse.wheel += e.deltaY;
        return;
    }
    mouse.wheel = e.deltaY;
    mouse.wheelStagger = true;
})