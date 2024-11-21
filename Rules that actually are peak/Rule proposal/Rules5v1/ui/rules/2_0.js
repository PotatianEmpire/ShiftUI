class Card extends ImageSprite {
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Image} background 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} focus 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} unfocus 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} idle 
     * @param {{(sprite: Sprite): void}} chargeAnimationInit
     * @param {{(sprite: Sprite): void}} chargeAnimation
     */
    constructor(width,height,background,
        focus,unfocus,idle,
        chargeAnimationInit,chargeAnimation,
    ) {
        super(0,0,width,height,background);
        if (typeof focus != "function" ||
            typeof unfocus != "function" ||
            typeof idle != "function")// ||
            // typeof chargeAnimationInit != "function")
            return;
        this.ui.focus = focus;
        this.ui.unfocus = unfocus;
        this.ui.idle = idle;
        // this.subSprites.charges.addAnimation(chargeAnimationInit,chargeAnimation);
    }

    show (stackId,id) {
        if (this.focused)
            this.ui.focus(this,stackId,id);
        else if (this.unfocused)
            this.ui.unfocus(this,stackId,id);
        else
            this.ui.idle(this,stackId,id);
    }
    // for using passive and animating passive on character
    passives () {}
    // for using active and animating active on character
    active () {}
    // for reacting to being hit and animating on character
    inflict () {}
    // for the effects on discharge
    discharge () {}
    focused = false;
    unfocused = false;
    offsetX = 0;
    offsetY = 0;
    cardMechanics = {
        activate () {},
        activateable () {},
        blocking: true
    }
    ui = {
        focus() {},
        unfocus() {},
        idle() {}
    }
    subSprites = {
        charges: new ImageSprite (-(0.75 + 1) / 2,0,0.75,0.75,images.contrastCardTest, {
            charge1: new SampleSprite (-0.2,0,0.1,0.8,new Sample(images.textureTest,0,0,0.1,0.8))
        })
    }
}

class Player{
    /**
     * 
     * @param {{
     *  cardWidth: Number,
     *  deckPosition: {
     *      x: Number,
     *      y: Number
     *  },
     *  handPosition: {
     *      x: Number,
     *      y: Number
     *  }
     * }} ui 
     */
    constructor (ui) {
        this.ui = ui;
    }
    addCard (card) {
        for (let stackId = 0; stackId < this.hand.length; stackId++) {
            const stack = this.hand[stackId];
            if (stack.length > 2)
                continue;
            stack.push(card);
            return;
        }
        this.deck.push(card);
    }
    ui = {
        cardWidth: 0.05,
        deckPosition: {
            x: 0,
            y: 0
        },
        handPosition: {
            x: 0,
            y: 0
        }
    }
    /** @type {Array<Card>} */
    deck = [];
    /** @type {Array<Array<Card>>} */
    hand = [[],[],[],[],[],[]];
    focused = false;
    pauseUI = false;
    onTurn () {

        this.focusCard();

        this.animate();

        this.render();
        
    }
    focusCard () {}
    render () {}
    animate () {}
    inflict () {}
    time () {}
}