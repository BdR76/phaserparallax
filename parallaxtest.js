var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var starsGroup = [];
var starsCountdown = 0;

function preload() {
	game.load.image('staralpha', 'staralpha.png');
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = 0x000000;
	starsGroup = game.add.group();

}

function update() {
	backgroundObjsUpdate();
}

function render() {
	// debug info?
}

// -------------------------------------
// update background objects
// -------------------------------------
function backgroundObjsUpdate() {
	// update background objects
	for (var i = 0; i < starsGroup.length; i++)
	{
		if (starsGroup.children[i].alive == true) {
			// stars move faster in forground than in background layer
			starsGroup.children[i].y -= starsGroup.children[i].health * 2; // *2 = all stars move faster

			// remove stars when they reach top of screen
			if (starsGroup.children[i].y < -64) {
				starsGroup.children[i].kill();
			};
		};				
	};

	// add more stars?
	starsCountdown -= 1;
	if (starsCountdown <= 0) {
		// add random background object
		var x = game.rnd.integerInRange(0, SCREEN_WIDTH-32);
		// recycle old background objects
		var newobj = starsGroup.getFirstDead();

		// if there aren't any available, create a new one
		if (newobj === null) {
			newobj = starsGroup.create(x, SCREEN_HEIGHT, 'staralpha');
		} else {
			newobj.x = x;
			newobj.y = SCREEN_HEIGHT;
			newobj.revive();
		};
		
		var scale = game.rnd.realInRange(0.2, 1);
		newobj.scale.x = scale;
		newobj.scale.y = scale;
		newobj.health = scale; // for sorting
		
		starsGroup.sort('health', Phaser.Group.SORT_ASCENDING);
		
		// random countdown to new background object
		starsCountdown = game.rnd.integerInRange(4, 8);
	}
}
	