BasicGame.Game = function (game) {
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
            this.game.screenWidth = this.game.width / window.devicePixelRatio;
            this.game.screenHeight = this.game.height / window.devicePixelRatio;

    this.game.physics.arcade.enable(this.game.world, true);

//                                     oooo        .o8  
//                                     `888       "888  
// oooo oooo    ooo  .ooooo.  oooo d8b  888   .oooo888  
//  `88. `88.  .8'  d88' `88b `888""8P  888  d88' `888  
//   `88..]88..8'   888   888  888      888  888   888  
//    `888'`888'    888   888  888      888  888   888  
//     `8'  `8'     `Y8bod8P' d888b    o888o `Y8bod88P" 

    console.log(" ")
    console.log("this.game.width: "+this.game.width+"px")
    console.log("this.game.height: "+this.game.height+"px")
    console.log(" ")
    console.log("window.devicePixelRatio = "+window.devicePixelRatio+": / 3")
    console.log("this.game.scaleRatio: "+this.game.scaleRatio)
    console.log(" ")
    console.log("this.game.world.setBounds WIDTH: "+this.game.width / window.devicePixelRatio)
    console.log("this.game.world.setBounds HEIGHT: "+this.game.height / window.devicePixelRatio)
    console.log(" ")
    console.log("this.game.screenWidth: "+this.game.screenWidth)
    console.log("this.game.screenHeight: "+this.game.screenHeight)


    // this.game.world.setBounds(0, 0, this.game.screenWidth, this.game.screenHeight);
    this.game.world.setBounds(0, 0, this.game.width * 4, this.game.height * 2);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.game.physics.arcade.checkCollision.up = false;

    // BACKGROUND
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width * 4, this.game.world.height , 'backgroundscene');
    // this.background.autoScroll(-30, 0);

   // BORDER OUTLINE
    this.bounds = new Phaser.Rectangle(0, 0, this.game.world.width, this.game.world.height);
    this.graphics = this.game.add.graphics(this.bounds.x, this.bounds.y);
    this.graphics.lineStyle(8, 0x000000, 1);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);

    var groundCache = this.game.cache.getFrame('ground');
    console.log(" ");
    console.log("groundCache.height: "+groundCache.height)

//                               o8o      .             
//                               `"'    .o8             
//  .oooo.o oo.ooooo.  oooo d8b oooo  .o888oo  .ooooo.  
// d88(  "8  888' `88b `888""8P `888    888   d88' `88b 
// `"Y88b.   888   888  888      888    888   888ooo888 
// o.  )88b  888   888  888      888    888 . 888    .o 
// 8""888P'  888bod8P' d888b    o888o   "888" `Y8bod8P' 
//           888                                        
//          o888o                                       
                                                     
    this.player = this.game.add.sprite(this.game.world.centerX, 0, 'blackball');
    this.player.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.player);
    // this.player.tint = 0xeeeeee;
    this.player.body.collideWorldBounds = true;
    this.player.body.enable = true;
    this.player.enableBody = true;
    this.player.checkWorldBounds = true;
    // this.player.body.gravity.y = 4800;   

    this.game.camera.follow(this.player);

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

// PORTRAIT MODE
    // iPad Pro
    // if(this.game.screenHeight <= 1366 && this.game.screenHeight > 1024){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // iPad + iPad Mini
    // else if(this.game.screenHeight <= 1024 && this.game.screenHeight > 736){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // iPhone 6 Plus
    // else if(this.game.screenHeight <= 736 && this.game.screenHeight > 732){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // Nexus 6P + Nexus 5X
    // else if(this.game.screenHeight <= 732 && this.game.screenHeight > 667){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // iPhone 6 
    // else if(this.game.screenHeight <= 667 && this.game.screenHeight > 640){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // Galaxy S5
    // else if(this.game.screenHeight <= 640 && this.game.screenHeight > 568){
        
    //     this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.ground2 = this.game.add.tileSprite(0, this.game.screenHeight / 4, this.game.screenWidth, groundCache.height /2, 'ground');

    //     this.player.scale.setTo(this.game.scaleRatio / 2, this.game.scaleRatio / 2);
    // }

    // // iPhone 5 
    // else if(this.game.screenHeight <= 568){
        
        // this.ground = this.game.add.tileSprite(0, this.game.screenHeight / 1.2, this.game.width, groundCache.height /2, 'ground');

        this.ground2 = this.game.add.tileSprite(0, this.game.world.height, this.game.width * 4, groundCache.height /2, 'ground');

        this.player.scale.setTo(this.game.scaleRatio / 4, this.game.scaleRatio / 4);
    // }

