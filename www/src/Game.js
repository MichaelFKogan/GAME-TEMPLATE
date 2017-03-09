BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {

// ====================================================
// ORIGINAL CODE
//         var self = this;
// // SCORE
// 		this.score = 42;
// // BACKGROUND
// 		this.add.sprite(0, 0, 'background');
//         var headY = 25 + 60 / 2;
// // PAUSE BUTTON
//         this.pauseButton = this.add.button(25 + (60 / 2), headY, 'pause', function() { self.pause(); });
//         this.pauseButton.anchor.setTo(0.5, 0.5);
// // SCOREBOARD
// 		this.scoreboard = new Scoreboard(this.game);
// 		this.add.existing(this.scoreboard);
// // PAUSEBOARD
//         this.pauseboard = new Pauseboard(this.game);
//         this.add.existing(this.pauseboard);
// ORIGINAL CODE
// ====================================================

//  WORLD BOUNDARIES
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

//  The bounds of our physics simulation
    this.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
//  Just to display the bounds
    this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    this.graphics.lineStyle(2, 0xb30000, 1);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);


// ====================================================
// ARCADE PHYSICS
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
// BACKGROUND COLOR
    this.game.stage.backgroundColor = '#eee';
// ADD GROUP: BALLS
    this.balls = this.game.add.group();
// CREATE BALLS
// NUMBER OF BALLS
    this.balls.createMultiple(2000, 'bullets', 0, false);
    this.balls.scale.setTo(this.game.scaleRatio, this.game.scaleRatio);

// ADD SPRITE
    this.atari = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY * 1.93, 'atari');
    this.atari.anchor.set(0.5);
    this.atari.scale.setTo(this.game.scaleRatio, this.game.scaleRatio);
// ====================================================

// ====================================================
// BALL GRAVITY
    this.game.physics.arcade.gravity.y = 2000;

//  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)

// ADD PHYSICS TO EVERYTHING IN WORLD
    this.game.physics.arcade.enable(this.game.world, true);
// SPRITE GRAVITY
    this.atari.body.allowGravity = 0;
// SPRITE IMMOVABLE
    this.atari.body.immovable = true;
// ADD KEYBOARD
    this.cursors = this.game.input.keyboard.createCursorKeys();
// LOOP GAME TIME EVENT
    this.game.time.events.loop(150, this.fire, this);
},
// ====================================================

// ====================================================
    fire: function() {

        this.ball = this.balls.getFirstExists(false);

        if (this.ball){
            this.ball.frame = this.game.rnd.integerInRange(0,6);
            this.ball.exists = true;
            this.ball.reset(this.game.world.randomX, 0);
            this.ball.body.bounce.y = 0.8;
        }
    },
// ====================================================

// ====================================================
reflect: function(a, ball) {

    // if (this.ball.y > (this.atari.y + 5)){
    //     return true;
    // }
    // else{
        // this.ball.body.velocity.x = this.atari.body.velocity.x;
        // this.ball.body.velocity.y *= -(this.ball.body.bounce.y);

        // return false;
    // }
},
// ====================================================

// ====================================================
// ORIGINAL CODE
    pause: function() {
        if (!this.game.soundMute) {
            this.game.menuSelect.play();
        }

        this.game.add.tween(this.pauseButton.scale).
            to( { x: 1.1, y: 1.1 }, 150, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.pauseboard.show();
    },
// ORIGINAL CODE
// ====================================================

// ====================================================
	update: function () {

    this.game.physics.arcade.collide(this.atari, this.balls, null, this.reflect);

    this.atari.body.velocity.x = 0;

    if (this.cursors.left.isDown){
        this.atari.body.velocity.x = -900;
    }
    else if (this.cursors.right.isDown){
        this.atari.body.velocity.x = 900;
    }

    this.balls.forEachAlive(this.checkBounds, this);
	},
// ====================================================

// ====================================================
// checkBounds: function (ball) {
//     if (this.ball.y > 600){
//         this.ball.kill();
//     }
// },
// ====================================================

// ====================================================
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
	}
// ====================================================

}; // END BasicGame.Game.prototype

