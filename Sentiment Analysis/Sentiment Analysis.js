curr= -1;

var WIDTH = app.GetScreenWidth();
var HEIGHT = app.GetScreenHeight();

function OnStart()
{
	for (;;) {
		var lay = app.CreateLayout("Linear");
		lay.SetVisibility('Hide');
		app.AddLayout(lay);
		var b = app.CreateButton();
		lay.AddChild(b);
		var t = app.CreateText();
		lay.AddChild(t);
		app.Wait(0.05);
		var h = +b.GetHeight();
		var ht = +t.GetHeight();
		app.DestroyLayout(lay);
		if (h) break;
	}
	BTN_HEIGHT = h;
	TXT_HEIGHT = ht;
	
	 curr = 1;
	app.SetOrientation( "portrait" );
app.EnableBackKey( false);
	layMain = app.CreateLayout( "Linear", "Vertical" );
	layMain.SetBackGradient( "#eeeeee", "#ffffff");
	layT = app.CreateLayout( "Linear", "Horizontal,FillX,vcenter" );
	layT.SetBackColor( "#ff0000" );
	layMain.AddChild( layT );
	var wBtn = BTN_HEIGHT*HEIGHT/WIDTH;
	sideBtn = app.CreateButton( "[fa-list]", -1, -1,"fontawesome,Custom" );
	sideBtn.SetSize(wBtn, BTN_HEIGHT);
	sideBtn.SetTextSize(BTN_HEIGHT*HEIGHT/2, 'px');
	sideBtn.SetBackColor( "#ff0000" );
	sideBtn.SetOnTouch( sideBtn_OnTouch );
	layT.AddChild( sideBtn );
	title = app.CreateText( "Sentiment Analysis", 1-wBtn,  -1, "fontawesome" );
	title.SetTextSize( 25 );
	layT.AddChild( title );
	
	var layBody = app.CreateLayout('linear');
	layBody.SetSize(1, 1-BTN_HEIGHT*2-TXT_HEIGHT);
	layMain.AddChild(layBody);
	txt1 = app.CreateText( "Enter your text:", 1,-1,"Left");
	txt1.SetTextSize( 20 );
	txt1.SetTextColor( "Red" );
	layBody.AddChild( txt1 );
	txtEdit = app.CreateTextEdit( "",1,-1, );
	txtEdit.SetTextColor( "Black" );
	layBody.AddChild( txtEdit );
	txtEdit.SetSize( 1, 0.2);
	app.AddLayout( layMain );
	txt3 = app.CreateText( "Sentiment Details :" ,1, -1,"Left");
	txt3.SetTextSize( 20 );
	txt3.SetTextColor( "Red" );
	layBody.AddChild( txt3 );
	txt3.Hide();
	resultEdit = app.CreateTextEdit( "" ,1,-1,"NoKeyBoard");
	resultEdit.SetTextColor( "Black" );
	layBody.AddChild( resultEdit );
	resultEdit.Hide();
	layB = app.CreateLayout( "Linear", "Horizontal,FillXY" );
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
  
	try
	{
	  app.HideKeyboard(  );
	  //getSentiment()
	  //getCurl()
	   analyse();
	}
	catch(e)
	{
	  app.ShowPopup( "Error: " + e );
	}
}

function getSentiment()
{
	text= txtEdit.GetText();
	if(text) 
	{
	try
	{
	url = "http://text-processing.com/api/sentiment?/text=";
	request = new XMLHttpRequest();
	request.open('POST', url);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	request.setRequestHeader("Content-length", text.length)
	request.send("?text=" + text)
	request.onload = function ()
{
	response = request.response;
 alert(response);
 resultEdit.SetText( response );


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
	txtEdit.SetText(  "");
	resultEdit.SetText( "" );
	
}

function dev_OnTouch()
{
	app.ShowPopup( "Developer: gauravssnl.\nSentiment Analysis App." );
}



function OnBack()
{ 
  if(curr == 1)
   {
    curr = -1;
   app.ShowPopup( "Press Back Key again to exit" );
    app.EnableBackKey( true );
    }
   
	
}


function createDrawer()
{
	drawerWidth = 0.75
	drawerScroll = app.CreateScroller( drawerWidth,1  );
	drawerScroll.SetBackColor( "#ffffff" );
	layDrawer= app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawerTop.SetBackGradient( "#ff000f", "#ffff00" );
	layDrawer.AddChild( layDrawerTop );
	
	img = app.CreateImage( "Img/Sentiment Analysis.png", 0.15);
	img.SetPosition( drawerWidth * 0.06 ,0.04 );
	layDrawerTop.AddChild( img );
	
	appt =  app.CreateText( "Sentiment Analysis" ,-1,-1, "Bold");
	appt.SetPosition( drawerWidth * 0.3,  0.04 );
	appt.SetTextSize(21,  "dip");
	layDrawerTop.AddChild( appt );
	
	dev = app.CreateText( "gauravssnl" );
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
	layDlg.SetSize( 0.9,0.4);
	dlg.AddLayout( layDlg );
	msg= "Sentiment Analysis App  by <a href= https://gauravssnl.wordpress.com>gauravssnl<a><br/>E-mail: <a href= mailto:gaurav.ssnl@gmail.com?subject=LocateMeApp> gaurav.ssnl@gmail.com</a><br/>This app can be used for Sentiment Analysis<br/><br/>DroidScript(JavaScript) has been used to develop this App.";
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layDlg.AddChild( txt );
	dlg.Show();
}

function feedback()
{
	app.OpenUrl( "mailto:gaurav.ssnl@gmail.com?subject=Sentiment Analysis App");
}


function sideBtn_OnTouch()
{
	 app.OpenDrawer( "Left" );
}

function getCurl()
{
	
	text= txtEdit.GetText();
	if(text) 
	{
	try
	{
	cmnd = 'curl -d "text=' + text +'" http://text-processing.com/api/sentiment/'
	cmnd = 'curl -d "text=great" http://text-processing.com/api/sentiment/'
	//alert(cmnd);
	fl = app.GetAppPath() + "/Python/web.py";
	res = app.CreateSysProc ( "python  " +fl +  text );
	alert(res);
	}
catch(e) 
{
  app.ShowPopup( "Errror: " +e );
}
	}
	
else
app.ShowPopup( "Empty Text" );

}

function analyse()
{
	text= txtEdit.GetText();
	if(text) 
	{
	try
	{
	url = "http://text-processing.com/api/sentiment";
	param = "text=" + text;
	app.HttpRequest( "POST", url, "/", param, handle);
	}
catch(e) 
{
  app.ShowPopup( "Errror: " +e );
}
	}
	
else
app.ShowPopup( "Failed to connect" );

}
function handle(error, response)
{
	if(!error)
	{
	//alert(response);
	//alert(typeof(response));
	res = JSON.parse(response);
	//alert(typeof(res));
	if (res["label"] =="pos")
	 result = "Sentiment Label: " + "Positive\n";
 else 	if (res["label"] =="neg")
	 result = "Sentiment Label: " + "Negative\n";
		else if (res["label"] =="neutral")
	 result = "Sentiment Label: " + "Neutral\n";
	 
	result += "\nProbability:\n";
	result += "neg: " + res["probability"]["neg"] +"\n";
	result += "neutral: " + res["probability"]["neutral"] +"\n";
	result += "pos: " + res["probability"]["pos"] +"\n\n";
	result += "label: " + res["label"] +"\n\n";
	txt3.Show();
	resultEdit.Show();
	resultEdit.SetText(result);
	
	}
}