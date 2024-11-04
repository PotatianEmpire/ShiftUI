

let rollDice = (sides) => Math.ceil(Math.random() * sides)

class HitDice {
    constructor (hitDice) {
        this.val = hitDice;
    }
    getDiceValue = () => {
        if (this.val < 1) {
            return 1;
        }
        return this.val;
    }
    subtract = (subtrahend) => {
        if (val - subtrahend < 1) {
            val = 1;
        } else {
            val -= subtrahend;
        }
    }
    debuff = (amount) => {
        this.val += amount;
    }
    buff = (amount) => {
        this.val -= amount;
    }
}
