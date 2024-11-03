class Punch extends Card {
    activateable = (actor) => actor.time.enoughTime(4) && !this.active;
    activate = (actor,recipients) => {
        actor.time.looseTime(4);
        this.active = true;
    }
    deactivate = (actor, recipients) => {
        actor.time.gainTime(3);
        this.forHitRecipients(actor,recipients,4,5,() => {
            recipients[recipientIndex].charge1 += rollDice(4);
        })
        this.active = false;
        return true;
    }
    discard = (actor, recipients) => {}
}
