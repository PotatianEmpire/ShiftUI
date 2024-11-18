class Card extends ImageSprite {
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Image} background 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} focus 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} unfocus 
     * @param {{(card: Card, stackId: Number, id: Number) : void}} idle 
     */
    constructor(width,height,background,
        focus,unfocus,idle
    ) {
        super(0,0,width,height,background);
        if (typeof focus != "function" ||
            typeof unfocus != "function" ||
            typeof idle != "function")
            return;
        this.focus = focus;
        this.unfocus = unfocus;
        this.idle = idle;
    }

    show () {
        if (this.focused)
            this.focus(this);
        else if (this.unfocused)
            this.unfocus(this);
        else
            this.idle(this);
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

        this.focused = false;
        // unfocus
        this.deck.forEach((card,id) => {
            card.unfocused = false;
            if (!card.focused || this.focused)
                return;
            if (!canvas.mouseOnRel(card,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth) && mouse.mouseMove) {
                mouse.getMouseMove();
                card.focused = false;
                return;
            }
            let focusId = id
            if (mouse.wheel != 0) {
                focusId = ((addend) => {
                    card.focused = false;
                    if (focusId + addend >= this.deck.length )
                        return 0;
                    if (focusId + addend < 0)
                        return this.deck.length - 1;
                    return focusId + addend;
                }) (mouse.wheel > 0 ? -1 : 1);
                mouse.getWheel();
                this.deck[focusId].focused = true;
            }
            for (let i = 0; i < focusId; i++) {
                this.deck[i].unfocused = true;
            }
            this.focused = true;
        })
        this.hand.forEach((stack,stackId) => {
            stack.forEach((card,id) => {
                card.unfocused = false;
                
            })
        })
        
        // focus
        this.deck.forEach((card,id) => {
            if (this.focused || !canvas.mouseOnRel(card,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth))
                return;
            card.focused = true;
            for (let i = 0; i < id; i++) {
                this.deck[i].unfocused = true;
            }
            this.focused = true;
        })
        this.hand.forEach((stack,stackId) => {
            stack.forEach((card,id) => {
                if (this.focused || !canvas.mouseOnRel(card,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth))
                    return;
                card.focused = true;
                for (let i = 0; i < id; i++) {
                    this.hand[stackId][i].unfocused = true;
                }
                for (let stackI = 0; stackI < stackId; stackI++) {
                    for (let cardI = 0; cardI < this.hand[stackI].length; cardI++) {
                        this.hand[stackI][cardI].unfocused = true;
                    }
                }
                this.focused = true;
            })
        })

        // animate card
        this.deck.forEach((card,id) => {
            card.show(-1,id);
        })
        this.hand.forEach((stack,stackId) => {
            stack.forEach((card,id) => {
                card.show(stackId,id);
            })
        })
        
        this.deck.forEach((card,id) => {
            card.x = id * 0.2 - this.deck.length * 0.1 + card.offsetX;
            card.y = card.offsetY;
        })
        this.hand[0].forEach((card,id) => {
            card.x = -0.5 + id * 0.2 + card.offsetX;
            card.y = 1/3 - id * 0.2 - card.offsetY;
        })
        this.hand[1].forEach((card,id) => {
            card.x = card.offsetX + id * 0.2;
            card.y = -1 + card.offsetY - id * 0.2;
        })
        this.hand[2].forEach((card,id) => {
            card.x = -1 + card.offsetX + id * 0.2;
            card.y = card.offsetX - id * 0.2;
        })
        this.hand[3].forEach((card,id) => {
            card.x = 1 + card.offsetX + id * 0.2;
            card.y = card.offsetY - id * 0.2;
        })
        this.hand[4].forEach((card,id) => {
            card.x = card.offsetX + id * 0.2;
            card.y = 1 + card.offsetX - id * 0.2;
        })
        this.hand[5].forEach((card,id) => {
            card.x = 0.5 + id * 0.2 + card.offsetX;
            card.y = -1/3 - id * 0.2 - card.offsetY;
        })

        canvas.reverseRenderArray(this.deck,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth);
        this.hand.forEach((stack) => {
            canvas.reverseRenderArray(stack,this.ui.handPosition.x,this.ui.handPosition.y,this.ui.cardWidth);
        })
    }
    inflict () {}
    time () {}
}