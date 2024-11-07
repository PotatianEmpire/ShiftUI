let startMenu = {
    sprites: {

        

    },
    startMenu: () => {

        canvas.render(startMenu.sprites);

        canvas.context.font = canvas.scale(0.025) + "px 'DEADCRT'";
        canvas.context.fillStyle = "#000000";
        canvas.context.textAlign = "center";
        canvas.context.fillText("Name of Game goes here", canvas.scale(0.5), canvas.scale(0.2));

        return startMenu.startMenu;
    }
}