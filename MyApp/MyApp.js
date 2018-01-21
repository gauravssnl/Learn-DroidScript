function OnStart()
{
	lay = app.CreateLayout( "Linear", "Vertical" );
	txt = app.CreateText( "GS Browser" );
	txt.SetTextColor( "#22ff22" );
	txt.SetTextSize( 18);
	lay.AddChild( txt );
	textEdit= app.CreateTextEdit( "", 0.9,0.08 );
	textEdit.SetHint( "Enter URL" );
	lay.AddChild(  textEdit);
	btn = app.CreateButton( "GO" , -1, -1, "Alum");
	btn.SetOnTouch( btn_OnTouch );
	lay.AddChild( btn );
	app.AddLayout( lay );
}

function btn_OnTouch()
{
	url = textEdit.GetText();
	pat = /^https?:\/\//
	if (!url.match(pat)) url =  "http://" + url  ;
	web = app.CreateWebView(  );
	web.LoadUrl( url );
	app.ShowProgress( "Loading" );
	web.SetOnProgress( web_onProgress );
	lay.AddChild( web );
}

function web_onProgress(progress)
{
	if(progress==100) 
	{
	 app.HideProgress();
	 //textEdit.Hide();
	
	}
	
	
}