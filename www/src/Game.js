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
    
    console.log("// =======================================")
    console.log("3 ) this.game.scaleRatio: "+this.game.scaleRatio)
    console.log("// =======================================")

    // BACKGROUND
    this.background = this.game.add.tileSprite(0, 0, 1000, 750, 'backgroundscene');
    this.background.fixedToCamera = true;
    this.background.scale.setTo(.4)

    // BORDER OUTLINE
    this.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    this.graphics.lineStyle(2, 0xb30000, 1);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);

    // ARCADE PHYSICS
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

// END WORLD SETTINGS
// ====================================================

// ====================================================
// SPRITES

    // ADD GROUP: BALLS
    this.balls = this.game.add.group();
    // NUMBER OF BALLS
    this.balls.createMultiple(100, 'bullets', 0, false);
    // BALL GRAVITY
    this.game.physics.arcade.gravity.y = 1200;


    // DOG SPRITESHEET
    this.player = this.game.add.sprite(this.game.world.centerX / 4, this.game.world.centerY * 1.79, 'dog');
    this.player.anchor.set(0.5, 0.5);

    console.log("// =======================================")
    console.log("4 ) this.player.width: "+this.player.width)
    console.log("5 ) this.player.height: "+this.player.height)
    console.log("6 ) this.game.width+crazy formula: "+Math.floor(((this.game.height/4)/this.player.height) * this.player.width))
    console.log("7 ) this.game.height/4: "+this.game.height/4)
    console.log("// =======================================")

    // this.player.scale.setTo( Math.floor(((this.game.height/4)/this.player.height) * this.player.width), this.game.height/4);
    // this.player.scale.set(0.2);
// this.player.body.setSize(100,100)

    console.log("// =======================================")
    console.log("8 ) this.player.width after adjustment: "+this.player.width)
    console.log("9 ) this.player.height after adjustment: "+this.player.height)
    console.log("// =======================================")
    
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;

    // SET PHYSICS TO PLAYER
    // this.game.physics.arcade.enable(this.player);

    // PLAYER BOUNCE
    // this.player.body.bounce.y = 0.2;
    // this.player.body.gravity.y = 300;
    // this.player.body.collideWorldBounds = true;

    // DOG SPRITESHEET ANIMATIONS
    //  Our two animations, walking left and right.
    this.player.animations.add('dogidleright', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 16, true);
    this.player.animations.add('dogrunright', [18, 19, 20, 21, 22, 23, 24, 25], 16, true);
    this.player.animations.add('dogrunleft', [10, 11, 12, 13, 14, 15, 16, 17], 16, true);

    // ADD PHYSICS TO EVERYTHING IN WORLD
    //  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)
    this.game.physics.arcade.enable(this.game.world, true);

    // SPRITE GRAVITY
    this.player.body.allowGravity = 0;

    // SPRITE IMMOVABLE
    this.player.body.immovable = true;


    // MEDIA QUERIES LANDSCAPE

    // iPad Pro
    if(this.game.height <= 1366 && this.game.height > 1024){
        this.player.scale.set(0.4);
        this.balls.scale.setTo(0.4);
    }

    // iPad + iPad Mini
    else if(this.game.height <= 1024 && this.game.height > 598){
        this.player.scale.set(0.4);
        this.balls.scale.setTo(0.4);
    }
    
    // iPhone 6 Plus
    else if(this.game.height <= 598 && this.game.height > 414){
        this.player.scale.set(0.15);
        this.balls.scale.setTo(0.2);
    }

    // iPhone 6 Plus
    else if(this.game.height <= 414 && this.game.height > 412){
        this.player.scale.set(0.15);
        this.balls.scale.setTo(0.2);
    }

    // Nexus 6P + Nexus 5X
    else if(this.game.height <= 412 && this.game.height > 375){
        this.player.scale.set(0.15);
        this.balls.scale.setTo(0.2);
    }

    // iPhone 6 
    else if(this.game.height <= 375 && this.game.height > 360){
        this.player.scale.set(0.15);
        this.balls.scale.setTo(0.2);
    }

    // Galaxy S5
    else if(this.game.height <= 360 && this.game.height > 320){
        this.player.scale.set(0.1);
        this.balls.scale.setTo(0.2);
    }

    // iPhone 5 
    else if(this.game.height <= 320){
        this.player.scale.set(0.15);
        this.balls.scale.setTo(0.2);
    }


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
    // this.game.camera.follow(this.player); 
    // this.game.camera.deadzone = new Phaser.Rectangle(0, (this.game.height/2) + (this.game.height/4), (this.game.width/2) + (this.game.width/8), this.game.height/4);
// ====================================================

// ====================================================
// SENSORS
                this.sensors = this.game.add.group();
                this.sensors.enableBody = true;
// ====================================================

    this.START = false;
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

// RUNNING ON TAP
    this.game.physics.arcade.collide(this.player, this.balls, null, this.reflect);
    this.player.body.velocity.x = 0;

        if(this.START == false){
        this.player.animations.play('dogidleright');
        }
            if (this.cursors.right.isDown || this.game.input.pointer1.isDown){   
            // if (this.game.input.pointer1.isDown){   
                    this.START = true;
                    this.player.body.velocity.x = 450;
                    this.player.animations.play('dogrunright');
                }

            else if(this.START == true){
                    this.player.body.velocity.x = -450;
                    this.player.animations.play('dogrunleft');
                }

    // this.balls.forEachAlive(this.checkBounds, this);


// BACKGROUND IMAGE MOVE WITH CAMERA
    if (!this.game.camera.atLimit.x)
    {this.background.tilePosition.x -= ((this.player.body.velocity.x/24) * this.game.time.physicsElapsed);}

    //  Scroll the background
    this.background.tilePosition.x -= .1;

    // if (!this.game.camera.atLimit.y)
    // {this.background.tilePosition.y -= ((this.player.body.velocity.y/16) * this.game.time.physicsElapsed);}

	}, // END UPDATE
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
	},
// ====================================================

render: function() {
// DEADZONE - Rectangle that defines the limits at which the camera will scroll
    // this.zone = this.game.camera.deadzone;
    // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
    // this.game.context.fillRect(this.zone.x, this.zone.y, this.zone.width, this.zone.height);

// DEBUG PLAYER
this.game.debug.body(this.player);
this.game.debug.geom(new Phaser.Point(this.player.x, this.player.y), '#FFFF00');

// this.game.debug.body(this.balls);
// this.game.debug.geom(new Phaser.Point(this.balls.x, this.balls.y), '#FFFF00');
}

}; // END BasicGame.Game.prototype

