let load = {
    sprites: {},
    load: () => {
        
        load.images.load();
        load.fonts.load();
        console.log("load");

        return load.loadingAnimation;
    },
    loadingAnimation: () => {
        if(load.images.loadingComplete &&
            load.fonts.loadingComplete &&
            document.readyState == "complete")
            return startMenu.startMenu;

        console.log("loading...")
        return load.loadingAnimation;
    },
    images: {
        load: () => {
            for (const key in images) {
                console.log(images[key].src)
                images[key].addEventListener("load",() => {
                    load.images.loaded++;
                    if (load.images.loaded >= load.images.toLoad)
                        load.images.loadingComplete = true;
                })
            }
            loadImages();
        },
        loaded: 0,
        toLoad: Object.keys(images).length,
        loadingComplete: false
    },
    fonts: {
        load: () => {
            for (const key in fonts) {
                fonts[key].load().then(() => {
                    
                    load.fonts.loaded++;
                    if (load.fonts.loaded >= load.fonts.toLoad)
                        load.fonts.loadingComplete = true;
                })
            }
            loadFonts();
        },
        loaded: 0,
        toLoad: Object.keys(fonts).length,
        loadingComplete: false
    }
}