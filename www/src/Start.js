(function () {

    var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

// 1 - CONTAINS PRELOADER IMAGES
    game.state.add('Boot', BasicGame.Boot);

// 2 CHECKS GAME ORIENTATION (SCREEN POSITION)
    game.state.add('CheckOrientation', BasicGame.CheckOrientation); // 2

// 3 SHOWS LOADING BAR. CONTAINS LOAD MENU ASSETS AND IMAGES
    game.state.add('Preloader', BasicGame.Preloader); 

// 4 SHOWS COMPANY LOGO
    // game.state.add('GamersAssociate', BasicGame.GamersAssociate); 

// 5 SHOWS MAIN MENU
    game.state.add('MainMenu', BasicGame.MainMenu); 

// 6 SHOWS GAME
    game.state.add('Game', BasicGame.Game); 

    game.state.add('Sponsor', BasicGame.Sponsor);


    //  Now start the Boot state.
    game.state.start('Boot');

})();