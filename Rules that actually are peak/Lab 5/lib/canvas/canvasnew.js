class Coordinate {
    x;
    y;
    z;

    /**
     * Creates a point in space with x,y and z coordinates.
     * @param {Number} x initial x value
     * @param {Number} y initial y value
     * @param {Number} z initial z value
     */
    constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Calculates the product of each coordinate and the reference.
     * @param {Number} reference value the coordinates are scaled by.
     * @returns {Coordinate} the scaled coordiantes.
     */
    scale (reference) {
        let scaledCoord = new Coordinate ();
        scaledCoord.x = this.x * reference;
        scaledCoord.y = this.y * reference;
        scaledCoord.z = this.z * reference;
        return scaledCoord;
    }
    
    /**
     * Devides each coordinate by the reference.
     * @param {Number} reference value the coordinates are unscaled by.
     * @returns {Coordinate} the unscaled coordinates.
     */
    unscale (reference) {
        let unscaledCoord = new Coordinate ();
        unscaledCoord.x = this.x / reference;
        unscaledCoord.y = this.y / reference;
        unscaledCoord.z = this.z / reference;
        return unscaledCoord;
    }

    /**
     * Calculates the distance between two points in euklidian geometry.
     * @param {Coordinate} coordinates the coordinate the distance is calculated to.
     * @returns {Number} the distance between the two coordinates.
     */
    eukDistance (coordinates) {
        let coordDiff = this.difference(coordinates);
        let squaredCoord = coordDiff.square();
        let sum = squaredCoord.summate();
        let distance = Math.sqrt(sum);
        return distance;
    }

    /**
     * Calculates the difference between two points.
     * @param {Coordinate} coordinates subtrahend
     * @returns {Coordinate} difference
     */
    difference (coordinates) {
        let coordDiff = new Coordinate();
        coordDiff.x = coordinates.x - this.x;
        coordDiff.y = coordinates.y - this.y;
        coordDiff.z = coordinates.z - this.z;
        return coordDiff;
    }

    /**
     * Squares each coordinate.
     * @returns {Coordinate} the sqaured coordinate.
     */
    square () {
        let sqauredCoord = new Coordinate ();
        sqauredCoord.x = this.x * this.x;
        sqauredCoord.y = this.y * this.y;
        sqauredCoord.z = this.z * this.z;
        return sqauredCoord;
    }

    /**
     * Calculates the sum of x,y and z.
     * @returns {Number} the sum of all coordinates.
     */
    summate () {
        let sum = this.x + this.y + this.z;
        return sum;
    }

    /**
     * Calculates the sum of two coordinates.
     * @param {Coordinate} coordinate addend
     * @returns {Coordinate} sum
     */
    add (coordinate) {
        let sum = new Coordinate ();
        sum.x = this.x + coordinate.x;
        sum.y = this.y + coordinate.y;
        sum.z = this.z + coordinate.z;
        return sum;
    }

    /**
     * Creates the product of two coordinates.
     * @param {Coordinate} coordinate factor
     * @returns {Coordinate} product
     */
    multiply (coordinate) {
        let product = new Coordinate ();
        product.x = this.x * coordinate.x;
        product.y = this.y * coordinate.y;
        product.z = this.z * coordinate.z;
        return product;
    }

    /**
     * Rotates the coordinate around 0 around the x axis.
     * @param {Number} angle angle along the x axis
     * @returns {Coordinate} rotated coordinate
     */
    rotateX (angle) {
        let rotatedCoordinate = new Coordinate ();
        let xRotation = new Coordinate ();
        xRotation.x = 1;
        xRotation.y = 0;
        xRotation.z = 0;
        let yRotation = new Coordinate ();
        yRotation.x = 0;
        yRotation.y = Math.cos(angle);
        yRotation.z = Math.sin(angle);
        let zRotation = new Coordinate ();
        zRotation.x = 0;
        zRotation.y = -Math.sin(angle);
        zRotation.z = Math.cos(angle);

        rotatedCoordinate.x = xRotation.scale(this.x).summate();
        rotatedCoordinate.y = yRotation.scale(this.y).summate();
        rotatedCoordinate.z = zRotation.scale(this.z).summate();

        return rotatedCoordinate;
    }
    
    /**
     * Rotates the coordinate around 0 around the y axis.
     * @param {Number} angle angle along the y axis
     * @returns {Coordinate} rotated coordinate
     */
    rotateY (angle) {
        let rotatedCoordinate = new Coordinate ();
        let xRotation = new Coordinate ();
        xRotation.x = Math.cos(angle);
        xRotation.y = 0;
        xRotation.z = -Math.sin(angle);
        let yRotation = new Coordinate ();
        yRotation.x = 0;
        yRotation.y = 1;
        yRotation.z = 0;
        let zRotation = new Coordinate ();
        zRotation.x = Math.sin(angle);
        zRotation.y = 0;
        zRotation.z = Math.cos(angle);

        rotatedCoordinate.x = xRotation.scale(this.x).summate();
        rotatedCoordinate.y = yRotation.scale(this.y).summate();
        rotatedCoordinate.z = zRotation.scale(this.z).summate();

        return rotatedCoordinate;
    }
    
    /**
     * Rotates the coordinate around 0 around the z axis.
     * @param {Number} angle angle along the z axis
     * @returns {Coordinate} rotated coordinate
     */
    rotateZ (angle) {
        let rotatedCoordinate = new Coordinate ();
        let xRotation = new Coordinate ();
        xRotation.x = Math.cos(angle);
        xRotation.y = -Math.sin(angle);;
        xRotation.z = 0;
        let yRotation = new Coordinate ();
        yRotation.x = Math.sin(angle);
        yRotation.y = Math.cos(angle);
        yRotation.z = 0;
        let zRotation = new Coordinate ();
        zRotation.x = 0;
        zRotation.y = 0;
        zRotation.z = 1;

        rotatedCoordinate.x = xRotation.scale(this.x).summate();
        rotatedCoordinate.y = yRotation.scale(this.y).summate();
        rotatedCoordinate.z = zRotation.scale(this.z).summate();

        return rotatedCoordinate;
    }

    /**
     * Rotates the coordinates around an anchorpoint.
     * @param {Coordinate} angle angles on each axis
     * @param {Coordinate} anchorpoint rotation 
     * @returns {Coordinate} rotated coordinate
     */
    rotate (angle,anchorpoint) {
        let rotatedCoordinate = new Coordinate ();
        rotatedCoordinate.assign(this.difference(anchorpoint));
        rotatedCoordinate.assign(rotatedCoordinate.rotateX(angle.x));
        rotatedCoordinate.assign(rotatedCoordinate.rotateY(angle.y));
        rotatedCoordinate.assign(rotatedCoordinate.rotateZ(angle.z));
        return rotatedCoordinate;
    }

    /**
     * Copies coordinate to self.
     * @param {Coordinate} coordinate coordinate copied from
     */
    assign (coordinate) {
        this.x = coordinate.x;
        this.y = coordinate.y;
        this.z = coordinate.z;
    }

    /**
     * Compares x,y and z components.
     * @param {Coordinate} coordinate coordinate compared to
     * @returns {Coordinate} x,y,z components are assigned -1 for smaller, 0 for equals, 1 for larger 
     */
    compare (coordinate) {
        let comparisonCoordinate = new Coordinate ();
        comparisonCoordinate.x = this.x > coordinate.x ? 1 : (this.x == coordinate.x ? 0 : -1);
        comparisonCoordinate.y = this.y > coordinate.y ? 1 : (this.y == coordinate.y ? 0 : -1);
        comparisonCoordinate.z = this.z > coordinate.z ? 1 : (this.z == coordinate.z ? 0 : -1);
        return comparisonCoordinate;
    }

    /**
     * Compares coordinate components with the reference.
     * @param {Number} reference coordinate components compared to
     * @returns {Boolean} if all components equal the reference
     */
    allEqual (reference) {
        return this.x == reference &&
               this.y == reference &&
               this.z == reference;
    }

    /**
     * Scales coordinates by reference.
     * @param {Coordinate} coordinate coordinate to scale from
     * @param {Number} reference reference scaled by
     * @returns scaled coordinates
     */
    static scale (coordinate,reference) {
        return coordinate.scale(reference);
    }

    /**
     * Unscales coordinates by reference.
     * @param {Coordinate} coordinate coordinate to unscale
     * @param {Number} reference reference unscaled by
     * @returns unscaled coordinates
     */
    static unscale (coordinate,reference) {
        return coordinate.unscale(reference);
    }

    /**
     * Calculates the distance between two points.
     * @param {Coordinate} coordinateA point distance is measured from
     * @param {Coordinate} coordinateB point distance is measured to
     * @returns {Number} the distance between pointA and pointB
     */
    static eukDistance (coordinateA,coordinateB) {
        return coordinateA.eukDistance(coordinateB);
    }

    /**
     * Calculates the difference between two points.
     * @param {Coordinate} coordinateA coordinate to subtract from
     * @param {Coordinate} coordinateB subtrahend
     * @returns {Coordinate} difference
     */
    static difference (coordinateA,coordinateB) {
        return coordinateA.difference(coordinateB);
    }

    /**
     * Sqaures the coordinate.
     * @param {Coordinate} coordinate coordinate to square
     * @returns {Coordinate} squared coordinate
     */
    static square (coordinate) {
        return coordinate.square();
    }

    /**
     * Calculates the sum of x,y and z.
     * @param {Coordinate} coordinate coordinate to summate
     * @returns {Coordinate} the sum of coordinates
     */
    static summate (coordinate) {
        return coordinate.summate();
    }

    /**
     * Calculates the sum of two coordinates.
     * @param {Coordinate} coordinateA coordinate to add to
     * @param {Coordinate} coordinateB coordinate added
     * @returns {Coordinate} sum of coordinateA and coordinateB
     */
    static add (coordinateA,coordinateB) {
        return coordinateA.add(coordinateB);
    }

    /**
     * Calculates the product of two coordinates.
     * @param {Coordinate} coordinateA factor
     * @param {Coordinate} coordinateB factor
     * @returns {Coordinate} product of coordinateA and coordinateB
     */
    static multiply (coordinateA,coordinateB) {
        return coordinateA.multiply(coordinateB);
    }

    /**
     * Compares x,y and z components.
     * @param {Coordinate} coordinateA coordinate compared from
     * @param {Coordinate} coordinateB coordinate compared to
     * @returns {Coordinate} x,y,z components are assigned -1 for smaller, 0 for equals, 1 for larger 
     */
    static compare (coordinateA,coordinateB) {
        return coordinateA.compare(coordinateB);
    }

    /**
     * Compares coordinate components with the reference.
     * @param {Coordinate} coordinate coordinate components compared
     * @param {Number} reference coordinate components compared to
     * @returns {Boolean} if all components equal the reference
     */
    static allEqual (coordinate,reference) {
        return coordinate.allEqual(reference);
    }
}

