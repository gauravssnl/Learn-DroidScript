/*
Author : gauravssnl
I am just a student who failed.
*/
curr= -1;
function OnStart()
{
	 curr = 1;
	app.SetOrientation( "portrait" );
app.EnableBackKey( false);
	layMain = app.CreateLayout( "Linear", "Vertical" );
	layMain.SetBackGradient( "#eeeeee", "#ffffff");
	layT = app.CreateLayout( "Linear", "Horizontal,FillX" );
	layMain.AddChild( layT );
	sideBtn = app.CreateButton( "[fa-list]",0.2,0.05,"fontawesome,Custom,Left" );
	sideBtn.SetBackColor( "#ff0000" );
	sideBtn.SetScale( 2,2);
	sideBtn.SetOnTouch( sideBtn_OnTouch );
	layT.AddChild( sideBtn );
	title = app.CreateText( "Locate Me",1, 0.05, "Center,fontawesome" );
	title.SetTextSize( 25 );
	title.SetBackColor( "#ff0000" );
	layT.AddChild( title );
	txt1 = app.CreateText( "Latitude :", 1,-1,"Left");
	txt1.SetTextSize( 20 );
	txt1.SetTextColor( "Red" );
	layMain.AddChild( txt1 );
	latEdit = app.CreateTextEdit( "",1,-1, "NoKeyBoard" );
	latEdit.SetTextColor( "Black" );
	layMain.AddChild( latEdit );
	txt2 = app.CreateText( "Longitude :",1,-1,"Left" );
	txt2.SetTextSize( 20 );
	txt2.SetTextColor( "Red" );
	layMain.AddChild( txt2 );
	longEdit = app.CreateTextEdit( "",1, -1,"NoKeyBoard" );
	longEdit.SetTextColor( "Black" );
	layMain.AddChild( longEdit );
	app.AddLayout( layMain );
	txt3 = app.CreateText( "Location Details :" ,1, -1,"Left");
	txt3.SetTextSize( 20 );
	txt3.SetTextColor( "Red" );
	layMain.AddChild( txt3 );
	resultEdit = app.CreateTextEdit( "" ,1,-1,"NoKeyBoard");
	resultEdit.SetSize( 1,0.54);
	resultEdit.SetTextColor( "Black" );
	layMain.AddChild( resultEdit );
	layB = app.CreateLayout( "Linear", "Horizontal,FillXY" );
	loc = app.CreateLocator( "GPS,Network" );
	findBtn = app.CreateButton( "Find", 1/2,-1 );
	findBtn.SetOnTouch( findBtn_OnTouch );
  layB.AddChild( findBtn );
	clearBtn = app.CreateButton( "Clear",1/2,-1 );
	clearBtn.SetOnTouch(clear);

	layB.AddChild( clearBtn );
	devBtn = app.CreateButton( "About",1/3,-1 );
//	layB.AddChild( devBtn );
	layMain.AddChild( layB );
	devText = app.CreateText( "Developer:  gauravssnl" );
	devText.SetTextColor( "#ff0000" );
	devText.SetOnTouch( dev_OnTouch );
	
	layMain.AddChild( devText );
	createDrawer();
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
}


function findBtn_OnTouch()
{
  if( !app.IsLocationEnabled("GPS"  ))
  {
    alert("Please,Enable Location First");
    return ;
  }
	try
	{
	loc.SetOnChange( loc_OnChange );
	clear();
	loc.Start();
	app.ShowPopup( "Locating..." );
	}
	catch(e)
	{
	  app.ShowPopup( "Error: " + e );
	}
}

function loc_OnChange(data)
{
	latEdit.SetText( data.latitude );
	longEdit.SetText( data.longitude );
	app.ShowPopup("Location Provider: " +data.provider)
	loc.Stop();
	if(data)
	  getDetails();
}

function getDetails()
{
	latitude = latEdit.GetText();
	longitude = longEdit.GetText();
	if(latitude && longitude) 
	{
	try
	{
	url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude;
	request = new XMLHttpRequest();
	request.open('GET', url);
	request.send()
	request.onload = function ()
{
	response = request.response;

	try{
	obj =JSON.parse( response);
	if(obj.error_message)
	{
	   app.ShowPopup( obj.error_message );
	   return;
	}
	resultEdit.SetText( response );
//	sub1= obj.results[0]["address_components"][2]["long_name"];
	//streetno = obj.results[0]["address_components"][0]["long_name"];
//	route = obj.results[0]["address_components"][1]["long_name"];
	//sub2 = obj.results[0]["address_components"][3]["long_name"];
	//locality = obj.results[0]["address_components"][4]["long_name"];
	//state
	//aa1 = obj.results[0]["address_components"][6]["long_name"];
	//country = obj.results[0]["address_components"][7]["long_name"];
	//postal_code = obj.results[0]["address_components"][8]["long_name"];
	formatted_addr = obj.results[0]["formatted_address"];
	
/* alert(streetno);
	alert(route);
	alert(sub1);
	alert(sub2);
	alert(locality);
	alert(aa1);
	alert(country);
	alert(postal_code);
	alert(formatted_addr); */
	}
	catch(e) {;}
showMap();
}

	}
catch(e) 
{
  app.ShowPopup( "Errror: " +e );
}
	}
	
else
app.ShowPopup( "Failed to connect" );
}

