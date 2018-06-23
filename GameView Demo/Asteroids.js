 
 /*
 Todo
 - Add touch control (buttons)
 - Test on tablet (+do settimeouts)
 - Make ship spin into view at start
 - Support keys on android.
 */

//Handle game loading.
function OnLoad()
{
    //Enable physics and enclose scene with walls.
	//Note: we set zero gravity her cos we are in space!
    gfx.AddPhysics( 0 )
    gfx.Enclose( -1, "left,top,right,bottom", 0.1,0.1,0.1, 0.05 )
    
	//Create background.
	space = gfx.CreateBackground( "Img/nebulus_1.png" )
	
    //Create sprites.
	ship = gfx.CreateSprite( "Img/ship_1_red_3128x179x17", "ships" )
    missile = gfx.CreateSprite( "Img/missle_1_flame_792x132x18", "missiles" )
	//rock = gfx.CreateSprite( "Img/meteor_2_7344x219x27", "rocks" ) 
	rock = gfx.CreateSprite( "Img/meteor_2_816x1971x3x9", "rocks" )
	explode4 = gfx.CreateSprite( "Img/explosion_4.json" )
	explode8 = gfx.CreateSprite( "Img/explosion_8.json" )
	gameover = gfx.CreateSprite( "Img/game_over.png" )
	
	//Create sounds.
    soundExp1 = gfx.CreateSound( "Snd/explosion_1.mp3" )
	soundExp2 = gfx.CreateSound( "Snd/explosion_2.mp3" )
	soundFire = gfx.CreateSound( "Snd/missile_1.mp3" )
	
	//Handle touch events.
	//gfx.SetOnTouchDown( OnTouchDown )
	//gfx.SetOnTouchUp( OnTouchUp )
	
	//Handle keyboard events.
	//gfx.SetOnKeyDown( OnKeyDown )
	//gfx.SetOnKeyUp( OnKeyUp )
	
	//Detect collisions.
    gfx.SetOnCollide( OnCollide )
}

//Called when game has loaded.
function OnReady()
{
    //Set background.
	gfx.AddBackground( space )
    
	//Add game objects to screen.
	AddShip()
	AddExplosion()
	AddButtons()

	//Add rocks every so often
	setInterval( AddRock, 2000 + 2000*Math.random() )
	
	//Start animating
    gfx.Animate( OnAnimate )
}

//Update game objects.
function OnAnimate( t, dt ) 
{	
	//console.log( gfx.keyDown )
	
	//Make background drift slowly
	space.Scroll( 0, 0.5 )
	
	//Make rock explosions drift and fade
	if( explode8.x > 0 ) { 
		explode8.y += 0.001
		explode8.alpha -= 0.004
	}
	
	//Handle keyboard input
	HandleControls()
	
	//Limit range of missiles
	if( missile.x < -0.01 || missile.x > 1.01 || missile.y < 0.01 || missile.y > 1.01 )
		gfx.RemoveSprite( missile )
}

//Add a new ship to screen.
function AddShip()
{
    //Add ship image to center of screen and show frame 8.
    gfx.AddSprite( ship, 0.45, 0.5, 0.1 )
	ship.Goto( 8 )
	
	//Set physics properties for ship.
	//group, type, density, bounce, friction, linearDamp, angularDamp
	ship.SetPhysics( -2, "dynamic", 0.9, 0.9, 0.3, 0.3, 0.3 ) 
	ship.SetShape( "rect", 0.7, 0.7 )	
    //ship.SetVelocity( 0.02, 0, 0.3 )
}

//Add rock image to screen, with physics and animation.
function AddRock()
{
	//Add a new rock image to screen at random x location.
	rock = gfx.CreateSprite( "Img/meteor_2_816x1971x3x9", "rocks" )
	var size = 0.1+0.1*Math.random()
    gfx.AddSprite( rock, Math.random()*0.7, -0.3, size )
	
	//Set physics properties for rock.
	rock.SetPhysics( -1, "dynamic", 0.9, 0.9, 0.9 )
	rock.SetShape( "round", 0.5 )	
	rock.SetVelocity( -0.1+0.2*Math.random(), 0.02/size, -0.05+0.1*Math.random()/size )
	rock.Play( 0, 0.3 )
}

//Add explosion sprites off-screen (prevents slight delay on first use)
function AddExplosion()
{
	gfx.AddSprite( explode4, -1,0, 0.7 )
	gfx.AddSprite( explode8, -1,0, 0.5 )
}

