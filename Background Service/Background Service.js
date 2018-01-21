
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" , 0.4);
	txt.SetMargins( 0, 0.05, 0, 0);
	txt.SetTextSize( 22 );
	lay.AddChild( txt );
	
	btn = app.CreateButton( "Send Message to Service" ,0.6, 0.1);
	btn.SetOnTouch( function ()
{
	svc.SendMessage("change");
}
 );
	lay.AddChild( btn );
	
	btn = app.CreateButton( "Stop Service" , 0.6, 0.1);
	btn.SetOnTouch( function ()
{
	svc.Stop();
}
 );
 lay.AddChild( btn );
 
 svc = app.CreateService( "this", "this", OnServiceReady );
 svc.SetOnMessage(onServiceMessage);
 
	//Add layout to app.	
	app.AddLayout( lay );
}

function OnServiceReady()
{
	app.ShowPopup("Service Ready");
}

function onServiceMessage(msg)
{
	txt.SetText( "Count: "+msg );
}