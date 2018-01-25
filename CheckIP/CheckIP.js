/* Author : gauravssnl (Gaurav) 
Thanks: dimy44 */

function getIP()
{
	url = "http://checkip.amazonaws.com"
	request = new XMLHttpRequest();
	request.open("GET", url);
	request.send();
	request.onload = function ()
{
	ip = request.response;
	if(ip){
	textEdit.SetTextColor( "#ff00ff" );
	textEdit.SetText("Your IP:" + ip);
	notify1 = app.CreateNotification("AutoCancel");
	notify1.SetLargeImage( "Img/CheckIP.png" );
	notify1.SetMessage("IP details", "Your IP Address:", ip);
	setTimeout("notify1.Cancel()", 6000);
	notify1.Notify();
	}
}

}

function OnStart()
{
	layMain = app.CreateLayout( "Linear", ",FillXY" );
	layMain.SetBackground( "Img/CheckIP2.png" );
	title = app.CreateText( "CheckIP by gauravssnl",-1,-1,"FontAwesome");
	title.SetTextColor( "#ff0000" );
	title.SetTextSize( 25 );
	title.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	layMain.AddChild( title );
	lay1 = app.CreateLayout( "Linear", "Vcenter" );
	layMain.AddChild( lay1 );
  	textEdit = app.CreateTextEdit( "", 1.0, -1,"FillXY,Vcenter,NoKeyboard,FontAwesome" );
  //textEdit = app.CreateText( "", 1.0, -1,"FillXY" );
	textEdit.SetTextSize( 20 );
	textEdit.SetMargins( 0.01, 0.01, 0.03, 0.01 );
	lay1.AddChild( textEdit );
	//layB = app.CreateLayout( "Linear", "FillXY,VCenter" );
	layB = app.CreateLayout( "Linear", "FillXY,Bottom" );
	layMain.AddChild( layB );
	checkBtn = app.CreateButton( "Check IP" , -1, -1,"FillX,Alum");
	checkBtn.SetOnTouch( checkBtn_OnTouch );
	layB.AddChild( checkBtn );
	wifiBtn = app.CreateButton( "Check WiFi IP", -1,-1,"FillX" );
	wifiBtn.SetOnTouch( wifiBtn_OnTouch );
	layB.AddChild( wifiBtn );
	aboutBtn = app.CreateButton( "About", -1, -1, "FillX,Alum" );
	aboutBtn.SetOnTouch( aboutBtn_OnTouch );
	layB.AddChild( aboutBtn );
	getIP();
	app.AddLayout(layMain );
	app.SetBackColor( "#ffffff" );
	app.EnableBackKey( false );

}

function checkBtn_OnTouch()
{
 var result;
	try {  
	       
	         getIP();
	         
	}
	catch(e)
	{
	 app.ShowPopup("Error: "+ e);
	}
}

function aboutBtn_OnTouch()
{
  dlg = app.CreateDialog( "About" );
  layDlg = app.CreateLayout( "Linear", "Vcenter,FillXY" );
  layDlg.SetSize( 0.8,0.6);
  dlg.AddLayout( layDlg );
  msg1 = app.CreateText( "Developer: gauravssnl)" );
  msg1.SetTextColor( "#22ff22" );
  msg1.SetTextSize( 18);
  layDlg.AddChild( msg1 );
  msg2 = app.CreateText( "Thanks to dimy44(Dmitry)");
  msg2.SetTextColor("#f100ff")
  msg2.SetTextSize(18);
  msg2.SetMargins( 0.01, 0.01, 0.01, 0.09 );
  layDlg.AddChild( msg2 );
  msg3 = app.CreateTextEdit( "You can use this app to get public IP address and WiFi local IP adress.Switch on Internet first before using this app and switch on WiFi to get WiFi IP." , -1, -1, "NoKeyboard");
  layDlg.AddChild( msg3 );
  layN = app.CreateLayout( "Linear", "Vcenter" );
  layDlg.AddChild(layN);
  backBtn = app.CreateButton( "Back",-1, -1,",,Gray" );
  backBtn.SetOnTouch( backBtn_OnTouch );
  layN.AddChild( backBtn );
  dlg.Show();
}

function wifiBtn_OnTouch()
{ 
  app.SetWifiEnabled( true );
	ip = app.GetIPAddress();
	if(ip === "0.0.0.0") 
	{
	  alert("You are not connected to any WiFi Network")
	  return;
	 }
	textEdit.SetTextColor("#f10ff0");
	textEdit.SetText( "Your WiFi IP: " + ip );
	notify2 =app.CreateNotification("AutoCancel,FullScreen");
	notify2.SetMessage( "WiFi IP", "Your WiFi IP:", ip );
	notify2.SetLargeImage( "Img/CheckIP.png" );
	setTimeout("notify2.Cancel()", 200);
	notify2.Notify(  );
}

function backBtn_OnTouch()
{
	dlg.Hide();
}

function OnBack ()
{
	app.ShowPopup( "Press Back Key again to exit the app" );
 	app.EnableBackKey( true );
 	app.SysExec( "date" );
}