# Omitting information
Make only the functions and variables vieweable to the rest of the program
To share information you can use some of the following techniques:
1. shared local properties
2. common directories
3. thread parameters
4. returned information

```js

let sprites = {
    
    main: {},

    someSprite: {

        thread: new Thread(),   // < -- call this thread to activate this sprite
        shared: "shared local property"

    },

    commonDirectories: {
        information: "shared information"
    }

}

function constructSomeSprite () {
    let sprite = new Sprite();  // creating a sprite separately keeps things nice and short.

    sprite.addThread(new Thread([
        (thread) => {
            sprite.text = `"changed"`;
            sprite.activate();
            console.log("thread called");
            console.log("shared local properties: " + sprites.someSprite.shared);
            console.log("info from shared directories: " + sprites.commonDirectories.information);
            console.log("thread parameters: " + thread.args);
            thread.returnThread("return information");
        }
    ]))

    sprite.addText (`"this text should not be edited by other sprites"`);

    sprites.someSprite = sprite.fuseSprite(sprites.someSprite); // the fuseSprite functions smashes the parentSprite onto the main sprite.
                                                                // for duplicate properties the properties of the parentSprite are discarded.
}

function constructMain () {
    let sprite = new Sprite();

    sprite.addThread(new Thread([
        (thread) => {
            thread.lendThread(sprites.someSprite.thread,"input");
        },
        (thread) => {
            console.log("returned information: " + thread.returnVal);
        }
    ]))
    sprite.thread.makeThreadOrigin()

    sprites.main = sprite.fuseSprite(sprites.main);
}

constructSomeSprite ();
constructMain ();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.clear();
canvas.render(sprites);

```

# Typesafe handling of Information
Have objects and classes to manage internal variables. When omitting information make sure to handle as much as possible through functions.