// LANDSCAPE MODE
    // // iPad Pro
    // if(this.game.screenHeight <= 1024 && this.game.screenHeight > 768){}
    // // iPad + iPad Mini
    // else if(this.game.screenHeight <= 768 && this.game.screenHeight > 414){}   
    // // iPhone 6 Plus
    // else if(this.game.screenHeight <= 414 && this.game.screenHeight > 412){}
    // // Nexus 6P + Nexus 5X
    // else if(this.game.screenHeight <= 412 && this.game.screenHeight > 375){}
    // // iPhone 6 
    // else if(this.game.screenHeight <= 375 && this.game.screenHeight > 360){}
    // // Galaxy S5
    // else if(this.game.screenHeight <= 360 && this.game.screenHeight > 320){}
    // // iPhone 5 
    // else if(this.game.screenHeight <= 320){}

//                                                             .o8  
//                                                            "888  
//  .oooooooo oooo d8b  .ooooo.  oooo  oooo  ooo. .oo.    .oooo888  
// 888' `88b  `888""8P d88' `88b `888  `888  `888P"Y88b  d88' `888  
// 888   888   888     888   888  888   888   888   888  888   888  
// `88bod8P'   888     888   888  888   888   888   888  888   888  
// `8oooooo.  d888b    `Y8bod8P'  `V88V"V8P' o888o o888o `Y8bod88P" 
// d"     YD                                                        
// "Y88888P'                                                        
                                                                 
    // this.ground.anchor.y = 1;
    // this.game.physics.arcade.enable(this.ground);
    // this.ground.body.immovable = true;
    // this.ground.body.moves = false;
    // this.ground.autoScroll(-200, 0);

    this.ground2.anchor.y = 1;
    this.game.physics.arcade.enable(this.ground2);
    this.ground2.body.immovable = true;
    this.ground2.body.moves = false;
    // this.ground2.autoScroll(-200, 0);
                                                        
//  .oooooooo oooo d8b  .ooooo.  oooo  oooo  oo.ooooo.   .oooo.o 
// 888' `88b  `888""8P d88' `88b `888  `888   888' `88b d88(  "8 
// 888   888   888     888   888  888   888   888   888 `"Y88b.  
// `88bod8P'   888     888   888  888   888   888   888 o.  )88b 
// `8oooooo.  d888b    `Y8bod8P'  `V88V"V8P'  888bod8P' 8""888P' 
// d"     YD                                  888                
// "Y88888P'                                 o888o               

    // this.tubes = this.game.add.group();
    // this.tubes.enableBody = true;
    // this.tubes.createMultiple(24, 'greytube');
    // this.newtubes = this.game.time.events.loop(1000, this.newTube, this);
    // this.newtubes.timer.stop(false);               

    // this.newtubes.timer.start();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.onTap.add(this.jump, this);                                           
    // this.START = false;


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
                
                // var randomPosition = this.game.rnd.integerInRange(120, this.game.height - this.ground.height - 100);
                
                // var tube = this.game.cache.getFrame('greytube');
                
                // var tube1 = this.tubes.getFirstDead();
                // tube1.reset(this.game.width + tube.width/2, randomPosition - 100);
                // tube1.anchor.setTo(0.5, 1);
                // tube1.scale.set(1.4);
                // tube1.body.velocity.x = -200;
                // tube1.body.immovable = true;
                // tube1.checkWorldBounds = true;
                // tube1.outOfBoundsKill = true;
                
                // var tube2 = this.tubes.getFirstDead();

                // tube2.reset(this.game.width + tube.width/2, randomPosition + 100 + tube.height/2);

                
                // tube2.anchor.setTo(0.5, 0.5);
                // tube2.scale.setTo(this.game.scaleRatio * 2, this.game.scaleRatio * 2);
                // tube2.body.velocity.x = -200;
                // tube2.body.immovable = true;
                // tube2.checkWorldBounds = true;
                // tube2.outOfBoundsKill = true;
                
                // var sensor = this.sensors.create(this.game.width + tube.width, 0);
                // sensor.body.setSize(40, this.game.height);
                // sensor.body.velocity.x = -180;
                // sensor.body.immovable = true;
                // sensor.alpha = 0;
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
        // ROTATE PLAYER
          // this.player.angle += 4;          
            this.game.physics.arcade.collide(this.player, this.ground2, this.tube2, this.balls, null, this.reflect, this);
// PLAYER JUMP
            if(this.game.input.pointer1.isDown && this.player.body.touching.down){
                this.player.body.velocity.y = -1000;  
                }
            else if(!this.player.body.touching.down && !this.game.input.pointer1.isDown){
                this.game.input.onTap.add(this.jump, this);     
            }  
            else{this.player.body.gravity.y = 4000;}

            if(this.cursors.left.isDown){this.player.body.velocity.x = -1000;}
            else if(this.cursors.right.isDown){this.player.body.velocity.x = 1000;}
            else if(this.cursors.up.isDown){this.player.body.velocity.y = -1000;}
            else{this.player.body.gravity.y = 4000; this.player.body.velocity.x = 0;}

}, // END UPDATE

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

            },


}; // END BasicGame.Game.prototype


















