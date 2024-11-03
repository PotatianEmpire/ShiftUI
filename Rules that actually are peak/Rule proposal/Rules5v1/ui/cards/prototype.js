
class Card {
    active = false;

    constructor() {

    }

    activate = (actor,recipients) => {}
    activateable = (actor) => {}
    deactivate = (actor,recipients) => {}
    discard = (actor,recipients) => {}
    forHitRecipients = (actor,recipients,hitDice,range,callback) => {
        let hitValue = rollDice(hitDice);
        if (typeof callback != "function")
            return false;
        recipients.forEach((recipient,recipientIndex) => {
            if (!actor.inRange(recipient.position,range))
                return;
            let buffs = actor.additionalBuffs.filter((val,id,arr) => val.type == "conditional-hit-dice-buff")
            let buffedHitDice = new HitDice (hitDice);
            buffs.forEach((val,id,arr) => buffedHitDice.subtract(val.conditional(actor,recipient,recipients)));
            if (buffedHitDice.val !== hitDice)
                hitValue = rollDice(hitDice);
            if(recipient.doesHit(hitValue, hitDice))
                callback();
        });
    }
}