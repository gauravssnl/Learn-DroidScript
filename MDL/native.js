
//Called after the main HTML document has loaded.
function OnStart()
{
    //Send debug to WiFi IDE.
    console.log("App started!");
    
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
     
    //Create media player and load file.
    //(This could be a file from the sdcard)
	player = app.CreateMediaPlayer();
	player.SetFile( "/Sys/Snd/Trill.ogg" );
	
	//Speak to the user.
	app.TextToSpeech( "Welcome to the Material Design Lite demo" );
}

//Vibrate phone and set alarm.
function Buzz()
{
    //Send debug to WiFi IDE.
    console.log( "Buzz" );
    
    //Vibrate phone.
    app.Vibrate( "0,100,30,100,50,300" );
    
    //Set alarm for 3 seconds time.
    var now = new Date().getTime(); 
    app.SetAlarm( "Set", 1234, OnAlarm, now + 3000 );
}

//Called when alarm is triggered.
//(Even if your app is closed)
function OnAlarm( id )
{
    //Show popup message.
    app.ShowPopup( "Wake Up!" );
    
    //Play sound file.
    player.SeekTo( 0 );
	player.Play();
	
	//Trigger a notification.
	Notify();
}

//Create system notification.
//(This could also be called from a DroidScript service)
function Notify()
{
    notify = app.CreateNotification( "AutoCancel" );
    notify.SetMessage( "Hello!", "MDL Demo", "Wake Up!" );
	notify.Notify();  
}