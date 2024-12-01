



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
    draw(sprite,x,y,reference,depth){
        if(sprite.thread) {
            if(sprite.thread.origin) {
                const nextFrame = {next: false};
                while (!nextFrame.next) {
                    if (sprite.thread.getNext(nextFrame)) {
                        nextFrame.next = true;
                        sprite.thread.on = true;
                    };
                }
            }
        }
        if(typeof sprite.activation == "function" &&
            typeof sprite.deactivation == "function")
            if (sprite.stateSwitched()) {
                if (sprite.deactivated)
                    sprite.deactivation(sprite);
                else
                    sprite.activation(sprite);
            }
        if (sprite.deactivated)
            return;
        if(sprite.main instanceof ActivatedFunction) {
            if(sprite.main.active) {
                if(sprite.main.wasActivated())
                    sprite.main.init(sprite);
                sprite.main.func(sprite);
            }
        }
        if(sprite.animation instanceof ActivatedFunction) {
            if (sprite.animation.active &&
                !sprite.animation.paused &&
                sprite.animation.timeout < 1 &&
                sprite.animation.frame % sprite.animation.interval == 0) {
                if (sprite.animation.wasActivated ()) {
                    sprite.animation.init(sprite,sprite.animation);
                }
                sprite.animation.func(sprite,sprite.animation);
                sprite.animation.timeout--;
            }
            if (!sprite.animation.paused)
                sprite.animation.frame++;
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
        if (typeof sprite.subPass == "function")
            sprite.subPass(sprite);
        if (sprite.subSprites && !sprite.subSpritesDeactivated && depth < 100) {
            this.render(sprite.subSprites,this.unscale(scaledX),this.unscale(scaledY),this.unscale(scaledWidth),depth);
        }
        this.context.restore();
    },
    scale: (coord) => coord * canvas.width,
    localScale: (coord,reference) => coord * reference,
    unscale: (coord) => coord / canvas.width,
    localUnscale: (coord,reference) => coord / reference,
    render (sprites,x = 0, y = 0, reference = 1.0, depth = 0) {
        
        for (const spriteKey of Object.keys(sprites)) {
            let sprite = sprites[spriteKey];
            this.draw(sprite,x,y,reference, depth + 1);
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
    /**
     * @deprecated
     * sets width and height of sprite to image * factor
     * @param {Sprite} sprite sprite to be scaled by factor from image
     * @param {Number} factor factor to scale img by and apply sprite
     */
    scaleFromImage (sprite,factor) {
        sprite.height = sprite.img.height * factor;
        sprite.width = sprite.img.width * factor;
    },
    getTextHeight: (sprite,fontSize) => sprite.text.split("\n").length * fontSize * sprite.textBoxHeightScale,
}

class ActivatedFunction {
    /**
     * 
     * @param {{(sprite: Sprite, animationProperties: ActivatedFunction) : void}} init 
     * @param {{(sprite: Sprite, animationProperties: ActivatedFunction) : void}} func 
     * @returns 
     */
    constructor (init = () => {}, func = () => {}) {
        if (typeof init != "function" ||
            typeof func != "function")
            return;
        this.init = init;
        this.func = func;
    }
    active = false;
    stateSwitch = false;
    paused = false;
    frame = 0;
    activate () {
        this.stateSwitch = !this.active;
        this.active = true;
    }
    deactivate () {
        this.stateSwitch = this.active;
        this.active = false;
    }
    wasActivated () {
        let ret = this.stateSwitch;
        this.stateSwitch = false;
        return ret;
    }
    setFrameInterval (interval) {
        this.interval = interval;
    }
    pause () {
        this.paused = true;
    }
    setTimeout (time) {
        this.timeout = time;
    }
    unpause () {
        this.paused = false;
    }
}

class Sprite {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    deactivated = true;
    stateSwitch = false;
    constructor (x = 0.5,y = 0.5,width = 0.5,height = 0.3,subSprites = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if(subSprites)
            this.addSubsprites(subSprites)
    }
    addText (text,textBoxHeightScale = 1.0,align = "center") {
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
    appendAsSubSpriteTo (parentObject,key) {
        if (!parentObject.subSprites)
            parentObject.subSprites = {};
        parentObject.subSprites[key] = this;
    }
    fuseSprite (parentObject) {
        let temp = parentObject;
        for (const key of Object.keys(temp)) {
            if (!this[key])
                this[key] = temp[key];
        }
        Object.setPrototypeOf(parentObject,Sprite.prototype);
        return this;
    }
    /**
     * 
     * @param {ActivatedFunction} animation 
     */
    addAnimation(animation) {
        if (animation instanceof ActivatedFunction)
            this.animation = animation;
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
        let ret = this.stateSwitch && !this.deactivated;
        this.stateSwitch = false;
        return ret;
    }
    stateSwitched () {
        let ret = this.stateSwitch;
        this.stateSwitch = false;
        return ret;
    }
    /**
     * 
     * @param {{(sprite: Sprite) : void}} subPass 
     */
    addSubPass (subPass) {
        if (typeof subPass != "function")
            return;
        this.subPass = subPass;
    }
    addAnimationChain (animations = {}) {
        if (!this.animation)
            this.addAnimation(new ActivatedFunction());
        this.animationChain = animations;
    }
    /**
     * 
     * @param {ActivatedFunction} animation 
     * @param {String} key 
     */
    addAnimationToChain (animation, key) {
        if (!this.animation)
            this.addAnimation(animation);
        if (!this.animationChain)
            this.addAnimationChain();
        this.animationChain[key] = animation;
    }
    swapAnimation (key) {
        this.animation.deactivate();
        let newAnimation = this.animationChain[key];
        if (newAnimation instanceof ActivatedFunction) {
            this.animation = this.animationChain[key];
            this.animation.activate();
        }
    }
    /**
     * @deprecated
     * @param {ActivatedFunction} mainFunction
     */
    addMainFunction (mainFunction) {
        this.main = mainFunction;
    }
    /**
     * 
     * @param {{(sprite: Sprite): void}} activation 
     * @param {{(sprite: Sprite): void}} deactivation
     */
    addActivation (activation = () => {}, deactivation = () => {}) {
        if (typeof activation == "function" &&
            typeof deactivation == "function") {
                this.activation = activation;
                this.deactivation = deactivation;
            }
    }
    
    /**
     * 
     * @param {Thread} thread 
     */
    addThread (thread) {
        this.thread = thread;
        this.thread.parentSprite = this;
    }

    subSpritesDeactivated = false;

    /**
     * Only activates subSprites on this sprite
     * @returns {void}
     */
    activateSubSprites () {
        if (!this.subSprites)
            return;
        for (const key in this.subSprites) {
            this.subSprites[key].activate();
        }
        this.subSpritesDeactivated = false;
    }

    /**
     * Only deactivates subSprites on this sprite
     * @returns {void}
     */
    deactivateSubSprites () {
        if (!this.subSprites)
            return;
        for (const key in this.subSprites) {
            this.subSprites[key].deactivate();
        }
        this.subSpritesDeactivated = true;
    }

    /**
     * 
     * @param {{(val: Sprite, key: String)}} callback 
     */
    forEach(callback) {
        if (typeof callback != "function")
            return;
        for (const key in this.subSprites) {
            callback(this.subSprites[key],key);
        }
    }

} 

class Thread {

    /**
     * 
     * @param {Array<{(thread: Thread): void}>} functions 
     */
    constructor (functions) {
        this.functions = functions;
    }

    origin = false
    on = false
    next = 0
    functions = []
    lentTo = null
    returnVal = {}
    lender = null
    returnThisThread = false
    nextFrame = false
    args = {}
    variables = {}
    getNext(nextFrame) {
        if (this.on) { // if this thread should be executed
            if (this.next < this.functions.length) {    // if any functions on this thread are left to execute
                this.functions[this.next](this);
                nextFrame.next = this.nextFrame;
                this.nextFrame = false;
                this.next++;
            }
        } else if (this.lentTo) {
            this.on = this.lentTo.getNext(nextFrame);
            this.returnThisThread = false;
        } else {
            this.on = true;
            this.returnThisThread = false;
        }
        this.returnThisThread = this.next >= this.functions.length || this.returnThisThread;    // return if no thread functions left to execute or the thread is telling to return
        if (this.returnThisThread && this.on) { // returning a thread is only permitted to the thread that is on.
            this.next = 0;
            this.returnThisThread = false;
            this.nextFrame = false;
            this.on = false;
            return true;
        }
        return false;
    }
    lendThread (thread,args) {
        this.lentTo = thread;
        thread.on = true;
        thread.args = args;
        thread.lender = this;
        this.on = false;
    }
    returnThread (returnVal) {
        this.lender.returnVal = returnVal;
        this.returnThisThread = true;
    }
    requestNextFrame () {
        this.nextFrame = true;
    }
    requestNextFrameAndLoop () {
        this.requestNextFrame();
        this.next --;
    }
    makeThreadOrigin () {
        this.origin = true;
        this.on = true;
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
     * @param {ActivatedFunction} animation 
     * @param {Object} subSprites 
     */
    constructor (x,y,width,height,animation,subSprites = null) {
        super(x,y,width,height,subSprites);
        this.addAnimation(animation);
    }
}