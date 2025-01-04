let app = new Sprite();
let engine = new ShiftEngine("viewport",app);

app.addText(FormattedText.parse(`"Hello World"`));
app.text.align = "center";

engine.start();