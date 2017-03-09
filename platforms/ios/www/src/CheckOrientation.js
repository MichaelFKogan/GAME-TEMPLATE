
BasicGame.CheckOrientation = function (game) {

};

BasicGame.CheckOrientation.prototype = {

	create: function () {
	},

	update: function () {
        if (BasicGame.orientated) {
        	
// START PRELOADER
            this.state.start('Preloader');
        }
	}

};
