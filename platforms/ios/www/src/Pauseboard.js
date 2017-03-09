'use strict';
var Pauseboard = function(game) {
	Phaser.Group.call(this, game);
    var gameover, self = this;

// PAGE SIZE 
    this.refWidth = 426;
	this.refHeight = 639;
	
    this.baseX = (this.game.width - this.refWidth) / 2;
	this.paddingCol1 = 20;
	this.paddingCol2 = 110;

	this.col1X = this.game.width / 2 - this.refWidth / 4;
	this.col2X = this.game.width / 2 + this.refWidth / 4;

    /*gameover = this.create(this.game.width / 2, 100, 'gameover');
    gameover.anchor.setTo(0.5, 0.5);*/

// SCOREBOARD 
    this.scoreboard = this.create(this.game.width / 2, this.refHeight / 2, 'board');
    this.scoreboard.anchor.setTo(0.5, 0.5);

// SCORETEXT
    this.scoreText = this.game.add.bitmapText(this.scoreboard.width, this.col1X, 'gameFont', '', 18);
    this.add(this.scoreText);

    this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, this.col2X, 'gameFont', '', 18);
    this.add(this.bestScoreText);

// SOUND BUTTON ON
    // add our start button with a callback
	this.soundButtonOn = this.game.add.button(this.game.width / 2, this.refHeight/ 2 - 130, 'soundOn', function() { self.switchSound(); });
    this.soundButtonOn.anchor.setTo(0.5,0.5);
// SOUND BUTTON OFF
    this.soundButtonOff = this.game.add.button(this.game.width / 2, this.refHeight/ 2 - 130, 'soundOff', function() { self.switchSound(); });
    this.soundButtonOff.anchor.setTo(0.5,0.5);
    this.soundButtonOn.visible = !this.game.soundMute;
    this.soundButtonOff.visible = this.game.soundMute;

    this.add(this.soundButtonOn);
    this.add(this.soundButtonOff);

// RESUME BUTTON
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width / 2, this.refHeight/ 2 - 30, 'play2', this.startClick, this);  
    this.startButton.anchor.setTo(0.5, 0.5);

    this.add(this.startButton);

// RESTART BUTTON
    // add our start button with a callback
    this.restartButton = this.game.add.button(this.game.width / 2, this.refHeight/ 2 + 70, 'restart', this.restartClick, this);
    this.restartButton.anchor.setTo(0.5,0.5);

    this.add(this.restartButton);

// HOME BUTTON
    // add our start button with a callback
    this.homeButton = this.game.add.button(this.game.width / 2, this.refHeight / 2 + 170, 'home', this.homeClick, this);
    this.homeButton.anchor.setTo(0.5,0.5);

    this.add(this.homeButton);


	/*this.ga = this.game.add.button(this.game.width/2, 360, 'ga', this.gotoGA, this);
	this.ga.anchor.setTo(0.5, 0);

	this.add(this.ga);
	 */
    this.y = this.game.height;
    this.x = 0;
};

Pauseboard.prototype = Object.create(Phaser.Group.prototype);
Pauseboard.prototype.constructor = Scoreboard;

Pauseboard.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Pauseboard.prototype.show = function() {
    this.game.add.tween(this).to({y: this.game.height / 2 - this.refHeight / 2 - this.game.paddingBot}, 1000, Phaser.Easing.Bounce.Out, true);
};

// SOUND ON/FF
Pauseboard.prototype.switchSound = function() {
    this.game.soundMute = !this.game.soundMute;
    this.soundButtonOn.visible = !this.game.soundMute; 
    this.soundButtonOff.visible = this.game.soundMute; 

    if(this.soundButtonOff.visible){
        this.game.music.pause();
    }
    else{this.game.music.resume();}

};

// PLAY
Pauseboard.prototype.startClick = function() {
    this.y = this.game.height;

        if (!this.game.soundMute) {
        this.game.menuSelect.play();
    }
};

// RESTART
Pauseboard.prototype.restartClick = function() {
    if (!this.game.soundMute) {
        this.game.menuSelect.play();
    }
    this.game.state.start('Game');
};

Pauseboard.prototype.homeClick = function() {
    if (!this.game.soundMute) {
        this.game.menuSelect.play();
    }
    this.game.state.start('MainMenu');
};