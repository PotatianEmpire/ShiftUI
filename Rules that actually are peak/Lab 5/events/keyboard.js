let keyDown = new EventStream();

document.addEventListener("key",ev => {
    keyDown.pushEvent(ev);
})