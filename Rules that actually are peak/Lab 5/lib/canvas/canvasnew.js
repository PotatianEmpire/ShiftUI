/**
 * 3 component vector for rendering.
 */
class Coordinate {
    x;
    y;
    z;

    static angleFactor = 2 * Math.PI;

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
     * Calculates absolute value.
     * @returns {Coordinate} absolute value
     */
    absoluteValue () {
        let absoluteValue = new Coordinate ();
        absoluteValue.x = Math.abs(this.x);
        absoluteValue.y = Math.abs(this.y);
        absoluteValue.z = Math.abs(this.z);
        return absoluteValue;
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

        rotatedCoordinate.x = xRotation.multiply(this).summate();
        rotatedCoordinate.y = yRotation.multiply(this).summate();
        rotatedCoordinate.z = zRotation.multiply(this).summate();

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

        rotatedCoordinate.x = xRotation.multiply(this).summate();
        rotatedCoordinate.y = yRotation.multiply(this).summate();
        rotatedCoordinate.z = zRotation.multiply(this).summate();

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
        xRotation.y = -Math.sin(angle);
        xRotation.z = 0;
        let yRotation = new Coordinate ();
        yRotation.x = Math.sin(angle);
        yRotation.y = Math.cos(angle);
        yRotation.z = 0;
        let zRotation = new Coordinate ();
        zRotation.x = 0;
        zRotation.y = 0;
        zRotation.z = 1;

        rotatedCoordinate.x = xRotation.multiply(this).summate();
        rotatedCoordinate.y = yRotation.multiply(this).summate();
        rotatedCoordinate.z = zRotation.multiply(this).summate();

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
        let scaledAngle = angle.scale(Coordinate.angleFactor);
        rotatedCoordinate.assign(this.difference(anchorpoint));
        rotatedCoordinate.assign(rotatedCoordinate.rotateX(scaledAngle.x));
        rotatedCoordinate.assign(rotatedCoordinate.rotateY(scaledAngle.y));
        rotatedCoordinate.assign(rotatedCoordinate.rotateZ(scaledAngle.z));
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
     * Calculates the absolute value.
     * @param {Coordinate} coordinate coordinate for absolute value
     * @returns {Coordinate} absolute value
     */
    static absoluteValue (coordinate) {
        return coordinate.absoluteValue();
    }

    /**
     * Rotates coordinate around an anchorpoint.
     * @param {Coordinate} coordinate coordinate to rotate
     * @param {Coordinate} angle angles of rotation
     * @param {Coordinate} anchorpoint point to rotate coordinate around
     * @returns {Coordinate} rotated coordinates
     */
    static rotate (coordinate,angle,anchorpoint) {
        return coordinate.rotate(angle,anchorpoint);
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

/**
 * Sprite rendering context using Canvas API.
 */
class Canvas {
    dimensions = new Coordinate ();
    width = 0;
    height = 0;
    maxDepth = 100;

    static screenSprite = new Sprite ();

    /**
     * @type {CanvasRenderingContext2D}
     */
    context;

    /**
     * Creates an interface for rendering sprites and other features.
     * @param {String} id id of the canvas element
     */
    constructor (id) {
        this.context = document.getElementById(id).getContext("2d");
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
     * @param {Array<Sprite>|SubSprites} sprites sprites to draw
     * @param {Sprite} reference parent sprite for rendering
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    render (sprites,reference = new Sprite (), depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        Sprite.forEach(sprites,sprite => {
            this.draw(sprite,reference,referenceAngle,depth);
        })
    }

    /**
     * Calculates position and dimension of sprite.
     * @param {Sprite} sprite sprite to calculate
     * @param {Sprite} reference parent sprite for reference
     * @param {*} depth depth of subSprite rendering [max 100]
     */
    calcPos (sprite,reference = ,depth = 0) {

        if (depth > this.maxDepth) {
            return;
        }

        let absoluteCoordinate = (
            Coordinate.add(
                Coordinate.rotate(
                    Coordinate.scale(
                        sprite.position,
                        reference.absoluteDimensions.x
                    ),
                    reference.absoluteAngle,
                    new Coordinate ()
                ),
                reference.absolutePosition
            )
        );
        let absoluteDimensions = (
            Coordinate.scale(
                sprite.dimensions,
                reference.absoluteDimensions.x
            )
        );
        let absoluteAngle = (
            Coordinate.add(
                sprite.absoluteAngle,
                reference.absoluteAngle
            )
        );

        sprite.drawOptions.deltaAbsoluteCoordinate.assign(
            Coordinate.difference(absoluteCoordinate,sprite.absolutePosition)
        );
        sprite.drawOptions.deltaAbsoluteDimensions.assign(
            Coordinate.difference(absoluteDimensions,sprite.absoluteDimensions)
        );
        sprite.drawOptions.deltaAbsoluteAngle.assign(
            Coordinate.difference(absoluteAngle,sprite.absoluteDimensions)
        );

        sprite.drawOptions.deltaPosition.assign(
            Coordinate.difference(sprite.position,sprite.drawOptions.position)
        );
        sprite.drawOptions.deltaDimensions.assign(
            Coordinate.difference(sprite.dimensions,sprite.drawOptions.dimensions)
        );
        sprite.drawOptions.deltaAngle.assign(
            Coordinate.difference(sprite.angle,sprite.drawOptions.angle)
        );

        sprite.absolutePosition.assign(absoluteCoordinate);
        sprite.absoluteDimensions.assign(absoluteDimensions);
        sprite.absoluteAngle.assign(absoluteAngle);

        sprite.drawOptions.position.assign(sprite.position);
        sprite.drawOptions.dimensions.assign(sprite.dimensions);
        sprite.drawOptions.angle.assign(sprite.angle);

        let screenCenter = Coordinate.unscale(new Coordinate(this.width,this.height),2);
        let projectedPosition = Coordinate.unscale(sprite.absolutePosition,sprite.absolutePosition.z + 1);
        let projectedDimension = Coordinate.unscale(sprite.absoluteDimensions,sprite.absolutePosition.z + 1);
        let spriteCenter = Coordinate.unscale(projectedDimension,2);
        let centeredDrawLocation = Coordinate.add(Coordinate.scale(projectedPosition,screenCenter.x),screenCenter);
        let alignedDrawLocation = Coordinate.difference(spriteCenter,centeredDrawLocation);
        let drawSize = Coordinate.scale(projectedDimension,screenCenter.x);

        sprite.drawOptions.projectedPosition.assign(projectedPosition);
        sprite.drawOptions.projectedDimension.assign(projectedDimension);
        sprite.drawOptions.centeredDrawLocation.assign(centeredDrawLocation);
        sprite.drawOptions.alignedDrawLocation.assign(alignedDrawLocation);
        sprite.drawOptions.drawSize.assign(drawSize);

        if (sprite.options.particleEmitter) {
            sprite.particleEmitter.particles.forEach(particle => {
                let absoluteParticlePosition = Coordinate.add (
                    Coordinate.rotate(
                        Coordinate.scale(
                            particle.position,
                            reference.absoluteDimensions.x
                        ),
                        reference.absoluteAngle,
                        new Coordinate ()
                    ),
                    reference.absolutePosition
                );
                let projectedParticlePosition = Coordinate.unscale (
                    Coordinate.unscale(absoluteParticlePosition,absoluteParticlePosition.z)
                );
                let particleDrawPosition = Coordinate.add (
                    Coordinate.scale (
                        projectedParticlePosition,
                        screenCenter.x
                    ),
                    screenCenter
                );
                particle.drawOptions.deltaAbsoluteCoordinate.assign(Coordinate.difference(particle.drawOptions.absoluteCoordinate,absoluteParticlePosition));
                particle.drawOptions.absoluteCoordinate.assign(absoluteParticlePosition);
                particle.drawOptions.projectedPosition.assign(projectedParticlePosition);
                particle.drawOptions.particleDrawPosition.assign(particleDrawPosition);
            })
        }
    }

    /**
     * Draws the sprite onto the canvas.
     * @param {Sprite} sprite sprite to draw
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    draw (sprite,depth = 0) {

        if (depth > this.maxDepth) {
            return;
        }

        if (sprite.options.show) {


            this.context.save();

            this.context.translate(sprite.drawOptions.centeredDrawLocation.x,sprite.drawOptions.centeredDrawLocation.y);
            this.context.rotate(sprite.absoluteAngle.z);
            this.context.translate(-sprite.drawOptions.centeredDrawLocation.x,-sprite.drawOptions.centeredDrawLocation.y);

            if (sprite.options.preProcessor) {
                sprite.preProcessor.restart();
                while (!sprite.preProcessor.callNext());
            }

            if (sprite.options.transparency) {
                this.context.globalAlpha = sprite.transparency;
            }

            if (sprite.options.image) {
                this.context.drawImage(sprite.image,
                    sprite.drawOptions.alignedDrawLocation.x,
                    sprite.drawOptions.alignedDrawLocation.y,
                    sprite.drawOptions.drawSize.x,
                    sprite.drawOptions.drawSize.y);
            }

            if (sprite.options.sample) {
                let sampleLocation = sprite.sample.getAbsoluteLocation();
                let sampleSize = sprite.sample.getAbsoluteSize();
                this.context.drawImage(sprite.sample.image,
                    sampleLocation.x,sampleLocation.y,
                    sampleSize.x,sampleSize.y,
                    sprite.drawOptions.alignedDrawLocation.x,
                    sprite.drawOptions.alignedDrawLocation.y,
                    sprite.drawOptions.drawSize.x,
                    sprite.drawOptions.drawSize.y);
            }

            if (sprite.options.text) {
                let alignedTextLocation = new Coordinate ();
                alignedTextLocation.assign(sprite.drawOptions.alignedDrawLocation);
                sprite.text.text.forEach(formattedString => {
                    this.context.font = (formattedString.fontSize * drawSize.x) + "px " + formattedString.fontFamily;
                    this.context.fillStyle = formattedString.color;
                    this.context.textAlign = formattedString.align;
                    let formattedStringLocation = new Coordinate ();
                    formattedStringLocation.assign(alignedTextLocation);
                    formattedStringLocation.y += (formattedString.lineSpacing * drawSize.x);
                    switch (formattedString.align) {
                        case "left":
                            formattedStringLocation.x = sprite.drawOptions.alignedDrawLocation.x;
                            break;
                        case "right":
                            formattedStringLocation.x += sprite.drawOptions.drawSize.x;
                            break;
                        case "center":
                            formattedStringLocation.x = sprite.drawOptions.centeredDrawLocation.x;
                            break;
                    }
                    this.context.fillText(formattedString.text,
                        formattedStringLocation.x,
                        formattedStringLocation.y,
                        sprite.drawOptions.drawSize.x);
                })
            }

            if (sprite.options.particleEmitter) {
                while (!sprite.particleEmitter.emitter.callNext());
                sprite.particleEmitter.particles = sprite.particleEmitter.particles.filter(particle => {
                    this.context.translate(particle.drawOptions.particleDrawPosition.x,particle.drawOptions.particleDrawPosition.y);
                    while (!particle.behaviour.callNext());
                    this.context.translate(-particle.drawOptions.particleDrawPosition.x,-particle.drawOptions.particleDrawPosition.y);
                });
            }
        }

        if (sprite.options.subSprites) {
            this.render (sprite.subSprites,sprite,depth + 1);
        }

    }
}

/**
 * Draweable object with different draw options to customize rendering.
 */
class Sprite {
    position;
    angle;
    dimensions;

    absolutePosition = new Coordinate ();
    absoluteAngle = new Coordinate ();
    absoluteDimensions = new Coordinate ();

    drawOptions = {
        position: new Coordinate (),
        dimensions: new Coordinate (),
        angle: new Coordinate (),

        deltaPosition: new Coordinate (),
        deltaAngle: new Coordinate (),
        deltaDimensions: new Coordinate (),

        projectedPosition: new Coordinate (),
        centeredDrawLocation: new Coordinate (),
        projectedDimension: new Coordinate (),
        alignedDrawLocation: new Coordinate (),
        drawSize: new Coordinate (),

        deltaAbsoluteCoordinate: new Coordinate (),
        deltaAbsoluteAngle: new Coordinate (),
        deltaAbsoluteDimensions: new Coordinate ()
    }

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

    options = {
        show: false,
        text: false,
        image: false,
        sample: false,
        particleEmitter: false,
        subSprites: false,
        transparency: false,
        preProcessor: false,
        postProcessor: false,
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
     *          "preProcessor" |
     *          "postProcessor" |
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
     * @param {HTMLImageElement} image image added
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
     * Adds and enables particleEmitter on this sprite.
     * @param {ParticleEmitter} particleEmitter particleEmitter to be added
     */
    addParticleEmitter (particleEmitter) {
        this.particleEmitter = particleEmitter;
        this.toggleOption("particleEmitter","active");
    }

    /**
     * Adds and enables subSprites on this sprite.
     * @param {SubSprites | Array<Sprite>} subSprites subSprites object or array of sprites
     */
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
     * Adds and enables preProcessor on this sprite.
     * @param {ChainedFunctions} preProcessor preProcessor functions executed before during the draw call before showing the sprite
     */
    addPreProcessor (preProcessor) {
        this.preProcessor = preProcessor;
        this.toggleOption("preProcessor","active");
    }
    
    /**
     * @todo not ready for use
     */
    addPostProcessor (postProcessor) {
        this.postProcessor = postProcessor;
        this.toggleOption("postProcessor","active");
    }

    /**
     * @todo not ready for use
     */
    addThread (thread) {
        this.thread = thread;
        this.toggleOption("thread","active");
    }

    /**
     * Checks if two sprites are overlapping globally.
     * @param {Sprite} sprite compared sprite
     * @returns {Boolean} if the sprites are overlapping
     */
    overlapping (sprite) {
        let negativeBorderA = this.absolutePosition.difference(this.absoluteDimensions.unscale(2));
        let positiveBorderA = this.absolutePosition.add(this.absoluteDimensions.unscale(2));
        let negativeBorderB = sprite.absolutePosition.difference(sprite.absoluteDimensions.unscale(2));
        let positiveBorderB = sprite.absolutePosition.add(sprite.absoluteDimensions.unscale(2));
        let negativeOverlap = positiveBorderB.compare(negativeBorderA);
        let positiveOverlap = positiveBorderA.compare(negativeBorderB);
        if (negativeOverlap.allEqual(1) &&
            positiveOverlap.allEqual(1)) {
            return true;
        }
        return false;
    }
    
    /**
     * Checks if two sprites are overlapping assuming they both inhabit the same reference sphere.
     * @param {Sprite} sprite compared sprite
     * @returns if the sprites are overlapping
     */
    localOverlapping (sprite) {
        let negativeBorderA = this.position.difference(this.dimensions.unscale(2));
        let positiveBorderA = this.position.add(this.dimensions.unscale(2));
        let negativeBorderB = sprite.position.difference(sprite.dimensions.unscale(2));
        let positiveBorderB = sprite.position.add(sprite.dimensions.unscale(2));
        let negativeOverlap = positiveBorderB.compare(negativeBorderA);
        let positiveOverlap = positiveBorderA.compare(negativeBorderB);
        if (negativeOverlap.allEqual(1) &&
            positiveOverlap.allEqual(1)) {
            return true;
        }
        return false;
    }

    /**
     * Checks if two sprites overlap.
     * @param {Sprite} spriteA compared sprite
     * @param {Sprite} spriteB compared sprite
     * @returns {Boolean} if the sprites are overlapping
     */
    static overlapping (spriteA,spriteB) {
        return spriteA.overlapping(spriteB);
    }

    /**
     * Checks if two sprites are overlapping assuming they both inhabit the same reference sphere.
     * @param {Sprite} spriteA compared sprite
     * @param {Sprite} spriteB compared sprite
     * @returns if the sprites are overlapping
     */
    static localOverlapping (spriteA,spriteB) {
        return spriteA.localOverlapping(spriteB)
    }
}

/**
 * Collection of functions called in order.
 */
class ChainedFunctions {
    functions = []
    pointer = 0;
    finished = false;
    returnVal;

    /**
     * Constructs an chained functions object.
     * @param {Array<{(*): *}>} functions array of chained functions
     */
    constructor (functions = []) {
        this.functions = functions;
    }

    /**
     * Calls next chained function.
     * @param {*} args arguments to pass into the chained function
     * @returns {Boolean} returns true if the chain has completed execution
     */
    callNext (args) {
        this.finished = false;
        this.increment();
        let func = this.get();
        if (!func) {
            this.finished = true;
            return true;
        }
        this.returnVal = func(args);
        if (this.finished) {
            return true;
        }
        return false;
    }

    /**
     * Switches finished to true.
     */
    return () {
        this.finished = true;
    }

    /**
     * Get the current function.
     * @returns {{(*): *} | false} returns the current function
     */
    get () {
        if (this.pointer < 0) {
            return false;
        }
        if (this.end()) {
            return false;
        }
        return functions[pointer];
    }

    /**
     * Checks if the pointer has reached the end.
     * @returns {Boolean} returns if the pointer has reached the end
     */
    end () {
        return this.pointer >= this.functions.length;
    }

    /**
     * Increments the pointer by 1.
     */
    increment () {
        this.pointer++;
    }

    /**
     * Goes to specified location.
     * @param {Number | ("start" |
     *                   "end" |
     *                   "last" |
     *                   "previous" |
     *                   "loop" |
     *                   "next")} loopTo position the pointer should jump to
     */
    goto (loopTo = 0) {
        switch (loopTo) {
            case "start":
                this.pointer = -1;
                break;
            case "end":
                this.pointer = this.functions.length;
                break;
            case "last":
                this.pointer = this.functions.length - 1;
                break;
            case "previous":
                this.pointer-= 2;
                break;
            case "loop":
                this.pointer--;
                break;
            case "next":
                this.pointer = this.pointer;
                break;
            default:
                if (typeof loopTo == "number") {
                    this.pointer = loopTo;
                }
                break;
        }
    }

    /**
     * Adds function to the chain.
     * @param {{(*): *}} func function to be added
     */
    add (func) {
        this.functions.push(func);
    }

    /**
     * Moves pointer back to the start.
     */
    restart () {
        this.pointer = -1;
    }
}

class Particle {
    behaviour;
    position;

    destroyed = false;

    drawOptions = {
        absoluteCoordinate: new Coordinate (),
        deltaAbsoluteCoordinate: new Coordinate (),
        projectedPosition: new Coordinate (),
        particleDrawPosition: new Coordinate ()
    }

    /**
     * Creates a particle object.
     * @param {ChainedFunctions} behaviour iterates every frame
     * @param {Coordinate} position position of particle
     */
    constructor (behaviour,position = new Coordinate ()) {
        this.behaviour = behaviour;
        this.position = position;
    }

    /**
     * Gets rid of particle object after this frame iteration.
     */
    destroy () {
        this.destroyed = true;
    }

    /**
     * Clones the particle.
     * @param {Coordinate} position position of particle
     * @returns {Particle} cloned particle
     */
    clone (position = this.position) {
        let clone = new Particle (this.behaviour);
        clone.position.assign(position);
        return clone;
    }
}

class ParticleEmitter {
    emitter;
    particles;

    /**
     * Creates a particle emitter object.
     * @param {ChainedFunctions} emitter iterates every frame
     * @param {Array<Particle>} particles initialize particles
     */
    constructor (emitter = new ChainedFunctions (),particles = []) {
        this.emitter = emitter;
        this.particles = particles;
    }

    /**
     * Creates a particle.
     * @param {Array<Particle> | Particle} particle particle created
     */
    create (particle) {
        this.particles.push(...particle);
    }

    /**
     * Clears all particles.
     */
    clear () {
        this.particles = [];
    }
}

/**
 * An object to manage multiple chainedFunctions objects.
 */
class Thread {
    tree = [];
    timeout = 0;
    args;

    /**
     * Creates a thread object.
     * @param {Array<ChainedFunctions>} tree chainedFunctions to be added
     */
    constructor (tree = []) {
        this.tree = tree;
    }

    /**
     * Calls next chained function from the tree.
     * @returns {Boolean} wether the chained function could be called
     */
    callNext () {
        if (timeout > 0) {
            this.timeout--;
            return true;
        }
        let chain = this.get();
        if (!chain) {
            return true;
        }
        chain.callNext(this.args);
        this.args = chain.returnVal;
        if (chain.finished) {
            this.tree.pop();
        }
        return false;
    }

    /**
     * Checks if the tree is empty.
     * @returns {Boolean} wether the tree is empty or not
     */
    empty () {
        return this.tree.length <= 0;
    }

    /**
     * Fetches the current chained function.
     * @returns {ChainedFunctions | false} returns the fetched chained function
     */
    get () {
        if (this.empty()) {
            return false;
        }
        return this.tree[this.tree.length - 1];
    }

    /**
     * Pushes chained functions onto the thread tree
     * @param {ChainedFunctions} chain chain functions to be pushed
     */
    push (chain) {
        this.tree.push (chain);
    }

    /**
     * Postpones the execution of the callNext function.
     * @param {Number} calls number of callNext function call the execution should be postponed by
     */
    postpone (calls = 1) {
        this.timeout = calls;
    }
}

/**
 * Iterable collection of sprites.
 */
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
     * Calls the callback for each sprite in the Array or subSprites object.
     * @param {Array<Sprite>|SubSprites} sprites Array or subSprites object to iterate over.
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

/**
 * String with draw information.
 */
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
                    let wordArgument = styleProperty.split(':');
                    if (wordArgument.length < 2) {
                        if (parseFloat(styleProperty) > 0) {
                            parsedString.fontSize = parseFloat(styleProperty);
                        }
                        break;
                    }
                    switch (wordArgument[0]) {
                        case "align":
                            parsedString.align = wordArgument[1];
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

/**
 * Collection of formattedStrings.
 */
class FormattedText {
    align;
    text;

    /**
     * Creates a formattedText object.
     * @param {Array<FormattedString>} formattedStrings formatted strings to add
     */
    constructor (formattedStrings = []) {
        this.text = formattedStrings;
    }

    /**
     * Parses string to formattedText.
     * @param {String} data string to parse
     */
    parse (data) {
        this.text.push(...FormattedText.parse(data));
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

/**
 * Partial sample of a source image.
 */
class Sample {
    sampleLocation;
    sampleSize;
    image;

    /**
     * Creates a sample object.
     * @param {Coordinate} sampleLocation location of the sample relative to image width
     * @param {Coordinate} sampleSize size of the sample relative to image width
     * @param {HTMLImageElement} image image data
     */
    constructor (sampleLocation = new Coordinate (),
                 sampleSize = new Coordinate (),
                 image = new Image ()) {
        this.sampleLocation = sampleLocation;
        this.sampleSize = sampleSize;
        this.image = image;
    }

    /**
     * Calculates the real location of the sample within its source image.
     * @returns real location of the sample
     */
    getAbsoluteLocation () {
        return this.sampleLocation.scale(this.image.width);
    }

    /**
     * Calculates the real size of the sample in its source image.
     * @returns real size of the sample
     */
    getAbsoluteSize () {
        return this.sampleSize.scale(this.image.width);
    }
}

// testing

let textTest = FormattedText.parse(`align:right lineSpacing:10 "hi"
    "my name is"
    align:left "tom"`);

console.log(textTest);

let sprite = new Sprite ();
sprite.dimensions.x = 1;
sprite.dimensions.y = 1;
sprite.addText(textTest);
let canvas = new Canvas("view");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.clear();
canvas.calcPos(sprite);
console.log(sprite);
console.log(canvas);