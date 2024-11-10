let startMenu = {
    sprites: {

        titleText: {
            text: `
0.04 #262626 center "ハサミ"
0.03 ""
"攻撃力：１００"
`,
            x: 0.5,
            y: 0.3,
            width: 0.5,
            height: 0.5,
            textBoxHeightScale: 1.1,
            angle: 0,
            align: "top",
            img: images.dragon
        }

    },
    startMenu: () => {

        canvas.render(startMenu.sprites);
        
        return startMenu.startMenu;
    }
}