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
//      this.score = 42;
// // BACKGROUND
//      this.add.sprite(0, 0, 'background');
//         var headY = 25 + 60 / 2;
// // PAUSE BUTTON
//         this.pauseButton = this.add.button(25 + (60 / 2), headY, 'pause', function() { self.pause(); });
//         this.pauseButton.anchor.setTo(0.5, 0.5);
// // SCOREBOARD
//      this.scoreboard = new Scoreboard(this.game);
//      this.add.existing(this.scoreboard);
// // PAUSEBOARD
//         this.pauseboard = new Pauseboard(this.game);
//         this.add.existing(this.pauseboard);
// ORIGINAL CODE
// ====================================================


// ====================================================
//  VARIABLES

            this.totalScore = 0;
            this.started = false;
            this.dead = false;
            this.canJump = true;
            this.canRestart = false;
            this.firstPress = false;

    // ADD PHYSICS TO EVERYTHING IN WORLD
    //  Enable physics on everything added to the world so far (the true parameter makes it recurse down into children)
    this.game.physics.arcade.enable(this.game.world, true);

// VARIABLES
// ====================================================


// ====================================================
//  WORLD 

    // BOUNDARIES
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    // ARCADE PHYSICS
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.checkCollision.up = false;

    // BACKGROUND
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height/2, 'backgroundscene');
    this.background.autoScroll(-20, 0)
    // this.background.fixedToCamera = true;
    // this.background.scale.setTo(.4)

    // BORDER OUTLINE
    // this.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    // this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    // this.graphics.lineStyle(4, 0xb30000, 1);
    // this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);

// WORLD 
// ====================================================


// ====================================================
// GROUPS

    // BALLS
    // this.balls = this.game.add.group();
    // // NUMBER OF BALLS
    // this.balls.createMultiple(100, 'bullets', 0, false);
    // BALL GRAVITY
    // this.game.physics.arcade.gravity.y = 1200;

    // LOOP GAME TIME EVENT
    this.game.time.events.loop(150, this.fire, this);


    this.tubes = this.game.add.group();
    this.tubes.enableBody = true;
    this.tubes.createMultiple(12, 'spikes2');
    this.newtubes = this.game.time.events.loop(1500, this.newTube, this);
    this.newtubes.timer.stop(false);


    this.sensors = this.game.add.group();
    this.sensors.enableBody = true;


    // GROUND
    // this.ground = this.game.add.tileSprite(0, this.game.height / 1.5, this.game.width, this.game.height / 1.5, 'ground');
    var groundCache = this.game.cache.getFrame('ground');
    console.log("GROUNDCACHE"+groundCache)
    console.log("GROUNDCACHE HEIGHT: "+groundCache.height)

    // this.ground = this.game.add.tileSprite(0, this.game.height/1.5, this.game.width, groundCache.height, 'ground');
    this.ground = this.game.add.tileSprite(0, this.game.height, this.game.width, groundCache.height, 'ground');
    this.ground.anchor.y = 1;
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.moves = false;
    this.ground.autoScroll(-400, 0);



// GROUPS
// ====================================================



// ====================================================
// SPRITES

    // DOG SPRITESHEET
    // this.player = this.game.add.sprite(this.game.world.centerX / 12, this.game.world.centerY * 1.2, 'dog');
    this.player = this.game.add.sprite(this.game.world.centerX / 4, this.game.height/1.7, 'dog');
    this.player.anchor.set(0.5, 0.5);
    this.player.scale.setTo(this.game.scaleRatio / 2.5, this.game.scaleRatio / 2.5);

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.player);


    // DOG SPRITESHEET ANIMATIONS
    //  Our two animations, walking left and right.
    this.player.animations.add('dogidleright', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 16, true);
    this.player.animations.add('dogrunright', [18, 19, 20, 21, 22, 23, 24, 25], 14, true);
    this.player.animations.add('dogrunleft', [10, 11, 12, 13, 14, 15, 16, 17], 16, true);
    this.player.animations.play('dogidleright');

    this.player.checkWorldBounds = true;

    // this.player.body.collideWorldBounds = true;
    // this.player.body.allowGravity = true;
    // this.player.body.immovable = true;
    // this.player.body.enable = true;

    // this.game.input.onTap.add(this.jump, this);

    this.scoreText = this.game.add.text(this.game.world.centerX * 1.95, this.game.world.centerY/8, "0", { font: "60px Arial", fill: "#666" }); 
    this.scoreText.anchor.set(0.5);

    this.hitAudio = this.add.audio('hit');
    this.dieAudio = this.add.audio('die');
    this.pointAudio = this.add.audio('point');
    this.wingAudio = this.add.audio('wing');


