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



class Character extends Sprite {
    constructor (x,y,width,height) {
        super (x,y,width,height);
        this.constructCards();
        this.constructOnTurn();
    }
    constructCards () {
        let cardsSprite = new Sprite(0,0,0.1,0.1);
        cardsSprite.addSubPass(sprite => {
            canvas.reverseRenderArray(this.cards.deck,sprite.x,sprite.y,sprite.width);
            canvas.reverseRenderArray(this.cards.hand,sprite.x,sprite.y,sprite.width);
        });
        cardsSprite.addActivation(sprite => {
            sprite.animation.activate();
        }, sprite => {
            sprite.animation.deactivate();
        })
        cardsSprite.addAnimationToChain(new ActivatedFunction(
            sprite => {
                sprite.x = 0.5;
                sprite.y = 0.5;
                sprite.width = 0.1;
            },
            sprite => {
                this.subSprites.cards.focus(this.cards.hand,sprite);
                this.subSprites.cards.focus(this.cards.deck,sprite);
                this.cards.deck.forEach((card,cardId) => {
                    card.show("deck",cardId);
                    card.x = id * 0.2 - this.cards.deck.length * 0.1 + card.offsetX;
                    card.y = card.offsetY;
                })
                this.cards.hand.forEach((card,cardId) => {
                    card.show("hand",cardId);
                    card.x = id * 0.2 - this.cards.hand.length * 0.1 + card.offsetX;
                    card.y = card.offsetY;
                })
            }
        ),"cardSelection");
        cardsSprite.addAnimationToChain(new ActivatedFunction(
            sprite => {
                sprite.x = this.x;
                sprite.y = this.y;
                sprite.width = 0.05;
                this.cards.deck.forEach((card,cardId) => {
                    card.focused = false;
                    card.unfocused = false;
                })
                this.cards.hand.forEach((card,cardId) => {
                    card.focused = false;
                    card.unfocused = false;
                })
            }, sprite => {
                this.cards.deck.forEach((card,cardId) => {
                    card.show("deck",cardId);
                })
            }
        ),"cardIdle")
        cardsSprite.appendAsSpriteTo(this.subSprites.cards);
    }
    constructOnTurn () {
        this.subSprites.onTurn = new Sprite();
        this.subSprites.onTurn.addActivation(sprite => {
            this.subSprites.cards.swapAnimation("cardSelection");
            this.subSprites.cards.activate();
        }, sprite => {
            this.subSprites.cards.swapAnimation("cardIdle")
        })
    }
    cards = {
        /** @type {Array<Card>} */
        deck: [],
        /** @type {Array<Card>} */
        hand: []
    }
    /** @type {Time} */
    time = null;

    subSprites = {
        /** @type {Sprite} */
        onTurn: {},
        ///** @type {Sprite} */
        cards: {
            /**
             * 
             * @param {Array<Card>} cards 
             * @param {Sprite} sprite
             */
            focus (cards,sprite) {
                let focused = false;
                cards.forEach((card,cardId) => {
                    card.unfocused = false;
                    if (!card.focused || focused.focused)
                        return;
                    if (!canvas.mouseOnRel(card,sprite.x,sprite.y,sprite.width) && mouse.mouseMove) {
                        card.focused = false;
                        return;
                    }
                    let focusId = cardId;
                    if (mouse.wheel != 0) {
                        focusId = ((addend) => {
                            card.focused = false;
                            if (focusId + addend >= cards.length )
                                return 0;
                            if (focusId + addend < 0)
                                return cards.length - 1;
                            return focusId + addend;
                        }) (mouse.wheel < 0 ? -1 : 1);
                        mouse.getWheel();
                        cards[focusId].focused = true;
                    }
                    for (let i = 0; i < focusId; i++) {
                        focused.deck[i].unfocused = true;
                    }
                    focused = true;
                })
                this.deck.forEach((card,cardId) => {
                    if (focused || !canvas.mouseOnRel(card,sprite.x,sprite.y,sprite.width))
                        return;
                    card.focused = true;
                    for (let i = 0; i < cardId; i++) {
                        cards[i].unfocused = true;
                    }
                    focused = true;
                })
            }
        }
    }
}

class Card extends ImageSprite {
    
}