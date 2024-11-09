



let canvas = {

    width: 0,
    height: 0,
    context: document.getElementById("view").getContext("2d"),
    draw(sprite){

        this.context.save();
        this.context.translate(this.scale(sprite.x),this.scale(sprite.y));
        if(!sprite.angle)
            sprite.angle = 0;
        this.context.rotate(sprite.angle*2*Math.PI);
        this.context.translate(-this.scale(sprite.x),-this.scale(sprite.y));
        if(sprite.img)
            this.context.drawImage(sprite.img,
                this.scale(sprite.x - sprite.width / 2),
                this.scale(sprite.y - sprite.height / 2),
                this.scale(sprite.width),
                this.scale(sprite.height));
        if(sprite.text) {
            let font = "48px 'serif'";
            let color = "#000000";
            if (!sprite.textBoxHeightScale)
                sprite.textBoxHeightScale = 1.1
            let offsetAmount = 48 * sprite.textBoxHeightScale;
            let offset = -offsetAmount;
            sprite.text.split("\n").forEach((val,i) => {
                offset += offsetAmount;
                let valArr = val.split('"');
                let text = valArr[0];
                let style = val.split('"')[0].split(" ");
                style = style.filter((val,i) => val != "");
                if(style.length < 1) {} else if(style[0].charAt(0) == "#") {
                    color = style[0];
                } else if(style.length >= 3) {
                    font = this.scale(parseFloat(style[0])) + "px " + style[1];
                    offsetAmount = this.scale(parseFloat(style[0]) * sprite.textBoxHeightScale)
                    color = style[2];
                }
                this.context.font = font;
                this.context.fillStyle = color;
                this.context.textAlign = "center";
                if (valArr.length > 1){
                    valArr.shift();
                    valArr.pop();
                    text = valArr.join("\"");
                }
                this.context.fillText(text,this.scale(sprite.x),this.scale(sprite.y) + offset);
            })
        }
        this.context.restore();
    },
    overlayText(text,font,textColor,x,y,mode = "align-center",angle = 0) {
        console.log(font)
        if(mode != "align-center")
            return;
        this.context.save();
        this.context.translate(this.scale(x),this.scale(y));
        this.context.rotate(angle*2*Math.PI);
        this.context.translate(-this.scale(x),-this.scale(y));
        this.context.font = font;
        this.context.fillColor = textColor;
        this.context.textAlign = "center";
        text.split("\n").forEach((val,i) => {
            
        });
        this.context.fillText(text,this.scale(x),this.scale(y));
        this.context.restore();
    },
    scale: (coord) => coord * canvas.width,
    render (sprites) {
        
        canvas.context.canvas.height = this.height;
        canvas.context.canvas.width = this.width;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        for (const spriteKey of Object.keys(sprites)) {
            let sprite = sprites[spriteKey];
            this.draw(sprite)
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

