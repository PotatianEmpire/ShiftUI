/**
 * keyboard events have an importance value of 4 on default.
 */
let keyboardEvents = {
    importance: 4,
    keyDown: new EventDistributor()
}

document.addEventListener("keydown",ev => {
    let event = new EventTask("keydown",keyboardEvents.importance);
    event.key = ev.key;
    keyboardEvents.keyDown.distribute(ev);
})