let cards = {
    testCard1: {
        skills: {
            skill1: {
                activateable: (initiator,card,potentialRecipients) => {
                    return initiator.time.enoughTime(4);
                },
                activation: (initiator,card,potentialRecipients) => {
                    initiator.time.looseTime(4);
                    gameObject.inRange(initiator,potentialRecipients,4).forEach((recipient,id) => {
                        for (const cards of recipient) {
                            cards.forEach((card,id) => {
                                card.charges.charge(0,1);
                            })
                        }
                    })
                    return "queue deactivation";
                },
                effect: (initiator,card,potentialRecipients) => {},
                reaction: (initiator,reactor,card,potentialRecipients) => {},
                deactivation: (initiator,card,potentialRecipients) => {
                    initiator.gainTime(3);
                    return "deactivate card";
                },
                description: `'DEADCRT' 0.02 #004F00 "skill1"
                "consume 4 time and increase"
                "charge1 of all enemy cards within"
                "4 meters and gain 3 time at"
                "deactivation"`
            }
        },
        discharge: (initiator,card,potentialRecipients) => {
            return "discard";
        }
    }
}