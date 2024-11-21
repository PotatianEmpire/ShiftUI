class Game {
    characters = {}

}

class Character {
    /** @type {Array<Array<Card>>} */
    hand = [[],[],[],[],[],[]];
    /** @type {Array<Card>} */
    deck = [];
    constructor (initialTime,cards,characterSprite) {
        this.time = new Time(initialTime);
        this.deck = cards;
        this.sprite = characterSprite;
    }
    addCard (card) {
        this.deck.push(card);
    }
    drawCardTo(stack) {

    }
    recycleCardFrom(stack,cardId) {

    }
    discardCard(stackId,cardId) {

    }
    onTurn () {
        return this.doActions;
    }
    doActions () {
        
    }
    fillHand () {
        this.hand.forEach((stack,stackId) => {
            if (stack.reduce((prev,card,cardId) =>
                card.cardMechanics.blocking == true ? prev + 1 : prev) < 1)
                    this.drawCardTo(stack);
        })
    }
    activate () {
        if (this.chooseToActivate ())
            return this.discharge;
        return this.activate;
    }
    discharge () {
        if (this.chooseToDischarge (this.getOverchargeCount()) > 0)
            return this.chooseToDischarge;
        return 
    }
    chooseToActivate () {}
    getOverchargeCount () {}
    chooseToDischarge () {}
}