function clear()
{
	latEdit.SetText(  "");
	longEdit.SetText("");
	resultEdit.SetText( "" );
	if(loc !=undefined)
	 loc.Stop();
}

function dev_OnTouch()
{
	app.ShowPopup( "Developer: gauravssnl.\nApp uses Google Maps API to find Location details." );
}

function showMap()
{
	try
	{
//	alert(latitude);
//	alert(longitude);
//  layMain.Gone();
//layT.Gone();
curr = 2;
	layW = app.CreateLayout( "Linear", "Vertical" );
//	layW.SetSize( 1,1 );
	app.EnableBackKey( false );
	 layT1 = app.CreateLayout( "Linear", "Horizontal,Left,FillX" );
	 layT1.SetBackColor( "#ff0000" );
	 layW.AddChild( layT1 );
	 bckBtn = app.CreateButton( "[fa-arrow-left]", 0.2,-1, "Left,fontawesome,Custom" );
	 bckBtn.SetBackColor( "#ff0000" );
	 bckBtn.SetScale( 1.5,1.5);
	 layT1.AddChild( bckBtn );
	 bckBtn.SetOnTouch(OnBack);
	 titleMap = app.CreateText( "Maps" ,0.8, -1, "Center,Bold");
	 titleMap.SetTextSize( 20 );
	 layT1.AddChild( titleMap );
	 layT1.SetSize( 1,0.06);
	// option : AutoZoom removed
	web = app.CreateWebView( 1.0, 0.9, "AllowZoom, Wide,IgnoreErrors", 100);
	
	//url = "https://maps.google.com/maps?q=" + latitude + "," + longitude;
	url = "https://maps.google.com/maps?q=" + formatted_addr
	layW.AddChild( web );
//	layMain.Hide();
	app.AddLayout( layW );
	web.LoadUrl(  url);
//app.OpenUrl( url );
	//setTimeout("layW.Gone()", 5000);
//	layMain.Hide();
	//app.ShowPopup( "Press Back key to return to App" );
	}
	catch(e)
	{
	app.ShowPopup( "Error: " + e );
	}
}

function OnBack()
{ 
//	layW.DestroyChild(  );
   if(curr ==2) 
   {
   curr=1;
   layW.Gone();
   }
  else  if(curr == 1)
   {
    curr = -1;
   app.ShowPopup( "Press Back Key again to exit" );
    app.EnableBackKey( true );
    }
   
	//layT.Show();
	//OnStart();
}


function createDrawer()
{
	drawerWidth = 0.75
	drawerScroll = app.CreateScroller( drawerWidth,1  );
	drawerScroll.SetBackColor( "#ffffff" );
	layDrawer= app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer, );
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawerTop.SetBackGradient( "#ff000f", "#ffff00" );
	layDrawer.AddChild( layDrawerTop );
	
	img = app.CreateImage( "Img/Locate Me.png", 0.15);
	img.SetPosition( drawerWidth * 0.06 ,0.04 );
	layDrawerTop.AddChild( img );
	
	appt =  app.CreateText( "Locate Me" ,-1,-1, "Bold");
	appt.SetPosition( drawerWidth * 0.3,  0.04 );
	appt.SetTextSize(21,  "dip");
	layDrawerTop.AddChild( appt );
	
	dev = app.CreateText( "gauravssnl",  );
	dev.SetPosition( drawerWidth*0.07, 0.155 );
	dev.SetTextColor( "#22ff22" );
	dev.SetTextSize( 18, "dip" );
	layDrawerTop.AddChild( dev );
	email = app.CreateText( "gaurav.ssnl@gmail.com" );
	email.SetPosition( drawerWidth * 0.07, 0.185 );
	email.SetTextColor( "Black" );
	layDrawerTop.AddChild( email );
	
	layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	lstdata = "About:: [fa-info-circle] ,Feedback:: [fa-pencil]";
	listMenu1 = app.CreateList(lstdata, drawerWidth, -1 ,"Menu,Expand");
	listMenu1.SetOnTouch( listMenu_OnTouch );
	layMenu.AddChild( listMenu1 );
}


function listMenu_OnTouch(title, body, type, index)
{
   app.CloseDrawer(  );
   if(this == listMenu1)
   {
      if(title == "About") about();
      else if(title == "Feedback") feedback();
   }
}

function about()
{
	dlg = app.CreateDialog( "About" );
	layDlg = app.CreateLayout( "Linear", "Vertical,Center" );
	layDlg.SetBackGradient( "#eeeeee", "#ffffff" );
	layDlg.SetSize( 0.9,0.3);
	dlg.AddLayout( layDlg );
	msg= "Locate Me App  by <a href= https://gauravssnl.wordpress.com>gauravssnl<a><br/>E-mail: <a href= mailto:gaurav.ssnl@gmail.com?subject=LocateMeApp> gaurav.ssnl@gmail.com</a><br/>This app can be used to find your location provided by GPS/Network<br/><br/>DroidScript(JavaScript) has been used to develop this App.";
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layDlg.AddChild( txt );
	dlg.Show();
}

function feedback()
{
	app.OpenUrl( "mailto:gaurav.ssnl@gmail.com?subject=LocateMeApp");
}


function sideBtn_OnTouch()
{
	 app.OpenDrawer( "Left" );
}