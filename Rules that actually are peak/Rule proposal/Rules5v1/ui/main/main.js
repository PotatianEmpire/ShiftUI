let buildUp = false;
let players = {
    playerCount: 2
}
let fps = 24;

let stage = initChoosePlayerCount;


let main = () => {

    stage = stage();

}

let load = new Event("allLoad");

document.addEventListener("allLoad",() => {

    console.log("allLoaded")

    setInterval(() => main(),1000/fps);
},false)

let loadedPoints = 0;
let loadPoints = Object.keys(images).length;
console.log(loadPoints)
for (const key in images) {
    images[key].addEventListener("load",() => {
        loadedPoints++;
        if (loadedPoints >= loadPoints) {
            document.dispatchEvent(load);
        }
    })
}