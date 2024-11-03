

let rollDice = (sides) => Math.ceil(Math.random() * sides)

class HitDice {
    constructor (hitDice) {
        this.val = hitDice;
    }
    subtract = (subtrahend) => {
        if (val - subtrahend < 1) {
            val = 1;
        } else {
            val -= subtrahend;
        }
    }
}
