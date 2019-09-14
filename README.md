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

License Details:

Sound:

"bgmusic1.mp3"
	Artist: Jeremy L "Jer" (https://soundcloud.com/izmejeremy/)
	From: https://www.youtube.com/watch?v=Ahfu1E_BBSI
	License: CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
	Derivative: converted(mp3) and downsampled(64k)

"collect.mp3"
	Artist: wobbleboxx (https://www.wobbleboxx.com)
	From: https://opengameart.org/content/level-up-power-up-coin-get-13-sounds
	License: Public Domain CC0 (https://creativecommons.org/publicdomain/zero/1.0/)
	Derivative: Rise06.aif, renamed, converted(mp3) and downsampled(64k)

"jump.mp3"
	Artist: phoenix1291 (SwissArcadeGameEntertainment)
	From: "Mario Jumping Sound" https://opengameart.org/content/sound-effects-mini-pack15
	License: Public Domain CC0 (https://creativecommons.org/publicdomain/zero/1.0/)

"death.mp3"
	Artist: "Alexander"
	From: "Roblox death sound. roblox oof." http://www.orangefreesounds.com/roblox-death-sound/
	License: CC BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

Objects:

"tent"
	Artist: Videoplasty.com (https://www.videoplasty.com)
	From: "Tent Flat Icon Vector.svg" from https://commons.wikimedia.org/wiki/File:Tent_Flat_Icon_Vector.svg##
	License: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
	Derivative: Coordinate and colour details extracted from svg shapes and converted to javascript p5.js shapes



