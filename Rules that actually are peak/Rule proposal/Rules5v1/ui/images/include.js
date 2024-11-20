
let images = {
    missing: new Image(),
    dragon: new Image(),
    cave : new Image(),
    cardTest: new Image(),
    textureTest: new Image(),
    contrastCardTest: new Image(),
}

let loadImages = () => {
    images.missing.src = "./images/images.png";
    images.dragon.src = "./images/ドラゴンさん.jpg";
    images.cave.src = "./images/ftcms_6e167315-c56d-48b9-a307-ab3e7aeeb539.avif";
    images.cardTest.src = "./images/testSprites/cardTest.png";
    images.textureTest.src = "./images/testSprites/texture test.png";
    images.contrastCardTest.src = "./images/testSprites/contrastingCardTest.png";
}

