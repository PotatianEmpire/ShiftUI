class Charge {
    charges = [0,0,0,0,0];
    chargeCapacity = [6,6,6,6,6];
    checkOvercharge = () => this.charges.some((val,id) => val > this.chargeCapacity[id]);
    charge = (chargeType,amount) => this.charges[chargeType] += amount;
    discharge = (chargeType,amount) => this.charges[chargeType] = (this.enoughCharge(chargeType,amount)) ? this.charges[chargeType] - amount : 0;
    enoughCharge = (chargeType,amount) => this.charges[chargeType] >= amount;
}