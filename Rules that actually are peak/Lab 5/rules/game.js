class Game extends Sprite {



    // game
        characters = []

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
            if(alive.every(aliveCharacter => alive[0].team == aliveCharacter.team))
                return true;
        }
        getAlive () {
            return this.characters.filter(character => !character.isDead());
        }


}