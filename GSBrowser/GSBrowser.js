function OnStart()
{
app.EnableBackKey( false );
	lay = app.CreateLayout( "Linear", "Vertical" );
	layH = app.CreateLayout( "Linear", "Horizontal" );
	lay.AddChild( layH );
	img = app.CreateImage( "Img/GSBrowser.png", 0.5 );
	img.SetSize( 0.1,0.1 );
	layH.AddChild( img );
	txt = app.CreateText( "GS Browser" );
	txt.SetTextColor( "#22ff22" );
	txt.SetTextSize( 18);
	layH.AddChild( txt );
	lay1 = app.CreateLayout( "Linear", "Horizontal" );
	lay.AddChild( lay1 );
	textEdit= app.CreateTextEdit( "", 0.8,0.09);
	textEdit.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	textEdit.SetHint( "Enter URL" );
	lay1.AddChild(  textEdit);
	btn = app.CreateButton( "GO" , -1, -1, "Alum");
	btn.SetOnTouch( btn_OnTouch );
	lay1.AddChild( btn );
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
	 textEdit.SetText(web.GetUrl());
	 //textEdit.Hide();
	
	}
	
	
}