let startMenu = {
    sprites: {

        

    },
    startMenu: () => {
        canvas.context.font = "100px 'DEADCRT'";
        canvas.context.fillStyle = "#000000";
        canvas.context.fillText("Players: " + players.playerCount + keys.getKeyString(), 400, 400);

        console.log("Hi");

        return startMenu.startMenu;
    }
}