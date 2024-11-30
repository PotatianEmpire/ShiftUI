



let mediaInterface = {
    images: {
        request(image,src) {
            image.src = src;
            image.addEventListener("load", () => {
                image.loaded = true;
            })
        },
        unload(image) {
            image.unloadedSrc = image.src
            image.src = "default.jpg";
            image.loaded = false;
        },
        reload(image) {
            this.request(image,image.unloadedSrc);
        },
        loadProgress(images,loadClass = Image) {
            let loaded = 0;
            let imagesLength = 0;
            for (const key in images) {
                if (images[key] instanceof loadClass){
                    imagesLength ++;
                    loaded += images[key].loaded ? 1:0
                } else if (typeof images[key] == "object") {
                    let innerObject = this.loadProgress(images[key]);
                    imagesLength += innerObject.imagesLength;
                    loaded += innerObject.loaded;
                } 
            }
            return {loaded: loaded,imagesLength: imagesLength,percentage: (loaded * 100)/imagesLength};
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
            return constructor.mediaInterface.images.loadProgress(tracks,Audio);
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
            return constructor.mediaInterface.images.loadProgress(fonts,FontFace);
        }
    }
}