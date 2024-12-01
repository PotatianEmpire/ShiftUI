class Game extends Sprite {



    // game
        characters = []

        next = this.startGame;

        startGame () {}
        playTurn () {
            if (this.winnerDecided())
                return this.endGame;
            let initiator = this.getFastestCharacter();
            initiator.expireCards(this);
            initiator.drawCards();
            if (initiator.isDead())
                return this.playTurn;
            initiator.activateCard(this);
            return this.playTurn;
        }
        endGame () {}

        game () {
            if (this.animationsConcluded()) {
                next = this.next();
            }
            return this.game;
        }

        animations = 0;
        
        animationsConcluded () {
            return this.animations <= 0;
        }

        queueAnimation () {
            this.animations++;
        }

        concludeAnimation () {
            this.animations--;
        }

        getFastestCharacter () {
            let fastestTime = this.getAlive().reduce((prev,character) => prev > character.time.getSpeed() ? prev : character.time.getSpeed());
            let fastestCharacters = this.getAlive().filter(val => val == fastestTime);
            while (fastestCharacters.length > 1) {
                fastestTime = fastestCharacters.reduce((prev,character) => prev > character.dice.roll() ? prev : character.dice.last);
                fastestCharacters = fastestCharacters.filter(val => val == fastestTime);
            }
            return fastestCharacters[0];
        }
        winnerDecided () {
            let alive = this.getAlive();
            if(alive.length <= 0)
                return true;
            if(alive.every(aliveCharacter => alive[0].team == aliveCharacter.team))
                return true;
            return false;
        }
        getAlive () {
            return this.characters.filter(character => !character.isDead());
        }


}