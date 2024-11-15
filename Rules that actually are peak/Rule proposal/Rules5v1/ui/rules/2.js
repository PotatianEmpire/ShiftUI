class Card {
    backgroundSprite = new Sprite ();
    skills = [{
        description: {
            height: 0,
            sprite: new Sprite(),
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
            sprite: new Sprite(),
            onHover () {},
            onClick () {},
            onDefault () {}
        },
        activateable () {},
        activate () {},
        deactivate () {},
        active: false,
    }];
    charges = [];
}
let cardUI = {
    /**
     * 
     * @param {Player} player 
     * @param {Card} card 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    createSelectedCardUI (player,card,x,y,width,height) {
        let activateCardUISprite = {
            cardBackground: card.backgroundSprite,
            skills: [],
            charge: {}
        }
        card.skills.forEach((value,id) => {
            value.description.sprite.x = x - width/2;
            value.description.sprite.y = y + value.description.height * id;
            value.targetting.sprite.x = x + width/2 + value.targetting.sprite.width/2;
            value.targetting.sprite.y = value.description.sprite.y;
            activateCardUISprite.skills[id] =
                {
                    activationButton: value.description.sprite,
                    targetting: value.targetting.sprite
                };
        });
        card.charges.forEach((value,id) => {
            
        })
    }
}

/*
todo:
1. activation buttons
2. charge formatting
3. overcharge
4. rendering
*/