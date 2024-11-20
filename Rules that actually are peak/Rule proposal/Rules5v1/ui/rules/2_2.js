Player.prototype.render = function () {
    mouse.getMouseMove();
    
    this.deck.forEach((card,id) => {
        card.x = id * 0.2 - this.deck.length * 0.1 + card.offsetX;
        card.y = card.offsetY;
    })
    this.hand[0].forEach((card,id) => {
        card.x = -0.5 + id * 0.2 + card.offsetX;
        card.y = 1/3 - id * 0.2 + card.offsetY;
    })
    this.hand[1].forEach((card,id) => {
        card.x = card.offsetX + id * 0.2;
        card.y = -5/3 + card.offsetY - id * 0.2;
    })
    this.hand[2].forEach((card,id) => {
        card.x = -1.5 + card.offsetX + id * 0.2;
        card.y = card.offsetY - id * 0.2;
    })
    this.hand[3].forEach((card,id) => {
        card.x = 1.5 + card.offsetX + id * 0.2;
        card.y = card.offsetY - id * 0.2;
    })
    this.hand[4].forEach((card,id) => {
        card.x = card.offsetX + id * 0.2;
        card.y = 5/3 + card.offsetY - id * 0.2;
    })
    this.hand[5].forEach((card,id) => {
        card.x = 0.5 + id * 0.2 + card.offsetX;
        card.y = -1/3 - id * 0.2 + card.offsetY;
    })

    canvas.reverseRenderArray(this.deck,this.ui.deckPosition.x,this.ui.deckPosition.y,this.ui.cardWidth);
    for (let stackIndex = this.hand.length - 1; stackIndex >= 0; stackIndex--) {
        canvas.reverseRenderArray(this.hand[stackIndex],this.ui.handPosition.x,this.ui.handPosition.y,this.ui.cardWidth);
    }
}