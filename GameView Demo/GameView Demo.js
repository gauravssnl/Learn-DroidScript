 
//Called when application is started.
function OnStart()
{
    //Lock screen orientation to Landscape and
    //stop screen turning off.
    app.SetOrientation( "Landscape" )
    app.PreventScreenLock( true )
	
    //Create the main layout
    lay = app.CreateLayout( "Linear", "FillXY,VCenter" )
    lay.SetBackColor( "#6666ff" )
	
    //Add the main layout to the app.
    app.AddLayout( lay )
    
    //Ask user which file to run.
    var lst = "Bunnies.js,BunnyPhysics.js,KitchenSink.js"
    dlg = app.CreateListDialog( "Choices", lst )
    dlg.SetOnTouch( dlg_OnTouch )
    dlg.Show()
}

function dlg_OnTouch( item )
{
    //Set full screen game mode.
    app.SetScreenMode( "Game" )
    
    //Create a GLView and add it to layout.
    glview = app.CreateGameView( 1, 1 )
    glview.SetFile( item )
    glview.SetFrameRate( 60 )
    lay.AddChild( glview )
}