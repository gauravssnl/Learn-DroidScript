
//Called when service is started.
function OnStart()
{
	app.ShowPopup( "Hello from Service!" );
	
	//Create media player.
	player = app.CreateMediaPlayer();
	player.SetOnReady( player_OnReady );
	player.SetOnComplete( player_OnComplete );
	
    //Query media store for a nice long track.
    media = app.CreateMediaStore();
    media.SetOnMediaResult( media_OnMediaResult );
    media.QueryMedia( "duration > 120000", "", "external" );
    
    //Start a timer to update the App.
    setInterval( UpdateApp, 1000 );
}

//Handle media query results.
function media_OnMediaResult( result )
{
    if( result.length==0 ) return;
    
    //Play first file found.
    track = result[0];
    player.SetFile( track.uri );
    
    //Get album art.
    var img = app.CreateImage( null, 0.1, 0.1 );
    var gotArt = media.GetAlbumArt( img, track.albumId, "external" );
    
    //Show a notification with album art if available.
	notify = app.CreateNotification( "Ongoing" );
	notify.SetMessage( track.title, track.title, track.album ); 
    if( gotArt ) notify.SetLargeImage( img );
	notify.Notify( "my_player_id" );  
}

//Called when we get a service message.
function OnMessage( msg )
{
    //Show debug in WiFi IDE.
    console.log( msg );
    
    //Handle commands from main App.
    if( msg=="play" ) player.Play();
    else if( msg=="pause" )	player.Pause();
    else if( msg=="quit" ) notify.Cancel( "my_player_id" );
}

//Called when player is ready to play.
function player_OnReady()
{
	player.Play();
}

//Called when playback has finished.
function player_OnComplete()
{
	notify.SetMessage( "Track Finished!", track.title, track.album ); 
	notify.Notify( "my_player_id" );
}

//Send the current playback position to the App.
function UpdateApp()
{
    var percent = 100 * player.GetPosition() / player.GetDuration();
    app.SendMessage( Math.round(percent) );
}


