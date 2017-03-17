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
		this.input.maxPointers = 2;	

		BasicGame.orientated = true;

		// this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		
		// this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		// this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		// this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		console.log(window.innerWidth)
		console.log(window.innerHeight)
		console.log(window.devicePixelRatio)
		console.log("this.game.width: "+this.game.width)
		console.log("this.game.height: "+this.game.height)


		this.scale.minWidth = this.game.width / window.devicePixelRatio;
		this.scale.minHeight = this.game.height / window.devicePixelRatio;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		// this.game.scale.refresh();
		// this.game.scale.updateLayout(true);
		// this.scale.setScreenSize(true);
		this.game.time.desiredFps = 60;
        this.game.renderer.renderSession.roundPixels = true;	

		this.scale.maxWidth = this.game.width / window.devicePixelRatio ;
		this.scale.maxHeight = this.game.height / window.devicePixelRatio ;


		// else{
			// this.scale.maxWidth = this.game.width * 2.5;
			// this.scale.maxHeight = this.game.height * 2.5;
			
			// this.game.scale.forceOrientation(false, false);
			// this.game.scale.forceLandscape = false;

			// this.scale.hasResized.add(this.gameResized, this);
			// this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			// this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
			// this.scale.setScreenSize(true);
		// }

// START CHECK ORIENTATION
		// this.state.start('CheckOrientation');

		console.log("this.game.width: "+this.game.width)
		console.log("this.game.height: "+this.game.height)

            this.state.start('Preloader');

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