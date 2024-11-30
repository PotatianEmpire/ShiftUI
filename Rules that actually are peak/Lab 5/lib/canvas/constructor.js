
let constructor = {
    /**
     * 
     * @param {Sprite} sprite 
     */
    construct (sprite) {
        if (sprite.constructor) {
            sprite.constructor(sprite,this.mediaInterface);
        }
        if (sprite.subSprites)
            for (const key in sprite.subSprites) {
                this.construct(sprite.subSprites[key]);
            }
    },
    mediaInterface: {
        images: {
            request(image,src) {
                image.src = src;
                image.addEventListener("load", () => {
                    image.loaded = true;
                })
            },
            unload(image) {
                image.src = "default.jpg";
                image.loaded = false;
            },
            loadProgress(images) {
                let loaded = 0;
                let imagesLength = 0;
                for (const key in images) {
                    imagesLength ++;
                    loaded += images[key].loaded ? 1:0
                }
                return loaded/imagesLength;
            }
        },
        audio: {
            request(audio,src) {
                audio.src = src;
                audio.addEventListener("load",() => {
                    audio.loaded = true;
                })
            },
            loadProgress(tracks) {
                let loaded = 0;
                let tracksLength = 0;
                for (const key in tracks) {
                    tracksLength ++;
                    loaded += tracks[key].loaded ? 1:0
                }
                return loaded/tracksLength;
            },
        },
        fonts: {
            request(font) {
                document.fonts.add(font);
                font.load().then(() => {
                    font.hasLoaded = true;
                })
            },
            loadProgress(fonts) {
                let loaded = 0;
                let fontsLength = 0;
                for (const key in fonts) {
                    fontsLength ++;
                    loaded += fonts[key].hasLoaded ? 1:0
                }
                return loaded/fontsLength;
            }
        }
    }
}
