let keys = {
    keyString: "",
    getKeyString: () => {
        let retVal = keys.keyString;
        keys.keyString = "";
        return retVal;
    }
}

document.addEventListener("keydown",(e) => {
    keys.keyString += e.key;
})