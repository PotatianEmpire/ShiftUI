Player.prototype.focusCard = function () {
    this.focused = false;
    // unfocus
    this.deck.forEach((card,id) => {
        card.unfocused = false;
        if (!card.focused || this.focused)
            return;
        if (!canvas.mouseOnRel(card,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth) && mouse.mouseMove) {
            card.focused = false;
            return;
        }
        let focusId = id;
        if (mouse.wheel != 0) {
            focusId = ((addend) => {
                card.focused = false;
                if (focusId + addend >= this.deck.length )
                    return 0;
                if (focusId + addend < 0)
                    return this.deck.length - 1;
                return focusId + addend;
            }) (mouse.wheel < 0 ? -1 : 1);
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
            if (!card.focused || this.focused)
                return;
            if (!canvas.mouseOnRel(card,this.ui.handPosition.x,this.ui.handPosition.y,this.ui.cardWidth) && mouse.mouseMove) {
                card.focused = false;
                return;
            }
            let focusId = id;
            if (mouse.wheel != 0) {
                focusId = ((addend) => {
                    card.focused = false;
                    if (focusId + addend >= stack.length )
                        return 0;
                    if (focusId + addend < 0)
                        return stack.length - 1;
                    return focusId + addend;
                }) (mouse.wheel < 0 ? -1 : 1);
                mouse.getWheel();
                stack[focusId].focused = true;
            }
            for (let stackIterator = 0; stackIterator < stackId; stackIterator++) {
                this.hand[stackIterator].forEach(card => {
                    card.unfocused = true;
                })
            }
            for (let cardIterator = 0; cardIterator < focusId; cardIterator++) {
                stack[cardIterator].unfocused = true;
            }
            this.focused = true;
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
            if (this.focused || !canvas.mouseOnRel(card,this.ui.handPosition.x,this.ui.handPosition.y,this.ui.cardWidth))
                return;
            card.focused = true;
            for (let i = 0; i < id; i++) {
                stack[i].unfocused = true;
            }
            for (let stackI = 0; stackI < stackId; stackI++) {
                for (let cardI = 0; cardI < this.hand[stackI].length; cardI++) {
                    this.hand[stackI][cardI].unfocused = true;
                }
            }
            this.focused = true;
        })
    })
}