class Canvas {
    dimensions = new Coordinate ();
    width = 0;
    height = 0;
    maxDepth = 100;

    /**
     * @type {CanvasRenderingContext2D}
     */
    context;

    /**
     * Creates an interface for rendering sprites and other features.
     * @param {String} id id of the canvas element
     */
    constructor (id) {
        this.context = document.getElementById(id).getContext("2d")
    }

    /**
     * Clears the screen and adjusts canvas size.
     */
    clear () {
        this.context.canvas.height = this.height;
        this.context.canvas.width = this.width;
        this.dimensions.y = this.height / this.width;
        this.context.clearRect(0,0,this.width,this.height);
    }

    /**
     * Draws sprites onto the canvas.
     * @param {Array<Sprite>|Object} sprites sprites to draw
     * @param {Coordinate} reference the coordinates the sprite is referenced to
     * @param {Coordinate} referenceAngle the sum of all angles
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    render (sprites,reference = new Coordinate (), referenceAngle = new Coordinate, depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        Sprite.forEach(sprites,sprite => {
            this.draw(sprite,reference,referenceAngle,depth + 1);
        })
    }

    /**
     * Draws the sprite onto the canvas.
     * @param {Sprite} sprite sprite to draw
     * @param {Coordinate} reference the coordinates the sprite is referenced to
     * @param {Coordinate} referenceAngle the sum of all angles
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    draw (sprite,reference = new Coordinate (),referenceAngle = new Coordinate (),depth = 0) {

    }
}

class Sprite {
    position;
    angle;
    dimensions;

    /**
     * Creates an empty sprite.
     * @param {Coordinate} position relative position of the sprite
     * @param {Coordinate} angle relative angle of the sprite
     * @param {Coordinate} dimensions relative size of the sprite
     * @param {Boolean} show toggle rendering
     */
    constructor (position = new Coordinate (),
                 angle = new Coordinate (),
                 dimensions = new Coordinate (),
                 show = true) {
        this.position = position;
        this.angle = angle;
        this.dimensions = dimensions;
        this.options.show = show;
    }

