



let canvas = {

    width: 0,
    height: 0,
    context: document.getElementById("view").getContext("2d"),
    draw(sprite){
        if (!sprite.x)
            sprite.x = 0;
        let scaledX = this.scale(sprite.x);
        if (!sprite.y)
            sprite.y = 0;
        let scaledY = this.scale(sprite.y);
        if (!sprite.width)
            sprite.width = 0;
        let scaledWidth = this.scale(sprite.width);
        if (!sprite.height)
            sprite.height = 0;
        let scaledHeight = this.scale(sprite.height);
        this.context.save();
        if(sprite.angle) {
            this.context.translate(scaledX,scaledY);
            this.context.rotate(sprite.angle*2*Math.PI);
            this.context.translate(-scaledX,-scaledY);
        }
        if(sprite.img)
            this.context.drawImage(sprite.img,
                scaledX - scaledWidth / 2,
                scaledY - scaledHeight / 2,
                scaledWidth,
                scaledHeight);
        if(sprite.text) {
            let offset = 0;
            if(sprite.align == "top")
                offset = -this.scale(sprite.height/2);
            let style = {
                fontSize: 48,
                fontFamily: "'serif'",
                color: "#000000",
                align: "left"
            }
            sprite.text.split("\n").forEach((val,i) => {
                let valArr = val.split('"');
                let text = valArr[0];
                let styleArr = valArr[0].split(" ");
                styleArr = styleArr.filter((val,i) => val != "");
                for (let i = 0; i < styleArr.length; i++) {
                    const element = styleArr[i];
                    const typeDenominator = element.charAt(0);
                    switch (typeDenominator) {
                        case "#":
                            style.color = element;
                            break;
                        case "'":
                            if (document.fonts.check("10px " + element))
                                style.fontFamily = element;
                            break;
                        default:
                            if (parseFloat(element) > 0) {
                                style.fontSize = this.scale(parseFloat(element));
                                break;
                            }
                            style.align = element;
                            break;
                    }
                }
                this.context.font = style.fontSize + "px " + style.fontFamily;
                this.context.fillStyle = style.color;
                this.context.textAlign = style.align;
                if (valArr.length > 1){
                    valArr.shift();
                    valArr.pop();
                    text = valArr.join("\"");
                }
                this.context.fillText(text,this.scale(sprite.x),this.scale(sprite.y) + offset);
                if (!sprite.textBoxHeightScale)
                    sprite.textBoxHeightScale = 1.1
                let offsetAmount = style.fontSize * sprite.textBoxHeightScale;
                offset += offsetAmount;
            })
        }
        this.context.restore();
    },
    scale: (coord) => coord * canvas.width,
    unscale: (coord) => coord / canvas.width,
    render (sprites) {
        
        canvas.context.canvas.height = this.height;
        canvas.context.canvas.width = this.width;
        for (const spriteKey of Object.keys(sprites)) {
            let sprite = sprites[spriteKey];
            this.draw(sprite)
        }
    },
    clear () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    mouseOn (sprite) {
        if (sprite.x - sprite.width / 2 > mouse.mouseX || sprite.y - sprite.height / 2 > mouse.mouseY)
            return false;
        if (sprite.x + sprite.width / 2 < mouse.mouseX || sprite.y + sprite.height / 2 < mouse.mouseY)
            return false;
        return true;
    },
    scaleFromImage (sprite,factor) {
        sprite.height = sprite.img.height * factor;
        sprite.width = sprite.img.width * factor;
    },
    getTextHeight: (sprite,fontSize) => sprite.text.split("\n").length * fontSize * sprite.textBoxHeightScale,
}

