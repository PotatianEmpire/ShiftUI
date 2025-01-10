let app = new Sprite();
let engine = new ShiftEngine("viewport",app);

let load = CFpresets.request("image",samples.image,"./texture.png");
load.callNext();

let cf1 = new ChainedFunctions([
    function () {
        console.log("First chained functions");
    }
]);

let cf2 = new ChainedFunctions([
    function () {
        console.log("Second chained functions");
    }
]);

let thread = new Thread();

thread.merge([cf1,cf2]);

let prioritizedCf = new ChainedFunctions([
    function () {
        console.log("Prioritized chained functions");
    }
]);

thread.push(prioritizedCf);

thread.callNext();

app.addText(FormattedText.parse(`align:center "Hello World"`));
app.text.align = "center";
app.addTransparency(0.5);
app.position.x = 0;

engine.start();