    absoluteCoordinate = new Coordinate ();
    absoluteDimensions = new Coordinate ();

    options = {
        show: false,
        text: false,
        image: false,
        sample: false,
        particleEmitter: false,
        subSprites: false,
        transparency: false,
        postProcessing: false,
        thread: false
    }

    /**
     * Toggles selected option.
     * @param {("show" |
     *          "text" |
     *          "image" |
     *          "sample" |
     *          "particleEmitter" |
     *          "subSprites" |
     *          "transparency" |
     *          "postProcessing" |
     *          "thread")} option 
     * @param {Boolean | ("toggle" |
     *                    "active" |
     *                    "inactive")} val toggle value
     */
    toggleOption (option,val = "toggle") {
        if (typeof val == "boolean") {
            this.options[option] = val;
            return;
        }
        switch (val) {
            case "toggle":
                this.options[option] = !this.options[option];
                break;
            case "active":
                this.options[option] = true;
                break;
            case "inactive":
                this.options[option] = false;
                break;
        }
    }

    /**
     * Adds and enables text on this sprite.
     * @param {FormattedText} text text added
     */
    addText (text) {
        this.text = text;
        this.toggleOption("text","active");
    }

    /**
     * Adds and enables image on this sprite.
     * @param {Image} image image added
     */
    addImage (image) {
        this.image = image;
        this.toggleOption("image","active");
    }

