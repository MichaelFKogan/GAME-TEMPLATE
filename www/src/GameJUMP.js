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

// oooo    ooo  .oooo.   oooo d8b 
//  `88.  .8'  `P  )88b  `888""8P 
//   `88..8'    .oP"888   888     
//    `888'    d8(  888   888     
//     `8'     `Y888""8o d888b    

            this.totalScore = 0;
            this.started = false;
            this.dead = false;
            this.canJump = true;
            this.canRestart = false;
            this.firstPress = false;
            this.secondJump = false;
            this.LEFT = 0;
            this.RIGHT = 1;
            this.currentSpeed = 0;

    this.game.physics.arcade.enable(this.game.world, true);

    this.game.renderer.renderSession.roundPixels = true;
    this.game.camera.roundPx=true 

//                                     oooo        .o8  
//                                     `888       "888  
// oooo oooo    ooo  .ooooo.  oooo d8b  888   .oooo888  
//  `88. `88.  .8'  d88' `88b `888""8P  888  d88' `888  
//   `88..]88..8'   888   888  888      888  888   888  
//    `888'`888'    888   888  888      888  888   888  
//     `8'  `8'     `Y8bod8P' d888b    o888o `Y8bod88P" 

    this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.game.physics.arcade.checkCollision.up = false;

    // BACKGROUND
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height/1.251, 'backgroundscene');
    // this.background.fixedToCamera = true;
    this.background.autoScroll(-40, 0);

    // this.game.stage.backgroundColor = "#eeeeee";

    // BORDER OUTLINE
    // this.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    // this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    // this.graphics.lineStyle(4, 0xb30000, 1);
    // this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);

//                                                             .o8  
//                                                            "888  
//  .oooooooo oooo d8b  .ooooo.  oooo  oooo  ooo. .oo.    .oooo888  
// 888' `88b  `888""8P d88' `88b `888  `888  `888P"Y88b  d88' `888  
// 888   888   888     888   888  888   888   888   888  888   888  
// `88bod8P'   888     888   888  888   888   888   888  888   888  
// `8oooooo.  d888b    `Y8bod8P'  `V88V"V8P' o888o o888o `Y8bod88P" 
// d"     YD                                                        
// "Y88888P'                                                        
                                                                 
    var groundCache = this.game.cache.getFrame('ground');
    console.log("GROUNDCACHE"+groundCache)
    console.log("GROUNDCACHE HEIGHT: "+groundCache.height)

    this.ground = this.game.add.tileSprite(0, this.game.height / 1.2, this.game.width, groundCache.height, 'ground');
    this.ground.anchor.y = 1;
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.moves = false;
    this.ground.autoScroll(-200, 0);

                                                        
//  .oooooooo oooo d8b  .ooooo.  oooo  oooo  oo.ooooo.   .oooo.o 
// 888' `88b  `888""8P d88' `88b `888  `888   888' `88b d88(  "8 
// 888   888   888     888   888  888   888   888   888 `"Y88b.  
// `88bod8P'   888     888   888  888   888   888   888 o.  )88b 
// `8oooooo.  d888b    `Y8bod8P'  `V88V"V8P'  888bod8P' 8""888P' 
// d"     YD                                  888                
// "Y88888P'                                 o888o               

    this.tubes = this.game.add.group();
    this.tubes.enableBody = true;
    this.tubes.createMultiple(24, 'greytube');

    this.newtubes = this.game.time.events.loop(1000, this.newTube, this);
    this.newtubes.timer.stop(false);

    // this.sensors = this.game.add.group();
    // this.sensors.enableBody = true;

//                               o8o      .             
//                               `"'    .o8             
//  .oooo.o oo.ooooo.  oooo d8b oooo  .o888oo  .ooooo.  
// d88(  "8  888' `88b `888""8P `888    888   d88' `88b 
// `"Y88b.   888   888  888      888    888   888ooo888 
// o.  )88b  888   888  888      888    888 . 888    .o 
// 8""888P'  888bod8P' d888b    o888o   "888" `Y8bod8P' 
//           888                                        
//          o888o                                       
                                                     
    this.player = this.game.add.sprite(this.game.world.centerX / 4, 0, 'blackball');
    this.player.anchor.set(0.5, 0.5);
    this.player.scale.setTo(this.game.scaleRatio, this.game.scaleRatio);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.player);

    this.player.tint = 0x000000;

    this.player.body.collideWorldBounds = true;
    this.player.body.enable = true;
    this.player.enableBody = true;
    this.player.checkWorldBounds = true;
    // this.player.body.gravity.y = 4800;


