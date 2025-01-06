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
        coordDiff.x = this.x - coordinates.x;
        coordDiff.y = this.y - coordinates.y;
        coordDiff.z = this.z - coordinates.z;
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
        rotatedCoordinate.assign(Coordinate.difference(this,anchorpoint));
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
     * Assigns x,y,z values to the coordinate
     * @param {Number | true} x x value, true will copy the old value
     * @param {Number | true} y y value, true will copy the old value
     * @param {Number | true} z z value, true will copy the old value
     */
    assignVal (x = this.x,y = this.y,z = this.z) {
        let ax = x;
        let ay = y;
        let az = z;
        if (x === true) {
            ax = this.x;
        }
        if (y === true) {
            ay = this.y;
        }
        if (z === true) {
            az = this.z;
        }
        this.x = ax;
        this.y = ay;
        this.z = az;
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
     * Compares wether to coordinates are the same.
     * @param {Coordinate} comparison coordinate this coordinate is compared to
     * @returns {Boolean} wether all components of this coordinate equal the inputted coordinate
     */
    equals (comparison) {
        return this.x == comparison.x &&
               this.y == comparison.y &&
               this.z == comparison.z;
    }
    
    /**
     * Checks wether the coordinate falls withing the given range.
     * @param {Coordinate} min minimum value of the range
     * @param {Coordinate} max maximum value of the range
     * @returns {Boolean} wether the coordiante components fall within the range
     */
    inRange (min,max) {
        return this.x >= min.x &&
               this.x <= max.x &&
               this.y >= min.y &&
               this.y <= max.y &&
               this.z >= min.z &&
               this.z <= max.z;
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
    centerPoint = new Coordinate ();
    width = 0;
    height = 0;
    maxDepth = 100;

    frame = 0;

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
        this.frame ++;
        this.context.canvas.height = this.height;
        this.context.canvas.width = this.width;
        this.dimensions.y = 2 * this.height / this.width;
        this.dimensions.x = 2;
        this.centerPoint.assign(this.dimensions.unscale(2));
        
        this.context.clearRect(0,0,this.width,this.height);
    }

    /**
     * Scans all sprites for threads
     * @param {Array<Sprite> | SubSprites | Sprite} sprites sprites that may have threads wanting to be run
     * @param {Number} depth depth of subSprite threading [max 100]
     */
    runThreads (sprites,depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        SubSprites.forEach(sprites,sprite => {
            if (sprite.options.thread) {
                sprite.thread.frame = this.frame;
                while (!sprite.thread.callNext());
            }

            if (sprite.options.subSprites) {
                this.runThreads(sprite.subSprites,depth + 1);
            }
        })
    }

    /**
     * Executes preprocessors on all sprites and activate subSprites.
     * @param {Array<Sprite> | SubSprites | Sprite} sprites sprites to preprocess
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    runPreProcessors (sprites,depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        SubSprites.forEach(sprites,sprite => {
            if (sprite.options.preProcessor) {
                sprite.preProcessor.frame = this.frame;
                while(!sprite.preProcessor.callNext());
            }

            if (sprite.options.subSprites) {
                this.runPreProcessors(sprite.subSprites,depth + 1);
            }
        })
    }

    /**
     * Prepares sprites for rendering.
     * @param {Array<Sprite> | SubSprites | Sprite} sprites sprites to prepare
     * @param {Sprite} reference sprite position refers to parent sprites
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    prepareRender (sprites, reference = new Sprite (), depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        SubSprites.forEach(sprites,sprite => {
            this.calcPos(sprite,reference);

            if (sprite.options.subSprites) {
                this.prepareRender(sprite.subSprites,sprite,depth + 1);
            }
        })
    }

    /**
     * Draws sprites onto the canvas.
     * @param {Array<Sprite> | SubSprites | Sprite} sprites sprites to draw
     * @param {Number} depth depth of subSprite rendering [max 100]
     */
    render (sprites, depth = 0) {
        if (depth >= this.maxDepth) {
            return;
        }
        SubSprites.forEach(sprites,sprite => {
            this.draw(sprite);

            if (sprite.options.subSprites) {
                this.render(sprite.subSprites,depth + 1);
            }
        })
    }

    /**
     * Calculates position and dimension of sprite.
     * @param {Sprite} sprite sprite to calculate
     * @param {Sprite} reference parent sprite for reference
     */
    calcPos (sprite,reference = new Sprite ()) {

        let absoluteCoordinate = (
            Coordinate.add(
                Coordinate.rotate(
                    Coordinate.scale(
                        sprite.position,
                        reference.absoluteDimensions.x / 2
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
                reference.absoluteDimensions.x / 2
            )
        );
        let absoluteAngle = (
            Coordinate.add(
                sprite.angle,
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
            Coordinate.difference(absoluteAngle,sprite.absoluteAngle)
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

        let screenDimension = new Coordinate(this.width,this.height);
        let screenCenter = Coordinate.unscale(screenDimension,2);
        
        if (absoluteCoordinate.z > -1) {
            let projectedPosition = Coordinate.unscale(sprite.absolutePosition,sprite.absolutePosition.z + 1);
            let projectedDimension = Coordinate.unscale(sprite.absoluteDimensions,sprite.absolutePosition.z + 1);
            let drawSize = Coordinate.scale(projectedDimension,screenCenter.x);
            let spriteCenter = Coordinate.unscale(drawSize,2);
            let centeredDrawLocation = Coordinate.add(Coordinate.scale(projectedPosition,screenCenter.x),screenCenter);
            let alignedDrawLocation = Coordinate.difference(centeredDrawLocation,spriteCenter);

            sprite.drawOptions.projectedPosition.assign(projectedPosition);
            sprite.drawOptions.projectedDimension.assign(projectedDimension);
            sprite.drawOptions.centeredDrawLocation.assign(centeredDrawLocation);
            sprite.drawOptions.alignedDrawLocation.assign(alignedDrawLocation);
            sprite.drawOptions.drawSize.assign(drawSize);

            sprite.drawOptions.visible = true;
        } else {
            sprite.drawOptions.visible = false;
        }

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
                if (absoluteParticlePosition.z > -1) {
                    let projectedParticlePosition = Coordinate.unscale (
                        Coordinate.unscale(absoluteParticlePosition,absoluteParticlePosition.z + 1)
                    );
                    let particleDrawPosition = Coordinate.add (
                        Coordinate.scale (
                            projectedParticlePosition,
                            screenCenter.x
                        ),
                        screenCenter
                    );

                    particle.drawOptions.projectedPosition.assign(projectedParticlePosition);
                    particle.drawOptions.particleDrawPosition.assign(particleDrawPosition);

                    particle.drawOptions.visible = true;
                } else {
                    particle.drawOptions.visible = false;
                }
                
                particle.drawOptions.deltaAbsoluteCoordinate.assign(Coordinate.difference(absoluteParticlePosition,particle.drawOptions.absoluteCoordinate));
                particle.drawOptions.absoluteCoordinate.assign(absoluteParticlePosition);
            })
        }
    }

    /**
     * Draws the sprite onto the canvas.
     * @param {Sprite} sprite sprite to draw
     */
    draw (sprite) {

        if (sprite.options.show) {


            this.context.save();

            this.context.translate(sprite.drawOptions.centeredDrawLocation.x,sprite.drawOptions.centeredDrawLocation.y);
            this.context.rotate(sprite.absoluteAngle.z * Coordinate.angleFactor);
            this.context.translate(-sprite.drawOptions.centeredDrawLocation.x,-sprite.drawOptions.centeredDrawLocation.y);

            if (sprite.drawOptions.visible) {
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
                    switch (sprite.text.align) {
                        case "top":
                            alignedTextLocation.y = sprite.drawOptions.alignedDrawLocation.y;
                            break;
                        case "center":
                            alignedTextLocation.y = sprite.drawOptions.centeredDrawLocation.y - sprite.text.getHeight()/2 * sprite.drawOptions.drawSize.x;
                            break;
                        case "bottom":
                            alignedTextLocation.y = sprite.drawOptions.alignedDrawLocation.y +
                                                    sprite.drawOptions.drawSize.y - sprite.text.getHeight() * sprite.drawOptions.drawSize.x;
                            break;
                    }
                    let formattedStringLocation = new Coordinate ();
                    formattedStringLocation.assign(alignedTextLocation);
                    sprite.text.text.forEach((line,i) => {
                        line.forEach((formattedString,fi) => {
                            this.context.font = (formattedString.fontSize * sprite.drawOptions.drawSize.x) + "px " + formattedString.fontFamily;
                            this.context.fillStyle = formattedString.color;
                            this.context.textAlign = formattedString.align;
                            if (i == 0 && fi == 0) {
                                formattedStringLocation.y += (formattedString.fontSize * sprite.drawOptions.drawSize.x) * 3/4;
                            }
                            if (fi == 0) {
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
                            } else {
                                formattedStringLocation.x += line[fi - 1].width * sprite.drawOptions.drawSize.x;
                            }
                            this.context.fillText(formattedString.text,
                                formattedStringLocation.x,
                                formattedStringLocation.y,
                                sprite.drawOptions.drawSize.x);
                        })
                        formattedStringLocation.y += (line[line.length-1].lineSpacing + line[line.length-1].fontSize) * sprite.drawOptions.drawSize.x;
                    })
                        
                }
            }

            if (sprite.options.postProcessor) {
                sprite.postProcessor.frame = this.frame;
                while (!sprite.postProcessor.callNext());
            }

            if (sprite.options.particleEmitter) {
                sprite.particleEmitter.emitter.frame = this.frame;
                while (!sprite.particleEmitter.emitter.callNext());
                sprite.particleEmitter.particles = sprite.particleEmitter.particles.filter(particle => {
                    if (particle.drawOptions.visible) {
                        this.context.translate(particle.drawOptions.particleDrawPosition.x,particle.drawOptions.particleDrawPosition.y);
                        particle.behaviour.frame = this.frame;
                        while (!particle.behaviour.callNext());
                        this.context.translate(-particle.drawOptions.particleDrawPosition.x,-particle.drawOptions.particleDrawPosition.y);
                    } else {
                        particle.behaviour.frame = this.frame;
                        while (!particle.behaviour.callNext());
                    }
                });
            }
        }

        this.context.translate(sprite.drawOptions.centeredDrawLocation.x,sprite.drawOptions.centeredDrawLocation.y);
        this.context.rotate(-sprite.absoluteAngle.z * Coordinate.angleFactor);
        this.context.translate(-sprite.drawOptions.centeredDrawLocation.x,-sprite.drawOptions.centeredDrawLocation.y);

        this.context.restore();
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
    absoluteDimensions = new Coordinate (2,2,2);

    drawOptions = {
        visible: true,

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
                 dimensions = new Coordinate (2,2,2),
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
        thread: false,
        node: false,
        eventStream: false,
        eventDistributor: false
    }

    /**
     * @typedef {("show" |
     *          "text" |
     *          "image" |
     *          "sample" |
     *          "particleEmitter" |
     *          "subSprites" |
     *          "transparency" |
     *          "preProcessor" |
     *          "postProcessor" |
     *          "thread" |
     *          "node" |
     *          "eventStream" |
     *          "eventDistributor")} SpriteOptions
     */

    /**
     * @typedef {Boolean | ("toggle" |
     *                    "active" |
     *                    "inactive")} ToggleOptions
     */

    /**
     * Toggles selected option.
     * @param {Array<SpriteOptions> | SpriteOptions} option one or more sprite options to toggle
     * @param {ToggleOptions} val toggle value
     */
    toggleOption (option,val = "toggle") {
        let optionArr;
        if (Array.isArray(option)) {
            optionArr = option;
        } else {
            optionArr = [option];
        }
        optionArr.forEach(toggleOpt => {
            if (typeof val == "boolean") {
                this.options[toggleOpt] = val;
                return;
            }
            switch (val) {
                case "toggle":
                    this.options[toggleOpt] = !this.options[toggleOpt];
                    break;
                case "active":
                    this.options[toggleOpt] = true;
                    break;
                case "inactive":
                    this.options[toggleOpt] = false;
                    break;
            }
        })
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
     * Adds and enables preProcessor on this sprite.
     * @param {ChainedFunctions} preProcessor preProcessor functions executed before during the draw call before showing the sprite
     */
    addPreProcessor (preProcessor) {
        this.preProcessor = preProcessor;
        this.toggleOption("preProcessor","active");
    }
    
    /**
     * Adds and enables postProcessor on this sprite.
     * @param {ChainedFunctions} postProcessor postProcessor functions executed after during the draw call after rendering before particles
     */
    addPostProcessor (postProcessor) {
        this.postProcessor = postProcessor;
        this.toggleOption("postProcessor","active");
    }

    /**
     * Makes this sprite a thread execution origin.
     * @param {Thread} thread thread that can be run if the parent object has subSprites enabled or the sprite is directly inputted into the runThread function
     */
    addThread (thread = new Thread()) {
        this.thread = thread;
        this.toggleOption("thread","active");
    }

    /**
     * Makes this sprite a thread execution node.
     * @param {ChainedFunctions} node node that can be pushed onto the thread tree.
     */
    addNode (node = new ChainedFunctions()) {
        this.node = node;
        this.toggleOption("node","active");
    }

    /**
     * Adds and enables event stream on this sprite.
     * @param {EventStream} eventStream event stream to add
     */
    addEventStream (eventStream = new EventStream()) {
        this.eventStream = eventStream;
        this.toggleOption("eventStream","active");
    }

    /**
     * Adds and enables event distributor on this sprite.
     * @param {EventDistributor} eventDistributor event ditributor to add
     */
    addEventDistributor (eventDistributor = new EventDistributor()) {
        this.eventDistributor = eventDistributor;
        this.toggleOption("eventDistributor","active");
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
     * @returns {Boolean} if the sprites are overlapping
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
     * Checks wether the position falls within the bounds of this sprite globally.
     * @param {Coordinate} position compared position
     * @returns {Boolean} wether the position falls within the bounds of this sprite globally
     */
    onSprite (position) {
        let negativeBorder = this.absolutePosition.difference(this.absoluteDimensions.unscale(2));
        let positiveBorder = this.absolutePosition.add(this.absoluteDimensions.unscale(2));
        return position.inRange(negativeBorder,positiveBorder);
    }

    /**
     * Checks wether the position falls within the bounds of this sprite locally.
     * @param {Coordinate} position compared position
     * @returns {Boolean} wether the position falls within the bounds of this sprite locally
     */
    localOnSprite (position) {
        let negativeBorder = this.position.difference(this.dimensions.unscale(2));
        let positiveBorder = this.position.add(this.dimensions.unscale(2));
        return position.inRange(negativeBorder,positiveBorder);
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
 * Version: 1.0
 * 
 *         ______ ________________  _____  ____________  ______ 
 *        / __/ // /  _/ __/_  __/ / __/ |/ / ___/  _/ |/ / __/
 *       _\ \/ _  // // _/  / /   / _//    / (_ // //    / _/  
 *      /___/_//_/___/_/   /_/   /___/_/|_/\___/___/_/|_/___/  
 * 
 */
class ShiftEngine {
    canvas;
    app = new Sprite();
    fps = 60;
    frame = 0;

    /**
     * Creates an application using the Shift engine.
     * @param {String} id canvas id from html document
     * @param {Sprite | SubSprites | Array<Sprite>} app application
     */
    constructor (id,app) {
        this.canvas = new Canvas(id);
        this.app = app;
    }

    start () {
        setInterval(() => {
            this.main();
        },1000/this.fps);
    }

    main () {
        this.canvas.runThreads(this.app);
        // console.log("----- threads completed running -----");

        this.canvas.runPreProcessors(this.app);
        // console.log("----- completed running preprocessors");

        this.canvas.prepareRender(this.app);
        // console.log("----- rendering prepared -----");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.clear();
        // console.log("----- frame cleared and window size adjusted -----");

        this.canvas.render(this.app);
        // console.log("----- new frame -----");

        this.frame ++;
    }
}

/**
 * Collection of functions called in order.
 */
class ChainedFunctions {
    /** @type {Array<ExpandedFunctionTypes>} */
    functions = [];
    timeout = 0;
    frame = 0;
    pointer = -1;
    finished = false;
    returnVal;
    args;
    options = {
        nofunnel: false,
        noblock: false,
        paused: false
    }

    /**
     * Toggles chained function options.
     * @param {("nofunnel" |
     *          "noblock" |
     *          "paused")} option option to toggle
     * @param {ToggleOptions} val toggle value
     */
    toggleOption (option,val = "toggle") {
        let optionArr;
        if (Array.isArray(option)) {
            optionArr = option;
        } else {
            optionArr = [option];
        }
        optionArr.forEach(toggleOpt => {
            if (typeof val == "boolean") {
                this.options[toggleOpt] = val;
                return;
            }
            switch (val) {
                case "toggle":
                    this.options[toggleOpt] = !this.options[toggleOpt];
                    break;
                case "active":
                    this.options[toggleOpt] = true;
                    break;
                case "inactive":
                    this.options[toggleOpt] = false;
                    break;
            }
        })
    }

    /**
     * Constructs an chained functions object.
     * @param {Array<{(*): *} | ChainedFunctions>} functions array of chained functions and/or functions
     */
    constructor (functions = []) {
        this.functions = functions.map(func => {
            if (typeof func == "function" || func instanceof ChainedFunctions) {
                return func;
            }
            return () => {};
        });
    }

    /**
     * Calls next chained function.
     * @returns {Boolean} returns true if the chain has completed execution
     */
    callNext () {
        this.finished = false;
        if (this.options.paused) {
            this.postpone();
        }
        if (this.timeout > this.frame) {
            return true;
        }
        if (this.finished) {
            return true;
        }
        this.increment();
        let next = this.get();
        if (!next) {
            this.finished = true;
            return true;
        }
        if (next instanceof ChainedFunctions) {
            next.frame = this.frame;
            let pastPointer = this.pointer;
            next.callNext();
            if (!next.finished && pastPointer == this.pointer) {
                this.goto("loop");
            }
            this.timeout = next.timeout;
            return false;
        } else {
            next();
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
     * Postpones execution by number of calls.
     * @param {Number} calls number of calls to postpone by
     */
    postpone (calls = 1) {
        this.timeout = calls + this.frame;
    }

    /**
     * Get the current function.
     * @returns {{(*): *} | ChainedFunctions | false} returns the current function
     */
    get () {
        if (this.pointer < 0) {
            return false;
        }
        if (this.end()) {
            return false;
        }
        return this.functions[this.pointer];
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
     * @typedef {Number | ("start" |
     *                     "end" |
     *                     "last" |
     *                     "previous" |
     *                     "loop" |
     *                     "next" |
     *                     "second" |
     *                     "secondLast")} ChainedFunctionsLoopOptions
     */

    /**
     * Goes to specified location.
     * @param {ChainedFunctionsLoopOptions} loopTo position the pointer should jump to
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
                this.pointer = this.functions.length - 2;
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
            case "second":
                this.pointer = 1;
                break;
            case "secondLast":
                this.pointer = this.functions.length - 3;
                break;
            default:
                if (typeof loopTo == "number") {
                    this.pointer = loopTo - 1;
                }
                break;
        }
    }

    /**
     * Goes to specified location and postpones execution.
     * @param {ChainedFunctionsLoopOptions} loopTo location to loop to
     * @param {Number} calls number of calls to postpone by
     */
    postponedGoto (loopTo = 0, calls = 1) {
        this.goto(loopTo);
        this.postpone(calls);
    }

    /**
     * Idles chained function.
     * @param {Function} activator optionally wait for a specific event
     */
    wait (activator = () => false) {
        if (activator()) {
            this.goto("next");
            return;
        }
        this.goto("loop");
        this.postpone(1);
    }
    
    /**
     * @typedef {Function | ChainedFunctions} ExpandedFunctionTypes
     */

    /**
     * Adds function to the chain.
     * @param {Array<ExpandedFunctionTypes> | ExpandedFunctionTypes} func function to be added
     */
    add (func) {
        if (Array.isArray(func)) {
            this.functions.push(...func);
            return;
        }
        this.functions.push(func);
    }

    /**
     * Moves pointer back to the start.
     */
    restart () {
        this.pointer = -1;
    }

    /**
     * Recursively restarts all nested chainedFunctions and self.
     */
    restartAll () {
        this.functions.forEach(f => {
            if (f instanceof ChainedFunctions) {
                f.restartAll();
            }
        })
        this.restart();
    }

    /**
     * Clones ChainedFunction.
     * @returns {ChainedFunctions} cloned chainedFunction
     */
    clone () {
        let clonedCf = new ChainedFunctions();
        for (const func of this.functions) {
            if (func instanceof ChainedFunctions) {
                clonedCf.add(func.clone(options));
            } else {
                clonedCf.add(func);
            }
        }
        clonedCf.args = this.args;
        clonedCf.finished = this.finished;
        clonedCf.frame = this.frame;
        clonedCf.timeout = this.timeout;
        for (const key in clonedCf.options) {
            clonedCf.options[key] = this.options[key];
        }
        clonedCf.pointer = this.pointer;
        clonedCf.returnVal = this.returnVal;
        return clonedCf;
    }

    /**
     * Clones ChainedFunction.
     * @param {ChainedFunctions} cf chained function to be copied
     * @param {CloningOptions} options cloning options
     * @returns {ChainedFunctions} cloned chainedFunction
     */
    static clone (cf,options = "strict") {
        return cf.clone(options);
    }
}

/**
 * An object to manage multiple chainedFunctions objects.
 */
class Thread {
    tree = [];
    timeout = 0;
    frame = 0;

    /**
     * Creates a thread object.
     * @param {Array<Array<ChainedFunctions>>} tree chainedFunctions to be added
     */
    constructor (tree = []) {
        this.tree = tree;
    }

    /**
     * Calls next chained function from the tree.
     * @returns {Boolean} wether the chained function could be called
     */
    callNext () {
        if (this.timeout > this.frame) {
            return true;
        }
        let next = this.get();
        if (!next) {
            return true;
        }
        let postpone = false;
        let blocked = false;
        this.tree[this.tree.length - 1] = next.filter(chainedFunctions => {
            chainedFunctions.frame = this.frame;
            chainedFunctions.callNext();
            if (chainedFunctions.timeout > chainedFunctions.frame) {
                postpone = true;
            } else if (!chainedFunctions.options.noblock) {
                blocked = true;
            }
            return !chainedFunctions.finished;
        });
        if (this.tree[this.tree.length - 1].length <= 0) {
            this.tree.pop();
        }
        if (postpone && !blocked) {
            this.postpone();
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
     * Fetches the current chained function array.
     * @returns {Array<ChainedFunctions> | false} returns the fetched chained function array
     */
    get () {
        if (this.empty()) {
            return false;
        }
        return this.tree[this.tree.length - 1];
    }

    /**
     * Pushes chained functions onto the thread tree
     * @param {ChainedFunctions | Array<ChainedFunctions> | Sprite | SubSprites | Array<Sprite>} chain chain functions to be pushed
     */
    push (chain) {
        let branch = [];
        let isSprite = false;
        SubSprites.forEach(chain,sprite => {
            isSprite = true;
            if (sprite.options.node) {
                branch.push(sprite.node);
            }
        })
        if (!isSprite) {
            if (Array.isArray(chain)) {
                branch = [...chain];
            } else {
                branch = [chain];
            }
        }
        this.tree.push(branch);
    }

    /**
     * Pushes chain onto thread tree and merges it the previous chain.
     * @param {ChainedFunctions | Array<ChainedFunctions> | Sprite | SubSprites | Array<Sprite> | null} chain chain to merge
     */
    merge (chain) {
        if (chain) {
            this.push(chain);
        }
        if (this.tree.length >= 2) {
            let mergedBranch = [...this.tree[this.tree.length - 2],...this.tree[this.tree.length - 1]];
            this.tree[this.tree.length - 2] = mergedBranch;
            this.tree[this.tree.length - 1] = [];
            this.tree = this.tree.filter(branch => branch.length > 0);
        }
    }
    
    /**
     * Splits existing chained functions from the thread tree and pushes them on last.
     * @param {ChainedFunctions | Array<ChainedFunctions> | Sprite | SubSprites | Array<Sprite>} chain chained functions to check for splitting
     */
    split (chain) {
        if (this.tree.length >= 1) {
            let filter = this.tree[this.tree.length - 1].filter(chainedFunction => {
                let isSprite = false;
                let containsChainedFunctions = false;
                SubSprites.forEach(chain,sprite => {
                    isSprite = true;
                    if (sprite.node === chainedFunction) {
                        containsChainedFunctions = true;
                    }
                })
                if (isSprite) {
                    return !containsChainedFunctions;
                }
                if (Array.isArray(chain)) {
                    return !chain.some(splitChain => splitChain === chainedFunction);
                }
                return chain !== chainedFunction;
            });
            this.tree[this.tree.length - 1] = filter;
        }
        this.push(chain);
    }

    /**
     * Postpones the execution of the callNext function.
     * @param {Number} calls number of callNext function call the execution should be postponed by
     */
    postpone (calls = 1) {
        this.test();
    }

    test (calls = 1) {
        this.timeout = calls + this.frame;
    }

    /**
     * Moves chainedFunctions to target thread.
     * @param {ChainedFunctions | Array<ChainedFunctions> | Sprite | SubSprites | Array<Sprite> | "all"} chain chainedFunctions to move
     * @param {Thread | Sprite} target where to move the split chainedFunctions to
     */
    move (chain,target) {
        if (this.empty()) {
            return;
        }
        if (chain != "all") {
            this.split(chain);
        }
        if (target instanceof Thread) {
            target.merge(this.tree.pop());
            return;
        }
        if (target instanceof Sprite) {
            target.thread.merge(this.tree.pop());
        }
    }

    /**
     * Hosts sprites with threads.
     * @param {Sprite | SubSprites | Array<Sprite>} sprite sprites to host
     * @param {boolean} immidiate wether the sprites should be created immidiately
     */
    mergeHost (sprite,immidiate = false) {
        let hostNode = Thread.createHost(sprite);
        if (immidiate) {
            hostNode.callNext();
        }
        this.merge(hostNode);
    }

    /**
     * Creates a host node.
     * @param {Sprite | SubSprites | Array<Sprite>} sprite sprites to host
     * @returns {ChainedFunctions} returns host node
     */
    static createHost (sprite) {
        let hostNode = new ChainedFunctions([
            () => {
                SubSprites.forEach(hostNode.sprites,sprite => {
                    if (!sprite.thread) {
                        return;
                    }
                    sprite.toggleOption("thread","active");
                })
            },
            () => {
                let threadsUnfinished = false;
                SubSprites.forEach(hostNode.sprites,sprite => {
                    if (!sprite.thread) {
                        return;
                    }
                    if (!sprite.thread.empty()) {
                        threadsUnfinished = true;
                    } else {
                        sprite.toggleOption("thread","inactive");
                    }
                })
                if (!threadsUnfinished) {
                    hostNode.restart();
                    hostNode.return();
                    return;
                }
                hostNode.postpone();
                hostNode.goto("loop");
            }
        ]);
        hostNode.sprites = sprite;
        return hostNode;
    }

    /**
     * When activated the funnel funnels the pointer to the given location.
     * @param {Sprite | ChainedFunctions} target sprite or chainedFunctions to funnel
     * @param {ChainedFunctionsLoopOptions} location location to funnel to
     * @param {EventStream} eventStream event stream for funnel activation
     * @param {(eventStream: EventStream) => boolean} eventHandler optional event stream handler
     * @returns {ChainedFunctions} returns funnel node
     */
    mergeFunnel (target,location,eventStream,
                eventHandler = (eventStream) => eventStream.recent() ? true : false) {
        this.merge(Thread.createFunnel(target,location,eventStream,eventHandler));
    }

    /**
     * When activated the funnel funnels the pointer to the given location.
     * @param {Sprite | ChainedFunctions} target sprite or chainedFunctions to funnel
     * @param {ChainedFunctionsLoopOptions} location location to funnel to
     * @param {EventStream} eventStream event stream for funnel activation
     * @param {(eventStream: EventStream) => boolean} eventHandler optional event stream handler
     * @returns {ChainedFunctions} returns funnel node
     */
    static createFunnel (target,location = "end",eventStream = new EventStream(),
                       eventHandler = (eventStream) => eventStream.recent() ? true : false) {
        let chainedFunctions;
        if (target instanceof Sprite) {
            chainedFunctions = target.node;
        } else {
            chainedFunctions = target;
        }
        let funnel = new ChainedFunctions([
            () => {
                if (funnel.eventStream) {
                    funnel.eventStream.clear();
                }
            },
            () => {
                if (funnel.options.nofunnel) {
                    return;
                }
                if (funnel.target.options.nofunnel) {
                    return;
                }
                if (eventHandler(funnel.eventStream)) {
                    funnel.target.goto(funnel.location);
                }
                if (funnel.target.finished) {
                    funnel.restart();
                    funnel.return();
                }
            },
            () => {
                funnel.goto(1);
                funnel.postpone();
            }
        ]);
        funnel.eventStream = eventStream;
        funnel.target = chainedFunctions;
        funnel.location = location;
        return funnel;
    }
}

class Particle {
    behaviour;
    position;

    destroyed = false;

    drawOptions = {
        visible: true,
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
        let clone = new Particle (this.behaviour.clone());
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
        if (Array.isArray(particle)) {
            this.particles.push(...particle);
        } else {
            this.particles.push(particle);
        }
    }

    /**
     * Clears all particles.
     */
    clear () {
        this.particles = [];
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
     * @typedef {Array<Sprite> | SubSprites | Sprite} SpriteCollection
     */

    /**
     * Calls the callback for each sprite in the Array or subSprites object.
     * @param {Array<Sprite> | SubSprites | Sprite} sprites Array or subSprites object to iterate over.
     * @param {{(sprite: Sprite, key: String | Number | null) : void}} callback Called for each sprite once.
     */
    static forEach (sprites,callback) {
        if (typeof callback != "function") {
            return;
        }
        if (sprites instanceof Sprite) {
            callback(sprites,null);
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
        if (sprites?.constructor === Object || sprites instanceof SubSprites) {
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
    width;

    /**
     * @typedef {("left" |
     *          "center" |
     *          "right")} HorizontalAlignment 
     */

    /**
     * Creates a formatted string object.
     * @param {String} color text color
     * @param {Number} fontSize font size
     * @param {String} fontFamily font family
     * @param {HorizontalAlignment} align text alignment
     * @param {Number} lineSpacing spacing between this line and the next
     * @param {String} text contents
     * @param {number} width width of text region
     */
    constructor (color = "#000000",
        fontSize = 0.1,
        fontFamily = "'serif'",
        align = "left",
        lineSpacing = 0,
        text = "",
        width = 0) {
        this.color = color;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.align = align;
        this.lineSpacing = lineSpacing;
        this.text = text;
        this.width = width;
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
     * Calculates height of line.
     * @returns {Number} height
     */
    getHeight () {
        return this.lineSpacing + this.fontSize;
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
                        case "width":
                            parsedString.width = parseFloat(wordArgument[1]);
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
     * @typedef {("top" |
     *          "center" |
     *          "bottom")} VerticalAlignment
     */

    /**
     * Creates a formattedText object.
     * @param {Array<Array<FormattedString>>} formattedStrings formatted strings to add
     * @param {VerticalAlignment} align how to align formatted text
     */
    constructor (formattedStrings = [],align) {
        this.text = formattedStrings;
        this.align = align;
    }
    
    /**
     * Calculates height of paragraph.
     * @returns {Number} height
     */
    getHeight() {
        let height = 0;
        for (const line of this.text) {
            height+= line[line.length - 1].getHeight();
        }
        return height;
        
    }

    /**
     * Parses string to formattedText.
     * @param {String} data string to parse
     */
    parse (data) {
        this.text.push(...FormattedText.parse(data).text);
    }

    /**
     * Parses string into formatted text.
     * @param {String} data string to parse
     * @returns {FormattedText} parsed text
     */
    static parse (data) {
        let parsedText = new FormattedText ();
        data.split("\n").forEach((line,lindex) => {
            parsedText.text.push([])
            let dataRegions = line.split("\"");
            for (let index = 1; index < dataRegions.length; index+=2) {
                const dataRegion = dataRegions[index];
                const prevDataRegion = dataRegions[index - 1];
                const region = prevDataRegion + "\"" + dataRegion + "\"";
                let regionStyle = new FormattedString ();
                if (parsedText.text[lindex].length + lindex > 0) {
                    let styleIndex = index;
                    let styleLindex = lindex;
                    if (index - 1 > 0) {
                        styleIndex-= 1;
                    } else {
                        styleLindex-= 1;
                        styleIndex = parsedText.text[styleLindex].length - 1;
                    }
                    regionStyle = parsedText.text[styleLindex][styleIndex];
                }
                parsedText.text[lindex].push(FormattedString.parse(region,regionStyle));
            }
            if (parsedText.text[lindex].length <= 0) {
                parsedText.text[lindex].push(new FormattedString());
            }
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

class EventDistributor {
    streams;
    /**
     * Creates an event distributor object.
     * @param {Array<EventStream>} streams streams to add initially
     */
    constructor (streams = []) {
        this.streams = streams;
    }

    /**
     * Adds a stream to the distribution network.
     * @param {EventStream | Array<EventStream> | Sprite | Array<Sprite> | SubSprites} stream stream to add
     * @returns {EventStream} returns added stream
     */
    addStream (stream = new EventStream()) {
        let isSprite = false;
        SubSprites.forEach(stream,sprite => {
            if (!sprite.options.eventStream) {
                sprite.addEventStream();
            }
            this.streams.push(sprite.eventStream);
            isSprite = true;
        });
        if (!isSprite) {
            if (Array.isArray(stream)) {
                this.streams.push(...stream);
            } else {
                this.streams.push(stream);
            }
        }
        return this.streams[this.streams.length - 1];
    }
    
    /**
     * Adds event task to all event streams in the network.
     * @param {*} ev event to add
     */
    distribute (ev) {
        this.streams.forEach(stream => {
            stream.pushEvent(ev);
        })
    }

    clearAll () {
        this.streams.forEach(stream => {
            if (!stream.options.noExternalClear) {
                stream.clear();
            }
        })
    }
}

/**
 * Customizeable event with a name and importance value to identify it.
 */
class EventTask {
    name;
    importance;

    constructor (name = "event", importance = 0) {
        this.name = name;
        this.importance = importance;
    }
}

/**
 * A collection of event tasks.
 */
class EventStream {
    /** @type {Array<EventTask>} */
    stream = [];

    options = {
        noExternalClear: false
    }

    /**
     * @typedef {("noExternalClear")} EventStreamOptions
     */

    /**
     * Toggles selected option.
     * @param {Array<EventStreamOptions> | EventStreamOptions} option one or more event stream options to toggle
     * @param {ToggleOptions} val toggle value
     */
    toggleOption (option,val = "toggle") {
        let optionArr;
        if (Array.isArray(option)) {
            optionArr = option;
        } else {
            optionArr = [option];
        }
        optionArr.forEach(toggleOpt => {
            if (typeof val == "boolean") {
                this.options[toggleOpt] = val;
                return;
            }
            switch (val) {
                case "toggle":
                    this.options[toggleOpt] = !this.options[toggleOpt];
                    break;
                case "active":
                    this.options[toggleOpt] = true;
                    break;
                case "inactive":
                    this.options[toggleOpt] = false;
                    break;
            }
        })
    }

    /**
     * Creates an event stream object.
     */
    constructor () {}

    /**
     * Checks if the stream is empty or not.
     * @returns {Boolean} wether the stream is empty
     */
    empty () {
        return this.stream.length <= 0;
    }

    /**
     * Gets the oldest event task and returns it.
     * @param {boolean} completed wether the task should be marked as completed
     * @returns {EventTask} oldest event task
     */
    first (completed = true) {
        if (this.empty()) {
            return false;
        }
        if (completed) {
            return this.stream.shift();
        }
        return this.stream[0];
    }

    /** @typedef {("importance" | "name" | "importanceValue")} EventFilterMode */

    /**
     * Filters for certain values and returns the most recent event task.
     * @param {EventFilterMode} mode filter mode
     * @param {Number | String} value value to filter for
     * @param {boolean} completed wether the task should be marked as completed
     * @returns {EventTask | false} most recent event task
     */
    only (mode,value,completed = true) {
        let filteredStream = [];
        switch (mode) {
            case "importance":
                if (typeof value != "number") {
                    return false;
                }
                let prioritizedEvent = this.prioritize("importance");
                if (prioritizedEvent.importance < value) {
                    return false;
                } else {
                    return prioritizedEvent;
                }
                break;
            case "importanceValue":
                if (typeof value != "number") {
                    return false;
                }
                this.stream.forEach((eventTask,i) => {
                    if (eventTask.importance == value) {
                        filteredStream.push(i);
                    }
                })
                break;
            case "name":
                if (typeof value != "string") {
                    return false;
                }
                this.stream.forEach((eventTask,i) => {
                    if (eventTask.name == value) {
                        filteredStream.push(i);
                    }
                })
                break;
        }
        if (filteredStream.length <= 0) {
            return false;
        }
        let eventTaskId = filteredStream[filteredStream.length - 1]
        if (completed) {
            return this.stream.splice(eventTaskId,1)[0];
        }
        return this.stream[eventTaskId];
    }

    /**
     * Prioritizes a certain value and returns the most recent event task.
     * @param {(EventFilterMode)} mode priority mode
     * @param {String} value value to prioritize
     * @param {boolean} completed wether the task should be marked as completed
     * @returns {EventTask | false} most recent prioritized event task
     */
    prioritize (mode = "importance",value = "",completed = true) {
        let orderedStream = []
        switch (mode) {
            case "importance":
                orderedStream = this.stream.map((value,i) => {return {importance: value.importance,i: i}})
                orderedStream = orderedStream.sort((a,b) => a.importance - b.importance);
                break;
            case "name":
                orderedStream = this.only("name",value);
                if (!orderedStream) {
                    if (this.stream.length > 0) {
                        orderedStream = [{i: this.stream.length - 1}];
                    } else {
                        orderedStream = [];
                    }
                } else {
                    return orderedStream;
                }
                break;
        }
        if (orderedStream.length <= 0) {
            return false;
        }
        let eventTaskId = orderedStream[orderedStream.length - 1].i;
        if (completed) {
            return this.stream.splice(eventTaskId,1)[0];
        }
        return this.stream[eventTaskId];
    }

    /**
     * Gets the most recent event task and returns it.
     * @param {boolean} completed wether the task should be marked as completed
     * @returns {EventTask | false} most recent event task
     */
    recent (completed = true) {
        if (this.empty()) {
            return false;
        }
        if (completed) {
            return this.stream.pop();
        }
        return this.stream[this.stream.length - 1];
    }

    /**
     * Adds a single event task to the stream.
     * @param {EventTask} val event added
     */
    pushEvent (val = new EventTask) {
        this.stream.push(val);
    }

    /**
     * @deprecated last updated: version 1.0
     * Iterates over each event task and call the handler with them in order of insertion.
     * @param {{(eventVal: *): boolean}} handler called on each event task and completes event task unless handler returns true
     */
    handleEvents (handler) {
        while(this.recent(false)) {
            this.recent(handler(this.recent(false)))
        }
    }
    
    /**
     * Clears all event tasks.
     */
    clear () {
        this.stream = [];
    }
}