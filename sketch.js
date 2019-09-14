/*
The Game Project - Final Submission
Created by Clayton Smith for UoL Introduction to Programming

I had a lot of fun on this project and as a learner I went in search for additional learning content - my search
included extending on the factory object ("this") and delving into some OOP and class creation, however the structure is
somewhat similar.

Sections completed:
1. Add advanced graphics
	I spent a very long time working on the graphics (in some cases half a day just to get one asset drawn correctly
	in game) - I enjoyed it, often finding myself in the creative "flow" unaware of time until the day was gone.
	I wanted to add more but alas I ran out of time.

	Difficulty - working with basic shapes and x,y coordinates is cumbersome and slow. Also layer limitations
	when drawing (this is not so much a limitation as you can keep adding "layers", however it becomes cumbersome).

	Lessons learnt - I created a way to store assets as x,y coordinates then rebuild them using a function. Essentially,
	I can have a data file with my assets, then call on the information to draw the shapes (this saved me a lot of file
	space).

2. Add sound
	Sourced sounds and music from artists - all attributed in attached License Info.txt file.

	Difficulty/ and lessons learnt/skills was trying to get sounds to play on start (chrome blocks this due to
	trying to stop ads from playing sound).  I learnt how to get around this by getting the user to interact with the
	canvas before starting the game (this is the actual reason for the yellow "start screen")

3. Create platforms
	I created 3 "types" of platform - only difference being visual all functioning the same (I used an "invisible"
	platform option to allow for a pseudo-rock collision detection allowing players to jump on rocks to get to new locations)

	Difficulty - getting the player to jump again once on a platform (this took a while to figure out and was one of
	the more difficult aspects)

	Learnt/skills - reusing my code to be applied for multiple uses with minor updates

4. Create enemies
	A fairly basic looking enemy which has an "argo" range if the player gets close and hovers above the ground
	bobbing along as it moves.

	Difficult pieces in this was the bobbing movement - getting it to move up and down at a reasonable speed (not too fast)

	I learnt that if I create code correctly I can reuse it for other purposes (I reused the collision detection for
	enemies and player canyons)
*/
p5.disableFriendlyErrors = true; // disables FES to improve performance

//Player and world variables
let player, world, scrollPos, game, badFont;
//Object variables
let collectables, mountains, canyons, sun, tents, clouds, trees,
	bushes, grass, dirt, flagpole, platforms, enemies, rocks;
let cText = [];
//Sound variables
let bgmusic, collect, jump, death;

function preload(){
	frameRate(50);  //Limit frame rate to improve performance
	bgmusic = loadSound('sound/bgmusic1.mp3');
	collect = loadSound('sound/collect.mp3');
	jump = loadSound('sound/jump.mp3');
	death = loadSound('sound/death.mp3');
	badFont = loadFont('BADABB.otf');
}

function setup(){
	textSize(20);
	textFont(badFont);
	createCanvas(1024, 576);
	//World
	world = {
		grnd: height * 0.75,
		wind: 0.075,
		sunRotation: 0.005,
		gravity: 0.5
	};
	game = {
		start: true,
		score: 0
	};
	//Player(x,y,velX,velY,pName,screenX,maxX,lives,width,height,onGround)
	player = new Player(200, world.grnd, 0, 0, "Tob");
	initialiseGame();
}

function draw(){
	if (game.start){
		//Show start screen
		startScreen();
	} else {
		//Render game world
		drawGame();
		// Draw overlay (Scoreboard,Text and selectors).
		drawScoreboard();
	}
}

// ---------------------
// Control functions Keyboard and Mouse
// ---------------------
function keyPressed() {
	switch (keyCode) {
		case 13:
			if(game.start){
				game.start = false;
				bgmusic.play(0,1,0.2,24);
			}
			break;
		case 32:
			if ((player.lives < 1) || (flagpole.isReached)) {
				player.lives = 3;
				player.movement = true;
				initialiseGame();
			} else if (player.onGround && player.movement) {
				player.jump();
			}
			break;
		case 37:
			if(player.movement){
				player.isLeft = true;
			}
			break;
		case 39:
			if(player.movement) {
				player.isRight = true;
			}
			break;
		case 38:
			if(player.movement) {
				player.swap();
			}
			break;

	}
}

function keyReleased(){
		switch (keyCode) {
			case 32:
				if (player.VelY < -1) {
					player.VelY = -1;
				}
				break;
			case 37:
				player.isLeft = false;
				break;
			case 39:
				player.isRight = false;
				break;
		}
}

function mouseClicked(){
	if((mouseX > 890) && (mouseX < width) && (mouseY > 0) && (mouseY < 60) && (!flagpole.isReached)){
		player.swap();
	}
}
