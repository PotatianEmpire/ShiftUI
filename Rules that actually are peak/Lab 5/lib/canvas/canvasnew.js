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
        let sqauredCoord = new Coordinate();
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
}

class Canvas {
    dimension = new Coordinate ();
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
        this.dimension.y = this.height / this.width;
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
    subSprites;

    /**
     * Calls the callback for each subSprite.
     * @param {{(sprite: Sprite) : void}} callback Called for each subSprite once.
     */
    forEach (callback) {
        Sprite.forEach(this.subSprites,callback);
    }

    /**
     * Calls the callback for each sprite in the Array or Object.
     * @param {Array<Sprite>|Object} sprites Array or Object to iterate over.
     * @param {{(sprite: Sprite) : void}} callback Called for each sprite once.
     */
    static forEach (sprites,callback) {
        if (typeof callback != "function") {
            return;
        }
        if (Array.isArray(sprites)) {
            sprites.forEach(sprite => {
                if (sprite instanceof Sprite) {
                    callback(sprite);
                }
            })
            return;
        }
        if (typeof sprites == "object") {
            for (const key in sprites) {
                if (sprites[key] instanceof Sprite) {
                    callback(sprites[key]);
                }
            }
            return;
        }
    }
}