//   .oooooo.                                    .o8   o8o            
//  d'     `b                                   "888   `"'            
// d' .d"bd  8 ooo. .oo.  .oo.    .ooooo.   .oooo888  oooo   .oooo.   
// 8  8. 8  .d `888P"Y88bP"Y88b  d88' `88b d88' `888  `888  `P  )88b  
// Y.  YoP"b'   888   888   888  888ooo888 888   888   888   .oP"888  
//  8.      .8  888   888   888  888    .o 888   888   888  d8(  888  
//   YooooooP  o888o o888o o888o `Y8bod8P' `Y8bod88P" o888o `Y888""8o                                                                                                                       
//                                            o8o                     
//                                            `"'                     
//  .ooooo oo oooo  oooo   .ooooo.  oooo d8b oooo   .ooooo.   .oooo.o 
// d88' `888  `888  `888  d88' `88b `888""8P `888  d88' `88b d88(  "8 
// 888   888   888   888  888ooo888  888      888  888ooo888 `"Y88b.  
// 888   888   888   888  888    .o  888      888  888    .o o.  )88b 
// `V8bod888   `V88V"V8P' `Y8bod8P' d888b    o888o `Y8bod8P' 8""888P' 
//       888.                                                         
//       8P'                                                          
//       "                                                            

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

//                                                    oooo            
//                                                    `888            
//  .ooooo.   .ooooo.  ooo. .oo.    .oooo.o  .ooooo.   888   .ooooo.  
// d88' `"Y8 d88' `88b `888P"Y88b  d88(  "8 d88' `88b  888  d88' `88b 
// 888       888   888  888   888  `"Y88b.  888   888  888  888ooo888 
// 888   .o8 888   888  888   888  o.  )88b 888   888  888  888    .o 
// `Y8bod8P' `Y8bod8P' o888o o888o 8""888P' `Y8bod8P' o888o `Y8bod8P' 
                            
//     oooo                                                           
//     `888                                                           
//      888   .ooooo.   .oooooooo                                     
//      888  d88' `88b 888' `88b                                      
//      888  888   888 888   888                                      
// .o.  888  888   888 `88bod8P'                                      
// Y8P o888o `Y8bod8P' `8oooooo.                                      
//                     d"     YD                                      
//                     "Y88888P'                                      
                                                                  
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

//  o8o                                         .   
//  `"'                                       .o8   
// oooo  ooo. .oo.   oo.ooooo.  oooo  oooo  .o888oo 
// `888  `888P"Y88b   888' `88b `888  `888    888   
//  888   888   888   888   888  888   888    888   
//  888   888   888   888   888  888   888    888 . 
// o888o o888o o888o  888bod8P'  `V88V"V8P'   "888" 
//                    888                           
//                   o888o                          
                                                
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.onTap.add(this.jump, this);                                           

    this.START = false;

    this.newtubes.timer.start();

}, // END CREATE
// ====================================================

//                                            .                .o8                 
//                                          .o8               "888                 
// ooo. .oo.    .ooooo.  oooo oooo    ooo .o888oo oooo  oooo   888oooo.   .ooooo.  
// `888P"Y88b  d88' `88b  `88. `88.  .8'    888   `888  `888   d88' `88b d88' `88b 
//  888   888  888ooo888   `88..]88..8'     888    888   888   888   888 888ooo888 
//  888   888  888    .o    `888'`888'      888 .  888   888   888   888 888    .o 
// o888o o888o `Y8bod8P'     `8'  `8'       "888"  `V88V"V8P'  `Y8bod8P' `Y8bod8P' 
                                                                                
                                                                                
                                                                               
            newTube: function(){
                
                var randomPosition = this.game.rnd.integerInRange(120, this.game.height - this.ground.height - 100);
                
                var tube = this.game.cache.getFrame('greytube');
                
                // var tube1 = this.tubes.getFirstDead();
                // tube1.reset(this.game.width + tube.width/2, randomPosition - 100);
                // tube1.anchor.setTo(0.5, 1);
                // tube1.scale.set(1.4);
                // tube1.body.velocity.x = -200;
                // tube1.body.immovable = true;
                // tube1.checkWorldBounds = true;
                // tube1.outOfBoundsKill = true;
                
                var tube2 = this.tubes.getFirstDead();

                tube2.reset(this.game.width + tube.width/2, randomPosition + 100 + tube.height/2);

                
                tube2.anchor.setTo(0.5, 0.5);
                tube2.scale.setTo(this.game.scaleRatio * 2, this.game.scaleRatio * 2);
                tube2.body.velocity.x = -200;
                tube2.body.immovable = true;
                tube2.checkWorldBounds = true;
                tube2.outOfBoundsKill = true;
                
                // var sensor = this.sensors.create(this.game.width + tube.width, 0);
                // sensor.body.setSize(40, this.game.height);
                // sensor.body.velocity.x = -180;
                // sensor.body.immovable = true;
                // sensor.alpha = 0;
            },

