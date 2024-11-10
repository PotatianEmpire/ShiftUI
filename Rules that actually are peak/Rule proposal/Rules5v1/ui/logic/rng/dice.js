class Dice {
    sides = 6;
    side = 0;
    roll = () => this.side = Math.ceil(Math.random() * this.sides);
    add = (add) => this.side = (this.side + add - 1) % this.sides + 1;
}