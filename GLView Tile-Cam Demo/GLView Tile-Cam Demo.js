
/* includes a script with useful functions and classes
functions:
	round(value, decimal) //decimal can be any number (ie. 1000)
classes:
	Obj2D(imgID, x, y, v, sx, sy, angle)
	Camera(x, y, df, tw, scale, aspect)
*/

app.LoadScript( "Objects.js", OnLoad );

var
		//these booleans are used to prevent dependency errors
		//ie. OnLoad needs OnStart called first, but was also called when our script has loaded
		//they were set true when the function was called (ie: OnStart -> started = true)
	started = false, loaded = false, ready = false,
		//player and cam are instances of ur Object.js classes.
		//here could also be an enemies array of Object2D"s
	player, cam,
		//the map object includes our tile map.
	map = {
		bt: 2,	//standard (back)ground tile
		ob: [	 //obstackle map (1: trees)
			//this is not the final map - the numbers will be replaced with the sprite IDs
			[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
			[1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1],
			[1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1],
			[1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
			[1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
			[1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
			[1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
			[1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
			[1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
			[1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
			[1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
			[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
			[1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1],
			[0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0],
			[1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
			[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
			[1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
			[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,2,1]
		]
	};


function OnStart() {
	app.SetOrientation( "Landscape" );
	app.SetScreenMode( "Game" );
	app.SetDebugEnabled( false );
	app.SetOnError( function( e ) { alert( e ); } );
	
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
		glv = app.CreateGLView( 1, 1, "fast2d" );
		lay.AddChild( glv );
	app.AddLayout( lay );
	
	//we override this function to prevent black outlines around each sprite
	glv.DrawImage = function ( image, x, y, w, h, angle ) {
		w *= this.width; h *= this.height;
		this.ctx.save();
		this.ctx.resetTransform();
		this.ctx.translate( x * this.width + w/2, y * this.height + h/2 );
		this.ctx.rotate( angle * Math.PI/180 );
		this.ctx.drawImage( image, 1, 1, image.width - 2, image.height - 2, -w/2, -h/2, w, h );
		this.ctx.restore();
	}
	
	//this is an object with all used image objects
	Img = {
		tree: glv.CreateImage( "Img/Tree.png" ),
		grass: glv.CreateImage( "Img/Grass.png" ),
		arrow: glv.CreateImage( "/Sys/Img/Forward.png" ),
		player: glv.CreateImage( "/Sys/Img/Icon.png" ),
		treasure: glv.CreateImage( "Img/treasure.png", OnReady ),
	};
	
	//the ImgID list includes the correct image object from its ID
	ImgID = [null];
	for( var i in Img ) {
		Img[i].id = ImgID.length;
		ImgID.push( Img[i] );
	}
	
	//here we convert the obstackle map IDs to the sprite IDs
	map.ob = map.ob.map( function( row ) {
		return row.map( function( tile ) {
			switch( tile ) {
				case 1: return Img.tree.id;
				case 2: return Img.treasure.id;
			}
		} );
	} );
	
	//if our script has already loaded the player and cam objects arent created yet
	//because the ImgIDs weren"t available at this time - so we have to call OnLoad manually
	started = true;
	if( loaded ) OnLoad();
}

//called when the Objects.js script has loaded
function OnLoad() {
	if( started ) {
		player = new Obj2D( Img.player.id, 1, 0, 2 );
		cam = new Camera( 20, 20, 0.6, 10, 1, glv.aspect );
	}
	
	loaded = true;
}

//called when all images are loaded
function OnReady() {
	ready = true;
	app.Animate( OnAnimate, 60 );
}

function OnAnimate( t, dt ) {
	//milliseconds to seconds
	dt /= 1000;
	
	//cam follows player
	cam.moveTo( player, dt );
	
	//get visible Area
	var rect = cam.getRect();
	
	//draw background
	for( var y = rect.iy1; y < rect.iy2; y++ ) {
		for( var x = rect.ix1; x < rect.ix2; x++ ) {
			DrawTile( rect, map.bt, x, y, rect.w, rect.h, 0 );
		}
	}
	
	//get visible area of the map
	rect = cam.getRect( 0, 0, map.ob[0].length - 1, map.ob.length - 1 );
	
	//draw all tiles on the map
	for( var y = rect.iy1; y < rect.iy2; y++ ) {
		for( var x = rect.ix1; x < rect.ix2; x++ ) {
			if( map.ob[y][x] )
				DrawTile( rect, map.ob[y][x], x, y, rect.w, rect.h, 0 );
		}
	}
	
	player.Draw( rect );
	glv.Render();
}

//draws a sprite on the tile coordinates by
//converting tile position to screen position:
function DrawTile( rect, imgID, x, y, w, h, angle ) {
	glv.DrawImage( ImgID[imgID], 0.5+( x-cam.x )/rect.w, 0.5+( y-cam.y )/rect.h, 1/rect.w, 1/rect.h, angle );
}