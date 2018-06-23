/*
  Web Server Template
  ==================
  
  This template provides a starting point for turning your Android device into
  a web server and also demonstrates the use of WebSockets for efficient, fast
  and bi-directional communication between client browsers and the server. 
  
  You can serv up web pages by placing them in the folder specified by the 
  serv.SetFolder() method on our intenal sdcard.
  
  The "Upload" and "ListDir" options on the serv.CreateWebServer() method enable
  clients to browse the internal sdcard of your device and upload/download files.
  
  Note: You can also create web servers inside a DroidScript service.
*/

//Init variables.
var count = 10;

//Called when application is started.
function OnStart()
{
	//Check wifi is enabled.
	ip = app.GetIPAddress();
	if( ip == "0.0.0.0" ) { 
		app.ShowPopup( "Please Enable Wi-Fi" ); 
		app.Exit();
	}
	
	//Prevent wifi from powering down.
    app.PreventWifiSleep();
	
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );

	//Create a text label and add it to layout.
	var s = "Type the following address into your" + 
			" browser(s)\n\n" + ip +":8080";
	txt = app.CreateText( s, 0.8, 0.3, "AutoScale,MultiLine" );
	txt.SetTextSize( 22 );
	lay.AddChild( txt );
	
	//Create a text label and add it to layout.
	txtMsg = app.CreateText( "", 0.8, 0.3, "AutoScale,MultiLine" );
	txtMsg.SetTextSize( 22 );
	lay.AddChild( txtMsg );
	
	//Create a 'Send Message' button.
	btn = app.CreateButton( "Send Message to Clients", 0.6, 0.1 );
	btn.SetMargins( 0, 0.05, 0, 0 );
	btn.SetOnTouch( SendMessage );
	lay.AddChild( btn );
	
	//Add layout to app.	
	app.AddLayout( lay );
	
	//Create and run web server on port 8080.
    serv = app.CreateWebServer( 8080, "Upload,ListDir" );
    serv.SetFolder( "/sdcard/DroidScript/"+app.GetAppName() );
    serv.SetOnReceive( serv_OnReceive );
    serv.Start();
	
	//Start timer to show WebSock connections.
	setInterval( ShowConnections, 3000 );
}
	
//Show who is connected.
function ShowConnections()
{
	var clients = serv.GetWebSockClients();
	
	if( clients.length > 0 )
	{
    	//Make a list of clients.
    	var list = "";
    	for( var i=0; i<clients.length; i++ )
    	    list += clients[i].remoteAddress + "\n";
    	    
    	//Show client list.
    	txt.SetText( list );
	}
}

//Send a message to all connected socket clients.
function SendMessage()
{	
    //Note: You can send to a specific client by passing
    //the IP address as the second parameter.
	serv.SendText( count-- );
	if( count < 0 ) count = 10;
}

//Called when messages arrive from websocket clients.
function serv_OnReceive( msg, ip )
{
    txtMsg.SetText( ip + ": " + msg );
}


	