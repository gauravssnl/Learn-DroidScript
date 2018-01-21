
function OnStart()
{
    app.ShowPopup( "Hello from Service!" );
}

function foo( id )
{
    app.SendMessage( id );
};

function OnMessage( msg )
{
    if( msg == "start" )
        app.SetAlarm( "Set", 123, foo, 5000 )
    else if( msg == "quit" )
        app.SetAlarm( "Cancel", 123 );
}


