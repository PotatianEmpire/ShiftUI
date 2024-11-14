class Card {
    skills = [{
        description: {
            sprite: new Sprite(0,0,0,0),
            activateable: {
                onHover () {},
                onClick () {},
                onDefault () {}
            },
            active: {
                onHover () {},
                onClick () {},
                onDefault () {},
            },
            unactivateable: {
                onHover () {},
                onClick () {},
                onDefault () {}
            }
        },
        targetting: {
        },
        activateable () {},
        activate () {},
        active: false,
    }];
    charges = [];
}
let activateCard = {
    /**
     * 
     * @param {Player} player 
     * @param {Array.<{card:Sprite,
     * charges:Array.<Sprite>,
     * activationButtons:Array.<Sprite>,
     * targettingSprites:Array.<Sprite>}>} cardUISprites 
     */
    activate (player,cardUISprites) {
        player.hand.forEach((card,cardId) => {
            let cardDescription = '';
            card.skills.forEach((skill,skillId) => {
                if (skill.active) {
                    createButton(
                        skill.description.sprite,
                        skill.description.active.onHover,
                        skill.description.active.onClick,
                        skill.description.active.onDefault
                    )
                } else if (skill.activateable()) {
                    createButton(
                        skill.description.sprite,
                        skill.description.activateable.onHover,
                        skill.description.activateable.onClick,
                        skill.description.activateable.onDefault
                    )
                } else {
                    createButton(
                        skill.description.sprite,
                        skill.description.unactivateable.onHover,
                        skill.description.unactivateable.onClick,
                        skill.description.unactivateable.onDefault
                    )
                }
            });
            cardUISprites[cardId].card.addText(
                cardDescription,
                1.0, "top"
            );
            
        })
    }
}