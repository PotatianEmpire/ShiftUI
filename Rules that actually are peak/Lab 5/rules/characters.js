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

        clash (game,attackingCard,attacker) {
            let uncorruptedCards = this.hand.filter(card => !card.corrupted);

            let activeCards = uncorruptedCards.filter(card => card.active);
            let inactiveCards = uncorruptedCards.filter(card => !card.active);

            let weakerInactiveCards = inactiveCards.filter(card => card.defensiveStat < attackingCard.offensiveStat);

            let strongerActiveCards = activeCards.filter(card => card.defensiveStat > attackingCard.offensiveStat);

            let weakerCorrupteableCards = uncorruptedCards.filter(card => card.defensiveStat < attackingCard.offensiveStat);

            let corrupteableCardsInDeck = this.deck.filter(card => !card.corrupt);

            let weakerCorrupteableCardsInDeck = corrupteableCardsInDeck.filter(card => card.defensiveStat < attackingCard.offensiveStat);

            if (strongerActiveCards > 0) {
                return false;
            }

            let corruptedCard;

            if (weakerInactiveCards.length > 0){
                corruptedCard = attacker.chooseCardToCorrupt(weakerInactiveCards);
            } else
            if (weakerCorrupteableCards.length > 0) {
                corruptedCard = attacker.chooseCardToCorrupt(weakerCorrupteableCards);
            } else
            if (weakerCorrupteableCardsInDeck.length > 0) {
                corruptedCard = attacker.chooseCardToCorrupt(weakerCorrupteableCardsInDeck);
            } else
            if (corrupteableCardsInDeck.length > 0) {
                corruptedCard = attacker.chooseCardToCorrupt(corrupteableCardsInDeck);
            } else
            if (uncorruptedCards.length > 0) {
                corruptedCard = attacker.chooseCardToCorrupt(uncorruptedCards);
            } else {
                return true;
            }

            corruptedCard.corrupt();
            if (!corruptedCard.active)
                corruptedCard.moveToDeck = true;
            this.hand.filter(card => {
                if (card.moveToDeck) {
                    this.deckCard(card);
                    return false;
                }
                return true;
            })

            return true;
            
        }
        expireCards (game) {
            this.hand = this.hand.filter(card => {
                if (card.active) {
                    card.expire(game,this);
                    this.deckCard(card);
                    return false;
                }
                return true;
            });
        }
        deckCard (card) {
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
        activateCard (game) {
            let chosenCard = this.chooseCard(this.hand.filter(card => card.activateable()))
        }

        chooseCard (cards) {}

}