// SPRITES
// ====================================================



// ====================================================
// MEDIA QUERIES LANDSCAPE

    // // iPad Pro
    // if(this.game.height <= 1366 && this.game.height > 1024){
    //     this.player.scale.set(0.4);
    //     this.balls.scale.setTo(0.4);
    // }

    // // iPad + iPad Mini
    // else if(this.game.height <= 1024 && this.game.height > 598){
    //     this.player.scale.set(0.4);
    //     this.balls.scale.setTo(0.4);
    // }
    
    // // iPhone 6 Plus
    // else if(this.game.height <= 598 && this.game.height > 414){
    //     this.player.scale.set(0.15);
    //     this.balls.scale.setTo(0.2);
    // }

    // // iPhone 6 Plus
    // else if(this.game.height <= 414 && this.game.height > 412){
    //     this.player.scale.set(0.15);
    //     this.balls.scale.setTo(0.2);
    // }

    // // Nexus 6P + Nexus 5X
    // else if(this.game.height <= 412 && this.game.height > 375){
    //     this.player.scale.set(0.15);
    //     this.balls.scale.setTo(0.2);
    // }

    // // iPhone 6 
    // else if(this.game.height <= 375 && this.game.height > 360){
    //     this.player.scale.set(0.15);
    //     this.balls.scale.setTo(0.2);
    // }

    // // Galaxy S5
    // else if(this.game.height <= 360 && this.game.height > 320){
    //     this.player.scale.set(0.1);
    //     this.balls.scale.setTo(0.2);
    // }

    // // iPhone 5 
    // else if(this.game.height <= 320){
    //     this.player.scale.set(0.15);
    //     this.balls.scale.setTo(0.2);
    // }

// MEDIA QUERIES LANDSCAPE
// ====================================================


// ====================================================
// CONSOLE.LOG

    console.log(" ")
    console.log("WINDOW.INNERWIDTH: "+window.innerWidth)
    console.log("WINDOW.INNERHEIGHT: "+window.innerHeight)
    console.log(" ")
    console.log("WINDOW.DEVICEPIXELRATIO: "+window.devicePixelRatio)
    console.log(" ")
    console.log("THIS.GAME.SCALERATIO: "+this.game.scaleRatio)
    console.log(" ")
    console.log("THIS.GAME.WIDTH: "+this.game.width)
    console.log("THIS.GAME.HEIGHT: "+this.game.height)
    // console.log(" ")    
    // console.log("this.game.world: "+this.game.world)
    // console.log("this.game.world: "+this.game.world)
    console.log(" ")
    console.log("this.game.world.centerX: "+this.game.world.centerX)
    console.log("this.game.world.centerY: "+this.game.world.centerY)
    console.log(" ")
    console.log("this.scale.minWidth: "+this.scale.minWidth)
    console.log("this.scale.minHeight: "+this.scale.minHeight)
    console.log(" ")
    console.log("this.scale.maxWidth: "+this.scale.maxWidth)
    console.log("this.scale.maxHeight: "+this.scale.maxHeight)

// CONSOLE.LOG
// ====================================================


// ====================================================
// KEYBOARD
    // ADD KEYBOARD
    this.cursors = this.game.input.keyboard.createCursorKeys();
