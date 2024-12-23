function activateTitleScreen () {}
function deactivateTitleScreen () {}

function constructTitleScreen () {
    
    let titleScreen = new Sprite ();

    titleScreen.addSample(media.images.title.backdrop.title);

    lab5App.subSprites.titleScreen = titleScreen;

}