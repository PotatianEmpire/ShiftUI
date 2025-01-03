let app = new Sprite();
let engine = new ShiftEngine("viewport",app);

mediaInterface.images.requestSamples(

    media.images.testSprite,
    media.images.testSprite.image,
    "assets/images/testSprite.png"

)

app.addSample(media.images.testSprite.corruptedOrange_3)
app.position.z = 0;
app.dimensions = media.images.testSprite.corruptedOrange_3.sampleSize

app.addThread();
app.thread.push(app);

engine.fps = 60
engine.start();