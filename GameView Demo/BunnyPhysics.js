 
//Handle game loading.
function OnLoad()
{
    //Enable physics and enclose scene with walls.
    gfx.AddPhysics( null,null,true)
    gfx.Enclose( "left,right", 1, 0.7, 0.1 )
    
    //Create sky image for background.
    sky = gfx.CreateSprite( "/Sys/Img/Sky.jpg" )
    
    //Create a batch container for our sprites.
    //(for higher performance)
    batch = gfx.CreateBatch(); 
    gfx.AddBatch( batch );
	
    //Create a bunny image with physics enabled.
    bunny = gfx.CreateSprite( "/Sys/Img/Bunny.png", "bunnies" )
    
    //Create a rectangle for the floor with physics enabled.
    floor = gfx.CreateRectangle( 1, 0.05, 0x338833 );
    
    //Load a sound.
    gfx.LoadSound( "poing", "/Sys/Snd/Poing.ogg" )
    gfx.LoadSound( "squeak", "/Sys/Snd/Squeak.mp3" )
    
    //Detect screen touches.
    gfx.SetOnTouchDown( AddBunnies )

    //Detect collisions.
    gfx.SetOnCollide( OnCollide )
}

//Called when game has loaded.
function OnReady()
{
    //Add sky image.
    gfx.AddSprite( sky, 0,0, 1,1 )
    
    //Add floor.
    gfx.AddGraphic( floor, 0, 0.95 )
	floor.SetPhysics( 2, "fixed", 0.9, 0.7, 0.1 );
    
    //Add bunny image.
    gfx.AddSprite( bunny, 0.1, 0.1 )
	bunny.SetPhysics( 1, "dynamic", 0.9, 0.9, 0.3 )
    bunny.SetVelocity( 0.4, 0 )
    
    //Start animating
    gfx.Animate( OnAnimate )
}

//Update game objects.
function OnAnimate( t, dt ) 
{
 
}

//Add more bunnies to scene.
function AddBunnies()
{
	console.log("AddBunnies")
	
    //Create 3 at a time.
    for (var i = 0; i < 1; i++) 
	{
        //Create new bunny images.
        bunny = gfx.CreateSprite( "/Sys/Img/Bunny.png", "bunnies" )
        
        //Add the new bunny images.
        gfx.AddSprite( bunny, 0.1, 0.1 )
		
		bunny.SetPhysics( 1, "dynamic", 0.9, 0.9, 0.3 )
        bunny.SetVelocity( Math.random(), 0 )
	}
}

//Handle sprite collisions.
function OnCollide( a, b )
{
    console.log( "a:" + a.x + " b:"+b.x )
    
    if( a.group=="bunnies" && b.group=="bunnies" ) 
		gfx.PlaySound( "squeak", false, 100+1000*Math.random() );
    else gfx.PlaySound( "poing" );
}