//Add control buttons for mobile.
function AddButtons()
{
	//Left stick
	var stickSize = 0.08
	leftStick = gfx.CreateCircle( stickSize, 0xeeeeee )
	gfx.AddGraphic( leftStick, 0.005, 1-leftStick.height*2 )
	leftStick.alpha = 0.1
	
	//Right stick
	rightStick = gfx.CreateCircle( stickSize, 0xeeeeee )
	gfx.AddGraphic( rightStick, leftStick.width*1.5, 1-rightStick.height*2 )
	rightStick.alpha = 0.1
	
	//Forward stick
	fwdStick = gfx.CreateCircle( stickSize, 0xeeeeee )
	gfx.AddGraphic( fwdStick, leftStick.width*0.75, 1-fwdStick.height*3+0.02 )
	fwdStick.alpha = 0.1
	
	//Reverse stick
	revStick = gfx.CreateCircle( stickSize, 0xeeeeee )
	gfx.AddGraphic( revStick, leftStick.width*0.75, 1-revStick.height-0.02 )
	revStick.alpha = 0.1
	
	//Fire button
	fireBtn = gfx.CreateCircle( stickSize*1.25, 0xeeeeee )
	gfx.AddGraphic( fireBtn, 1-fireBtn.width-0.01, 1-fireBtn.height*1.5 )
	fireBtn.alpha = 0.1
}

//Handle key presses and screen touches.
function HandleControls()
{
	//Get touch location (will be null if keyboard used)
	var tx = gfx.touchX
	var ty = gfx.touchY
	
	//Check for arrow keys or joystick touches
	if( gfx.keyDown=="ArrowLeft" || leftStick.Contains(tx,ty) ) 
	{ 
		ship.AddVelocity( 0, 0, -0.01 )
		ship.PlayRange(8,10,0.5)
	}		
	else if( gfx.keyDown=="ArrowRight" || rightStick.Contains(tx,ty) ) 
	{ 
		ship.AddVelocity( 0, 0, 0.01 )
		ship.PlayRange(6,8,-0.5) 
	}
	else if( gfx.keyDown=="ArrowUp" || fwdStick.Contains(tx,ty) ) 
		ship.AddVelocity( 0, -0.01, 0, true )	
		
	else if( gfx.keyDown=="ArrowDown" || revStick.Contains(tx,ty) ) 
		ship.AddVelocity( 0, 0.01, 0, true )	
	
	//Check for fire key (space bar)
	else if( gfx.keyDown==" " || fireBtn.Contains(tx,ty) ) 
		FireMissile()
	
	//Else straighten up ship
	else ship.PlayTo( 8 )
}

//Fire a missile from ship
function FireMissile()
{
	//Check if a missile is already in flight.
	if( missile.GetVelocity() > 0 ) return
	
	//Show missile.
	var x = ship.x + ship.width/2 - missile.width/2
	var y = ship.y + ship.height/2 - missile.height/2
	gfx.AddSprite( missile, x, y, 0.02, 0.07, ship.angle )
	
	//Set missile physics (Note: we use negative group 
	//nums to prevent interaction between ship and missile).
	missile.SetPhysics( -2, "dynamic", 0.001 ) 
	
	//Start missile animation and set its speed.
	missile.Play( 0, 0.1, true )
	missile.SetVelocity( 0,-0.4, 0, true )
	
	//Play firing sound.
	soundFire.Play()
}

//Handle sprite collisions.
function OnCollide( a, b )
{
    //console.log( "a:" + a.x + " b:"+b.x )
	
	//Handle missile and rock collision
    if( a.group=="missiles" && b.group=="rocks" ) 
	{
		//Remove missile and rock.
		gfx.RemoveSprite( a )
		gfx.RemoveSprite( b )
		
		//Show rock explosion.
		var x = b.x + b.width/2 - explode8.width/2
		var y = b.y + b.height/2 - explode8.height/2
		gfx.AddSprite( explode8, x, y )
		explode8.alpha = 1
		explode8.Play( 0, 1, false )
		soundExp1.Play()
		
		//Add another rock after 2 seconds.
		setTimeout( AddRock, 2000 )
	}
	//Handle ship and rock collision
	else if( a.group=="rocks" && b.group=="ships" )
	{
		//Remove ship
		gfx.RemoveSprite( b )
		
		//Show ship explosion.
		var x = a.x + a.width/2 - explode4.width/2
		var y = a.y + a.height/2 - explode4.height/2
		gfx.AddSprite( explode4, x, y )
		explode4.Play( 0, 1, false )
		soundExp2.Play()
		
		//Vibrate device
		gfx.Vibrate( "0,100,30,100,50,300" );
		
		//Finish game (after 1 second delay)
		setTimeout( GameOver, 1000 )
	}
}

//Show game over text and stop game.
function GameOver()
{
	//Add game over sprite
	gfx.AddSprite( gameover, 0.3, 0.45, 0.4, 0.1 )
	
	//Cause sprite to fade in and then throb
	gameover.alpha = 0
	var throb = function() { gameover.Tween( {alpha:0.5}, 600, null, 99, true ) }
    gameover.SetTween( {alpha:1}, 1000, null, 0, false, throb )
	gameover.PlayTween()
}


