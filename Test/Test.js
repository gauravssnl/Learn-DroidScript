function OnStart()
{ 
	lay = app.CreateLayout( "Linear", "VCenter,FillXY");
	lst = app.CreateList( "Kushal:folder, Jatin:audiofolder ,Gaurav:photofolder, GS:videofolder, Audio:audio, Video:video,Photo:photo,Playlist:playlist,Ram:null", 0.8, 0.4);
	lst.SetTextColor( "#ff666666" );
	lst.SetBackColor( "#ffffffff" );
	lst.SetOnTouch( lst_OnTouch );
	lst.SetOnLongTouch( lst_OnLongTouch );
	lay.AddChild( lst );
	btn = app.CreateButton( "Go" );
	btn.SetOnTouchEx( btn_OnTouch );
	lay.AddChild( btn );
	b1 = app.CreateButton( "OrangeButton" );
	b1.SetOnTouch( b1_OnTouch );
	lay.AddChild( b1);
	app.AddLayout( lay );
}

function lst_OnTouch(title, body, type, index)
{
	app.ShowPopup( title +"\n"+index);
}

function lst_OnLongTouch(title, body, type, index)
{
	app.ShowPopup( "Long Press: " + title +"\n"+index);
}
function btn_OnTouch()
{
app.RemoveLayout( lay );
	layn = app.CreateLayout( "Linear", "Vcenter,FillXY" );
	data  = "Gmail:Comany^c^Google:photo, ";
	data += "Hotmail:Comapny^c^MicroSoft:playlistl";
	body_lst = app.CreateList( data, 0.8, 0.8, );
	body_lst.SetPadding( 0.1,0.1,0.1,0.1 );
	body_lst.SetBackColor( "#ffffff" );
	body_lst.SetTextColor( "#22ff22" );
body_lst.SetOnTouch( body_lst_OnTouch );
body_lst.SetOnLongTouch( body_lst_OnLongTouch );
	layn.AddChild(body_lst );
	app.AddLayout( layn );
}

function body_lst_OnTouch(title, body, type, index)
{
	app.ShowPopup( title +"\n"+index);
}

function body_lst_OnLongTouch(title, body, type, index)
{
	app.ShowPopup( "Long Press: " + title +"\n" + body + "\n" + index);
	}
function b1_OnTouch()
{
	app.RemoveLayout( lay );
	lay = app.CreateLayout( "Linear","FillXY,VCenter" );
	lst = app.CreateList( "Button1,Button2,Button3, Button4", 0.8,0.8, "OrangeButton" );
	lay.AddChild( lst );
	app.AddLayout( lay );
}