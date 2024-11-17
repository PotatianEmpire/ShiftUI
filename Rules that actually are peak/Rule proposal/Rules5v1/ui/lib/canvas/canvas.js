



let canvas = {

    width: 0,
    height: 0,
    /**
     * @type {CanvasRenderingContext2D}
     */
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
        if (typeof sprite.particleEmitter == "function" &&
            typeof sprite.particleIterator == "function"
        ) {
            sprite.particleEmitter(sprite.particles);
            if (sprite.particles)
                sprite.particles = sprite.particles.filter((val,id) => {
                    sprite.particleIterator(val);
                    return !val.delete;
                });
        }
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
    pipelineRender () {
        canvas.context.canvas.height = this.height;
        canvas.context.canvas.width = this.width;
        for (const spriteKey of Object.keys(canvas.sprites)) {
            let sprite = canvas.sprites[spriteKey];
            canvas.draw(sprite);
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

class Sprite {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor (x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    addText (text,textBoxHeightScale,align) {
        this.text = text
        this.textBoxHeightScale = textBoxHeightScale;
        this.align = align;
    }
    addImage (image) {
        this.img = image;
    }
    rotate (angle) {
        this.angle = angle;
    }
    addParticleEmitter (particleEmitter,particleIterator) {
        if (typeof particleEmitter == "function" &&
            typeof particleIterator == "function"
        ) {
            this.particleEmitter = particleEmitter;
            this.particleIterator = particleIterator;
            this.particles = [];
        }
    }
}

class ImageSprite extends Sprite {
    constructor (x,y,width,height,image) {
        super(x,y,width,height);
        this.img = image;
    }   
}

class TextSprite extends Sprite {
    constructor (x,y,width,height,text,textBoxHeightScale,align) {
        super(x,y,width,height);
        this.text = text
        this.textBoxHeightScale = textBoxHeightScale;
        this.align = align;
    }
}
class TextImageSprite extends TextSprite {
    constructor (x,y,width,height,image,text,textBoxHeightScale,align) {
        super(x,y,width,height,text,textBoxHeightScale,align)
        this.img = image;
    }
}

class ParticleEmitter extends Sprite {
    constructor (x,y,width,height,particleEmitter,particleIterator) {
        super(x,y,width,height);
        this.addParticleEmitter(particleEmitter,particleIterator);
    }
}