// KEYBOARD
// ====================================================


// ====================================================
// CAMERA
    // this.game.camera.follow(this.player); 
    // this.game.camera.deadzone = new Phaser.Rectangle(0, (this.game.height/2) + (this.game.height/4), (this.game.width/2) + (this.game.width/8), this.game.height/4);
// CAMERA
// ====================================================


    this.START = false;

}, // END CREATE
// ====================================================



    fire: function() {

        // this.ball = this.balls.getFirstExists(false);

        if (this.ball){
            this.ball.frame = this.game.rnd.integerInRange(0,6);
            this.ball.exists = true;
            this.ball.reset(this.game.world.randomX, 0);
            this.ball.body.bounce.y = 0.8;
        }
    },


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


            start: function(){

                // this.ground.autoScroll(-250, 0);

                this.player.animations.play('dogrunright');

                this.game.physics.arcade.enable(this.player);
                
                // this.bird.body.setSize(this.bird.width - 10, this.bird.height - 10, 0, 0);
                this.player.body.gravity.y = 2000; 
                this.player.body.gravity.y = 0;       
                this.player.body.collideWorldBounds = true;
                
                this.newtubes.timer.start();
                
                this.started = true;

            },
            gameOver: function(){
                var self = this;
                this.newtubes.timer.stop(false);
                
                this.game.add.tween(this.game.camera).to({ x: -10 }, 40, Phaser.Easing.Sinusoidal.InOut, true, 0, 5, true);
                this.bird.animations.stop();
                
                this.flash = this.game.add.graphics(-10, 0);
                this.flash.beginFill(0xffffff, 1);
                this.flash.drawRect(0, 0, this.game.width + 20, this.game.height);
                this.flash.endFill();
                this.flash.alpha = 0.5;
                this.game.add.tween(this.flash).to({ alpha: 0 }, 50, Phaser.Easing.Cubic.In, true);
                
                this.dead = true;
                
                var self = this;
                setTimeout(function(){
                    self.canRestart = true;
                }, Phaser.Timer.SECOND * 0.5);
                
                this.tubes.forEachAlive(function(tube){
                    tube.body.velocity.x = 0;
                }, this);
                this.sensors.forEachAlive(function(sensor){
                    sensor.body.velocity.x = 0;
                }, this);
                
                try {
                    $cordovaVibration.vibrate(300);
                } catch (error) {
                    console.log(error);
                }
                
                this.hitAudio.play();
                $timeout(function () {
                    self.dieAudio.play();
                }, 300);
            },
            jump: function(){
                if(!this.dead) {
                    this.start();
                }

                console.log("Jump")
                
                if(!this.dead && this.canJump && this.firstPress && this.player.body.touching.down) {
                    // this.player.animations.play('jump');
                    this.player.body.velocity.y = -2000;
                    this.playerInJump = true;
                    // this.wingAudio.play();
                }

                else if(this.input.pointer1.isDown &&!this.dead && this.canJump && this.firstPress && !this.player.body.touching.down){
                    this.player.body.velocity.y = -1750;
                    this.playerInJump = true;
                }
                
                if(this.dead && this.canRestart) {
                    this.game.state.start(this.game.state.current);
                }
                    this.firstPress = true;

            },


        	update: function () {
                this.ground.tilePosition.x +=250
                this.game.physics.arcade.collide(this.player, this.ground, this.balls, null, this.reflect);

                if(this.game.input.pointer1.isDown){
                    this.start();
                    this.player.body.velocity.y = -750;
                }

                else if(this.started){ this.player.body.velocity.y = +450;}


                // this.player.body.gravity.y = 6500;        

                // if(this.game.input.pointer1.isDown && this.player.body.touching.down){
                //     console.log("OnTap")
                // this.player.body.velocity.y = -2000;
                // }

                // else if(this.game.input.pointer1.isDown && !this.player.body.touching.down){
                // this.player.body.velocity.y = -2000;
                // this.player.body.gravity = 0;
                // }
                //     this.start();



                // this.balls.forEachAlive(this.checkBounds, this);

        	}, // END UPDATE


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

            // updateAngle: function(){
                
            //     if(this.bird.body.touching.down) return;
                
            //     if(this.birdInJump){
            //         if(this.bird.angle > -30){
            //             this.bird.angle -= 10;
            //         }else{
            //             this.birdInJump = false;
            //         }
            //     }else if(this.bird.angle < 0){
            //         this.bird.angle += 1;
            //     }else if(this.bird.angle < 45){
            //         this.bird.animations.stop();
            //         this.bird.angle += 2;
            //     }else if(this.bird.angle < 90){
            //         this.bird.angle += 4;
            //     }
            // },

            // resize: function(){
                
            //     if(this.bird){
            //         this.bird.x = this.game.world.centerX/2;
            //     }
            //     if(this.scoreText){
            //         this.scoreText.y = this.game.world.centerY/3;
            //         this.scoreText.x = this.game.world.centerX;
            //     }
            //     if (this.ground) {
            //         this.ground.width = this.game.width + 20;
            //     }
            // },

            render: function() {
            // DEADZONE - Rectangle that defines the limits at which the camera will scroll
                // this.zone = this.game.camera.deadzone;
                // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
                // this.game.context.fillRect(this.zone.x, this.zone.y, this.zone.width, this.zone.height);

            // DEBUG PLAYER
            // this.game.debug.text('Debugging', 10, 30, 'white', '20px "Sigmar One"');

            // this.game.debug.body(this.player);
            // this.game.debug.geom(new Phaser.Point(this.player.x, this.player.y), 'blue');

            // this.game.debug.body(this.ground, 'rgba(255, 255, 0, 0.5)');

            // this.sensors && this.sensors.forEachAlive(function(sensor){
            //     this.game.debug.body(sensor, 'rgba(0, 255, 0, 0.5)');
            // }, this);

            // this.game.debug.body(this.balls);
            // this.game.debug.geom(new Phaser.Point(this.balls.x, this.balls.y), 'blue');

            // this.tubes && this.tubes.forEachAlive(function(tube){
            //     this.game.debug.body(tube, 'rgba(0, 0, 255, 0.5)');
            // }, this); 

            },

            newTube: function(){
                var randomPosition = this.game.rnd.integerInRange(120, this.game.height - this.ground.height - 100);
                
                var tube = this.game.cache.getFrame('spikes2');
                
                // var tube1 = this.tubes.getFirstDead();
                // tube1.reset(this.game.width + tube.width/2, randomPosition - 100);

                // tube1.anchor.setTo(0.5, 1);
                // // tube1.scale.set(1);
                // tube1.scale.setTo(-1, -1);
                // tube1.body.velocity.x = -380;

                // tube1.body.immovable = true;
                // tube1.checkWorldBounds = true;
                // tube1.outOfBoundsKill = true;

                
                // var tube2 = this.tubes.getFirstDead();
                // // tube2.reset(this.game.width + tube.width/2, randomPosition + 100 + tube.height/2);
                // tube2.reset(this.game.width + tube.width/2, this.game.height / 1.48);

                // tube2.anchor.setTo(.1, .1);
                // tube2.scale.set(1);
                // // tube2.scale.setTo(-1, -1);
                // tube2.body.velocity.x = -350;

                // tube2.body.immovable = true;
                // tube2.checkWorldBounds = true;
                // tube2.outOfBoundsKill = true;

                
                // var sensor = this.sensors.create(this.game.width + tube.width, 0);
                // sensor.body.setSize(40, this.game.height);
                // sensor.body.velocity.x = -180;
                // sensor.body.immovable = true;
                // sensor.alpha = 0;
            },

            //  incrementScore: function(bird, sensor){
            //     sensor.kill();
            //     this.totalScore++;
            //     this.scoreText.setText(this.totalScore);
            //     this.pointAudio.play();
            // },




}; // END BasicGame.Game.prototype


















