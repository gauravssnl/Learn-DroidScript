
//Called when application is started.
function OnStart()
{
    //Create a layout.
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );    
    
    //Create a 'Play' button.
    btn = app.CreateButton( "Play", 0.6, 0.1 );
    btn.SetMargins( 0, 0.05, 0, 0 );
    lay.AddChild( btn );
    btn.SetOnTouch( btn_OnTouchPlay );
    
    //Create a 'Pause'  button.
    btn = app.CreateButton( "Pause", 0.6, 0.1 );
    btn.SetMargins( 0, 0.05, 0, 0 );
    lay.AddChild( btn );
    btn.SetOnTouch( btn_OnTouchPause );
    
    //Create a 'Stop Service' button.
    btn = app.CreateButton( "Stop Service", 0.6, 0.1 );
    btn.SetMargins( 0, 0.05, 0, 0 );
    lay.AddChild( btn );
    btn.SetOnTouch( btn_OnTouchStop );
    
    //Create text control to show info.
    txt = app.CreateText( "", 0.4 );
    txt.SetMargins( 0, 0.05, 0, 0 );
    txt.SetTextSize( 22 );
    lay.AddChild( txt );
    
    //Add layout to app.    
    app.AddLayout( lay );
    
    //Start/connect to our service.
    svc = app.CreateService( "this","this", OnServiceReady );
    svc.SetOnMessage( OnServiceMessage );
    
    //This will cause your service to start at boot.
    //(Set it to "none" if you need to stop it starting)
    //app.SetAutoBoot( "Service" );
}

//Called after our service has started.
function OnServiceReady()
{
    console.log( "Service Ready" );
}

//Called when messages comes from our service.
function OnServiceMessage( msg )
{
    txt.SetText( "progress: " + msg + "%" );
}

function btn_OnTouchStop()
{
    //Tell service we are quitting.
    svc.SendMessage( "quit" );
    
    //Stop the service.
    svc.Stop();
}

function btn_OnTouchPlay()
{
    //Tell service to play music.
    svc.SendMessage( "play" );
}

function btn_OnTouchPause()
{
    //Tell service to pause music.
    svc.SendMessage( "pause" );
}





