let gameObject = { 
    inRange: (initiator,potentialRecipients,range) => potentialRecipients.filter((val,id) =>
        Math.sqrt((initiator.x - val.x) * (initiator.x - val.x) + (initiator.y - val.y) * (initiator.y - val.y))) <= range,
    turn: (initiator,potentialRecipients) => {
        gameObject.discharge(initiator,potentialRecipients);
        gameObject.activate(initiator,potentialRecipients);
        gameObject.fulfillActions(initiator,potentialRecipients);
    },
    discharge: (initiator,potentialRecipients) => {
        initiator.stacks.forEach(cards => {
            cards.forEach(card => {
                if(card.overCharge) {
                    gameObject.queueAction(card,card.cardSet.discharge)
                }
            });
        });
    },
    activate: (initiator,potentialRecipients) => {},
    fulfillActions: (initiator,potentialRecipients) => {
        let actions = initiator.queuedActions
        actions.forEach((action) => {
            switch(action.skill(initiator,action.card,potentialRecipients)){
                case "queue deactivation":
                    gameObject.queueAction(initiator,action.card,action.card.cardSet.skills.deactivation);
                    break;
                case "discard":
                    gameObject.discard(initiator,action.card);
                    break;
                case "prepare reaction":
                    action.card.reactionActive = true;
                    break;
                case "queue effect":
                    gameObject.queueAction(initiator,action.card,action.card.cardSet.skills.effect);
                    break;
                case "deactivate card":
                    action.card.reactionActive = false;
                    break;
            }
        })
    },
    queueAction: (initiator,card,skill) => {
        initiator.queuedActions.push({card,skill});
    },
    discard: (initiator,card) => {
        card.discard = true;
        initiator.stacks.map(cards => {
            cards.filter((card) => {
                if (card.discard) {
                    initiator.discardedCards.push(card);
                    return false;
                }
                return true;
            })
        })
    },
    hitObject: () => {}
}