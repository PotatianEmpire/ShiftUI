class Player {
    constructor(initTime, cards, name) {
        this.name = name;

        this.time = new Time(initTime);

        this.charges = [
            1,1,1,1,1
        ]

        this.cards = [];
        this.deck = cards;

        this.hitDiceBuff = 0;
        this.position = 0;

        this.additionalBuffs = [];
    }

    cards = [new Punch()]
    deck = []

    activeCards = () => {
        let cardIds = this.cards.map((val,id) => id);
        return cardIds.filter((val,id,arr) => this.cards[val].active)
    }
    doesHit = (hitDice,diceRange) => rollDice(diceRange) == hitDice;
    inRange = (position,range) => Math.abs(position - this.position) < 5;

    fillCards = () => {
        while (this.cards.length < 4 && this.deck.length > 0)
            this.cards.push(this.deck.pop());
    }
    activateableCards = () => {
        let cardIds = this.cards.map((val,id) => id);
        return cardIds.filter((val,id,arr) => this.cards[val].activateable(this))
    }

    startTurn = () => {
        this.activeCards().forEach((val,id) => {
            if(this.cards[val].deactivate(this,[]))
                this.deck.shift(this.cards.splice(val,1)[0]);
        })
        this.fillCards();
        this.overChargeAmount().map((val,id,arr) => {
            if (cards <= 0)
                this.loose();
            this.discharge();
            this.fillCards();
        })
        if(this.activateableCards <= 0)
            this.loose();
        this.chooseCardToActivate();
    }

    chooseCardToActivate = () => {

    }

    loose = () => {

    }

    discharge = () => {

    }

    overChargeAmount = () => {
        let chargeIds = this.charges.map((val,id) => id);
        return this.charges.filter((val,id,arr) => val > 6)
    } 

    activateCard = (cardId) => {
        this.cards[cardId].activate(this,[]);
    }
}