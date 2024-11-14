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