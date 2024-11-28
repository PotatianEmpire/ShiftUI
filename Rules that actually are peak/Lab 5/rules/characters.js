class Character extends Sprite {
    // character
        dice = {
            roll (sides) {
                this.last = Math.ceil(Math.random() * sides);
                return this.last;
            },
            last: 0
        }
        time = {
            getSpeed () {
                return this.lesser;
            },
            getTotalTime () {
                return this.lesser + this.larger;
            },
            larger: 0,
            lesser: 0,
        }
        hand = [];
        deck = [];

        game;

        clash = new Thread([
            (args,thread) => {
                attackingCard = args.attackingCard;
                attacker = args.attacker;

                let uncorruptedCards = this.hand.filter(card => !card.corrupted);

                let activeCards = uncorruptedCards.filter(card => card.active);
                let inactiveCards = uncorruptedCards.filter(card => !card.active);

                let weakerInactiveCards = inactiveCards.filter(card => card.defensiveStat < attackingCard.offensiveStat);

                let strongerActiveCards = activeCards.filter(card => card.defensiveStat > attackingCard.offensiveStat);

                let weakerCorrupteableCards = uncorruptedCards.filter(card => card.defensiveStat < attackingCard.offensiveStat);

                let corrupteableCardsInDeck = this.deck.filter(card => !card.corrupt);

                let weakerCorrupteableCardsInDeck = corrupteableCardsInDeck.filter(card => card.defensiveStat < attackingCard.offensiveStat);

                if (strongerActiveCards.length > 0) {
                    thread.variables.defended = true;
                    if (strongerActiveCards.length > 1) {
                        thread.lendThread(this.chooseCard,strongerActiveCards);
                    } else {
                        thread.returnVal = strongerActiveCards[0];
                    }
                    return;
                }

                thread.variables.defended = false;

                let corruptedCard;

                if (weakerInactiveCards.length > 0){
                    thread.lendThread(this.chooseCardToCorrupt,weakerInactiveCards);
                } else
                if (weakerCorrupteableCards.length > 0) {
                    thread.lendThread(this.chooseCardToCorrupt,weakerCorrupteableCards);
                } else
                if (weakerCorrupteableCardsInDeck.length > 0) {
                    thread.lendThread(this.chooseCardToCorrupt,weakerCorrupteableCardsInDeck);
                } else
                if (corrupteableCardsInDeck.length > 0) {
                    thread.lendThread(this.chooseCardToCorrupt,corrupteableCardsInDeck);
                } else
                if (uncorruptedCards.length > 0) {
                    thread.lendThread(this.chooseCardToCorrupt,uncorruptedCards);
                } else {
                    thread.returnThread(true);
                }
            },
            (args,thread) => {
                if (thread.variables.defended == true) {
                    let defendingCard = args;
                    defendingCard.defend(this.game,this);
                    thread.returnThread(false);
                } else {
                    let corruptedCard = args;
                    corruptedCard.corrupt(this.game,this);
                    corruptedCard.defend(this.game,this);
                    if (!corruptedCard.active)
                        corruptedCard.moveToDeck = true;
                    this.hand.filter(card => {
                        if (card.moveToDeck) {
                            this.deckCard(card);
                        }
                    })
                }
            }
        ])
        
        expireCards () {
            this.hand = this.hand.filter(card => {
                if (card.active) {
                    card.expire(this.game,this);
                    this.deckCard(card);
                    return false;
                }
                return true;
            });
        }
        deckCard (card) {
            this.game.queueAnimation ();
            this.deck.unshift(card);
        }
        drawCards () {
            while (this.hand.length < 4 && this.deck.length > 0) {
                this.hand.push(this.deck.pop());
            }
        }
        isDead () {
            if (this.time.getTotalTime() <= 0 || this.hand.filter(card => !card.corrupted).length + this.deck.filter(card => !card.corrupted) <= 0) {
                return true;
            }
            return false;
        }
        activateCard () {
            let chosenCard = this.chooseCard(this.hand.filter(card => card.activateable(this.game,this)));
            chosenCard.activateCard(this.game,this);
        }

        chooseCard = new Thread ();
        chooseCardToCorrupt = new Thread ();

}

let ConstructCharacter = (

) => {}