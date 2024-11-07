let loadingScreen = {
    sprites: {},
    loadingAnimation: () => {
        if(loadingProcedure.css.loadingComplete &&
            loadingProcedure.scripts.loadingComplete &&
            loadingProcedure.images.loadingComplete)
            return startMenu.startMenu;
        return loadingScreen.loadingAnimation;
    }
}