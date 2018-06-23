 
//Handle game loading.
function OnLoad()
{
    //Enable physics and enclose scene with walls.
    gfx.AddPhysics( )
    
    //Create sprites.
    sky = gfx.CreateSprite( "/Sys/Img/Sky.jpg" )
    duck = gfx.CreateSprite( "Img/angry_duck_960x687x3x3", "birds" )
	gun = gfx.CreateSprite( "Img/cannon.png" )
	
	//Create graphical objects.
	floor = gfx.CreateRectangle( 1.5, 0.1, 0x338833, null,null,null, "ground" )
	pillar1 = gfx.CreateRectangle( 0.04, 0.4, 0xC77300, 4,0x000000,null, "object" )
	pillar2 = gfx.CreateRectangle( 0.04, 0.4, 0xC77300, 4,0x000000,null, "object" )
	plinth = gfx.CreateRectangle( 0.24, 0.06, 0xC77300, 4,0x000000,null, "object" )
    
    //Create sounds.
	birds = gfx.CreateSound( "Snd/birds.mp3" )
    bang = gfx.CreateSound( "Snd/flump.mp3" )
	crash = gfx.CreateSound( "Snd/crash.mp3" )
	quack = gfx.CreateSound( "/Sys/Snd/Squeak.mp3" )
   
   	//Detect collisions.
    gfx.SetOnCollide( OnCollide )
}

//Called when game has loaded.
function OnReady()
{
    //Add sky image.
    gfx.AddSprite( sky, 0,0, 1,1 )
    
    //Add floor.
    gfx.AddGraphic( floor, 0, 0.9 )
	floor.SetPhysics( 2, "fixed", 0.9, 0.7, 0.1 );
    
    //Add cannon image.
	gfx.AddSprite( gun, 0.05,0.66, 0.16 )
	
    //Add duck image (with physics)
	//group, type, density, bounce, friction, linearDamp, angularDamp
    //gfx.AddSprite( duck, 0.06,0.84, 0.07, null, -0.1 )
    gfx.AddSprite( duck, gun.x-0.01, floor.y-duck.height, 0.07, null, -0.1 )
	duck.SetPhysics( 1, "dynamic", 0.4, 0.1, 0.3 )
	gfx.SwapOrder( duck, gun )
	//duck.SetShape( "round" )
	duck.visible = false
	
	//Add target objects.
	gfx.AddGraphic( pillar1, 0.6, 1-pillar1.height-floor.height-0.05 )
	pillar1.SetPhysics( 2, "dynamic", 0.6, 0.3, 0.5 );
	gfx.AddGraphic( pillar2, 0.8, 1-pillar2.height-floor.height-0.05 )
	pillar2.SetPhysics( 2, "dynamic", 0.6, 0.3, 0.5 );
	gfx.AddGraphic( plinth, 0.6, 0.4 )
	plinth.SetPhysics( 2, "dynamic", 0.6, 0.3, 0.1 );
	
    //Start animating
    gfx.Animate( OnAnimate )
	setTimeout( OnAnimate, 20000 )
	
	//Start background sound.
	birds.Play( /*true*/ )
	
	//Shoot bird after 2 seconds
	setTimeout( fire, 2000 )
}

//Update game objects.
//(called for every frame)
function OnAnimate( t, dt ) 
{
    //Show duck when near gun muzzle
    if( duck.x > gun.x+gun.width*0.7 ) duck.visible = true
}

//Fire duck from cannon
function fire()
{
	duck.SetVelocity( 0.8, 0.9 )
	duck.PlayRange( 0, 7, 0.3, true )
	duck.data.fired = true
	bang.Play()
}

//Handle sprite collisions.
function OnCollide( a, b )
{
	//Handle bird and object collision
    if( a.group=="birds" && b.group=="object" ) 
	{
		duck.Goto( 8 )
		if( duck.data.fired && !duck.data.dead ) 
		{ 
			quack.Play()
			duck.data.dead = true
		}
		crash.Play()
	}
}
