
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
	if( app.GetOrientation() == "Portrait") portrait();
	else
	landscape();
}
function portrait()
{
	alert("portrait");
}

function landscape()
{
	alert("landscape");
}