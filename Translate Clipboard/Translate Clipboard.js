function OnStart()
{
	layMain = app.CreateLayout( "Linear", "Vertcal,FillXY" );
	layTop = app.CreateLayout( "Linear", "Horizontal,FillX" );
	layTop.SetBackColor( "#ff000f" );
	layMain.AddChild( layTop );
	btn1 = app.CreateButton( "[fa-navicon]", 0.2, 0.08,"fontawesome,custom,Left");

//	btn1.SetMargins( 0.0, 0.0, 0.00, 0.01 );
	btn1.SetBackColor( "#ff000f" );
	btn1.SetScale( 1.4, 2);
	layTop.AddChild( btn1 );
	title = app.CreateText( "TranslateClipBoard",0.9, 0.08, "Center" );
  title.SetTextSize( 25);
  title.SetBackColor( "#ff000f" );
  title.SetMargins( 0.0, 0.01, 0.01, 0.01 );
	layTop.AddChild( title );
	app.AddLayout( layMain );
	layM = app.CreateLayout( "Linear", "Vertical,FillXY" );
	layM.SetSize(  1.0, 1- 0.1);
	layM.SetBackColor( "white" );
	layMain.AddChild( layM );
	btn1.SetOnTouch( btn1_OnTouch );
	txtA = app.CreateText( "<u>Original Text</u>" ,1.0, -1, "html,Center");
	txtA.SetTextSize( 20 );
	txtA.SetTextColor( "#ff0000" );
	layM.AddChild( txtA );
	origTextEdit = app.CreateTextEdit( "",1,0.4, "Left");
	origTextEdit.SetTextColor( "#000000" );
	clipdata = app.GetClipboardText();
	if(clipdata) origTextEdit.SetText( clipdata );
	else origText.SetHint( "Enter text to be translated" );
	layM.AddChild( origTextEdit );
	origTextEdit.SetSize(1,origTextEdit.GetHeight());
	layB = app.CreateLayout( "Linear", "Horixontal,FillX" );
	layM.AddChild( layB );
	transBtn = app.CreateButton( "Translate" ,1, -1, "Right");
	layB.AddChild( transBtn );
	transBtn.SetOnTouch( transBtn_OnTouch );
	
	createDrawer();
	app.AddDrawer( drawerScroll, "Left",drawerWidth, );
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
	
	img = app.CreateImage( "Img/image1.jpg", 0.15);
	img.SetPosition( drawerWidth * 0.06 ,0.04 );
	layDrawerTop.AddChild( img );
	
	appt =  app.CreateText( "TranslateClipboard" ,-1,-1, "Bold");
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

function btn1_OnTouch ()
{
 // To -do
 app.OpenDrawer(  );
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
	msg= "TranlslateClipboard by <a href= https://gauravssnl.wordpress.com>gauravssnl<a><br/>E-mail: <a href= mailto:gaurav.ssnl@gmail.com?subject=TraslateClipboard> gaurav.ssnl@gmail.com</a><br/>This app can be used to translate texts from Clipboard, which you copied last time";
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.0,0.0,0.0,0.0 );
	layDlg.AddChild( txt );
	dlg.Show();
}

function feedback()
{
	app.OpenUrl( "mailto:gaurav.ssnl@gmail.com?subject=TraslateClipboard");
}

function transBtn_OnTouch()
{
	if((otext = origTextEdit.GetText()))
	  translate(otext) ;
	else
	app.ShowPopup( "Empty Original Text/Clipboard" );
	
}

function translate(otext)
{
	url = "https://translate.googleusercontent.com/translate_p?sl=ru&tl=en&q="+ otext;
	request = new XMLHTTPRequest();
	request.open('GET', url);
	request.send();
	request.onload= function ()
{
	response = request.response();
	alert(response);
}

	
}