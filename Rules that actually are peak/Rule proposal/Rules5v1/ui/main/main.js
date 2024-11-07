let loading = true;
let players = {
    playerCount: 2
}
let fps = 60;

let stage = loadingScreen.loadingAnimation;


let main = () => {

    stage = stage();

}

let load = new Event("allLoad");

document.addEventListener("allLoad",() => {

    console.log("allLoaded");
    
},false);

setInterval(() => main(),1000/fps);

let loadingProcedure = {
    images: {
        loaded: 0,
        toLoad: Object.keys(images).length,
        loadingComplete: false
    },
    css: {
        links: document.getElementsByTagName("link"),
        loaded: 0,
        toLoad: 0,
        loadingComplete: false
    },
    scripts: {
        scripts: document.scripts,
        loaded: 0,
        toLoad: document.scripts.length,
        loadingComplete: false
    }
}

loadingProcedure.css.toLoad = loadingProcedure.css.links.length;

// wait for css to load
for (let i = 0; i < loadingProcedure.css.links.length; i++) {
    loadingProcedure.css.links.item(i).addEventListener("load",() => {
        loadingProcedure.css.loaded++;
        if(loadingProcedure.css.loaded >= loadingProcedure.css.toLoad)
            loadingProcedure.css.loadingComplete = true;
    })
}


// wait for code to load
for (let i = 0; i < loadingProcedure.scripts.scripts.length; i++) {
    loadingProcedure.scripts.scripts.item(i).addEventListener("load",() => {
        loadingProcedure.scripts.loaded++;
        if(loadingProcedure.scripts.loaded >= loadingProcedure.scripts.toLoad)
            loadingProcedure.scripts.loadingComplete = true;
    })
}


// wait images to load
for (const key in images) {
    images[key].addEventListener("load",() => {
        loadingProcedure.images.loaded++;
        if (loadingProcedure.images.loaded >= loadingProcedure.images.toLoad)
            loadingProcedure.images.loadingComplete = true;
    })
}