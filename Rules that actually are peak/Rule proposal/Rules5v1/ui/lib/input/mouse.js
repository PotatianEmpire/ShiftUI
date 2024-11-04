
let mouse = {
    mouseX: 0,
    mouseY: 0,
    wheel: 0,
    wheelStagger: false,
    mouseDown: false,
    mouseDownStagger: false,
    mouseClick: false,
    mouseClicks: 0,
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
        return mouse.wheel;
    },
    unstaggerAll: () => {
        mouse.wheelStagger = false;
        mouse.mouseDownStagger = false;
        mouse.mouseClicks = 0;
    }
}

document.addEventListener("mousemove",(e) => {

    mouse.mouseX = e.clientX;
    mouse.mouseY = e.clientY;

})


document.addEventListener("mousedown",(e) => {
    
    mouse.mouseClick = true;
    if (mouse.mouseDownStagger)
        return;
    mouse.mouseDown = true;
    mouse.mouseDownStagger = true;

})

document.addEventListener("mouseup",(e) => {
    
    if (mouse.mouseClick)
        mouse.mouseClicks++;
    mouse.mouseClick = false;
    if (mouse.mouseDownStagger)
        return;
    mouse.mouseDown = false;
    mouse.mouseDownStagger = true;

})

document.addEventListener("wheel",(e) => {
    if (mouse.wheelStagger){
        mouse.wheel += e.deltaY;
        return;
    }
    mouse.wheel = e.deltaY;
    mouse.wheelStagger = true;
})