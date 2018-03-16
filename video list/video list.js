//FOLDER TO SCAN VIDEOS
fld =  "/sdcard/DCIM/Camera";

//ENABLE OR DISABLE VIDEO LIST ANIMATION
Animation = false;

app.SetDebugEnabled( false );
//Called when application is started.
function OnStart()
{
app.ShowProgress(  );

	//Create a layout with objects vertically centered.
	layMain = app.CreateLayout( "linear", "FillXY" );	
	layMain.SetBackColor( "#ffffff" );
	
	    //Create a full screen scroller
    scroll = app.CreateScroller( 1.0, 1.0 );
    layMain.AddChild( scroll );
 
    //Create a layout inside scroller.
    lay = app.CreateLayout( "Linear", "Left" );
    scroll.AddChild( lay );


videos = app.ListFolder( fld, ".mp4"  );
i = -1;
	
	//Add layout to app.	
	app.AddLayout( layMain );
	
	addVideoIcon();
	
}

function addVideoIcon()
{
if( i<videos.length-1 ){
	i++
	
			//Create horizontal sub-layout for buttons.
	layCon = app.CreateLayout( "Absolute", "" );	
	layCon.SetBackColor( "#ffffff" );
	lay.AddChild( layCon );
	
		//Create horizontal sub-layout for buttons.
	layHoriz = app.CreateLayout( "linear", "Horizontal" );	
	layCon.AddChild( layHoriz );
	
	//Create video view.
	player = app.CreateVideoView( 0.2, 1 );
	layHoriz.AddChild( player );
		player.SetOnReady( player_OnReady );
player.SetFile( fld + videos[i] );

	//Create a layout with objects vertically centered.
	layV = app.CreateLayout( "linear", "Left" );	
layHoriz.AddChild( layV );

}
else app.HideProgress();
}


//Called when file is ready to play.
function player_OnReady()
{

    //Create some text.
    txt = app.CreateText( "    " + videos[i], 0.8, null, "Left"  );
    txt.SetEllipsize( "middle" );
    txt.SetTextSize( 16 );
    txt.SetTextColor( "#363636" );
    layV.AddChild( txt );
    
    		//Create horizontal sub-layout for buttons.
	layHoriz2 = app.CreateLayout( "linear", "Horizontal" );	
	layV.AddChild( layHoriz2 );
    
        //Create some text.
    txt = app.CreateText(  "     " + bytesToSize( app.GetFileSize( fld + videos[i] ) ), 0.4, null, "Left"  );
    txt.SetTextSize( 13 );
        txt.SetTextColor( "#999999" );
    layHoriz2.AddChild( txt );
    
            //Create some text.
    txt = app.CreateText( millisToMinutesAndSeconds( player.GetDuration() ), 0.4, null, "Right"  );
    txt.SetTextSize( 13 );
        txt.SetTextColor( "#999999" );
    layHoriz2.AddChild( txt );
    
        //Add seperator to menu layout.
    var sep = app.CreateImage( null, 1,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    lay.AddChild( sep );
    
    	//Create a button 1/3 of screen width and 1/10 screen height.
	btn = app.CreateButton( "Press Me", 0.3, 0.1 );
	btn.SetSize( layCon.GetWidth(  ), layCon.GetHeight(  ) );
	btn.SetBackColor( "#00cc22cc" );
	btn.VideoUrl = fld + videos[i];
	btn.SetOnTouch( Videolist );
	layCon.AddChild( btn );
	
	player.Play();
	app.SetVolume( 0, 0 );
	player.SeekTo( 1 );
	if( Animation==false ) 	player.Pause();
		addVideoIcon();
}


function bytesToSize(bytes) {
var sizes = [ 'Bytes', 'KB' , 'MB' , 'GB' , 'TB' ];
if (bytes == 0) return '0 Byte' ;
var i = parseInt( Math .floor( Math .log(bytes) /
Math .log( 1024 )));
return Math .round(bytes / Math .pow( 1024 , i), 2) + ' ' + sizes[i];
}

function millisToMinutesAndSeconds(d) {
    d = Number (d);
var h = Math .floor(d / 3600 );
var m = Math .floor(d % 3600 / 60 );
var s = Math .floor(d % 3600 % 60 );
var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":" ) : "" ;
var mDisplay = m > 0 ? m + (m == 1 ?
":" : ":" ) : "" ;
var sDisplay = s > 0 ? s + (s == 1 ? "     " : "    " ) : "" ;
return hDisplay + mDisplay + sDisplay;
}
function Videolist(){this.SetBackColor( "#50999999" );	VideoList_OnTouch( this.VideoUrl );this.SetBackColor( "#00999999" );}


//THIS FUNCTION CALLS WHEN USER 
//TOUCH A LIST
//video argument contains video url
function VideoList_OnTouch( video)
{
	app.ShowPopup( video );
}