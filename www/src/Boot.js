BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
        this.game.stage.backgroundColor = "#fff";
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)

// LOADING BAR
        this.load.image('preloaderBackground', 'images/preloader_background.png');
        this.load.image('preloaderBar', 'images/preloader_bar.png');
        this.load.image('preloaderBarGray', 'images/preloader_bar_gray.png');

    },

	create: function () {

		this.game.scaleRatio = window.devicePixelRatio / 3;

		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;

		BasicGame.orientated = true;
		// this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

		// this.scale.minWidth = this.game.width ;
		// this.scale.minHeight = this.game.height ;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		        //Pixel Art
		this.game.renderer.renderSession.roundPixels = true;
        this.game.time.desiredFps = 60;

		if (this.game.device.desktop){
			this.scale.maxWidth = this.game.width;
			this.scale.maxHeight = this.game.height;
			this.scale.setScreenSize(true);
		}

		else{
			this.scale.maxWidth = this.game.width * 2.5;
			this.scale.maxHeight = this.game.height * 2.5;
			
			this.scale.forceOrientation(false, false);
			this.scale.hasResized.add(this.gameResized, this);
			
			this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
			this.scale.setScreenSize(true);
		}

// START CHECK ORIENTATION
		this.state.start('CheckOrientation');
	},

	gameResized: function (width, height) {

		//  This could be handy if you need to do any extra processing if the game resizes.
		//  A resize could happen if for example swapping orientation on a device.

	},

	enterIncorrectOrientation: function () {

		BasicGame.orientated = false;

		document.getElementById('orientation').style.display = 'block';

	},

	leaveIncorrectOrientation: function () {

		BasicGame.orientated = true;

		document.getElementById('orientation').style.display = 'none';
		this.scale.setScreenSize(true);

	}

};