    /**
     * Adds and enables sample on this sprite.
     * @param {Sample} sample sample added
     */
    addSample (sample) {
        this.sample = sample;
        this.toggleOption("sample","active");
    }

    /**
     * @todo not ready for use
     */
    addParticleEmitter (particleEmitter) {
        this.particleEmitter = particleEmitter;
        this.toggleOption("particleEmitter","active");
    }

    addSubSprites (subSprites) {
        this.subSprites = subSprites;
        this.toggleOption("subSprites","active");
    }

    /**
     * Adds and enables transparency on this sprite.
     * @param {Number} alpha value between 0 (fully transparent) and 1
     */
    addTransparency (alpha) {
        this.transparency = alpha;
        this.toggleOption("transparency","active");
    }

    /**
     * @todo not ready for use
     */
    addPostProcessing (postProcessing) {
        this.postProcessing = postProcessing;
        this.toggleOption("postProcessing","active");
    }

    /**
     * @todo not ready for use
     */
    addThread (thread) {
        this.thread = thread;
        this.toggleOption("thread","active");
    }

    /**
     * Compares if two sprites overlap.
     * @param {Sprite} sprite compared sprite
     * @returns {Boolean} if the sprites are overlapping
     */
    overlapping (sprite) {
        let negativeBorderA = this.absoluteCoordinate.difference(this.absoluteDimensions.unscale(2));
        let positiveBorderA = this.absoluteCoordinate.add(this.absoluteDimensions.unscale(2));
        let negativeBorderB = sprite.absoluteCoordinate.difference(sprite.absoluteDimensions.unscale(2));
        let positiveBorderB = sprite.absoluteCoordinate.add(sprite.absoluteDimensions.unscale(2));
        let negativeOverlap = positiveBorderB.compare(negativeBorderA);
        let positiveOverlap = positiveBorderA.compare(negativeBorderB);
        if (negativeOverlap.allEqual(1) &&
            positiveOverlap.allEqual(1)) {
            return true;
        }
        return false;
    }

    /**
     * Compares if two sprites overlap.
     * @param {Sprite} spriteA compared sprite
     * @param {Sprite} spriteB compared sprite
     * @returns {Boolean} if the sprites are overlapping
     */
    static overlapping (spriteA,spriteB) {
        return spriteA.overlapping(spriteB);
    }
}

class SubSprites {
    /**
     * Creates a subSprites object.
     * @param {Object} subSprites object containing Sprites
     */
    constructor (subSprites = {}) {
        SubSprites.forEach(subSprites,(sprite,key) => {
            this[key] = sprite;
        })
    }