//  .o88o.  o8o                     
//  888 `"  `"'                     
// o888oo  oooo  oooo d8b  .ooooo.  
//  888    `888  `888""8P d88' `88b 
//  888     888   888     888ooo888 
//  888     888   888     888    .o 
// o888o   o888o d888b    `Y8bod8P' 
                                                                                    
    fire: function() {
        // this.ball = this.balls.getFirstExists(false);

        // if (this.ball){
        //     this.ball.frame = this.game.rnd.integerInRange(0,6);
        //     this.ball.exists = true;
        //     this.ball.reset(this.game.world.randomX * 1.9, 0);
        //     this.ball.body.bounce.y = 0.8;
        //     this.ball.body.gravity.y = 3800; 
        // }
    },

//                     .o88o. oooo                          .   
//                     888 `" `888                        .o8   
// oooo d8b  .ooooo.  o888oo   888   .ooooo.   .ooooo.  .o888oo 
// `888""8P d88' `88b  888     888  d88' `88b d88' `"Y8   888   
//  888     888ooo888  888     888  888ooo888 888         888   
//  888     888    .o  888     888  888    .o 888   .o8   888 . 
// d888b    `Y8bod8P' o888o   o888o `Y8bod8P' `Y8bod8P'   "888" 
                                                             
                                   
    reflect: function(a, ball) {

        // if (this.ball.y > (this.atari.y + 5)){
        //     return true;
        // }
        // else{
        //     this.ball.body.velocity.x = this.atari.body.velocity.x;
        //     this.ball.body.velocity.y *= -(this.ball.body.bounce.y);

        //     return false;
        // }
    },
                                                                                               
// ORIGINAL CODE
// ====================================================

//              .                          .   
//            .o8                        .o8   
//  .oooo.o .o888oo  .oooo.   oooo d8b .o888oo 
// d88(  "8   888   `P  )88b  `888""8P   888   
// `"Y88b.    888    .oP"888   888       888   
// o.  )88b   888 . d8(  888   888       888 . 
// 8""888P'   "888" `Y888""8o d888b      "888" 

            start: function(){

                // this.player.animations.play('dogrunright');
                // this.ground.autoScroll(-200, 0);
                
                // this.bird.body.setSize(this.bird.width - 10, this.bird.height - 10, 0, 0);
                // this.player.body.gravity.y = 6000;   
                
                // this.newtubes.timer.start();
                
                this.started = true;

            },

//     o8o                                          
//     `"'                                          
//    oooo oooo  oooo  ooo. .oo.  .oo.   oo.ooooo.  
//    `888 `888  `888  `888P"Y88bP"Y88b   888' `88b 
//     888  888   888   888   888   888   888   888 
//     888  888   888   888   888   888   888   888 
//     888  `V88V"V8P' o888o o888o o888o  888bod8P' 
//     888                                888       
// .o. 88P                               o888o      
// `Y888P                                           
            jump: function(){
                if(!this.dead) {
                    this.start();
                }
                
                if(!this.dead && this.canJump && this.firstPress && !this.player.body.touching.down) {
                    // this.player.animations.play('jump');
                    this.player.body.velocity.y = -1500;
                    this.playerInJump = true;
                    // this.wingAudio.play();
                }

                // else if(!this.dead && this.canJump && this.firstPress && !this.player.body.touching.down){
                // 	// this.input.pointer1.isDown
                //     this.player.body.velocity.y = -1500;
                //     this.playerInJump = true;
                // }

                // if(this.dead && this.canRestart) {
                //     this.game.state.start(this.game.state.current);
                // }
                //     this.firstPress = true;

            },
                              
