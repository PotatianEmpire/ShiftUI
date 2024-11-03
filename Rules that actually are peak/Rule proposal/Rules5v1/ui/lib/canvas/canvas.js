



let canvas = {

    context: document.getElementById("view").getContext("2d"),
    draw(img,x,y,width,height){
        this.context.drawImage(img,x,y,width,height);
    },
    sprites: {},
    render () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        for (const spriteKey of Object.keys(this.sprites)) {
            let sprite = this.sprites[spriteKey];
            this.draw(sprite.img,sprite.x,sprite.y,sprite.width,sprite.height)
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