    /**
     * Calls the callback for each subSprite.
     * @param {{(sprite: Sprite, key: String | Number) : void}} callback Called for each subSprite once.
     */
    forEach (callback) {
        SubSprites.forEach(this,callback);
    }

    /**
     * Calls the callback for each sprite in the Array or Object.
     * @param {Array<Sprite>|Object} sprites Array or Object to iterate over.
     * @param {{(sprite: Sprite, key: String | Number) : void}} callback Called for each sprite once.
     */
    static forEach (sprites,callback) {
        if (typeof callback != "function") {
            return;
        }
        if (Array.isArray(sprites)) {
            sprites.forEach((sprite,key) => {
                if (sprite instanceof Sprite) {
                    callback(sprite,key);
                }
            })
            return;
        }
        if (typeof sprites == "object") {
            for (const key in sprites) {
                if (sprites[key] instanceof Sprite) {
                    callback(sprites[key],key);
                }
            }
            return;
        }
    }
}

class FormattedString {
    color;
    fontSize;
    fontFamily;
    align;
    lineSpacing;
    text;

    /**
     * Creates a formatted string object.
     * @param {String} color text color
     * @param {Number} fontSize font size
     * @param {String} fontFamily font family
     * @param {String} align text alignment
     * @param {Number} lineSpacing spacing between this line and the next
     * @param {String} text contents
     */
    constructor (color = "#000000",
        fontSize = 48,
        fontFamily = "'serif'",
        align = "left",
        lineSpacing = 0,
        text = "") {
        this.color = color;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.align = align;
        this.lineSpacing = lineSpacing;
        this.text = text;
    }

    /**
     * Copies FormattedString data to self.
     * @param {FormattedString} formattedString FormattedString copied from
     */
    assign (formattedString) {
        this.color = formattedString.color;
        this.fontSize = formattedString.fontSize;
        this.fontFamily = formattedString.fontFamily;
        this.align = formattedString.align;
        this.lineSpacing = formattedString.lineSpacing;
        this.text = formattedString.text;
    }

    /**
     * Parses string into formatted string.
     * @param {String} data string to parse
     */
    parse (data) {
        this.assign(FormattedString.parse(data,this));
    }

    /**
     * Parses string into formatted string.
     * @param {String} data string to parse
     * @param {FormattedString} styleTemplate formatted string template in default cases
     * @returns {FormattedString} parsed string
     */
    static parse (data,styleTemplate = new FormattedString ()) {
        let parsedString = new FormattedString ();
        parsedString.assign(styleTemplate);
        let paddedData = " " + data + " ";
        let splitData = paddedData.split('"');
        let style = splitData[0];
        style.split(" ").forEach(styleProperty => {
            const typeDenominator = styleProperty.charAt(0);
            switch (typeDenominator) {
                case "#":
                    parsedString.color = styleProperty;
                    break;
                case "'":
                    if (document.fonts.check("10px " + styleProperty)) {
                        parsedString.fontFamily = styleProperty;
                    }
                    break;
                default:
                    let wordArgument = styleProperty.split('"');
                    if (wordArgument.length < 2) {
                        if (parseFloat(styleProperty) > 0) {
                            parsedString.fontSize = parseFloat(styleProperty);
                        }
                        break;
                    }
                    switch (wordArgument[0]) {
                        case "align":
                            parsedString.align = parseFloat(wordArgument[1]);
                            break;
                        case "lineSpacing":
                            parsedString.lineSpacing = parseFloat(wordArgument[1]);
                            break;
                    }
                    break;
            }
        })
        splitData.shift();
        splitData.pop();
        parsedString.text = splitData.join('"');

        return parsedString;
    }
}

class FormattedText {
    text = [];

    parse (data) {
        this.text.push(FormattedText.parse(data));
    }

    /**
     * Parses string into formatted text.
     * @param {String} data string to parse
     * @returns {FormattedString} parsed string
     */
    static parse (data) {
        let parsedText = new FormattedText ();
        data.split("\n").forEach((str,index) => {
            let regionStyle = new FormattedString ();
            if (index > 0) {
                regionStyle = parsedText.text[index - 1];
            }
            parsedText.text.push(FormattedString.parse(str,regionStyle));
        })
        return parsedText;
    }
}