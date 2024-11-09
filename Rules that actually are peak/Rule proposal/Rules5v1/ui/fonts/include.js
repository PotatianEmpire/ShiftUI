
let fonts = {
    DEADCRT: new FontFace("DEADCRT","url(./fonts/DEADCRT.ttf"),
    vinque_rg: new FontFace("vinque-rg","url('./fonts/vinque rg.otf')")
}

let loadFonts = () => {
    document.fonts.add(fonts.DEADCRT);
    document.fonts.add(fonts.vinque_rg);
}
