let rule2Test = {
    sprites: {
    },
    player: new Player({
            cardWidth:0.1,
            handPosition: {
                x: 0,
                y: 0,
            },
            deckPosition: {
                x: 0.5,
                y: 0.2
            }
        }),
    init: () => {

        canvas.width =window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(images.missing.loading);
        for (let i = 0; i < 5; i++) {
            let myCard = new Card(
                1,4/3,images.cardTest,(card) => {
                    card.width = 1 * 1.0;
                    card.height = 4/3 * 1.0;
                    card.offsetY = -0.2
                    card.offsetX = 0;
                    card.transparency = 1;
                    
                },(card) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.offsetY = 0
                    card.offsetX = -1.0
                    card.transparency = 1.0;
                },(card) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.offsetY = 0;
                    card.offsetX = 0;
                    card.transparency = 1.0;
                })
            
            rule2Test.player.addCard(myCard);
        }
        

        return rule2Test.test;
    },
    test: () => {
        canvas.clear();
        rule2Test.player.onTurn();
        // clearInterval(intervalId);
        return rule2Test.test;
    }
}