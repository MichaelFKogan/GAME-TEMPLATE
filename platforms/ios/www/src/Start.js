(function () {

    var width = 640;
    var height = 960;
    //  Create your Phaser game and inject it into the game div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    //  We're using a game size of 1024 x 768 here, but you can use whatever you feel makes sense for your game of course.
    var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

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