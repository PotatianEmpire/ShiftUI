let rule2Test = {
    sprites: {
    },
    player: new Player({
            cardWidth:0.1,
            handPosition: {
                x: 0.4,
                y: 0.2,
            },
            deckPosition: {
                x: 0.8,
                y: 0.2
            }
        }),
    init: () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(images.missing.loading);
        for (let i = 0; i < 30; i++) {
            let myCard = new Card(
                1,4/3,images.cardTest,(card) => {
                    card.width = 1 * 1.0;
                    card.height = 4/3 * 1.0;
                    card.offsetY = 0;
                    card.offsetX = 0;
                    card.transparency = 1;
                    card.subSprites.charges.deactivate = false;
                    card.subSprites.charges.subSprites.charge1.sample.sampleHeight = mouse.mouseX
                    card.subSprites.charges.subSprites.charge1.height = mouse.mouseX;
                },(card,stackId,id) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.offsetY = 0
                    card.offsetX = 0;
                    card.transparency = 0.2/(id + 1);
                    card.subSprites.charges.deactivate = true;
                },(card,stackId,id) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.offsetY = 0;
                    card.offsetX = 0;
                    card.transparency = 1;
                    card.subSprites.charges.deactivate = true;
                })
            
            rule2Test.player.addCard(myCard);
        }
        

        return rule2Test.test;
    },
    test: () => {
        rule2Test.player.ui.deckPosition.x = 0.8;
        rule2Test.player.ui.deckPosition.y = canvas.referenceHeight - 0.1
        canvas.clear();
        rule2Test.player.onTurn();
        // clearInterval(intervalId);
        return rule2Test.test;
    }
}