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

// ====================================================
//  WORLD 

    // BOUNDARIES
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    // BORDER OUTLINE
    this.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    this.graphics.lineStyle(10, 0xb30000, 1);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);

    // ARCADE PHYSICS
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // BACKGROUND COLOR
    this.game.stage.backgroundColor = '#666';

// END WORLD
// ====================================================

// ====================================================
// SPRITES

    // ADD GROUP: BALLS
    this.balls = this.game.add.group();
    // NUMBER OF BALLS
    this.balls.createMultiple(400, 'bullets', 0, false);
    // BALLS SIZE
    this.balls.scale.setTo(this.game.scaleRatio * 4, this.game.scaleRatio * 4);
    // BALL GRAVITY
    this.game.physics.arcade.gravity.y = 200;

    // SPRITESHEET
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY * 1.79, 'dog');
    this.player.anchor.set(0.5);
    this.player.scale.setTo(this.game.scaleRatio / 2.5, this.game.scaleRatio / 2.5);

    // SET PHYSICS TO PLAYER
    // this.game.physics.arcade.enable(this.player);

    // PLAYER BOUNCE
    // this.player.body.bounce.y = 0.2;
    // this.player.body.gravity.y = 300;
    // this.player.body.collideWorldBounds = true;

    // SPRITESHEET ANIMATIONS
    //  Our two animations, walking left and right.
    this.player.animations.add('left', [48, 47, 46, 45, 44, 43, 42, 41,], 16, true);
    this.player.animations.add('right', [49, 50, 51, 52, 53, 54, 55, 56], 16, true);

    this.player.animations.add('stillleft', [ 22, 23, 24, 25, 26, 27, 28, 29, 30], 16, true);
    this.player.animations.add('stillright', [32, 33, 34, 35, 36, 37, 38, 39, 40], 16, true);

    // this.player.animations.add('deadleft', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    // this.player.animations.add('deadright', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, true);

    // ADD PHYSICS TO EVERYTHING IN WORLD
    //  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)
    this.game.physics.arcade.enable(this.game.world, true);

    // SPRITE GRAVITY
    this.player.body.allowGravity = 0;

    // SPRITE IMMOVABLE
    this.player.body.immovable = true;

// END SPRITES
// ====================================================

// ====================================================
// KEYBOARD
    // ADD KEYBOARD
    this.cursors = this.game.input.keyboard.createCursorKeys();
// ====================================================

    // LOOP GAME TIME EVENT
    this.game.time.events.loop(150, this.fire, this);

// ====================================================
// CAMERA
    // this.game.camera.follow(this.player); //always center player
// ====================================================

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

    this.game.physics.arcade.collide(this.player, this.balls, null, this.reflect);
    this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
            {   
                this.lastanimation = 'left';
                this.player.body.velocity.x = -800;
                this.player.animations.play('left');  
            }

        else if (this.cursors.right.isDown)
            {   
                this.lastanimation = 'right';
                this.player.body.velocity.x = 800;
                this.player.animations.play('right');
            }

        else if(this.lastanimation == 'left' && this.cursors.left.isDown != true){         
                    this.player.animations.play('stillleft');
                }
        else if(this.lastanimation == 'right' && this.cursors.right.isDown != true){
                    this.player.animations.play('stillright');
                }
        else{this.player.animations.play('stillright');}




// MOVE CHARACTER LEFT AND RIGHT
    // this.LEFT = 0; 
    // this.RIGHT = 1; 

        // if(this.game.input.pointer1.isDown){ 
        //         console.log("this.game.input.x: "+this.game.input.x); 
        //         console.log("this.game.width: "+this.game.width);
    //         if (Math.floor(this.game.input.x/(this.game.width/2)) === this.LEFT) {
    //                 this.player.body.velocity.x = -700;
    //                 this.player.animations.play('left');  
    //             }    
              
    //         if (Math.floor(this.game.input.x/(this.game.width/2)) === this.RIGHT) {
    //                 this.player.body.velocity.x = 700;
    //                 this.player.animations.play('right'); 
    //             }    
        // }

        // else{          
        //     this.player.animations.stop();
        //     // this.player.animations.play('still');

        //     this.player.frame = 8;
        //     }

    //     else if(this.game.input.pointer1.isUp){   
    //                 this.player.animations.stop();
    //         // this.player.animations.play('still');

    //         this.player.frame = 8;
    //         } 


    //     //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    // {
    //     player.body.velocity.y = -350;
    // }

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

