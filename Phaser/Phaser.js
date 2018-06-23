
//Called when application is started.
function OnStart()
{
    //Lock screen orientation to Landscape.
    app.SetOrientation( "Landscape" );
    
    //Set full screen game mode.
    app.SetScreenMode( "Game" );
    
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "Horizontal,VCenter,FillXY" );
	lay.SetBackColor( "#222222" );

	//Create a web control.
	web = app.CreateWebView( 0.8,0.95, "NoScrollbar" );
	web.SetBackColor( "black" );
	lay.AddChild( web );
	
	//Create a list of demos.
    lst = app.CreateList( "Animations,Invaders,Physics,Render,TileMap", 0.16, 0.8, "OrangeButton" );
    lst.SetMargins( 0.01,0,0,0 );
    lst.SetTextSize( 12 );
    lst.SetOnTouch( lst_OnTouch );
    lay.AddChild( lst );
	
	//Add layout to app.	
	app.AddLayout( lay );
	
	//Switch off debugging for max performance.
	//(console.log call will still work)
    app.SetDebugEnabled( false );
    
    //Load first Phaser demo.
    web.LoadUrl( "Splash.html" );
}

//Called when list item is touched.
function lst_OnTouch( title, body, type, index )
{
   //Load Phaser demo.
   app.ShowPopup( "Loading " + title + " ...", "Short" );
   web.LoadUrl( title + ".html" );
}
