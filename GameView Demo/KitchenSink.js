 
//Variables
var count = 0;
 
//Handle game loading.
function OnLoad()
{
    //Set background color.
    gfx.SetBackColor( 0xaaaaff )
    
    //Create sky image for background.
    sky = gfx.CreateSprite( "/Sys/Img/Sky.jpg" )
    
    //Use Physics and detect collisions. 
    gfx.AddPhysics()
    gfx.SetOnCollide( OnCollide )
    //gfx.EnablePhysics( true );
    
    //Create the bunny image with physics.
    //(call OnReady once it has finished loading)
    bunny = gfx.CreateSprite( "/Sys/Img/Bunny.png" )
   
    //Create a rectangle for the floor.
    floor = gfx.CreateRectangle( 0.4, 0.1, 0x66CCFF, 2, 0xFF3300 )
	
	//Create some shapes
	circle = gfx.CreateCircle( 0.1, 0xeeee66 )
    //circle.Scale( 0.1, 0.1 )
	ellipse = gfx.CreateEllipse( 0.015, 0.005, 0x333333 )
	poly = gfx.CreatePolygon( [0.2,0.2, 0.25,0.3, 0.05,0.3, 0.2,0.2], 0.2,0.2, 0xff6666, 6, 0xee2222 )
	
    
    //Create droid image.
    droid = gfx.CreateSprite( "/Sys/Img/Hello.png" )
	
	//Create a sprite using a sprite sheet (for animations)
    jet = gfx.CreateSprite( "Img/fighter.json" )
	//jet = gfx.CreateSprite( "/Sys/Img/meteor_12_strip23.json" )
        
    //Load a sound.
    gfx.LoadSound( "poing", "/Sys/Snd/Poing.ogg" )
	
	//colorMatrix =  [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    //filter = new PIXI.ColorMatrixFilter();
	//gfx.stage.filters = [filter];
 
}

//Called when all game resources have loaded.
function OnReady()
{
    //Add sky image.
    gfx.AddSprite( sky, 0,0, 1,1 )
    
    //Add floor to scene.
    gfx.AddGraphic( floor, 0.01, 0.7 )
	floor.SetPhysics( 2, "moveable", 0.5, 0.5, 0.2 )
	
	//Add some shapes to scene.
	gfx.AddGraphic( circle, 0.6, 0.1 )
	gfx.AddGraphic( ellipse, 0.8, 0.9 )
	gfx.AddGraphic( poly, 0.9, 0.1 )
	
	//Tween our polygon.
	var target = { x:0.2, y:0.2, scaleX:1, scaleY:1, width:0.5 }
    poly.SetTween( target, 3000, "Exponential.Out", 1, true )
	poly.PlayTween()
	
    //Transform floor using a matrix.
    //(for advanced users)
    var matrix = new Matrix()
    //matrix.Skew( -0.2, 0 )
	matrix.Rotate( Math.PI/4 )
    //matrix.Translate( 0.3, 0 );
    //matrix.Scale( 2, 1 );
    //matrix.Transform( tx, ty, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY );
    //floor.SetMatrix( matrix )
    
    //Add droid.
    gfx.AddSprite( droid, 0.4 ) //, 0.2, 0.2 );
    //droid.x = 0.4, droid.y = 0.1
	
	//Add animated sprite.
    //sprite = gfx.CreateSprite( "rollSequence0000" )
    //gfx.AddSprite( sprite, 0.3, 0.3 ) //, 0.2, 0.2 );
	
	//Add our jet plane.
    gfx.AddSprite( jet, 0.9, 1.1 )
    jet.SetAnimationSpeed( 0.5 )
    jet.Scale( 1, 1 )
	
	//Create multiple Tweens for our jet plane (paused at first).
	var target1 = { x:0.3, y:0.3, scaleX:0.2, scaleY:0.2 }
	var target2 = { angle:-0.25 }
	var target3 = { x:-0.1, y:0.3 }
	var turn = function() { jet.Tween( target2, 2000, null, 0, false, flyBack ) }
    var flyBack = function() { jet.Tween( target3, 2000, "Exponential.In" ) }
    jet.SetTween( target1, 4000, "Cubic.Out", 0, false, turn )
    
    //Start animating
    console.log( "start" )
    gfx.Animate( OnAnimate )
}

//Move game objects around
function OnAnimate( t, dt ) 
{
    //console.log( dt )

    //Rotate and fade the droid according to bunny posn.
    droid.angle += 0.01
	if( droid.alpha > 0.2 ) droid.alpha -= 0.005
	
	//Alter the colors
	/*
	colorMatrix[1] = Math.sin(count) * 3
	colorMatrix[2] = Math.cos(count);
	colorMatrix[3] = Math.cos(count) * 1.5
	colorMatrix[4] = Math.sin(count / 3) * 2
	colorMatrix[5] = Math.sin(count / 2)
	colorMatrix[6] = Math.sin(count / 4)
	//filter.matrix = colorMatrix;
	count += 0.1;
	*/
	
	//Add bunny with physics after 1 second.
	if( t > 1500 && !bunny.added ) {
		gfx.AddSprite( bunny, 0.1, 0.3 )
		bunny.SetPhysics( 1, "dynamic", 0.5, 0.5, 0.2, 0,0, "roXund" )
		bunny.SetVelocity( 0.02, 0 );
	}
	//poly.angle += 0.01
	
	//Hide bunny if below ellipse
	if( bunny.y + bunny.height/2 > ellipse.y ) bunny.visible = false
	
	
	//ellipse.angle += 0.01
	if( bunny.x < 0.8 ) ellipse.width += 0.0002
	else if( ellipse.width > 0 ) ellipse.width -= 0.002
	
	
	//Move the floor
	if( t > 2000 ) {
		if( floor.x > 0.2 && floor.x < 0.3 ) floor.SetVelocity( 0.2, 0, 0.2 )
		else if( floor.x > 0.3 ) floor.SetVelocity( 0, 0, 0 )
		else floor.SetVelocity( 0.2, 0 );
	}
	
	//Can't really mix physics and manual moving or stuff goes wrong.
	//Note: We must call UpdatePhysics() when manually  
	//moving objects that are under physics control.
    //floor.x += 0.0006
	//if( floor.x > 0.05 ) floor.angle += 0.0004 
	//floor.UpdatePhysics()
    
    //Play sound when bunny hits floor.
    //if( gfx.IsHit(bunny, floor, -0.02) ) gfx.PlaySound( "poing" )   
	
	//Do jet flyby when polygon has gone.
	if( t > 9000 ) { 
		jet.PlayTween(); 
		if( jet.y > 0.4 ) jet.Play()
		else jet.Stop()
	}
	
	//Spin droid in jet wash.
	if( jet.x < 0.1 ) droid.angle += -0.05
	
	//Stop animating after 10 secs
	if( t > 20000 ) { 
	    gfx.Animate( null )
	    gfx.AppExec( "app.ShowPopup('Game Over Dude!')" )
	}
}


//Handle sprite collisions.
function OnCollide( a, b )
{
    //console.log( "a:" + a.x + " b:"+b.x )
    gfx.PlaySound( "poing" );
}



