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
        for (let i = 0; i < 10; i++) {
            let myCard = new Card(
                1,4/3,images.cardTest,(card) => {
                    card.width = 1 * 1.2;
                    card.height = 4/3 * 1.2;
                    card.transparency = 1;
                    
                },(card) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.transparency = 0.2;
                },(card) => {
                    card.width = 1;
                    card.height = 4/3;
                    card.transparency = 1;
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