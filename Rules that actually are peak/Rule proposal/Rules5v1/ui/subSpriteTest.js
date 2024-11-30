let subSpriteTest = {
    sprites: {
        parentSprite: new ImageSprite (0.5,0.5,0.5,0.5,images.cardTest)
    },
    constructParentSprite () {
        let parentSprite = this.sprites.parentSprite;

        parentSprite.addActivation(
            sprite => {
                sprite.main.activate();
            },
            sprite => {
                sprite.main.deactivate();
            }
        )

        let spinningImage = new ImageSprite(0.2,0.2,0.5,0.5,images.dragon);
        

        spinningImage.addAnimationToChain(
            new ActivatedFunction (
                sprite => {
                    sprite.angle = 0;
                },
                sprite => {
                    sprite.angle-= 0.01;
                }
            ),"animation"
        )

        spinningImage.appendAsSubSpriteTo(parentSprite,"spinningImage");
        spinningImage.appendAsSubSpriteTo(spinningImage,"spinningImage");

        this.sprites.parentSprite.deactivated = true;
        this.sprites.parentSprite.activate();

        parentSprite.addMainFunction(
            new ActivatedFunction (
                sprite => {
                    sprite.angle = 0;
                    spinningImage.swapAnimation("animation");
                    spinningImage.animation.deactivate();
                    spinningImage.animation.activate();
                },
                sprite => {
                    sprite.angle += 0.01;
                }
            )
        )
        
        

        console.log(this.sprites.parentSprite.activation)
    },
    main () {
        canvas.clear();
        canvas.render(subSpriteTest.sprites);
        return subSpriteTest.main;
    }
}

subSpriteTest.constructParentSprite();