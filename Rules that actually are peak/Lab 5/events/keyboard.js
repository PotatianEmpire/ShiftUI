let keyboardEvents = {
    keyDown: new EventDistributor()
}

document.addEventListener("key",ev => {
    keyboardEvents.keyDown.distribute(ev);
})