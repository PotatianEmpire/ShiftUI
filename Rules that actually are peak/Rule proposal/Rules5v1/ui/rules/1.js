class Player {
    position = {
        x: 0,
        y: 0,
        z: 0
    };
    hand = [new Card()];
    deck = [new Card()];
    time = new Time(0);
    constructor (x,y,z,initialTime) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.time.lesser = initialTime;
    }
    /**
     * 
     * @param {Player} player 
     */
    inRange = (player,range) => {
        let deltaX = player.position.x - this.position.x;
        let deltaY = player.position.y - this.position.y;
        let deltaZ = player.position.z - this.position.z;
        let distance = Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY +
            deltaZ * deltaZ
        );
        return distance <= range;
    }
}