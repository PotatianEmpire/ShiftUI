



let canvas = {

    width: 0,
    height: 0,
    referenceHeight: 0,
    /**
     * @type {CanvasRenderingContext2D}
     */
    context: document.getElementById("view").getContext("2d"),
    /**
     * 
     * @param {Sprite} sprite 
     * @param {*} x 
     * @param {*} y 
     * @param {*} reference 
     */
    draw(sprite,x,y,reference){
        if (sprite.deactivated)
            return;
        if(typeof sprite.animation == "function") {
            if(sprite.wasActivated())
                sprite.animation.init(sprite);
            else
                sprite.animation.animation(sprite);
        }
        if (!sprite.x)
            sprite.x = 0;
        if (!sprite.y)
            sprite.y = 0;
        if (!sprite.width)
            sprite.width = 0;
        if (!sprite.height)
            sprite.height = 0;
        let scaledX, scaledY, scaledWidth, scaledHeight;
        if (sprite.z) {
            scaledX = this.scale((this.localScale(sprite.x,reference) + x - 0.5) / (1 + this.localScale(sprite.z,reference))) + this.width / 2;
            scaledY = this.scale((this.localScale(sprite.y,reference) + y - this.unscale(this.height)/2) / (1 + this.localScale(sprite.z,reference))) + this.height / 2;
            scaledWidth = this.scale((this.localScale(sprite.width,reference)) / (1 + this.localScale(sprite.z,reference)));
            scaledHeight = this.scale((this.localScale(sprite.height,reference)) / (1 + this.localScale(sprite.z,reference)));
        } else {
            scaledX = this.scale(this.localScale(sprite.x,reference) + x);
            scaledY = this.scale(this.localScale(sprite.y,reference) + y);
            scaledWidth = this.scale(this.localScale(sprite.width,reference));
            scaledHeight = this.scale(this.localScale(sprite.height,reference));
        }


    //     if(sprite.img)
    //         console.log(`
    // x: ${scaledX};
    // y: ${scaledY};
    // widht: ${scaledWidth};
    // height: ${scaledHeight};
    // angle: ${sprite.angle};
    // image: ${sprite.img};
    // transparency: ${sprite.transparency};
    // text: ${sprite.text}`)

        this.context.save();
        if(sprite.angle) {
            this.context.translate(scaledX,scaledY);
            this.context.rotate(sprite.angle*2*Math.PI);
            this.context.translate(-scaledX,-scaledY);
        }
        if(sprite.transparency)
            this.context.globalAlpha = sprite.transparency;
        if(sprite.img)
            this.context.drawImage(sprite.img,
                scaledX - scaledWidth / 2,
                scaledY - scaledHeight / 2,
                scaledWidth,
                scaledHeight);
        if(sprite.sample)
            this.context.drawImage(sprite.sample.img,
                this.localScale(sprite.sample.sampleX,sprite.sample.img.width),
                this.localScale(sprite.sample.sampleY,sprite.sample.img.height),
                this.localScale(sprite.sample.sampleWidth,sprite.sample.img.width),
                this.localScale(sprite.sample.sampleHeight,sprite.sample.img.height),
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
                this.context.fillText(text,scaledX,scaledY + offset);
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
        if (sprite.subSprites) {
            this.render(sprite.subSprites,this.unscale(scaledX),this.unscale(scaledY),this.unscale(scaledWidth));
        }
    },
    scale: (coord) => coord * canvas.width,
    localScale: (coord,reference) => coord * reference,
    unscale: (coord) => coord / canvas.width,
    localUnscale: (coord,reference) => coord / reference,
    render (sprites,x = 0, y = 0, reference = 1.0) {
        
        for (const spriteKey of Object.keys(sprites)) {
            let sprite = sprites[spriteKey];
            this.draw(sprite,x,y,reference)
        }
    },
    renderArray (sprites,x = 0, y = 0, reference = 1.0) {
        
        sprites.forEach(sprite => {
            this.draw(sprite,x,y,reference);
        })
    },
    reverseRenderArray (sprites,x = 0, y = 0, reference = 1.0) {
        
        for (let i = sprites.length - 1; i >= 0; i--) {
            this.draw(sprites[i],x,y,reference);        
        }
    },
    clear () {
        canvas.context.canvas.height = this.height;
        canvas.context.canvas.width = this.width;
        this.referenceHeight = this.unscale(this.height);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    mouseOn (sprite) {
        this.mouseOnRel(sprite,0,0,1);
    },
    mouseOnRel (sprite,x,y,reference) {
        let scaledX = this.localScale(sprite.x,reference) + x;
        let scaledY = this.localScale(sprite.y,reference) + y;
        let scaledWidth = this.localScale(sprite.width,reference);
        let scaledHeight = this.localScale(sprite.height,reference);
        if (sprite.subSprites)
            for (const spriteKey of Object.keys(sprite.subSprites)) {
                let subSprite = sprite.subSprites[spriteKey];
                if(this.mouseOnRel(subSprite,scaledX,scaledY,scaledWidth))
                    return true;
            }
        if (scaledX - scaledWidth / 2 > mouse.mouseX || scaledY - scaledHeight / 2 > mouse.mouseY)
            return false;
        if (scaledX + scaledWidth / 2 < mouse.mouseX || scaledY + scaledHeight / 2 < mouse.mouseY)
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
    deactivated = false;
    stateSwitch = false;
    constructor (x,y,width,height,subSprites = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if(subSprites)
            this.addSubsprites(subSprites)
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
    addSubsprites (subSprites) {
        this.subSprites = subSprites;
    }
    addTransparency (transparency) {
        this.transparency = transparency;
    }
    append (parentObject,key) {
        if (!parentObject.subSprites)
            parentObject.subSprites = {};
        parentObject.subSprites[key] = key;
    }
    /**
     * 
     * @param {{(sprite: Sprite) : Function}} animation 
     */
    addAnimation (init,animation) {
        if (typeof animation != "function" ||
            typeof init != "function")
            return;
        this.animation = {
            animation: animation,
            init: init
        };
    }
    /**
     * 
     * @param {Sample} sample 
     */
    addImageSample (sample) {
        this.sample = sample;
    }
    deactivate () {
        this.stateSwitch = !this.deactivated;
        this.deactivated = true;
    }
    activate () {
        this.stateSwitch = this.deactivated;
        this.deactivated = false;
    }
    wasActivated () {
        let ret = this.stateSwitch;
        this.stateSwitch = false;
        return ret;
    }
} 

class Sample {
    constructor (image,sampleX,sampleY,sampleWidth,sampleHeight) {
        this.img = image;
        this.sampleX = sampleX;
        this.sampleY = sampleY;
        this.sampleWidth = sampleWidth;
        this.sampleHeight = sampleHeight;
    }
}

class ImageSprite extends Sprite {
    constructor (x,y,width,height,image,subSprites = null) {
        super(x,y,width,height,subSprites);
        this.img = image;
    }   
}

class TextSprite extends Sprite {
    constructor (x,y,width,height,text,textBoxHeightScale,align,subSprites = null) {
        super(x,y,width,height,subSprites);
        this.text = text
        this.textBoxHeightScale = textBoxHeightScale;
        this.align = align;
    }
}
class TextImageSprite extends TextSprite {
    constructor (x,y,width,height,image,text,textBoxHeightScale,align,subSprites = null) {
        super(x,y,width,height,text,textBoxHeightScale,align,subSprites);
        this.img = image;
    }
}

class SampleSprite extends Sprite {
    constructor (x,y,width,height,sample) {
        super(x,y,width,height);
        this.addImageSample(sample);
    }
}

class ParticleEmitter extends Sprite {
    constructor (x,y,width,height,particleEmitter,particleIterator,subSprites = null) {
        super(x,y,width,height,subSprites);
        this.addParticleEmitter(particleEmitter,particleIterator);
    }
}

class AnimatedSprite extends Sprite {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {{(sprite: Sprite) : Function}} animation 
     * @param {Object} subSprites 
     */
    constructor (x,y,width,height,animation,subSprites = null) {
        super(x,y,width,height,subSprites);
        this.addAnimation(animation);
    }
}