// oooo d8b oooo  oooo  ooo. .oo.   
// `888""8P `888  `888  `888P"Y88b  
//  888      888   888   888   888  
//  888      888   888   888   888  
// d888b     `V88V"V8P' o888o o888o 
                                     
			run: function(){
			

			},

//                              .o8                .             
//                             "888              .o8             
// oooo  oooo  oo.ooooo.   .oooo888   .oooo.   .o888oo  .ooooo.  
// `888  `888   888' `88b d88' `888  `P  )88b    888   d88' `88b 
//  888   888   888   888 888   888   .oP"888    888   888ooo888 
//  888   888   888   888 888   888  d8(  888    888 . 888    .o 
//  `V88V"V8P'  888bod8P' `Y8bod88P" `Y888""8o   "888" `Y8bod8P' 
//              888                                              
//             o888o                                             
                                                              

        	update: function () {
                // this.ground.tilePosition.x +=250

            // this.player.angle += 4;
                
                this.game.physics.arcade.collide(this.player, this.ground, this.tube2, this.balls, null, this.reflect, this);
                		// this.game.forceSingleUpdate = true;

// PLAYER JUMP
            if(this.game.input.pointer1.isDown && this.player.body.touching.down){
                this.player.body.velocity.y = -1500;  
                }    

            else{   
                this.player.body.gravity.y = 4000;
                }

                // this.balls.forEachAlive(this.checkBounds, this);

        	}, // END UPDATE

//           oooo                            oooo                   
//           `888                            `888                   
//  .ooooo.   888 .oo.    .ooooo.   .ooooo.   888  oooo             
// d88' `"Y8  888P"Y88b  d88' `88b d88' `"Y8  888 .8P'              
// 888        888   888  888ooo888 888        888888.               
// 888   .o8  888   888  888    .o 888   .o8  888 `88b.             
// `Y8bod8P' o888o o888o `Y8bod8P' `Y8bod8P' o888o o888o            
     
//  .o8                                               .o8           
// "888                                              "888           
//  888oooo.   .ooooo.  oooo  oooo  ooo. .oo.    .oooo888   .oooo.o 
//  d88' `88b d88' `88b `888  `888  `888P"Y88b  d88' `888  d88(  "8 
//  888   888 888   888  888   888   888   888  888   888  `"Y88b.  
//  888   888 888   888  888   888   888   888  888   888  o.  )88b 
//  `Y8bod8P' `Y8bod8P'  `V88V"V8P' o888o o888o `Y8bod88P" 8""888P' 
                                                                                                                                                    
checkBounds: function (ball) {

    // if (this.ball.y > 150){
    //     this.ball.kill();
    //     this.ball.destroy();
    // }
},

//                                      .o8                     
//                                     "888                     
// oooo d8b  .ooooo.  ooo. .oo.    .oooo888   .ooooo.  oooo d8b 
// `888""8P d88' `88b `888P"Y88b  d88' `888  d88' `88b `888""8P 
//  888     888ooo888  888   888  888   888  888ooo888  888     
//  888     888    .o  888   888  888   888  888    .o  888     
// d888b    `Y8bod8P' o888o o888o `Y8bod88P" `Y8bod8P' d888b    
                                                             
                                                             
                                                             

            render: function() {

        //Pixel Art
        this.game.renderer.renderSession.roundPixels = false;
        this.game.time.desiredFps = 60;



            // DEADZONE - Rectangle that defines the limits at which the camera will scroll
                // this.zone = this.game.camera.deadzone;
                // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
                // this.game.context.fillRect(this.zone.x, this.zone.y, this.zone.width, this.zone.height);

            // DEBUG PLAYER
            // this.game.debug.text('Debugging', 10, 30, 'white', '20px "Sigmar One"');

            // this.game.debug.body(this.player);
            // this.game.debug.geom(new Phaser.Point(this.player.x, this.player.y), 'blue');
			
            // this.game.debug.spriteInfo(this.player, 32, 32);

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

            //  incrementScore: function(bird, sensor){
            //     sensor.kill();
            //     this.totalScore++;
            //     this.scoreText.setText(this.totalScore);
            //     this.pointAudio.play();
            // },


clearGameCache: function () {
    this.game.cache = new Phaser.Cache(game);
    this.game.load.reset();
    this.game.load.removeAll();
}



}; // END BasicGame.Game.prototype


















