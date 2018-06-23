//Called when application is started.
function OnStart()
{

	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
 

	//Create a text label and add it to layout.
text = app.CreateText( "", 1, 0.8, "MultiLine" );

buttonconnect = app.CreateButton( "CONNEXION", 1, 0.1, "Disabled" );
buttondisconnect = app.CreateButton( "DECONNEXION", 1, 0.1 );
web = app.CreateWebView( 1,1,"IgnoreErrors" );
web.SetUserAgent(navigator.userAgent.replace(/android/gi,"secret"));

		lay.AddChild( text );
	lay.AddChild( buttonconnect );
//	lay.AddChild( buttondisconnect );
	text.SetBackColor( "black" );
	buttonconnect.SetOnTouch( connect );
	
	
	
	web.LoadUrl( "http://localhost:8080/login.html" );
//	app.OpenUrl( "http://localhost:8080/login.html" );
	//Add layout to app.	
	app.AddLayout( lay );
	
	

}
function connect()
{
app.ShowProgress( "Login..." );
 serv = app.CreateWebServer( 8080 );
  serv.SetFolder( "/sdcard/DroidScript/login test google" );
  serv.AddServlet( "/message", OnServlet );
  serv.Start();
app.OpenUrl( "http://localhost:8080/login.html" );
}



  function OnServlet( request, info )
  {
  if( request.msg == "quit" )
  {
  serv.Stop();
  app.HideProgress();
  buttonconnect.SetText( "Retry" );
  } else {
  //	serv.SetResponse( "Got it!" );
  	text.SetText(  text.GetText() + "\n" +request.msg + "\n" );
  	app.ShowPopup( info.remoteAddress + " says: " + request.msg );
  	}
  }