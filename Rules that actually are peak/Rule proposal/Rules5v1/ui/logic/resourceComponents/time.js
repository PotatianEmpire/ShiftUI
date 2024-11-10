class Time {

    constructor(initialTime) {
       this.lesser = initialTime;
       this.larger = 0;
    }

    time = () => this.lesser + this.larger;
    speed = () => this.lesser;
    looseTime = (time) => {
        this.lesser -= time;
        if (this.lesser <= 0) {
            this.lesser += this.larger;
            this.larger = 0;
        }
        return time;
    }
    gainTime = (time) => this.larger += time;

    enoughTime = (time) => this.larger + this.lesser >= time;

}


let fastestPlayer = (playerTimes) => {
    let fastestPlayers = playerTimes.map((val,id) => id);
    while (fastestPlayers.length != 1) {
        let max = fastestPlayers.reduce((max,val,i,arr) => {
            if (playerTimes[val].speed() > playerTimes[max].speed())
                return val;
            return max;
        });
        fastestPlayers = fastestPlayers.filter((playerId,arrId,arr) => playerTimes[playerId].speed() == playerTimes[max].speed());
        fastestPlayers.forEach(playerId => {
            playerTimes[playerId].lesser += rollDice(6);
        });
    }
    return fastestPlayers[0];
}
