let initChooseCharacterBase = () => {
    availableCharacters.forEach((val,id,arr)=>{
        canvas.sprites[val.name] = {
            img: val.cover,
        }
    })
}

let chooseCharacterBase = () => {}

let cleanupChooseCharacterBase = () => {}