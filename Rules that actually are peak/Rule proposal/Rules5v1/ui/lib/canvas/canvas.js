



let canvas = {

    context: document.getElementById("view").getContext("2d"),
    draw(img,x,y,width,height,mode = "align-top-left"){
        switch (mode) {
            case "align-top-left":
                this.context.drawImage(img,x,y,width,height);
                break;
            case "align-center":
                this.context.drawImage(img,x - width >> 1, y - height >> 1,width,height);
                break;
            default:
                return false;
        }
    },
    sprites: {},
    render () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        for (const spriteKey of Object.keys(this.sprites)) {
            let sprite = this.sprites[spriteKey];
            if (!sprite.mode)
                sprite.mode = "align-top-left";
            this.draw(sprite.img,sprite.x,sprite.y,sprite.width,sprite.height,sprite.mode);
        }
    },
    mouseOn (sprite) {
        if (sprite.x > mouseX || sprite.y > mouseY)
            return false;
        if (sprite.x + sprite.width < mouseX || sprite.y + sprite.height < mouseY)
            return false;
        return true;
    },
    scaleFromOriginal (sprite,factor) {
        sprite.height = sprite.img.height * factor;
        sprite.width = sprite.img.width * factor;
    }
}

canvas.context.canvas.height = window.innerHeight;
canvas.context.canvas.width = window.innerWidth;
