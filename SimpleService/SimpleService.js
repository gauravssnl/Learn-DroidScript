function OnStart()
{
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );  
    btn = app.CreateButton( "Start", 0.6, 0.1 );
    btn.SetMargins( 0, 0.05, 0, 0 );
    lay.AddChild( btn );
    btn.SetOnTouch( btn_OnTouchStart );
    
    btn1 = app.CreateButton( "Stop", 0.6, 0.1 );
    btn1.SetMargins( 0, 0.05, 0, 0 );
    lay.AddChild( btn1 );
    btn1.SetOnTouch( btn_OnTouchStop );
    
    app.AddLayout( lay );
    svc = app.CreateService( "this","this", OnServiceReady );
    svc.SetOnMessage( OnServiceMessage );
}

function OnServiceReady()
{
    app.ShowPopup( "Service Ready" );
}

function OnServiceMessage( msg )
{
    alert( msg );
}

function btn_OnTouchStop()
{
    svc.SendMessage( "quit" );
    svc.Stop();
}

function btn_OnTouchStart()
{
    svc.SendMessage( "start" );
}