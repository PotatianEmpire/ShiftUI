



let mediaInterface = {
    images: {
        request(image,src) {
            image.src = src;
            image.loaded = false;
            image.addEventListener("load", () => {
                image.loaded = true;
            })
        },
        reqeustSamples(samples,image,src) {
            this.request(image,src);
            for (const key in samples) {
                if(samples[key] instanceof Sample){
                    samples[key].img = image;
                }
            }
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
                    imagesLength += innerObject.length;
                    loaded += innerObject.loaded;
                } 
            }
            return {loaded: loaded,length: imagesLength,percentage: (loaded * 100)/imagesLength,finished: loaded == imagesLength};
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
            return mediaInterface.images.loadProgress(tracks,Audio);
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
            return mediaInterface.images.loadProgress(fonts,FontFace);
        }
    }
}