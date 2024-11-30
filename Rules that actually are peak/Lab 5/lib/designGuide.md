# Omitting information
Make only the functions and variables vieweable to the rest of the program
To share information you can use some of the following techniques:
1. shared local properties
2. common directories
3. thread parameters
4. returned information

```js

let sprites = {

    someSprite: {

        thread: new Thread(),   // < -- call this thread to activate this sprite
        shared: "shared local property"

    },

    main: {},

    commonDirectories: {
        information: "shared information"
    }

}

function constructSomeSprite () {
    let sprite = new Sprite();

    sprite.addThread(new Thread([
        (args,thread) => {
            console.log("thread called");
            console.log("shared local properties: " + sprites.someSprite.shared);
            console.log("info from shared directories: " + sprites.commonDirectories.information);
            console.log("thread parameters: " + args);
            thread.returnThread("return information");
        }
    ]))

    sprite.addText (`"this text should not be edited by other sprites"`);

    sprite.appendAsSpriteTo(sprites.someSprite);
}

function constructMain () {
    let sprite = new Sprite();

    sprite.addThread(new Thread([
        (args,thread) => {
            thread.lendThread(sprites.someSprite.thread,"input");
        },
        (args,thread) => {
            console.log("returned information: " + thread.returnVal);
        }
    ]))
    sprite.thread.makeThreadOrigin()

    sprite.appendAsSpriteTo(sprites.main);
}

constructSomeSprite ();
constructMain ();

canvas.render(sprites);
```