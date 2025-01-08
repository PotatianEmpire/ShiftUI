let app = new Sprite();
let engine = new ShiftEngine("viewport",app);

let load = CFpresets.request("image",samples.image,"./texture.png");
load.callNext();

let preProcessor = new ChainedFunctions([
    function () {
        console.log("preProcessor");
    }
])

let postProcessor = new ChainedFunctions([
    function () {
        console.log("postProcessor");
    }
])

let thread = new Thread();

app.addPreProcessor(preProcessor);
app.addPostProcessor(postProcessor);

app.addText(FormattedText.parse(`align:center "Hello World"`));
app.text.align = "center";
app.addTransparency(0.5);
app.position.x = 0;

engine.start();