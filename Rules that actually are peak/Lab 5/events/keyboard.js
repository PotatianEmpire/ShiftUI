/**
 * keyboard events have an importance value of 4 on default.
 */
let keyboardEvents = {
    importance: 4,
    keyDown: new EventDistributor(),
    keyUp: new EventDistributor()
}

document.addEventListener("keydown",ev => {
    let event = new EventTask("keydown",keyboardEvents.importance);
    event.key = ev.key;
    keyboardEvents.keyDown.distribute(ev);
})

document.addEventListener("keyup",ev => {
    let event = new EventTask("keyup",keyboardEvents.importance);
    event.key = ev.key;
    keyboardEvents.keyUp.distribute(ev);
})