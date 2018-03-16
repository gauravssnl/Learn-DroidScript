
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" );
	txt.SetTextSize( 32 );
	lay.AddChild( txt );
	
	//Add layout to app.	
	app.AddLayout( lay );
	cmnd ='curl -d "text=great" http://text-processing.com/api/sentiment/'
	result = app.SysExec( cmnd );
	alert(result);
}