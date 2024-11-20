Player.prototype.animate = function () {
    // animate card
    this.deck.forEach((card,id) => {
        card.show(-1,id);
    })
    this.hand.forEach((stack,stackId) => {
        stack.forEach((card,id) => {
            card.show(stackId,id);
        })
    })
}