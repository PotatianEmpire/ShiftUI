



let canvas = {

    context: document.getElementById("view").getContext("2d"),
    draw(img,x,y,width,height,mode = "align-top-left"){
        switch (mode) {
            case "align-top-left":
                this.context.drawImage(img,x,y,width,height);
                break;
            case "align-center":
                this.context.drawImage(img,x - width / 2, y - height / 2,width,height);
                break;
            default:
                return false;
        }
    },
    render (sprites) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        for (const spriteKey of Object.keys(sprites)) {
            let sprite = sprites[spriteKey];
            if (!sprite.mode)
                sprite.mode = "align-top-left";
            this.draw(sprite.img,sprite.x,sprite.y,sprite.width,sprite.height,sprite.mode);
        }
    },
    mouseOn (sprite) {
        if (!sprite.mode)
            sprite.mode = "align-top-left";
        switch (sprite.mode) {
            case "align-top-left":
                if (sprite.x > mouse.mouseX || sprite.y > mouse.mouseY)
                    return false;
                if (sprite.x + sprite.width < mouse.mouseX || sprite.y + sprite.height < mouse.mouseY)
                    return false;
                return true;
            case "align-center":
                if (sprite.x - sprite.width / 2 > mouse.mouseX || sprite.y - sprite.height / 2 > mouse.mouseY)
                    return false;
                if (sprite.x + sprite.width / 2 < mouse.mouseX || sprite.y + sprite.height / 2 < mouse.mouseY)
                    return false;
                return true;
            default:
                return false;
        }
    },
    scaleFromOriginal (sprite,factor) {
        sprite.height = sprite.img.height * factor;
        sprite.width = sprite.img.width * factor;
    }
}

canvas.context.canvas.height = window.innerHeight;
canvas.context.canvas.width = window.innerWidth;
