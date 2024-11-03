let mouseX = 0;
let mouseY = 0;
let wheel = 0;

let onMouseMove = (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;
}

let mouseDown = false;
let inputStagger = true;

let onMouseDown = (e) => {
    if (inputStagger)
        return;
    mouseDown = true;
    inputStagger = true;
}

let onMouseUp = (e) => {
    if (inputStagger)
        return;
    mouseDown = false;
    inputStagger = true;
}

let onMouseWheel = (e) => {
    wheel = e.deltaY;
    inputStagger = true;
}