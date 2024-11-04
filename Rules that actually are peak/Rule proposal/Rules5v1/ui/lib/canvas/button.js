
let createButton = (sprite,onHover,onClick,def) => {
    if (typeof onHover != "function" &&
        typeof onClick != "function" &&
        typeof def != "function")
            return false;
    if(!canvas.mouseOn(sprite))
        return def();
    if(!mouse.getMouseDown()){
        if(sprite.buildUp) {
            sprite.buildUp = false;
            return onClick();
        }
        return onHover();
    }
    sprite.buildUp = true;
}